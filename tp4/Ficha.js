"use strict"

class Ficha {
    constructor(fila, columna, x, y, radio, color, imagenFicha) {
        this.fila = fila // Fila en el tablero
        this.columna = columna // Columna en el tablero
        this.x = x // Posición X en el canvas
        this.y = y // Posición Y en el canvas
        this.radio = radio // Radio de la ficha
        this.color = color // Color de la ficha
        
        // Atributo para saber si la ficha está seleccionada
        this.seleccionada = false;

        // Atributo que va a contener la imagen de la ficha
        this.imagenFicha = imagenFicha;
    }


    dibujar(ctx) {
        // Guardar estado actual del canvas
        ctx.save();


        // Dibujar la ficha(circulo principal) con relleno
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Dibujar borde de la ficha
        ctx.strokeStyle = "pink";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dibujar imagen de fantasma encima de la ficha

        ctx.closePath();

        // Restaurar estado del canvas
        ctx.restore();
    }


    dibujarConImagen(ctx) {
        // Guardar estado actual del canvas
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.clip();

        // Dibujar imagen de fantasma encima de la ficha (75% del tamaño de la ficha)
        if (this.imagenFicha) {
            // tamaño de la imagen (3/4 aprox de la ficha)
            const tamañoImagen = this.radio * 1.5;
            
            // Posición para centrar: centro - (tamaño / 2)
            ctx.drawImage(this.imagenFicha,
                this.x - (tamañoImagen / 2),  // Centrar horizontalmente
                this.y - (tamañoImagen / 2),  // Centrar verticalmente
                tamañoImagen,                  // Ancho
                tamañoImagen                   // Alto
            );
        }

        ctx.restore();

        ctx.beginPath();
        if(this.seleccionada) {
            ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 4;
            ctx.stroke();
        }else{
            ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        ctx.closePath();    
    }


    // Metodo para verificar si un punto (puntoX, puntoY) está dentro de la ficha
    contienePunto(puntoX, puntoY) {
        // Calcular cuánto se movió el punto respecto al centro de la ficha
        const dx = puntoX - this.x; // Distancia horizontal
        const dy = puntoY - this.y; // Distancia vertical


        // Teorema de Pitágoras: dx² + dy² nos da la distancia² del punto al centro
        // (multiplicamos por sí mismo para calcular el cuadrado)
        const distanciaCuadrada = dx * dx + dy * dy;


        // Si la distancia² es menor o igual al radio², el punto está dentro del círculo
        // radio*radio me evito calcular la raíz cuadrada
        return distanciaCuadrada <= this.radio * this.radio;
    }


    // Metodo para setear las coordenadas de la ficha al mover o ejecutar alguna acción
    setearCoordenadas(x, y) {
        this.x = x;
        this.y = y;
    }


    // Metodo que me retorna la posicion de la ficha en la matriz del tablero
    getPosicionEnMatriz() {
        return { fila: this.fila, columna: this.columna };
    }
}

export default Ficha;