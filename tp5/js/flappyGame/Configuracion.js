/**
 * Archivo de configuración con todas las constantes del juego Flappy Bird
 * Centraliza valores para facilitar ajustes de dificultad y balance
 */
const CONFIG = {
    // ===== PARÁMETROS DE TUBOS =====
    VELOCIDAD_TUBOS: 3, // Velocidad inicial en píxeles por frame
    TAMANO_ESPACIO: 220, // Altura del hueco entre tubos
    ANCHO_TUBO: 80, // Ancho de cada tubo en píxeles
    DISTANCIA_ENTRE_TUBOS: 450, // Separación horizontal entre tubos
    DISTANCIA_INICIAL_TUBOS: 200, // Distancia del primer tubo
    LIMITE_SUPERIOR_TUBO: 60, // Margen mínimo desde el tope
    LIMITE_INFERIOR_TUBO: 60, // Margen mínimo desde el suelo
    
    // ===== SISTEMA DE DIFICULTAD PROGRESIVA =====
    TUBOS_POR_NIVEL: 5, // Tubos necesarios para subir de nivel
    INCREMENTO_VELOCIDAD: 0.5, // Aumento de velocidad por nivel
    VELOCIDAD_MAXIMA: 8, // Velocidad tope del juego
    REDUCCION_ESPACIO: 10, // Reducción del hueco por nivel
    ESPACIO_MINIMO: 150, // Hueco mínimo entre tubos
    
    // ===== PARÁMETROS DEL PÁJARO =====
    ALTURA_VUELO: 80, // Cuánto sube con cada click
    COOLDOWN_CLICK: 400, // Tiempo en ms entre clicks permitidos
    DURACION_VUELO: 400, // Duración de la animación de subida
    INTERVALO_CAIDA: 50, // Frecuencia de actualización de caída
    POSICION_X_PAJARO: 150, // Posición horizontal del pájaro
    POSICION_REAPARICION_X: 70, // Posición X al respawnear
    
    // ===== CORAZONES (VIDAS EXTRA) =====
    FRECUENCIA_CORAZONES: 3, // Aparece 1 corazón cada X tubos
    TAMANO_CORAZON: 40, // Tamaño en píxeles del corazón
    OFFSET_CORAZON: 40, // Desplazamiento desde el tubo
    
    // ===== SISTEMA DE VIDAS =====
    VIDAS_INICIALES: 3, // Vidas al comenzar
    VIDAS_MAXIMAS: 5, // Máximo de vidas acumulables
    TAMANO_VIDA_UI: 25, // Tamaño de iconos de vida
    
    // ===== CONFIGURACIÓN GENERAL =====
    FPS: 16, // Intervalo del bucle principal en ms
    
    // ===== SISTEMA DE RESPAWN E INMUNIDAD =====
    TIEMPO_INVULNERABILIDAD: 2000, // Invulnerabilidad tras chocar (2s)
    TIEMPO_PARPADEO: 2000, // Duración del efecto visual (2s)
    TIEMPO_CONGELADO: 200, // Pausa antes de reanudar (0.2s)
    
    // ===== ESTADOS DEL JUEGO =====
    ESTADOS: {
        INICIO: 'inicio', // Menú inicial
        JUGANDO: 'jugando', // Partida activa
        FIN_JUEGO: 'finJuego' // Game Over
    },
    
    // ===== RUTAS DE RECURSOS =====
    IMAGENES: {
        PAJARO_NORMAL: './js/flappyGame/img/pajaro normal.png', // Estado neutro
        PAJARO_SUBIENDO: './js/flappyGame/img/pajaro subiendo.png', // Volando
        PAJARO_BAJANDO: './js/flappyGame/img/pajaro bajando.png', // Cayendo
        TUBO: './js/flappyGame/img/tubo.png', // Sprite de tubos
        VIDA: './js/flappyGame/img/vida.png' // Icono de vida
    },
    
    // ===== CLASES CSS PARA ANIMACIONES =====
    CLASES: {
        VOLANDO: 'flying', // Animación de vuelo
        CAYENDO: 'falling', // Animación de caída
        PARPADEANDO: 'blinking', // Parpadeo tras chocar
        JUEGO_CONGELADO: 'game-frozen', // Juego pausado
        JUGANDO: 'game-playing', // Juego activo
        GAME_OVER: 'game-over-state' // Estado final
    }
};

export default CONFIG;
