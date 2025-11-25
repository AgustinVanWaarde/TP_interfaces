import CONFIG from './Configuracion.js';

class JuegoFlappy {
    /**
     * Inicializa el juego con todas las variables de estado, puntaje, vidas y dificultad
     */
    constructor(pajaro, interfazJuego) {
        this.pajaro = pajaro;
        this.interfazJuego = interfazJuego;
        
        this.estadoJuego = 'inicio';
        this.puntuacion = 0;
        this.vidas = 3;
        this.bucleJuego = null;
        this.ultimoTuboPasadoX = 0;
        this.ultimoTuboPasado = null;
        this.invulnerable = false;
        this.saltarProximaPuntuacion = false;

        this.tubos = [];
        this.velocidadTubos = CONFIG.VELOCIDAD_TUBOS;
        this.tamanoEspacio = CONFIG.TAMANO_ESPACIO;
        this.proximaDistanciaTubo = 0;
        this.contadorTubos = 0;

        this.corazones = [];

        this.nivelActual = 1;
        this.tubosPasadosTotal = 0;
    }

    /**
     * Devuelve el estado actual del juego (inicio, jugando o finJuego)
     */
    obtenerEstadoJuego() {
        return this.estadoJuego;
    }

    /**
     * Crea un nuevo tubo con altura aleatoria
     */
    crearTubo() {
        const contenedorJuego = document.getElementById('contenedor-juego');
        const alturaContenedor = contenedorJuego.clientHeight;
        const anchoContenedor = contenedorJuego.clientWidth;
        
        const minEspacioY = CONFIG.LIMITE_SUPERIOR_TUBO;
        const maxEspacioY = alturaContenedor - this.tamanoEspacio - CONFIG.LIMITE_INFERIOR_TUBO;
        const espacioY = Math.random() * (maxEspacioY - minEspacioY) + minEspacioY;
        
        const contenedorTubo = document.createElement('div');
        contenedorTubo.className = 'tube-container';
        contenedorTubo.style.left = `${anchoContenedor}px`;
        
        const tuboSuperior = document.createElement('div');
        tuboSuperior.className = 'tube-top';
        tuboSuperior.style.height = `${espacioY}px`;
        
        const tuboInferior = document.createElement('div');
        tuboInferior.className = 'tube-bottom';
        tuboInferior.style.top = `${espacioY + this.tamanoEspacio}px`;
        tuboInferior.style.height = `${alturaContenedor - espacioY - this.tamanoEspacio}px`;
        
        contenedorTubo.appendChild(tuboSuperior);
        contenedorTubo.appendChild(tuboInferior);
        contenedorJuego.appendChild(contenedorTubo);
        
        return {
            x: anchoContenedor,
            espacioY: espacioY,
            pasado: false,
            elemento: contenedorTubo
        };
    }

    /**
     * Mueve los tubos hacia la izquierda, elimina los que salen de pantalla y crea nuevos
     */
    actualizarTubos() {
        if (this.estadoJuego !== 'jugando') return;
        
        if (document.body.classList.contains('game-frozen')) return;
        
        this.tubos.forEach(tubo => {
            tubo.x -= this.velocidadTubos;
            tubo.elemento.style.left = tubo.x + 'px';
            
            const rectPajaro = this.pajaro.obtenerElemento().getBoundingClientRect();
            if (!tubo.pasado && tubo.x + 80 < rectPajaro.left) {
                tubo.pasado = true;
                this.ultimoTuboPasadoX = tubo.x + 80;
                this.ultimoTuboPasado = tubo;
                
                if (this.saltarProximaPuntuacion) {
                    this.saltarProximaPuntuacion = false;
                } else {
                    this.sumarPuntuacion();
                }
            }
        });
        
        this.tubos = this.tubos.filter(tubo => {
            if (tubo.x < -80) {
                tubo.elemento.remove();
                return false;
            }
            return true;
        });
        
        this.proximaDistanciaTubo -= this.velocidadTubos;
        if (this.proximaDistanciaTubo <= 0) {
            this.tubos.push(this.crearTubo());
            this.contadorTubos++;
            
            if (this.contadorTubos % 3 === 0) {
                const ultimoTubo = this.tubos[this.tubos.length - 1];
                this.corazones.push(this.crearCorazon(ultimoTubo.espacioY));
            }
            
            this.proximaDistanciaTubo = CONFIG.DISTANCIA_ENTRE_TUBOS;
        }
        
        this.actualizarCorazones();
    }

