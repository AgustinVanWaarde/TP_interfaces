"use strict";

// Importar la clase Blocka
import Blocka from "./Blocka.js";


// Clase GameManager: gestiona el estado y la lógica del juego
class GameManager {
    constructor() {
        // ELEMENTOS DEL DOM USADOS EN EL JUEGO (HTML)
        this.canvas = document.getElementById('myCanvas');
        this.btnComenzar = document.getElementById('btn-comenzar');
        this.btnReiniciar = document.getElementById('btn-reiniciar');
        this.pantallaMenuInicio = document.getElementById('pantalla-inicio');
        this.controlesJuego = document.getElementById('control-juego');
        this.pantallaVictoria = document.getElementById('pantalla-victoria');
        this.tiempoMarcador = document.getElementById('tiempo');
        this.nivelMarcador = document.getElementById('nivel-actual');
        this.tiempoFinal = document.getElementById('tiempo-final');
        this.btnSiguienteNivel = document.getElementById('btn-siguiente-nivel');
        this.btnVolverMenu = document.getElementById('btn-volver-menu');

        
        // CONFIGURACION INICIAL DEL JUEGO
        this.nivelActual = 0; // Nivel arranca en 0
        this.indiceImagenNivelActual = 0; // Imagen del nivel actual
        this.blocka = null; // Aun no tengo un blocka instanciado
        this.tiempoInicio = null; // Tiempo cuando comienza el juego(null aun)
        this.tiempoTranscurrido = 0; // Tiempo transcurrido en el nivel
        this.intervaloTiempo = null; // Function de interval null
        this.juegoActivo = false; // El juego no esta activo aun


        // POSIBLES IMAGENES DEL ROMPECABEZAS ORIGINALES CON TODAS LAS POSIBLES IMAGENES
        this.imagenesOriginal = [
            './posiblesImagenes/image.png',
            './posiblesImagenes/mapa.png',
            './posiblesImagenes/pacman.png',
            './posiblesImagenes/sonic.png'
        ]

        // IMAGENES DEL ROMPECABEZAS USADAS EN CADA NIVEL, DONDE EXTRAIGO POR CADA NIVEL
        this.imagenesNivel = this.imagenesOriginal.slice(); // Copio todas las imagenes inicialmente


        // INICIAR EVENTOS DEL JUEGO
        this.iniciarEventos();
    }


    // FUNCION PARA INCIAR EVENTOS Y ASIGNAR COMPORTAMIENTO A BOTONES
    iniciarEventos() {

        // Evento click para comenzar el juego
        this.btnComenzar.addEventListener('click', () => this.comenzarJuego());

        // Evento para reiniciar el nivel
        this.btnReiniciar.addEventListener('click', () => this.reiniciarNivel());

        // Evento para pasar al siguiente nivel
        this.btnSiguienteNivel.addEventListener('click', () => this.siguienteNivel());

        // Evento para volver al menu de inicio
        this.btnVolverMenu.addEventListener('click', () => this.volverAlMenu());

        // Evento para manejar clicks en el canvas (rotar piezas)
        this.canvas.addEventListener('mousedown', (e) => this.manejarClickEnCanvas(e));// e es el evento de mouse(van las propiedades del click)

        // Prevenir el menu contextual al hacer click derecho en toda la pantalla del juego donde se ejecuta
        // (deshabilitar menu contextual)
        const pantallaJuego = document.getElementById('contenedor-juego');
        pantallaJuego.addEventListener('contextmenu', (e) => e.preventDefault());
    }


    // FUNCION PARA COMENZAR EL JUEGO
    comenzarJuego() {
        this.nivelActual = 1;
        this.iniciarNivel();
        this.mostrarPantalla('juego');
    }

    
    // FUNCION PARA INICIAR UN NIVEL
    iniciarNivel() {

        // Actualizar marcador de nivel
        this.nivelMarcador.textContent = this.nivelActual;

        // Seleccionar imagen para el nivel actual
        let imagenNivel = this.seleccionarImagenAleatoria();

        // Crear una imagen y cargarla
        let imagen = new Image();
        imagen.src = imagenNivel;

        // Cuando la imagen se carga, crear el Blocka y dibujar el nivel
        imagen.onload = () => {
            // Instanciar el Blocka
            this.blocka = new Blocka(this.canvas, imagen, 4, 110);

            // Aplicar filtro en un futuro

            // Dibujar el Blocka en el canvas
            this.blocka.dibujar();

            // Iniciar el temporizador del nivel
            this.inicializarTemporizador();
            
            // Marcar estado del juego como activo
            this.juegoActivo = true;
        }
    }


    /** 
     * FUNCION PARA MANEJAR LOS CLICKS EN EL CANVAS(X,Y)
     * @param {EventoMouse} e - Evento de click en el canvas
    */
    manejarClickEnCanvas(e) {
        if(!this.juegoActivo || !this.blocka) return; // Si el juego no esta activo o no hay blocka, no hago nada

        // Obetener la subimagen donde se hizo click
        const subImg = this.blocka.obtenerSubImagenPorClick(e.offsetX, e.offsetY);

        if(subImg) {

            // Roto la subimagen -90 grados al hacer click izquierdo
            if(e.button === 0) {
                this.blocka.rotarSubImagen(subImg.id, -90);
            }
            // Roto la subimagen +90 grados al hacer click derecho
            else if(e.button === 2) {
                this.blocka.rotarSubImagen(subImg.id, 90);
            }

            // Verifijar si el nivel esta completo
            if(this.blocka.blockaCompletado()) {
                // Detengo el juego como completado con la funcion
                this.nivelCompletado();
            }
        }

    }


