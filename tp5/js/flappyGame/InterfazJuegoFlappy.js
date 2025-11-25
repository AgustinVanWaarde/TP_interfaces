import CONFIG from './Configuracion.js';

class InterfazJuegoFlappy {
    constructor(juego, pajaro) {
        this.juego = juego;
        this.pajaro = pajaro;
        
        this.elementoPuntuacion = document.getElementById('score');
        this.contenedorVidas = document.getElementById('lives');
        this.pantallaFinJuego = document.getElementById('gameOver');
        this.pantallaInicio = document.getElementById('startScreen');
        this.elementoPuntuacionFinal = document.getElementById('finalScore');
        this.botonIniciar = document.getElementById('startBtn');
        this.botonReiniciar = document.getElementById('restartBtn');
        this.elementoNivel = document.getElementById('nivel');
    }

    /**
     * Actualiza la puntuación en la interfaz
     */
    actualizarPuntuacion(puntuacion, nivelActual) {
        this.elementoPuntuacion.textContent = puntuacion;
        
        // ===== ACTUALIZAR EL NIVEL EN LA INTERFAZ =====
        // Cada vez que cambia la puntuación, también actualizamos el nivel mostrado
        if (this.elementoNivel) {
            this.elementoNivel.textContent = `Nivel ${nivelActual}`;
        }
    }

    /**
     * Actualiza las vidas en la interfaz
     */
    actualizarVidas(vidas) {
        this.contenedorVidas.innerHTML = '';
        for (let i = 0; i < vidas; i++) {
            const elementoVida = document.createElement('div');
            elementoVida.className = 'vida-icono';
            this.contenedorVidas.appendChild(elementoVida);
        }
    }

    /**
     * Suma una vida
     */
    sumarVida() {
        if (this.juego.obtenerEstadoJuego() === 'jugando' && this.juego.vidas < 6) {
            this.juego.vidas++;
            this.actualizarVidas(this.juego.vidas);
        }
    }

