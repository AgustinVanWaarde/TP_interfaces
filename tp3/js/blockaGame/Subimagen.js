"use strict";


// Clase SubImagen: representa cada una de las piezas del rompecabezas

class SubImagen {
    
    constructor(id, x, y, imagen, width, height, imgX, imgY, tamanioSubImagen) {
        this.id = id;

        // Posicion de la foto original
        this.width = width;
        this.height = height;
        this.imgX = imgX;
        this.imgY = imgY;

        // Posicion del dibujo en el canvas
        this.x = x;
        this.y = y;
        this.tamanioSubImagen = tamanioSubImagen;

        // Posicion correcta por pista
        this.posicionCorrecta = false;

        // Rotacion actual arranca en 0
        this.rotacion = 0;

        // Imagen original
        this.imagen = imagen;

        // Filtro a aplicar
        this.filtro = null;
    }


    estaBienPosicionada() {
        return this.rotacion === 0;
    }


    // Rota la sub-imagen en angulos fijos pasados por el evento de click (90 o -90)
    rotarAlClickear(angulos) {
        // Rota 90 grados en sentido horario
        this.rotacion += angulos;

        // Mantener la rotacion entre 0 y 360 grados
        this.rotacion = this.rotacion % 360;

        // Asegurar que la rotacion sea positiva y si es negativa la ajusto lo ajusto a 360 que es lo mismo que 0
        if(this.rotacion < 0) this.rotacion += 360;
    }


    // Dibuja la sub-imagen en el canvas
    dibujar(ctx) {
        ctx.save(); // Guardar el estado actual del canvas

        // Posicion centrica de la sub-imagen
        const cenX = this.x + this.tamanioSubImagen / 2;
        const cenY = this.y + this.tamanioSubImagen / 2;


        // Mover el origen al centro de la sub-imagen, TRASLADO la coordenada 0,0 del canvas al centro de la sub-imagen
        ctx.translate(cenX, cenY); 

        
        // Rota el canvas COMPLETO IMPORTANTE
        // Convierte grados a radianes para rotar en canvas, porque canvas solo acepta radianes
        // radianes = grados * (Math.PI / 180)
        ctx.rotate((this.rotacion * Math.PI) / 180); // Aplica la rotación


        // Coordenadas para dibujar nuevamente por el cambio del translate
        //IMPORTANTE HACERLO para que mi coordenada 0,0 vuelva a ser la esquina superior izquierda de la sub-imagen
        let coordDibujo = -this.tamanioSubImagen / 2;

        
        // Funcion de la libreria de canvas para dibujar una parte de la imagen original en el canvas
        ctx.drawImage(
            this.imagen, // Imagen original
            this.imgX, this.imgY, this.width, this.height, // Parte de la imagen original a dibujar
            coordDibujo, coordDibujo, this.tamanioSubImagen, this.tamanioSubImagen // Donde y tamaño en el canvas
        );

        this.aplicarFiltro(this.filtro,ctx); // Aplico el filtro de escala de grises a la sub-imagen dibujada

        ctx.restore(); // Restaurar el estado original del canvas ya que lo rote y traslade TODO el canvas
    }


    aplicarFiltro(filtro,ctx){

        // Obtener los datos de la imagen de la sub-imagen dibujada en el canvas(px)
        const imageData = ctx.getImageData(this.x, this.y, this.tamanioSubImagen, this.tamanioSubImagen);

        // Obtener el array de datos de píxeles de la sub-imagen (RGBA)
        const data = imageData.data;

        // Variable que va a guardar la funcion del filtro a aplicar,que me pasan por parametro el tipo de filtro
        let filter;

        switch(filtro){
            case 'grayscale':
                filter = this.filtroEscalaGrises;
                break;
            case 'negative':
                filter = this.filtroNegativo;
                break;
            case 'brillo':
                filter = this.filtroBrillo;
                break;
            default:
                return;
        }


        // Aplicar el filtro (ejemplo: convertir a escala de grises)
        // Recorro por filas de la sub-imagen
        for ( let y = 0; y < this.tamanioSubImagen; y++ ) {

            // Me recorro por columnas de la sub-imagen en todo su Y
            for (let x = 0; x < this.tamanioSubImagen; x++ ) {
                const index = (y * this.tamanioSubImagen + x) * 4; // Calculo el índice del píxel actual

                // Llamo a la funcion del filtro que me pasaron por parametro
                // .call(objeto, parametros...) -> permite llamar a una funcion con un contexto especifico (this) y luego se pasan sus parametros
                filter.call(this, data, index);
            }

        }

        ctx.putImageData(imageData, this.x, this.y);
    }

    // Filtros de sub-imagenes
    filtroEscalaGrises(data, index) {
        const avg = (data[index] + data[index + 1] + data[index + 2]) / 3;
        data[index] = avg;     // Rojo
        data[index + 1] = avg; // Verde
        data[index + 2] = avg; // Azul
    }

    filtroNegativo(data, index) {
        data[index] = 255 - data[index];       // Rojo
        data[index + 1] = 255 - data[index + 1]; // Verde
        data[index + 2] = 255 - data[index + 2]; // Azul
    }

    filtroBrillo(data, index) {
        const brillo = 50; // Valor fijo de brillo a sumar
        // sumo el brillo a cada color, y en el caso de pasarme de 255 
        // agarro el minimo valor entre 255 y el resultado

        data[index] = Math.min(255, data[index] + brillo);       // Rojo
        data[index + 1] = Math.min(255, data[index + 1] + brillo); // Verde
        data[index + 2] = Math.min(255, data[index + 2] + brillo); // Azul
    }


    // Verifica si el click (x,y) esta dentro de la sub-imagen
    clickDentro(x, y) {
        return  x >= this.x && 
                x <= this.x + this.tamanioSubImagen &&
                y >= this.y && 
                y <= this.y + this.tamanioSubImagen;
    }
}


// Exportar la clase SubImagen para usarla en otros archivos(para su instanciacion)
export default SubImagen;