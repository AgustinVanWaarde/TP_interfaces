const CONFIG = {
    // Tubos
    VELOCIDAD_TUBOS: 3, // Velocidad inicial de los tubos (se incrementará con la dificultad)
    TAMANO_ESPACIO: 220, // Espacio entre tuberías superior e inferior
    ANCHO_TUBO: 80,
    DISTANCIA_ENTRE_TUBOS: 450,
    DISTANCIA_INICIAL_TUBOS: 200,
    LIMITE_SUPERIOR_TUBO: 60, // Mínimo espacio desde arriba para más variación
    LIMITE_INFERIOR_TUBO: 60, // Mínimo espacio desde abajo para más variación
    
    // Sistema de Dificultad Progresiva
    // Cada vez que pases esta cantidad de tubos, aumentará la dificultad
    TUBOS_POR_NIVEL: 5, // Cada 5 tubos pasados = sube de nivel
    // Cuánto aumenta la velocidad en cada nivel (se suma a la velocidad actual)
    INCREMENTO_VELOCIDAD: 0.5, // +0.5 píxeles por frame en cada nivel
    // Velocidad máxima que puede alcanzar el juego
    VELOCIDAD_MAXIMA: 8, // No superará los 8 píxeles por frame
    // Cuánto disminuye el espacio entre tubos en cada nivel (opcional)
    REDUCCION_ESPACIO: 10, // -10 píxeles de espacio en cada nivel
    // Espacio mínimo que puede tener el hueco entre tubos
    ESPACIO_MINIMO: 150, // No bajará de 150 píxeles
    
    // Pájaro
    ALTURA_VUELO: 80,
    COOLDOWN_CLICK: 400,
    DURACION_VUELO: 400,
    INTERVALO_CAIDA: 50,
    POSICION_X_PAJARO: 150,
    POSICION_REAPARICION_X: 70,
    
    // Corazones
    FRECUENCIA_CORAZONES: 3,
    TAMANO_CORAZON: 40,
    OFFSET_CORAZON: 40,
    
    // Vidas
    VIDAS_INICIALES: 3,
    VIDAS_MAXIMAS: 5,
    TAMANO_VIDA_UI: 25,
    
    // Juego
    FPS: 16,
    
    // Sistema de Inmunidad después de chocar
    // Tiempo en milisegundos que el pájaro es invulnerable después de perder una vida
    TIEMPO_INVULNERABILIDAD: 2000, // 2 segundos de inmunidad
    // Tiempo que dura el parpadeo visual del pájaro
    TIEMPO_PARPADEO: 2000, // El parpadeo dura lo mismo que la invulnerabilidad
    // Tiempo que el juego permanece congelado antes de continuar
    TIEMPO_CONGELADO: 200, // 0.1 segundos - casi instantáneo
    
    // Estados
    ESTADOS: {
        INICIO: 'inicio',
        JUGANDO: 'jugando',
        FIN_JUEGO: 'finJuego'
    },
    
    // Imágenes
    IMAGENES: {
        PAJARO_NORMAL: './js/flappyGame/img/pajaro normal.png',
        PAJARO_SUBIENDO: './js/flappyGame/img/pajaro subiendo.png',
        PAJARO_BAJANDO: './js/flappyGame/img/pajaro bajando.png',
        TUBO: './js/flappyGame/img/tubo.png',
        VIDA: './js/flappyGame/img/vida.png'
    },
    
    // Clases CSS
    CLASES: {
        VOLANDO: 'flying',
        CAYENDO: 'falling',
        PARPADEANDO: 'blinking',
        JUEGO_CONGELADO: 'game-frozen',
        JUGANDO: 'game-playing',
        GAME_OVER: 'game-over-state'
    }
};

export default CONFIG;
