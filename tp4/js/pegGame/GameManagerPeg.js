"use strict"

import Tablero from "./Tablero.js";

class GameManagerPeg {
    constructor() {
        // Selección de elementos del DOM
        this.canvas = document.getElementById("myCanvasPeg");
        this.ctx = this.canvas.getContext("2d");
        this.pantallaInicio = document.getElementById("pantalla-inicio");
        this.pantallaDerrota = document.getElementById("pantalla-derrota");
        this.botoneraJuego = document.getElementById("botonera-juego");
        this.pantallaVictoria = document.getElementById("pantalla-juego-completado");
        this.btnJugar = document.getElementById("btn-comenzar");
        this.btnReiniciar = document.getElementById("btn-reiniciar");
        this.btnsMenuPrincipal = document.querySelectorAll(".event-menu");

        // Mensajes del DOM
        this.msjDerrotaSinMovimientos = document.getElementById("derrota-por-movimientos");
        this.msjDerrotaPorTiempo = document.getElementById("derrota-por-tiempoLimite");
        this.tiempoFinalVictoria = document.getElementById("tiempo-final");
        this.tiempoEsperadoDerrota = document.getElementById("tiempo-esperado-juego");
        this.tiempoRedireccion = document.getElementById("tiempo-redireccion");
        this.fichasRestantesNivelSpan = document.getElementById("fichas-restantes");
        this.fichasRestantesDerrota = document.getElementById("fichas-restantes-derrota");
        this.tiempoActual = document.getElementById("tiempo");


        // Configuración del tablero
        this.TAMANIOCELDA = 50;
        this.RADIOFICHAS = this.TAMANIOCELDA * 0.35;
        this.dibujoXTablero = 10;
        this.dibujoYTablero = 10;


        // Instancia del tablero
        this.tablero = new Tablero(this.TAMANIOCELDA, this.RADIOFICHAS, this.dibujoXTablero, this.dibujoYTablero);


        // Estados del juego
        this.fichaSeleccionada = null; // Ficha cuando se selecciona
        this.arrastrando = false; // Estado de arrastre
        this.posiblesMovimientos = []; // Array de posibles movimientos
        this.mouseX = 0; // Posición X del mouse
        this.mouseY = 0; // Posición Y del mouse
        this.juegoTerminado = false; // Estado del juego
        this.fichasRestantes = 32; // Cantidad de piezas restantes al iniciar el juego


        // Varibles para controlar tiempo y temporizadores
        this.intervalo = null;
        this.tiempoInicio = 0;
        this.tiempoTranscurrido = 0;
        this.TIEMPOLIMITE = "00:50"; // Tiempo limite juego


        // Asignar eventos a los botones luego de cargar las imagenes de las fichas
        // Porque si no, puede que se intente iniciar el juego antes de que las imagenes esten listas
        const intervaloDibujo = setInterval(() => {
            if(this.tablero.imagenesCargadas) {
                clearInterval(intervaloDibujo);
                this.inicializarEventosMouse();
            }
        }, 50);
    }


    // Metodo para inicializar los eventos del mouse
    inicializarEventosMouse() {
        // Evento para manejar el click del mouse(MouseDown),inicio del clik o arrastre
        this.canvas.addEventListener("mousedown" , (e) => this.manejarClickMouse(e));

        // Evento para manejar el movimiento del mouse(MouseMove),mientras se arrastra
        this.canvas.addEventListener("mousemove", (e) => this.manejarMouseMove(e));

        // Evento para manejar el fin del arrastre (MouseUp),soltar el click
        this.canvas.addEventListener("mouseup", (e) => this.manejarMouseUp(e));

        // Evento para iniciar el juego desde el menu de inicio
        this.btnJugar.addEventListener("click", () => this.iniciarJuego());

        // Evento para reiniciar el juego desde el boton de reiniciar
        this.btnReiniciar.addEventListener("click", () => this.reiniciarJuego());

        // Eventos para volver al menu principal desde las pantallas de victoria o derrota
        this.btnsMenuPrincipal.forEach( (btn) => {
            btn.addEventListener("click", () => this.volverAlMenuInicio());
        });

        // Prevenir el menu contextual al hacer click derecho en toda la pantalla del juego donde se ejecuta
        // (deshabilitar menu contextual)
        const pantallaJuego = document.getElementById('contenedor-juego');
        pantallaJuego.addEventListener('contextmenu', (e) => e.preventDefault());
    }


