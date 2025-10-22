"use strict";

// Importar la clase Blocka
import Blocka from "./Blocka.js";


// Clase GameManager: gestiona el estado y la lógica del juego
class GameManagerBlocka {
    constructor() {
        // ELEMENTOS DEL DOM USADOS EN EL JUEGO (HTML)
        this.canvas = document.getElementById('myCanvas');
        this.btnComenzar = document.getElementById('btn-comenzar');
        this.btnReiniciar = document.getElementById('btn-reiniciar');
        this.pantallaMenuInicio = document.getElementById('pantalla-inicio');
        this.controlesJuego = document.getElementById('control-juego');
        this.pantallaVictoria = document.getElementById('pantalla-victoria');
        this.pantallaJuegoCompletado = document.getElementById('pantalla-juego-completado');
        this.pantallaDerrota = document.getElementById('pantalla-derrota');
        this.tiempoMarcador = document.getElementById('tiempo');
        this.nivelMarcador = document.getElementById('nivel-actual');
        this.tiempoFinal = document.getElementById('tiempo-final');
        this.tiempoEsperadoNivel = document.getElementById('tiempo-esperado-nivel');
        this.btnSiguienteNivel = document.getElementById('btn-siguiente-nivel');
        this.btnDarPista = document.getElementById('btn-dar-pista');
        this.btnVolverMenu = document.querySelectorAll('.btn-menu-principal');// Tengo el boton volver al menu de victoria y derrota

        
        // CONFIGURACION INICIAL DEL JUEGO
        this.nivelActual = 0; // Nivel arranca en 0
        this.indiceImagenNivelActual = 0; // Imagen del nivel actual
        this.blocka = null; // Aun no tengo un blocka instanciado
        this.tiempoInicio = null; // Tiempo cuando comienza el juego(null aun)
        this.tiempoTranscurrido = 0; // Tiempo transcurrido en el nivel
        this.intervaloTiempo = null; // Function de interval null
        this.juegoActivo = false; // El juego no esta activo aun
        this.particionesBlocka = 4; // Cantidad de particiones del blocka, por defecto 4
        this.posiblesParticiones = [4, 6, 8]; // Posibles particiones del blocka
        this.pistaDada = false; // Si se dio pista o no


        // NIVELES DEL JUEGO CON SUS FILTROS
        this.niveles = [
            { nivel : 1, filtro: 'normal'},
            { nivel : 2, filtro: 'grayscale' },
            { nivel : 3, filtro: 'brillo', dificultad: 'dificil', tiempoLimite: '02:00'},
            { nivel : 4, filtro: 'negative', dificultad: 'dificil', tiempoLimite: '01:00'}
        ]


        // POSIBLES IMAGENES DEL ROMPECABEZAS ORIGINALES CON TODAS LAS POSIBLES IMAGENES
        this.imagenesOriginal = [
            './js/blockaGame/imgBlocka/image.png',
            './js/blockaGame/imgBlocka/mapa.png',
            './js/blockaGame/imgBlocka/pacman.png',
            './js/blockaGame/imgBlocka/sonic.png',
            './js/blockaGame/imgBlocka/mapasonic.png',
            './js/blockaGame/imgBlocka/donkeykong.png',
            './js/blockaGame/imgBlocka/tele.png'
        ]

        // IMAGENES DEL ROMPECABEZAS USADAS EN CADA NIVEL, DONDE EXTRAIGO POR CADA NIVEL COMPLETADO
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
        this.btnVolverMenu.forEach(boton => {
            boton.addEventListener('click', () => this.volverAlMenu());
        });

        // Evento para dar pista
        this.btnDarPista.addEventListener('click', () => this.posicionarSubImgRandomCorrectamente());

        // Evento para manejar clicks en el canvas (rotar piezas)
        this.canvas.addEventListener('mousedown', (e) => this.manejarClickEnCanvas(e));// e es el evento de mouse(van las propiedades del click)

        // Prevenir el menu contextual al hacer click derecho en toda la pantalla del juego donde se ejecuta
        // (deshabilitar menu contextual)
        const pantallaJuego = document.getElementById('contenedor-juego');
        pantallaJuego.addEventListener('contextmenu', (e) => e.preventDefault());

        // Evento para seleccionar la cantidad de particiones del blocka
        const botonesParticiones = document.querySelectorAll('.btn-particion');
        botonesParticiones.forEach(boton => {
            boton.addEventListener('click', () => {
                const valor = parseInt(boton.value);// lo parseo a int porque viene como string
                if(this.posiblesParticiones.includes(valor)) {// solo acepta valores 4,6,8
                    this.particionesBlocka = valor;
                }
            });
        });
    }