    // FUNCION PARA MANEJAR EL NIVEL COMPLETADO
    nivelCompletado() {

        // Primero detener el temporizador
        this.detenerTemporizador();

        // Remover la imagen del array de imagenes disponibles para no repetirla
        // splice(indice, cantidad) elimina elementos del array, desde una posicion especifica y cierta cantidad
        this.imagenesNivel.splice(this.indiceImagenNivelActual, 1);

        // Marcar el juego como inactivo
        this.juegoActivo = false;

        // Quitar filtros a futuro

        // Setear tiempo final en la pantalla de victoria
        this.tiempoFinal.textContent = this.setearTemporizador(this.tiempoTranscurrido);

        // Mostrar pantalla de victoria
        this.mostrarPantalla('victoria');

    }


    // FUNCION PARA PASAR AL SIGUIENTE NIVEL
    siguienteNivel() {
        this.nivelActual++;

        // Si mi arreglo de nivelesCompletados es mayor a 0, quiere decir que hay niveles disponibles
        if(this.imagenesNivel.length > 0){
            // Iniciar el siguiente nivel si hay mas imagenes disponibles sin completar
            this.iniciarNivel();
            this.mostrarPantalla('juego');
        }
        else {
            // Si no hay mas niveles, el juego ha terminado
            alert("¡Felicidades! Has completado todos los niveles disponibles.");
            // this.volverAlMenu(); // Volver al menú principal
        }
    }


    // FUNCION PARA REINICIAR EL NIVEL ACTUAL EN EL JUEGO
    reiniciarNivel() {
        // Detener el temporizador actual
        this.detenerTemporizador();

        // Iniciar un nuevo nivel o el mismo, dependiendo el random
        this.iniciarNivel();

        // Mostrar la pantalla de juego
        this.mostrarPantalla('juego');
    }


    // FUNCION PARA VOLVER AL MENU DE INICIO
    volverAlMenu() {
        // Detener el temporizador actual
        this.detenerTemporizador();

        // Restauro configuracion inicial
        this.nivelActual = 0;
        this.juegoActivo = false;
        this.tiempoTranscurrido = 0;
        
        // Muestro la pantalla de inicio
        this.mostrarPantalla('inicio');

        // Limpio el canvas
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Restauro las imagenes originales para jugar de nuevo
        this.imagenesNivel = this.imagenesOriginal.slice(); // slice() sin parametros copia todo el array
    }


    // FUNCION PARA MOSTRAR CADA TIPO DE PANTALLA DEL JUEGO (MENU - CONTROLES - VICTORIA)
    mostrarPantalla(pantalla) {

        // Ocultar todas las pantallas primero
        this.pantallaMenuInicio.style.display = 'none';
        this.controlesJuego.style.display = 'none';
        this.pantallaVictoria.style.display = 'none';

        // Mostrar la pantalla solicitada
        switch(pantalla) {
            case 'inicio':
                this.pantallaMenuInicio.style.display = 'flex';
                break;
            case 'juego':
                this.controlesJuego.style.display = 'flex';
                break;
            case 'victoria':
                this.pantallaVictoria.style.display = 'flex';
                break;
        }

    }


    // FUNCION PARA SELECCIONAR UNA IMAGEN ALEATORIA PARA EL NIVEL ACTUAL
    seleccionarImagenAleatoria() {
        this.indiceImagenNivelActual = Math.round(Math.random() * (this.imagenesNivel.length - 1));
        return this.imagenesNivel[this.indiceImagenNivelActual];
    }


    // FUNCION PARA INICIALIZAR EL TEMPORIZADOR DEL NIVEL
    inicializarTemporizador() {

        // Devuelve el tiempo actual en milisegundos desde la fecha 1 de Enero de 1970
        this.tiempoInicio = Date.now(); // Tiempo actual en milisegundos
        this.tiempoTranscurrido = 0;

        // Actualizar el temporizador cada segundo(1000 ms)
        this.intervaloTiempo = setInterval(() => {
            this.tiempoTranscurrido = Math.floor((Date.now() - this.tiempoInicio) / 1000); // Tiempo transcurrido en segundos
            this.tiempoMarcador.textContent = this.setearTemporizador(this.tiempoTranscurrido);
        }, 1000);

    }


    // FUNCION PARA FORMATEAR EL TIEMPO EN MINUTOS:SEGUNDOS
    setearTemporizador(tiempoEnSegundos) {
        const minutos = Math.floor(tiempoEnSegundos / 60); // Calculo minutos, redondeando hacia abajo con floor
        const segundos = tiempoEnSegundos % 60; // Calculo segundos restantes con modulo, el resto de la division por 60


        // Formatear con ceros a la izquierda si es menor a 10 y lo mismo con segundos
        // padStart(2, '0') asegura que tenga al menos 2 digitos, si no los tiene agrega '0' al inicio(start los agrega al inicio al '0')
        const cadena = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        return cadena;
    }


    // FUNCION PARA CORTAR EL TEMPORIZADOR
    detenerTemporizador() {
        if(this.intervaloTiempo) {
            clearInterval(this.intervaloTiempo);
            this.intervaloTiempo = null;
        }
    }
}


new GameManager();