    // Metodo para iniciar el juego (dibujar el tablero y las fichas)
    dibujar() {
        // Limpiar el canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar el fondo del tablero
        this.ctx.fillStyle = "#2C3E50"; // Color de fondo del tablero
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar tablero y fichas
        this.tablero.dibujar(this.ctx);

        // Dibujar posibles movimientos si hay una ficha seleccionada y posibles movimientos
        this.dibujarPosiblesMovimientos();
    }


    // Metodo para dibujar los posibles movimientos
    dibujarPosiblesMovimientos() {
        if (!this.arrastrando || this.posiblesMovimientos.length === 0) return;

        // Dibujar cada posicion valida con un circulo brillante
        this.posiblesMovimientos.forEach((pos) => {
            // console.log('Posición posible movimiento:', pos);

            const coords = this.tablero.posicionMatrizACoordenadas(pos.fila, pos.columna);

            // Circulo de fondo (hint)
            this.ctx.beginPath();
            this.ctx.arc(coords.x, coords.y, this.RADIOFICHAS, 0, Math.PI * 2);
            this.ctx.fillStyle = "rgba(46, 204, 113, 0.4)";
            this.ctx.fill();

            // Borde brillante
            this.ctx.strokeStyle = "#2ECC71";
            this.ctx.lineWidth = 3;
            this.ctx.stroke();

            // Circulo interior
            this.ctx.beginPath();
            this.ctx.arc(coords.x, coords.y, this.RADIOFICHAS * 0.8, 0, Math.PI * 2);
            this.ctx.fillStyle = "rgba(46, 204, 113, 0.6)";
            this.ctx.fill();
        });
    }


    // Metodo para manejar el click del mouse(MouseDown)
    manejarClickMouse(event) {        
        if(this.juegoTerminado) return;

        // Obtener las coordenadas del mouse en el canvas(ajustado al canvas)
        // clientX/Y arrancan desde la esquina de la ventana del navegador y no del canvas(izquierda,superior)
        // offsetX/Y arrancan desde la esquina del canvas
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;


        // Buscar si hay una ficha en esas coordenadas
        const ficha = this.tablero.obtenerFichaEnPosicion(mouseX, mouseY);


        if(ficha) {            
            // Seleccionar la ficha
            this.fichaSeleccionada = ficha;
            this.arrastrando = true;
            ficha.seleccionada = true;


            // Calcular offset para que la ficha no "salte" al centro del mouse
            // Offset = posicion del mouse - posicion de la ficha
            this.offsetMouseX = mouseX - ficha.x;
            this.offsetMouseY = mouseY - ficha.y;


            // Obtener los posibles movimientos para esa ficha
            const pos = ficha.getPosicionEnMatriz();
            this.posiblesMovimientos = this.tablero.obtenerPosiblesMovimientos(pos.fila, pos.columna);


            // Redibujar el juego con la ficha seleccionada
            this.dibujar();
        }
    }


    // Metodo para manejar el movimiento del mouse(MouseMove)
    manejarMouseMove(evento) {
        if (!this.arrastrando || !this.fichaSeleccionada) return;

        // Obtener coordenadas del mouse
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = evento.clientX - rect.left;
        const mouseY = evento.clientY - rect.top;

        // Actualizar posicion de la ficha manteniendo el offset
        // Formula: nueva posicion = posicion del mouse - offset inicial
        this.fichaSeleccionada.setearCoordenadas(
            mouseX - this.offsetMouseX,
            mouseY - this.offsetMouseY
        );

        // Redibujar para mostrar la ficha en su nueva posicion
        this.dibujar();
    }