    /**
     * Crea un corazón (vida extra) posicionado en el centro del hueco de un tubo
     */
    crearCorazon(espacioTuboY) {
        const contenedorJuego = document.getElementById('contenedor-juego');
        const anchoContenedor = contenedorJuego.clientWidth;
        const corazonY = espacioTuboY + (this.tamanoEspacio / 2) - 20;
        
        const elementoCorazon = document.createElement('div');
        elementoCorazon.className = 'heart';
        elementoCorazon.style.left = `${anchoContenedor + 40}px`;
        elementoCorazon.style.top = `${corazonY}px`;
        
        contenedorJuego.appendChild(elementoCorazon);
        
        return {
            x: anchoContenedor + 40,
            y: corazonY,
            recolectado: false,
            elemento: elementoCorazon
        };
    }

    /**
     * Mueve los corazones, detecta colisión con el pájaro y otorga vidas extra
     */
    actualizarCorazones() {
        if (this.estadoJuego !== 'jugando') return;
        
        if (document.body.classList.contains('game-frozen')) return;
        
        this.corazones.forEach(corazon => {
            corazon.x -= this.velocidadTubos;
            corazon.elemento.style.left = corazon.x + 'px';
            
            const rectPajaro = this.pajaro.obtenerElemento().getBoundingClientRect();
            const rectCorazon = corazon.elemento.getBoundingClientRect();
            
            if (!corazon.recolectado &&
                rectPajaro.right > rectCorazon.left &&
                rectPajaro.left < rectCorazon.right &&
                rectPajaro.bottom > rectCorazon.top &&
                rectPajaro.top < rectCorazon.bottom) {
                
                corazon.recolectado = true;
                corazon.elemento.style.display = 'none';
                this.interfazJuego.sumarVida();
            }
        });
        
        this.corazones = this.corazones.filter(corazon => {
            if (corazon.x < -50) {
                corazon.elemento.remove();
                return false;
            }
            return true;
        });
    }

    /**
     * Elimina todos los tubos y corazones del DOM al reiniciar el juego
     */
    limpiarTubos() {
        this.tubos.forEach(tubo => tubo.elemento.remove());
        this.corazones.forEach(corazon => corazon.elemento.remove());
        this.tubos = [];
        this.corazones = [];
        this.contadorTubos = 0;
        this.proximaDistanciaTubo = CONFIG.DISTANCIA_INICIAL_TUBOS;
    }

    /**
     * Detecta si el pájaro choca con los tubos o los bordes, y quita una vida
     */
    verificarColisiones() {
        if (this.estadoJuego !== 'jugando') return;
        if (this.invulnerable) return;
        
        const contenedorJuego = document.getElementById('contenedor-juego');
        const rectContenedor = contenedorJuego.getBoundingClientRect();
        const rectPajaro = this.pajaro.obtenerElemento().getBoundingClientRect();
        
        // Colisión con el borde inferior del contenedor
        if (rectPajaro.bottom >= rectContenedor.bottom) {
            this.interfazJuego.perderVida();
            return;
        }
        
        // Colisión con el borde superior del contenedor
        if (rectPajaro.top <= rectContenedor.top) {
            this.interfazJuego.perderVida();
            return;
        }
        
        // Colisiones con tubos - convertir coordenadas relativas al contenedor
        this.tubos.forEach(tubo => {
            // Convertir posición del tubo a coordenadas absolutas
            const izquierdaTuboAbsoluta = rectContenedor.left + tubo.x;
            const derechaTuboAbsoluta = izquierdaTuboAbsoluta + 80;
            const arribaEspacioAbsoluta = rectContenedor.top + tubo.espacioY;
            const abajoEspacioAbsoluta = arribaEspacioAbsoluta + this.tamanoEspacio;
            
            // Verificar si el pájaro está en el rango horizontal del tubo
            if (rectPajaro.right > izquierdaTuboAbsoluta && rectPajaro.left < derechaTuboAbsoluta) {
                // Verificar si el pájaro choca con el tubo superior o inferior
                if (rectPajaro.top < arribaEspacioAbsoluta || rectPajaro.bottom > abajoEspacioAbsoluta) {
                    this.interfazJuego.perderVida();
                    return;
                }
            }
        });
    }

