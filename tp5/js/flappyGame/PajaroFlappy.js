import CONFIG from './Configuracion.js';

class PajaroFlappy {
    /**
     * Inicializa el pájaro con su elemento HTML y variables de control de movimiento
     */
    constructor(elementoId) {
        this.pajaro = document.getElementById(elementoId);
        this.alturaActual = 0;
        this.estaCayendo = false;
        this.intervaloCaida = null;
        this.puedeHacerClick = true;
    }

    /**
     * Lee la posición Y actual del pájaro desde su transformación CSS durante la caída
     */
    actualizarPosicionActual() {
        if (this.estaCayendo) {
            const estiloComputado = getComputedStyle(this.pajaro);
            const matriz = estiloComputado.transform;
            
            if (matriz !== 'none') {
                const valores = matriz.split('(')[1].split(')')[0].split(',');
                this.alturaActual = parseFloat(valores[5]) || this.alturaActual;
            }
        }
    }

    /**
     * Devuelve el pájaro a su posición inicial (centro de la pantalla)
     */
    reiniciar() {
        this.alturaActual = 0;
        this.estaCayendo = false;
        this.puedeHacerClick = false;
        clearInterval(this.intervaloCaida);
        
        this.pajaro.classList.remove('flying', 'falling');
        this.pajaro.style.transform = 'translateY(0px)';
        this.pajaro.style.setProperty('--current-height', '0px');
        this.pajaro.style.setProperty('--target-height', '0px');
        this.pajaro.style.backgroundImage = 'url("./js/flappyGame/img/pajaro normal.png")';
    }

    /**
     * Reposiciona el pájaro al centro del último tubo pasado después de perder una vida
     */
    reiniciarAlUltimoTubo(ultimoTuboPasado, tubos, corazones, tamanoEspacio, proximaDistanciaTubo) {
        if (ultimoTuboPasado) {
            // REPOSICIONAR TUBOS
            // Mueve todos los tubos para que el último tubo pasado quede a la izquierda del pájaro
            const objetivoX = 70; // Posición X donde queremos que quede el tubo
            const desplazamiento = objetivoX - ultimoTuboPasado.x;
            
            // Desplaza todos los tubos
            tubos.forEach(tubo => {
                tubo.x += desplazamiento;
                tubo.elemento.style.left = tubo.x + 'px';
            });
            
            // Desplaza todos los corazones
            corazones.forEach(corazon => {
                corazon.x += desplazamiento;
                corazon.elemento.style.left = corazon.x + 'px';
            });
            
            // CALCULAR POSICIÓN CENTRADA DEL PÁJARO
            // El pájaro está centrado verticalmente en el contenedor (top: 50%)
            // Necesitamos calcular cuánto debe moverse desde ese centro
            
            const contenedorJuego = document.getElementById('contenedor-juego');
            const alturaContenedor = contenedorJuego.clientHeight;
            
            // 1. Posición del centro del hueco en píxeles desde arriba del contenedor
            const centroHuecoAbsoluto = ultimoTuboPasado.espacioY + (tamanoEspacio / 2);
            
            // 2. Posición del centro del contenedor (donde está el pájaro sin transform)
            const centroPantalla = alturaContenedor / 2;
            
            // 3. Calculamos el desplazamiento necesario
            // Si el hueco está más abajo que el centro, alturaActual será positivo (baja)
            // Si el hueco está más arriba que el centro, alturaActual será negativo (sube)
            this.alturaActual = centroHuecoAbsoluto - centroPantalla;
        } else {
            // Si no hay último tubo pasado, resetea a la posición inicial
            this.alturaActual = 0;
        }
        
        this.estaCayendo = false;
        this.puedeHacerClick = false;
        clearInterval(this.intervaloCaida);
        

        this.pajaro.classList.remove('flying', 'falling');
        this.pajaro.classList.add('blinking');
        this.pajaro.style.transform = `translateY(${this.alturaActual}px)`;
        this.pajaro.style.setProperty('--current-height', `${this.alturaActual}px`);
        this.pajaro.style.setProperty('--target-height', `${this.alturaActual}px`);
        this.pajaro.style.backgroundImage = 'url("./js/flappyGame/img/pajaro normal.png")';
        
        setTimeout(() => {
            this.pajaro.classList.remove('blinking');
        }, 1000);

        return CONFIG.DISTANCIA_ENTRE_TUBOS; // Retorna la nueva proximaDistanciaTubo
    }

    /**
     * Congela el movimiento del pájaro y todo el juego al terminar la partida
     */
    detener() {
        this.estaCayendo = false;
        this.puedeHacerClick = false;
        clearInterval(this.intervaloCaida);
        
        this.actualizarPosicionActual();
        
        document.body.classList.add('game-frozen');
        
        this.pajaro.style.transform = `translateY(${this.alturaActual}px)`;
        this.pajaro.classList.remove('flying', 'falling');
    }

    /**
     * Establece el evento de click para hacer volar al pájaro (sube y luego cae)
     */
    configurarClick(obtenerEstadoJuego) {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            
            if (obtenerEstadoJuego() === 'jugando') {
                if (!this.puedeHacerClick) return;
                // Permitir click durante parpadeo para mejor jugabilidad
                
                this.puedeHacerClick = false;
                setTimeout(() => {
                    this.puedeHacerClick = true;
                }, 400);
                
                if (this.estaCayendo) {
                    this.pajaro.classList.remove('falling');
                    this.estaCayendo = false;
                    clearInterval(this.intervaloCaida);
                    this.actualizarPosicionActual();
                }
                
                this.pajaro.style.setProperty('--current-height', `${this.alturaActual}px`);
                this.alturaActual -= 80;
                this.pajaro.style.setProperty('--target-height', `${this.alturaActual}px`);
                
                this.pajaro.classList.add('flying');
                this.pajaro.style.backgroundImage = 'url("./js/flappyGame/img/pajaro subiendo.png")';
                
                setTimeout(() => {
                    this.pajaro.classList.remove('flying');
                    this.pajaro.style.backgroundImage = 'url("./js/flappyGame/img/pajaro bajando.png")';
                    this.pajaro.classList.add('falling');
                    this.estaCayendo = true;
                    
                    this.intervaloCaida = setInterval(() => this.actualizarPosicionActual(), 50);
                }, 400);
            }
        });
    }

    /**
     * Permite que el jugador pueda hacer click para volar
     */
    habilitarClick() {
        this.puedeHacerClick = true;
    }

    /**
     * Bloquea los clicks del jugador temporalmente
     */
    deshabilitarClick() {
        this.puedeHacerClick = false;
    }

    // Métodos getter y setter para acceder a las propiedades del pájaro
    obtenerElemento() {
        return this.pajaro;
    }

    obtenerAlturaActual() {
        return this.alturaActual;
    }

    establecerAlturaActual(altura) {
        this.alturaActual = altura;
    }

    estaEnCaida() {
        return this.estaCayendo;
    }

    establecerEstaCayendo(valor) {
        this.estaCayendo = valor;
    }

    obtenerIntervaloCaida() {
        return this.intervaloCaida;
    }

    establecerIntervaloCaida(intervalo) {
        this.intervaloCaida = intervalo;
    }
}

export default PajaroFlappy;