    // Metodo para controlar el fin del arrastre (MouseUp)
    manejarMouseUp(evento) {
        if (!this.arrastrando || !this.fichaSeleccionada) return;

        // Obtener coordenadas donde se solto la ficha
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = evento.clientX - rect.left;
        const mouseY = evento.clientY - rect.top;

        // Convertir coordenadas del canvas a posicion en la matriz
        const destino = this.tablero.coordenadasAPosicionMatriz(mouseX, mouseY);
        const origen = this.fichaSeleccionada.getPosicionEnMatriz();

        let movimientoExitoso = false;

        // Verificar si el destino es valido y ejecutar movimiento
        if (
        destino &&
        this.tablero.esMovimientoValido(
            origen.fila,
            origen.columna,
            destino.fila,
            destino.columna
        )
        ) {
        // Ejecutar el movimiento en el modelo
        movimientoExitoso = this.tablero.ejecutarMovimiento(
            origen.fila,
            origen.columna,
            destino.fila,
            destino.columna
        );

        if (movimientoExitoso) {
            console.log(
            "Movimiento exitoso: (" +
                origen.fila +
                "," +
                origen.columna +
                ") -> (" +
                destino.fila +
                "," +
                destino.columna +
                ")"
            );

            // Disminuir la cantidad de piezas restantes y setear el span de fichas restantes
            this.fichasRestantes--;
            this.fichasRestantesNivelSpan.textContent = this.fichasRestantes;

            // Verificar si el juego termino
            this.verificarEstadoDelJuego();
        }
        }

        // Si el movimiento no fue valido, devolver la ficha a su posicion original
        if (!movimientoExitoso) {
            const posOriginal = this.tablero.posicionMatrizACoordenadas(
                origen.fila,
                origen.columna
            );
            this.fichaSeleccionada.setearCoordenadas(posOriginal.x, posOriginal.y);
        }

        // Limpiar estado de arrastre
        this.fichaSeleccionada.seleccionada = false;
        this.fichaSeleccionada = null;
        this.arrastrando = false;
        this.posicionesValidas = [];

        this.dibujar();
    }


    // Metodo para verificar el estado del juego (victoria o derrota)
    verificarEstadoDelJuego() {
        if (!this.tablero.quedanMovimientosPosibles()) {
            this.fichasRestantes = this.tablero.contarFichas();

            if(this.fichasRestantes === 1) {
                this.juegoPerdido("tiempo");
            }
            else{
                // Perdio por falta de movimientos
                this.juegoPerdido("movimientos");
            }
        }
    }


    // Metodo para iniciar el juego
    iniciarJuego() {
        // Dibujar el tablero y las fichas
        this.dibujar();

        // Mostrar la pantalla de juego
        this.mostrarPantalla("juego");

        // Poner siempre en 0 el tiempo y fichas en 32 al iniciar el juego
        this.tiempoActual.textContent = this.setearTemporizadores(0);
        this.fichasRestantes = this.tablero.contarFichas();
        this.fichasRestantesNivelSpan.textContent = this.fichasRestantes;

        // Iniciar el cronometro
        this.iniciarCronometro();
    }


    // Metodo para volver al menu de inicio
    volverAlMenuInicio() {
        // Mostrar la pantalla de inicio
        this.cortarCronometro();

        // Reiniciar variables del juego y tablero
        this.reiniciarJuego();

        this.mostrarPantalla("inicio");
    }


    // Metodo para reiniciar el juego
    reiniciarJuego() {
        // Cortar el cronometro
        this.cortarCronometro();

        // Reiniciar el tablero
        this.tablero.reiniciarTablero();

        // Reiniciar el estado del juego
        this.juegoTerminado = false;
        this.fichaSeleccionada = null;
        this.arrastrando = false;
        this.posiblesMovimientos = [];

        // Reiniciar el tablero
        this.iniciarJuego();
    }


