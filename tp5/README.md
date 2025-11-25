# 🎮 TP5 - Flappy Bird Game

## 📋 Descripción General

Este proyecto es la quinta y última entrega del trabajo práctico para la materia "Interfaces de Usuario e Interacción". 

La aplicación es un sitio web de juegos retro que mantiene el diseño y la estructura de las entregas anteriores, incorporando ahora **Flappy Bird**, un clásico juego arcade de reflejos y coordinación con sistema de dificultad progresiva y mecánicas de vidas.

## 🎯 El Juego: Flappy Bird

**Flappy Bird** es un juego arcade infinito donde controlas un pájaro que debe volar entre tubos sin chocar, mientras la dificultad aumenta progresivamente.

### ¿Cómo se juega?

1. **Objetivo:** Pasa entre los tubos sin chocar para sumar puntos y superar tu récord.
2. **Controles:**
   * **Click en pantalla:** Hace volar al pájaro (impulso hacia arriba).
   * **Gravedad:** Al soltar, el pájaro cae automáticamente.
3. **Puntuación:** Sumas 1 punto cada vez que pasas completamente entre un par de tubos.
4. **Vidas:** Comienzas con 3 vidas. Pierdes una vida al chocar con tubos o bordes.
5. **Game Over:** El juego termina cuando se agotan todas las vidas.

### Características adicionales:

* **Sistema de dificultad progresiva:** Cada 5 tubos pasados aumenta la velocidad y reduce el espacio entre tubos.
* **Sistema de vidas:** 3 vidas iniciales con posibilidad de obtener hasta 6 vidas.
* **Corazones coleccionables:** Aparecen cada 3 tubos para recuperar vidas.
* **Respawn inteligente:** Al perder una vida, reapareces en un lugar seguro con invulnerabilidad temporal.
* **Feedback visual:** Parpadeo durante invulnerabilidad de 2 segundos.
* **Indicador de nivel:** Muestra el nivel actual en pantalla.
* **Efecto parallax:** Fondo con múltiples capas que crean sensación de profundidad.

## 🔧 Implementación Técnica

El juego está implementado utilizando HTML5, CSS3 y JavaScript (ES6), siguiendo un enfoque orientado a objetos modular con las siguientes clases principales:

1. **JuegoFlappy:** Controla la lógica general del juego, gestiona tubos, colisiones, puntuación y sistema de dificultad progresiva.

2. **PajaroFlappy:** Representa el personaje jugable, maneja la física del movimiento (vuelo y caída) y el sistema de respawn.

3. **InterfazJuegoFlappy:** Gestiona todas las pantallas (inicio, game over), el HUD (puntaje, vidas, nivel) y el feedback visual.

4. **Configuracion:** Centraliza todas las constantes del juego para facilitar el balance y ajustes.

### Sistema de Dificultad Progresiva:

* **Cada 5 tubos pasados:** El nivel aumenta automáticamente.
* **Incremento por nivel:**
  - Velocidad de tubos: +0.5 px/frame
  - Espacio entre tubos: -10 px
* **Límites:**
  - Velocidad máxima: 8 px/frame
  - Espacio mínimo: 150 px

### Sistema de Respawn:

1. Al perder una vida, el juego se congela por 0.2 segundos.
2. El pájaro se reposiciona en el centro del próximo tubo seguro.
3. Activa parpadeo visual por 2 segundos.
4. Otorga invulnerabilidad por 2 segundos.
5. El próximo punto no se cuenta (para evitar puntos gratis).

### Tecnologías utilizadas:

* **JavaScript ES6 Modules:** Para arquitectura modular y escalable.
* **CSS3 Animations:** Para animaciones de vuelo, caída y parpadeo.
* **CSS Parallax:** Para efecto de profundidad en el fondo.
* **Manipulación del DOM:** Para actualizar la interfaz del juego.
* **Programación orientada a eventos:** Para manejar las interacciones del usuario.
* **setInterval:** Para el bucle principal del juego a ~60 FPS.

## 🚀 Cómo ejecutar el proyecto

1. Clona o descarga este repositorio.
2. Abre `index.html` en tu navegador web.
3. Navega hasta la sección de juegos y selecciona "Flappy Bird".
4. ¡Diviértete jugando!

## 📁 Estructura del proyecto

```
tp5/
├── index.html                      # Página principal del sitio
├── html/
│   └── paginaJuego.html           # Página del juego
├── js/
│   ├── flappyGame/
│   │   ├── JuegoFlappy.js         # Lógica principal del juego
│   │   ├── PajaroFlappy.js        # Control del personaje
│   │   ├── InterfazJuegoFlappy.js # Manejo de UI y pantallas
│   │   ├── Configuracion.js       # Constantes del juego
│   │   └── img/                   # Sprites del pájaro y recursos
│   ├── blockaGame/                # Juego Blocka (TP3)
│   ├── pegGame/                   # Juego Peg Solitaire (TP4)
│   ├── gameRender.js              # Renderizado de la estructura HTML
│   └── flujos.js                  # Control de flujo de la aplicación
├── css/
│   ├── InterfazJuegoFlappy.css    # Estilos del juego Flappy
│   ├── JuegoVisualFlappy.css      # Estilos visuales del pájaro
│   ├── General.css                # Estilos generales
│   └── Header.css                 # Estilos del header
└── imgs/                          # Recursos gráficos
```

## 📝 Requisitos cumplidos

✅ Juego funcional con lógica completa de Flappy Bird.  
✅ Sistema de dificultad progresiva automático.  
✅ Sistema de vidas con respawn inteligente.  
✅ Corazones coleccionables para recuperar vidas.  
✅ Invulnerabilidad temporal con feedback visual.  
✅ Instrucciones de juego claras.  
✅ Sistema de victoria y derrota.  
✅ Integración con la estructura de entregas anteriores.  
✅ Arquitectura modular y escalable.  
✅ Efecto parallax en el fondo.  
✅ Indicador de nivel en tiempo real.  

## 🎮 Juegos disponibles en esta entrega

* **Blocka** - Puzzle de rotación de imágenes (TP3)
* **Peg Solitaire** - Juego de estrategia (TP4)
* **Flappy Bird** - Juego arcade de reflejos (TP5 - NUEVO)

## 🏆 Características Destacadas

### ✨ Sistema de Dificultad Progresiva
- Aumenta velocidad automáticamente cada 5 tubos
- Reduce espacio entre tubos gradualmente
- Feedback visual al cambiar de nivel

### 💖 Sistema de Vidas Avanzado
- 3 vidas iniciales
- Corazones cada 3 tubos
- Máximo 6 vidas acumulables

### 🔄 Sistema de Respawn Inteligente
- Reposiciona al próximo tubo seguro
- Invulnerabilidad temporal de 2 segundos
- Feedback visual con parpadeo

### 🎨 Arquitectura Modular
- Separación clara de responsabilidades (MVC)
- Fácil mantenimiento y extensión
- Configuración centralizada

## 👨‍🎓 Autor

Agustin Van Waarde 
Paz Molfese  
Santiago macht   
Desarrollado para la materia "Interfaces de Usuario e Interacción" - TUDAI

---

© 2025 RetroGames - Todos los derechos reservados.