    // FUNCION PARA COMENZAR EL JUEGO
    comenzarJuego() {
        this.iniciarNivel();
        this.mostrarPantalla('juego');
    }

    
    // FUNCION PARA INICIAR UN NIVEL
    iniciarNivel() {
        const nivel = this.niveles[this.nivelActual];

        // Actualizar marcador de nivel
        this.nivelMarcador.textContent = nivel.nivel;

        // Seleccionar imagen para el nivel actual
        let imagenNivel = this.seleccionarImagenAleatoria();

        // Crear una imagen y cargarla
        let imagen = new Image();
        imagen.src = imagenNivel;

        // Cuando la imagen se carga, crear el Blocka y dibujar el nivel
        imagen.onload = () => {
            // Instanciar el Blocka
            this.blocka = new Blocka(this.canvas, imagen, this.particionesBlocka, 120);

            // Aplicar filtro al Blocka segun el nivel
            this.aplicarFiltroBlocka(nivel.filtro);

            // Dibujar el Blocka en el canvas
            this.blocka.dibujar();

            // Iniciar el temporizador del nivel
            if(nivel.dificultad === 'dificil') {
                this.inicializarTemporizador(true);
            }
            else{
                this.inicializarTemporizador();
            }
            
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


    // FUNCION PARA POSICION UNA SUB-IMG RANDOM EN SU POSICION CORRECTA
    posicionarSubImgRandomCorrectamente() {
        if(!this.blocka || this.pistaDada) return;

        // Funcion del blocka para dejar una pieza en su posicion correcta y no se puede rotar mas
        this.blocka.dejarPiezaEnPosicionCorrecta();

        // Poner pista dada en true
        this.pistaDada = true;

        // Quitar 5 segundos del tiempo total como penalizacion por usar la pista
        this.tiempoInicio -= 5000;

        if(this.blocka.blockaCompletado()) {
            // Detengo el juego como completado con la funcion
            this.nivelCompletado();
        }
    }


    // FUNCION PARA APLICAR FILTRO A LAS SUBIMAGENES DEL BLOCKA SEGUN EL NIVEL
    aplicarFiltroBlocka(filtro) {
        if(!this.blocka) return;

        this.blocka.subImagenes.forEach(subImg => {
            subImg.filtro = filtro;
        });
    }


    // FUNCION PARA QUITAR LOS FILTROS LUEGO DE COMPLETAR EL NIVEL
    quitarFiltroBlocka() {
        if(!this.blocka) return;

        this.blocka.subImagenes.forEach(subImg => {
            subImg.filtro = null;
        });
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

        // Quitar filtros
        this.quitarFiltroBlocka();

        // Dibujo el blocka sin espacio entre sub-imagenes
        this.blocka.setEspacioEntreSubImagenes(0);
        this.blocka.dibujar();


        setTimeout(() => {

            // Setear tiempo final en la pantalla de victoria
            this.tiempoFinal.textContent = this.setearTemporizador(this.tiempoTranscurrido);

            // Mostrar pantalla de victoria
            this.mostrarPantalla('victoria');

        }, 2500);

    }


    // FUNCION PARA CUANDO PERDES EL JUEGO
    juegoPerdido() {
        // Primero detener el temporizador
        this.detenerTemporizador();

        // Marcar el juego como inactivo
        this.juegoActivo = false;

        // Quitar filtros
        this.quitarFiltroBlocka();

        // Setear tiempo final en la pantalla de derrota
        this.tiempoEsperadoNivel.textContent = this.setearTemporizador(this.tiempoTranscurrido);

        // Mostrar pantalla de derrota
        this.mostrarPantalla('derrota');
    }


    // FUNCION PARA CUANDO SE COMPLETA TODO EL JUEGO(TODOS LOS NIVELES)
    juegoCompletado() {
        // Agarrar el elemento de tiempo de redireccion
        const tiempoRedireccion = document.getElementById('tiempo-redireccion');

        // Mostrar pantalla de juego completado
        this.mostrarPantalla('juego-completado');

        // Contador regresivo para redireccionar al menu principal
        let tiempoRestante = 5; // Segundos para redireccionar
        tiempoRedireccion.textContent = tiempoRestante;

        // Iniciar contador regresivo hasta que tiempoRestante llegue a 0 y redirija al menu
        const intervaloRedireccion = setInterval(() => {
            tiempoRestante--;
            tiempoRedireccion.textContent = tiempoRestante;

            if(tiempoRestante <= 0) {
                clearInterval(intervaloRedireccion);
                this.volverAlMenu();
            }
        }, 1000);
    }


    // FUNCION PARA PASAR AL SIGUIENTE NIVEL
    siguienteNivel() {
        this.nivelActual++;

        // Si mi nivel actual es menor a la cantidad de niveles y hay imagenes disponibles
        // Si el nivel actual es menor o igual(<= porque hago nivelActual++ antes del if) a la cantidad de niveles 
        // y hay imágenes disponibles
        if(this.nivelActual <= this.niveles.length && this.imagenesNivel.length > 0) {
            // Iniciar el siguiente nivel si hay mas imagenes disponibles sin completar
            this.iniciarNivel();
            this.pistaDada = false; // Resetear pista dada para el nuevo nivel
            this.mostrarPantalla('juego');
        }
        else {
            // Si no hay mas niveles, el juego ha terminado
            this.juegoCompletado();
        }
    }


    // FUNCION PARA REINICIAR EL NIVEL ACTUAL EN EL JUEGO
    reiniciarNivel() {
        // Detener el temporizador actual
        this.detenerTemporizador();

        // Resetear pista dada
        this.pistaDada = false;

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

        // Restauro las particiones del blocka a 4(por defecto)
        this.particionesBlocka = 4;

        // Restauro pista dada
        this.pistaDada = false;
    }


    // FUNCION PARA MOSTRAR CADA TIPO DE PANTALLA DEL JUEGO (MENU - CONTROLES - VICTORIA)
    mostrarPantalla(pantalla) {

        // Ocultar todas las pantallas primero
        this.pantallaMenuInicio.style.display = 'none';
        this.controlesJuego.style.display = 'none';
        this.pantallaVictoria.style.display = 'none';
        this.canvas.style.display = 'none';
        this.pantallaDerrota.style.display = 'none';
        this.pantallaJuegoCompletado.style.display = 'none';

        // Mostrar la pantalla solicitada
        switch(pantalla) {
            case 'inicio':
                this.pantallaMenuInicio.style.display = 'flex';
                break;
            case 'juego':
                this.controlesJuego.style.display = 'flex';
                this.canvas.style.display = 'flex';
                break;
            case 'victoria':
                this.pantallaVictoria.style.display = 'flex';
                break;
            case 'derrota':
                this.pantallaDerrota.style.display = 'flex';
                break;
            case 'juego-completado':
                this.pantallaJuegoCompletado.style.display = 'flex';
                break;
        }

    }


    // FUNCION PARA SELECCIONAR UNA IMAGEN ALEATORIA PARA EL NIVEL ACTUAL
    seleccionarImagenAleatoria() {
        this.indiceImagenNivelActual = Math.round(Math.random() * (this.imagenesNivel.length - 1));
        return this.imagenesNivel[this.indiceImagenNivelActual];
    }


    // FUNCION PARA INICIALIZAR EL TEMPORIZADOR DEL NIVEL
    inicializarTemporizador(cronometradoConTope = false) {

        // Devuelve el tiempo actual en milisegundos desde la fecha 1 de Enero de 1970
        this.tiempoInicio = Date.now(); // Tiempo actual en milisegundos
        this.tiempoTranscurrido = 0;

        // Actualizar el temporizador cada segundo(1000 ms)
        this.intervaloTiempo = setInterval(() => {
            this.tiempoTranscurrido = Math.floor((Date.now() - this.tiempoInicio) / 1000); // Tiempo transcurrido en segundos

            if(cronometradoConTope) {
                this.tiempoMarcador.textContent = this.setearTemporizador(this.tiempoTranscurrido, cronometradoConTope);
            }
            else{
                this.tiempoMarcador.textContent = this.setearTemporizador(this.tiempoTranscurrido);
            }
            
        }, 1000);

    }


    // FUNCION PARA FORMATEAR EL TIEMPO EN MINUTOS:SEGUNDOS
    setearTemporizador(tiempoEnSegundos, cronometradoConTope = false) {
        const minutos = Math.floor(tiempoEnSegundos / 60); // Calculo minutos, redondeando hacia abajo con floor
        const segundos = tiempoEnSegundos % 60; // Calculo segundos restantes con modulo, el resto de la division por 60


        // Formatear con ceros a la izquierda si es menor a 10 y lo mismo con segundos
        // padStart(2, '0') asegura que tenga al menos 2 digitos, si no los tiene agrega '0' al inicio(start los agrega al inicio al '0')
        let cadena = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        if(cronometradoConTope) {
            if(this.niveles[this.nivelActual].tiempoLimite === cadena){
                this.juegoPerdido();
            }
            cadena += ` / ${this.niveles[this.nivelActual].tiempoLimite}`;
        }
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


export default GameManagerBlocka;