    // Metodo para mostrar la pantalla de victoria
    juegoGanado() {
        this.juegoTerminado = true;
        this.cortarCronometro();

        // Setear el tiempo final en la pantalla de victoria
        this.tiempoFinalVictoria.textContent = this.setearTemporizadores(this.tiempoTranscurrido);

        // Mostrar la pantalla de victoria
        this.mostrarPantalla("victoria");

        // Contador regresivo para redireccionar al menu principal
        let tiempoRestante = 10; // Segundos para redireccionar
        this.tiempoRedireccion.textContent = tiempoRestante;

        // Iniciar contador regresivo hasta que tiempoRestante llegue a 0 y redirija al menu
        const intervaloRedireccion = setInterval(() => {
            tiempoRestante--;
            this.tiempoRedireccion.textContent = tiempoRestante;

            if(tiempoRestante <= 0) {
                clearInterval(intervaloRedireccion);
                this.volverAlMenuInicio();
            }
        }, 1000);
    }


    // Metodo para mostrar la pantalla de derrota
    juegoPerdido(razon) {
        this.msjDerrotaPorTiempo.style.display = "none";
        this.msjDerrotaSinMovimientos.style.display = "none";

        this.juegoTerminado = true;
        this.cortarCronometro();

        switch(razon) {
            case "tiempo":
                this.tiempoEsperadoDerrota.textContent = this.TIEMPOLIMITE;
                this.msjDerrotaPorTiempo.style.display = "flex";
            break;

            case "movimientos":
                this.fichasRestantesDerrota.textContent = this.fichasRestantes;
                this.msjDerrotaSinMovimientos.style.display = "flex";
            break;
        }

        // Mostrar la pantalla de derrota
        this.mostrarPantalla("derrota");
    }



    // Metodo para mostrar distintas pantallas en el flujo del juego 
    mostrarPantalla(pantalla) {
        this.pantallaInicio.style.display = "none";
        this.pantallaDerrota.style.display = "none";
        this.pantallaVictoria.style.display = "none";
        this.canvas.style.display = "none";
        this.botoneraJuego.style.display = "none";

        switch (pantalla) {
            case "inicio" : 
                this.pantallaInicio.style.display = "flex";
            break;
            case "juego" :
                this.canvas.style.display = "block";
                this.botoneraJuego.style.display = "flex";
            break;
            case "derrota" :
                this.pantallaDerrota.style.display = "flex";
            break;
            case "victoria" :
                this.pantallaVictoria.style.display = "flex";
            break;
        }
    }


    // Metodo para iniciar el cronometro del juego
    iniciarCronometro() {
        this.tiempoInicio = Date.now();
        this.tiempoTranscurrido = 0;

        this.intervalo = setInterval( () => {
            this.tiempoTranscurrido = Math.floor((Date.now() - this.tiempoInicio) / 1000);

            this.tiempoActual.textContent = this.setearTemporizadores(this.tiempoTranscurrido);
            
            // Verificar si se alcanzo el tiempo limite
            if(this.TIEMPOLIMITE === this.setearTemporizadores(this.tiempoTranscurrido).split(' / ')[0]){
                this.juegoPerdido("tiempo");
            }
        }, 1000);
    }


    // Metodo para setear los temporizadores
    setearTemporizadores(tiempoEnSegundos) {
        const minutos = Math.floor(tiempoEnSegundos / 60); // Calculo minutos, redondeando hacia abajo con floor
        const segundos = tiempoEnSegundos % 60; // Calculo segundos restantes con modulo, el resto de la division por 60


        // Formatear con ceros a la izquierda si es menor a 10 y lo mismo con segundos
        // padStart(2, '0') asegura que tenga al menos 2 digitos, si no los tiene agrega '0' al inicio(start los agrega al inicio al '0')
        let cadena = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        cadena += ` / ${this.TIEMPOLIMITE}`;

        return cadena;
    }


    // Metodo para cortar el cronometro
    cortarCronometro() {
        if(this.intervalo) {
            clearInterval(this.intervalo);
            this.intervalo = null;
        }
    }
    
}

export default GameManagerPeg;