    /**
     * Suma 1 punto al pasar un tubo y aumenta la dificultad cada 5 tubos
     */
    sumarPuntuacion() {
        if (this.estadoJuego === 'jugando') {
            this.puntuacion++;
            this.interfazJuego.actualizarPuntuacion(this.puntuacion, this.nivelActual);
            
            // SISTEMA DE DIFICULTAD PROGRESIVA
            // Cada vez que pasas un tubo (sumas puntos), aumenta el contador
            this.tubosPasadosTotal++;
            
            // Calcula en qué nivel deberías estar según los tubos pasados
            // Ejemplo: si pasaste 10 tubos y TUBOS_POR_NIVEL es 5, deberías estar en nivel 3
            // Math.floor redondea hacia abajo: 10/5 = 2, entonces nivel = 2 + 1 = 3
            const nivelCalculado = Math.floor(this.tubosPasadosTotal / CONFIG.TUBOS_POR_NIVEL) + 1;
            
            // Si el nivel calculado es mayor al nivel actual, significa que subiste de nivel
            if (nivelCalculado > this.nivelActual) {
                this.nivelActual = nivelCalculado; // Actualiza el nivel actual
                this.aumentarDificultad(); // Llama a la función que aumenta la dificultad
            }
        }
    }

    /**
     * Incrementa la velocidad de tubos y reduce el espacio entre ellos al subir de nivel
     */
    aumentarDificultad() {
        // AUMENTAR VELOCIDAD DE LOS TUBOS
        // Suma el incremento configurado a la velocidad actual
        this.velocidadTubos += CONFIG.INCREMENTO_VELOCIDAD;
        
        // Verifica que no supere la velocidad máxima permitida
        // Math.min devuelve el número más pequeño entre velocidadTubos y VELOCIDAD_MAXIMA
        this.velocidadTubos = Math.min(this.velocidadTubos, CONFIG.VELOCIDAD_MAXIMA);
        
        // REDUCIR ESPACIO ENTRE TUBOS
        // Resta la reducción configurada al espacio actual
        this.tamanoEspacio -= CONFIG.REDUCCION_ESPACIO;
        
        // Verifica que no sea menor al espacio mínimo permitido
        // Math.max devuelve el número más grande entre tamanoEspacio y ESPACIO_MINIMO
        this.tamanoEspacio = Math.max(this.tamanoEspacio, CONFIG.ESPACIO_MINIMO);
        
        // FEEDBACK VISUAL AL JUGADOR
        // Muestra un mensaje temporal en la pantalla indicando el nuevo nivel
        this.mostrarMensajeNivel();
        
        // Imprime en la consola (para debugging/desarrollo) los valores actuales
        console.log(`¡Nivel ${this.nivelActual}! Velocidad: ${this.velocidadTubos.toFixed(1)}, Espacio: ${this.tamanoEspacio}`);
    }

    /**
     * Muestra un mensaje "¡NIVEL X!" durante 2 segundos al cambiar de nivel
     */
    mostrarMensajeNivel() {
        // Busca si ya existe un mensaje de nivel en la pantalla
        let mensajeNivel = document.getElementById('nivel-mensaje');
        
        // Si no existe, créalo
        if (!mensajeNivel) {
            mensajeNivel = document.createElement('div');
            mensajeNivel.id = 'nivel-mensaje';
            // Aplica estilos CSS directamente para el mensaje
            mensajeNivel.style.position = 'fixed';
            mensajeNivel.style.top = '50%';
            mensajeNivel.style.left = '50%';
            mensajeNivel.style.transform = 'translate(-50%, -50%)';
            mensajeNivel.style.fontSize = '48px';
            mensajeNivel.style.fontWeight = 'bold';
            mensajeNivel.style.color = '#FFD700'; // Color dorado
            mensajeNivel.style.textShadow = '3px 3px 6px rgba(0,0,0,0.8)';
            mensajeNivel.style.zIndex = '1000';
            mensajeNivel.style.pointerEvents = 'none'; // No interfiere con los clics
            mensajeNivel.style.transition = 'opacity 0.5s';
            document.body.appendChild(mensajeNivel);
        }
        
        // Actualiza el texto del mensaje con el nivel actual
        mensajeNivel.textContent = `¡NIVEL ${this.nivelActual}!`;
        mensajeNivel.style.opacity = '1'; // Hazlo visible
        
        // Después de 2 segundos, desvanece el mensaje
        setTimeout(() => {
            mensajeNivel.style.opacity = '0';
        }, 2000);
    }

