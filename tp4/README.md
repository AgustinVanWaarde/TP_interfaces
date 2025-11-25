# 🎮 TP4 - Peg Solitaire Game

## 📋 Descripción General

Este proyecto es la cuarta entrega del trabajo práctico para la materia "Interfaces de Usuario e Interacción". 

La aplicación es un sitio web de juegos retro que mantiene el diseño y la estructura de las entregas anteriores, incorporando ahora **Peg Solitaire**, un clásico juego de estrategia con temática Pac-Man que desafía tu capacidad de planificación y pensamiento lógico.

## 🎯 El Juego: Peg Solitaire

**Peg Solitaire** es un juego de mesa tradicional donde debes eliminar fichas del tablero saltando sobre ellas, con el objetivo de quedarte con una sola ficha, idealmente en el centro.

### ¿Cómo se juega?

1. **Objetivo:** Eliminar todas las fichas del tablero hasta quedarte con una sola ficha, preferentemente en el centro.
2. **Controles:**
   * **Click y arrastra:** Mueve una ficha hacia un espacio vacío saltando sobre otra ficha.
   * **Movimientos válidos:** Solo puedes saltar horizontal o verticalmente (no en diagonal).
   * **Captura:** La ficha saltada es eliminada del tablero.
3. **Victoria:** Completa el juego cuando solo queda una ficha en el tablero.
4. **Derrota:** Pierdes si no quedan movimientos posibles o si se acaba el tiempo.

### Características adicionales:

* **Temporizador:** Muestra el tiempo transcurrido durante la partida.
* **Contador de fichas:** Visualiza cuántas fichas quedan en el tablero.
* **Sistema de drag & drop:** Interfaz intuitiva para mover las fichas.
* **Validación de movimientos:** Solo permite movimientos válidos según las reglas del juego.
* **Temática Pac-Man:** Cada ficha representa un personaje del universo Pac-Man.

## 🔧 Implementación Técnica

El juego está implementado utilizando HTML5, CSS3 y JavaScript (ES6), siguiendo un enfoque orientado a objetos con las siguientes clases principales:

1. **GameManagerPeg:** Controla la lógica general del juego, gestiona el tablero, el temporizador y los estados del juego (inicio, victoria, derrota).

2. **Tablero:** Representa el tablero de juego, maneja la matriz de posiciones y la validación de movimientos.

3. **Ficha:** Representa cada ficha individual del juego, controla su posición, estado y eventos de drag & drop.

### Tecnologías utilizadas:

* **HTML Canvas:** Para la renderización del juego y dibujo de fichas.
* **Drag & Drop API:** Para la interacción intuitiva con las fichas.
* **Manipulación del DOM:** Para actualizar la interfaz del juego.
* **Programación orientada a eventos:** Para manejar las interacciones del usuario.
* **CSS Animations:** Para las transiciones y efectos visuales.

## 🚀 Cómo ejecutar el proyecto

1. Clona o descarga este repositorio.
2. Abre `index.html` en tu navegador web.
3. Navega hasta la sección de juegos y selecciona "Peg Solitaire".
4. ¡Diviértete jugando!

## 📁 Estructura del proyecto

```
tp4/
├── index.html                  # Página principal del sitio
├── html/
│   └── paginaJuego.html       # Página del juego
├── js/
│   ├── pegGame/
│   │   ├── GameManagerPeg.js  # Controlador principal del juego
│   │   ├── Tablero.js         # Lógica del tablero
│   │   ├── Ficha.js           # Clase para cada ficha
│   │   └── fichas/            # Imágenes de las fichas Pac-Man
│   ├── gameRender.js          # Renderizado de la estructura HTML
│   └── flujos.js              # Control de flujo de la aplicación
├── css/
│   ├── PegSolitarie.css       # Estilos específicos del juego
│   ├── General.css            # Estilos generales
│   └── Header.css             # Estilos del header
└── imgs/                      # Recursos gráficos
```

## 📝 Requisitos cumplidos

✅ Juego funcional con lógica completa de Peg Solitaire.  
✅ Sistema de drag & drop intuitivo.  
✅ Validación de movimientos según reglas del juego.  
✅ Instrucciones de juego claras.  
✅ Temporizador funcional.  
✅ Sistema de victoria y derrota.  
✅ Integración con la estructura de entregas anteriores.  
✅ Temática visual coherente (Pac-Man).  

## 🎮 Juegos disponibles en esta entrega

* **Blocka** - Puzzle de rotación de imágenes (TP3)
* **Peg Solitaire** - Juego de estrategia (TP4 - NUEVO)

## 👨‍🎓 Autor

Agustin Van Waarde  
Desarrollado para la materia "Interfaces de Usuario e Interacción" - TUDAI

---

© 2025 RetroGames - Todos los derechos reservados.
