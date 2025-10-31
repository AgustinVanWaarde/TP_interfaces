"use strict"

import Tablero from "./Tablero.js";

class GameManagerPeg {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");


        // Configuración del tablero
        this.TAMANIOCELDA = 70;
        this.RADIOFICHAS = this.TAMANIOCELDA * 0.35;
        this.dibujoXTablero = 30;
        this.dibujoYTablero = 30;


        // Instancia del tablero
        this.tablero = new Tablero(this.TAMANIOCELDA, this.RADIOFICHAS, this.dibujoXTablero, this.dibujoYTablero);


        // Estados del juego
        this.fichaSeleccionada = null; // Ficha cuando se selecciona
        this.arrastrando = false; // Estado de arrastre
        this.posiblesMovimientos = []; // Array de posibles movimientos
        this.mouseX = 0; // Posición X del mouse
        this.mouseY = 0; // Posición Y del mouse
        this.juegoTerminado = false; // Estado del juego


        // Inicializar eventos del mouse
        // this.inicializarEventosMouse();

        // Dibujar el estado inicial del juego
        this.dibujar();
    }


    // Metodo para inicializar los eventos del mouse
    inicializarEventosMouse() {

    }


    // Metodo para dibujar el juego 
    dibujar() {
        // Limpiar el canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar el fondo del tablero
        this.ctx.fillStyle = "#2C3E50"; // Color de fondo del tablero
        const dimensionesTablero = this.tablero.obtenerDimensionesTablero();
        this.ctx.fillRect(this.dibujoXTablero, this.dibujoYTablero, dimensionesTablero.ancho, dimensionesTablero.alto);
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar tablero y fichas
        this.tablero.dibujar(this.ctx);

        // Dibujar posibles movimientos si hay una ficha seleccionada y posibles movimientos
        // this.dibujarPosiblesMovimientos();
    }
}

let manage = new GameManagerPeg("gameCanvas");