    /**
     * Quita una vida
     */
    perderVida() {
        if (this.juego.obtenerEstadoJuego() === 'jugando' && !this.juego.invulnerable) {
            this.juego.invulnerable = true;
            this.juego.vidas--;
            this.actualizarVidas(this.juego.vidas);
            
            if (this.juego.vidas <= 0) {
                this.juego.terminarJuego();
            } else {
                // Congela el juego temporalmente
                document.body.classList.add('game-frozen');
                
                // ===== LÓGICA DE RESPAWN MEJORADA =====
                // Busca el próximo tubo que está adelante del pájaro
                const rectPajaro = this.pajaro.obtenerElemento().getBoundingClientRect();
                const proximoTubo = this.juego.tubos.find(tubo => tubo.x + 80 > rectPajaro.left);
                
                if (proximoTubo) {
                    // ===== REPOSICIONAR EL PRÓXIMO TUBO =====
                    // Coloca el próximo tubo en una posición adelante del pájaro
                    const objetivoX = 400;
                    const desplazamiento = objetivoX - proximoTubo.x;
                    
                    // Mueve todos los tubos
                    this.juego.tubos.forEach(tubo => {
                        tubo.x += desplazamiento;
                        tubo.elemento.style.left = tubo.x + 'px';
                    });
                    
                    // Mueve todos los corazones
                    this.juego.corazones.forEach(corazon => {
                        corazon.x += desplazamiento;
                        corazon.elemento.style.left = corazon.x + 'px';
                    });
                    
                    this.juego.proximaDistanciaTubo = CONFIG.DISTANCIA_ENTRE_TUBOS;
                    
                    // ===== CENTRAR EL PÁJARO EN EL HUECO DEL PRÓXIMO TUBO =====
                    const contenedorJuego = document.getElementById('contenedor-juego');
                    const alturaContenedor = contenedorJuego.clientHeight;
                    const centroHuecoAbsoluto = proximoTubo.espacioY + (this.juego.tamanoEspacio / 2);
                    const centroPantalla = alturaContenedor / 2;
                    this.pajaro.establecerAlturaActual(centroHuecoAbsoluto - centroPantalla);
                    
                } else if (this.juego.ultimoTuboPasado) {
                    // Si no hay tubo adelante, usa el último tubo pasado
                    this.juego.proximaDistanciaTubo = this.pajaro.reiniciarAlUltimoTubo(
                        this.juego.ultimoTuboPasado, 
                        this.juego.tubos, 
                        this.juego.corazones, 
                        this.juego.tamanoEspacio
                    );
                } else {
                    // Si no hay ningún tubo, resetea a posición inicial
                    this.pajaro.establecerAlturaActual(0);
                }
                
                // ===== APLICAR LA NUEVA POSICIÓN AL PÁJARO =====
                this.pajaro.establecerEstaCayendo(false);
                this.pajaro.deshabilitarClick();
                clearInterval(this.pajaro.obtenerIntervaloCaida());
                
                const elementoPajaro = this.pajaro.obtenerElemento();
                // Detener completamente todas las animaciones y clases
                elementoPajaro.classList.remove('flying', 'falling');
                elementoPajaro.classList.add('blinking');
                
                // Fijar la posición del pájaro (sin animación)
                const alturaActual = this.pajaro.obtenerAlturaActual();
                elementoPajaro.style.animation = 'none';
                elementoPajaro.style.transform = `translateY(${alturaActual}px)`;
                elementoPajaro.style.setProperty('--current-height', `${alturaActual}px`);
                elementoPajaro.style.setProperty('--target-height', `${alturaActual}px`);
                elementoPajaro.style.backgroundImage = 'url("./js/flappyGame/img/pajaro normal.png")';
                
                // ===== EFECTO VISUAL DE PARPADEO =====
                setTimeout(() => {
                    elementoPajaro.classList.remove('blinking');
                }, CONFIG.TIEMPO_PARPADEO);
                
                // No suma puntos en el siguiente tubo que pase
                this.juego.saltarProximaPuntuacion = true;
                
                // ===== DESCONGELAR EL JUEGO =====
                setTimeout(() => {
                    document.body.classList.remove('game-frozen');
                    this.pajaro.habilitarClick();
                    
                    // Reactivar animaciones CSS
                    elementoPajaro.style.animation = '';
                    elementoPajaro.style.backgroundImage = 'url("./js/flappyGame/img/pajaro bajando.png")';
                    elementoPajaro.classList.add('falling');
                    this.pajaro.establecerEstaCayendo(true);
                    const intervalo = setInterval(() => this.pajaro.actualizarPosicionActual(), 50);
                    this.pajaro.establecerIntervaloCaida(intervalo);
                }, CONFIG.TIEMPO_CONGELADO);
                
                // ===== QUITAR INVULNERABILIDAD =====
                setTimeout(() => {
                    this.juego.invulnerable = false;
                    console.log('Invulnerabilidad terminada - ¡Cuidado!');
                }, CONFIG.TIEMPO_INVULNERABILIDAD);
            }
        }
    }

    ocultarPantallaInicio() {
        this.pantallaInicio.style.display = 'none';
    }

    mostrarPantallaInicio() {
        this.pantallaInicio.style.display = 'block';
    }

    ocultarPantallaFinJuego() {
        this.pantallaFinJuego.style.display = 'none';
    }

    mostrarPantallaFinJuego(puntuacion) {
        this.elementoPuntuacionFinal.textContent = puntuacion;
        this.pantallaFinJuego.style.display = 'block';
    }

    configurarBotones(onIniciar, onReiniciar) {
        this.botonIniciar.addEventListener('click', onIniciar);
        this.botonReiniciar.addEventListener('click', onReiniciar);
    }
}

export default InterfazJuegoFlappy;