    /**
     * Inicia una nueva partida reseteando todas las variables y arrancando el bucle del juego
     */
    iniciarJuego() {
        this.estadoJuego = 'jugando';
        this.puntuacion = 0;
        this.vidas = 3;
        this.ultimoTuboPasadoX = 0;
        this.ultimoTuboPasado = null;
        this.invulnerable = false;
        this.saltarProximaPuntuacion = false;
        
        // REINICIAR SISTEMA DE DIFICULTAD
        // Cuando empieza un nuevo juego, todo vuelve a los valores iniciales
        this.nivelActual = 1;
        this.tubosPasadosTotal = 0;
        this.velocidadTubos = CONFIG.VELOCIDAD_TUBOS;
        this.tamanoEspacio = CONFIG.TAMANO_ESPACIO;
        
        this.interfazJuego.actualizarPuntuacion(this.puntuacion, this.nivelActual);
        this.interfazJuego.actualizarVidas(this.vidas);
        
        this.limpiarTubos();
        
        this.interfazJuego.ocultarPantallaInicio();
        this.interfazJuego.ocultarPantallaFinJuego();
        document.body.classList.add('game-playing');
        
        this.pajaro.reiniciar();
        
        this.pajaro.habilitarClick();
        
        this.bucleJuego = setInterval(() => {
            this.actualizarTubos();
            this.verificarColisiones();
        }, 16);
    }

    /**
     * Detiene el juego, muestra la pantalla de Game Over con el puntaje final
     */
    terminarJuego() {
        this.estadoJuego = 'finJuego';
        clearInterval(this.bucleJuego);
        
        this.interfazJuego.mostrarPantallaFinJuego(this.puntuacion);
        document.body.classList.remove('game-playing');
        document.body.classList.add('game-over-state');
        
        this.pajaro.detener();
    }

    /**
     * Reinicia el juego desde cero sin volver al menú principal
     */
    reiniciarJuego() {
        document.body.classList.remove('game-over-state', 'game-frozen');
        this.iniciarJuego();
    }

    /**
     * Resetea el juego completamente y vuelve a la pantalla de inicio
     */
    volverAlMenu() {
        // Limpiar el estado del juego
        document.body.classList.remove('game-over-state', 'game-frozen');
        
        // Resetear todas las variables a sus valores iniciales
        this.estadoJuego = 'inicio';
        this.puntuacion = 0;
        this.vidas = 3;
        this.ultimoTuboPasadoX = 0;
        this.ultimoTuboPasado = null;
        this.invulnerable = false;
        this.saltarProximaPuntuacion = false;
        this.nivelActual = 1;
        this.tubosPasadosTotal = 0;
        this.velocidadTubos = CONFIG.VELOCIDAD_TUBOS;
        this.tamanoEspacio = CONFIG.TAMANO_ESPACIO;
        
        // Limpiar tubos y corazones
        this.limpiarTubos();
        
        // Resetear el pájaro
        this.pajaro.reiniciar();
        this.pajaro.deshabilitarClick();
        
        // Ocultar pantalla de game over y mostrar pantalla de inicio
        this.interfazJuego.ocultarPantallaFinJuego();
        this.interfazJuego.mostrarPantallaInicio();
        
        // Actualizar interfaz
        this.interfazJuego.actualizarPuntuacion(this.puntuacion, this.nivelActual);
        this.interfazJuego.actualizarVidas(this.vidas);
    }

    
}

export default JuegoFlappy;
