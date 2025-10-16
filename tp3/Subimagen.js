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

        // Rotacion actual arranca en 0
        this.rotacion = 0;

        // Imagen original
        this.imagen = imagen;
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

        ctx.restore(); // Restaurar el estado original del canvas ya que lo rote y traslade TODO el canvas
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