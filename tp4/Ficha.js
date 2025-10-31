"use strict"

class Ficha {
    constructor(fila, columna, x, y, radio, color) {
        this.fila = fila // Fila en el tablero
        this.columna = columna // Columna en el tablero
        this.x = x // Posición X en el canvas
        this.y = y // Posición Y en el canvas
        this.radio = radio // Radio de la ficha
        this.color = color // Color de la ficha
        
        // Atributo para saber si la ficha está seleccionada
        this.seleccionada = false;
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
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();

        // // Dibujar imagen de fantasma encima de la ficha
        // const image = new Image();
        // image.src = 'fantasmaRojoFicha.png'; // Asegúrate de tener esta imagen en la ruta correcta
        // image.onload = () => {
        //     // Dibujar la imagen centrada en la ficha
        //     ctx.drawImage(image, this.x - this.radio, this.y - this.radio, this.radio * 1.5 , this.radio *1.5);
        // }

        ctx.closePath();

        


        // Restaurar estado del canvas
        ctx.restore();
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