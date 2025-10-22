# 🎮 TP3 - Blocka Retro Game

## 📋 Descripción General

Este proyecto es la tercera entrega del trabajo práctico para la materia "Interfaces de Usuario e Interacción". 

La aplicación es un sitio web de juegos retro que mantiene el diseño y la estructura de la entrega anterior (TP2), pero incorpora un nuevo juego llamado **Blocka**, un puzzle de rotación de imágenes con filtros visuales que incrementan el desafío a medida que se avanza en los niveles.

## 🎯 El Juego: Blocka

**Blocka** es un juego de rompecabezas basado en imágenes donde debes rotar fragmentos de una imagen para reconstruir la composición original.

### ¿Cómo se juega?

1. **Objetivo:** Rotar cada pieza del rompecabezas hasta formar la imagen completa.
2. **Controles:**
   * **Click Izquierdo:** Rota la pieza 90° en sentido antihorario (-90°)
   * **Click Derecho:** Rota la pieza 90° en sentido horario (+90°)
3. **Niveles:** El juego consta de varios niveles que aumentan en dificultad.
4. **Filtros:** Cada nivel aplica diferentes filtros visuales a las piezas:
   * **Nivel 1:** Imagen normal
   * **Nivel 2:** Escala de grises
   * **Nivel 3:** Brillo aumentado (con límite de tiempo)
   * **Nivel 4:** Negativo (con límite de tiempo reducido)
5. **Victoria:** Al completar un nivel, se quita el filtro y se muestra la imagen original.

### Características adicionales:

* **Temporizador:** Muestra el tiempo transcurrido en cada nivel.
* **Límite de tiempo:** En niveles avanzados, debes completar el puzzle antes de que se acabe el tiempo.
* **Selección de dificultad:** Puedes elegir entre diferentes cantidades de piezas (4, 6 u 8).
* **Banco de imágenes:** El juego selecciona aleatoriamente entre varias imágenes para cada nivel.

## 🔧 Implementación Técnica

El juego está implementado utilizando HTML5, CSS3 y JavaScript (ES6), siguiendo un enfoque orientado a objetos con las siguientes clases principales:

1. **GameManager:** Controla la lógica general del juego, gestiona los niveles, el temporizador y los estados del juego (inicio, victoria, derrota).

2. **Blocka:** Representa el puzzle completo, maneja la división de la imagen en piezas y verifica si el rompecabezas está completo.

3. **SubImagen:** Representa cada pieza individual del rompecabezas, controla su rotación y la aplicación de filtros.

### Tecnologías utilizadas:

* **HTML Canvas:** Para la renderización del juego y manipulación de imágenes.
* **Manipulación del DOM:** Para actualizar la interfaz del juego.
* **Programación orientada a eventos:** Para manejar las interacciones del usuario.
* **CSS Animations:** Para las transiciones y efectos visuales.

## 🚀 Cómo ejecutar el proyecto

1. Clona o descarga este repositorio.
2. Abre `index.html` en tu navegador web.
3. Navega hasta la sección de juegos y selecciona "Blocka".
4. ¡Diviértete jugando!

## 📁 Estructura del proyecto

```
tp3/
├── index.html                  # Página principal del sitio
├── paginaJuego.html            # Página del juego Blocka
├── Blocka.js                   # Clase para el rompecabezas
├── GameManager.js              # Controlador principal del juego
├── Subimagen.js                # Clase para cada pieza del puzzle
├── componentesTP2/             # Estilos heredados del TP2
│   ├── General.css
│   ├── Header.css
│   └── PaginaDeJuego.css
└── posiblesImagenes/           # Banco de imágenes para el juego
```

## 📝 Requisitos cumplidos

✅ Juego funcional con 3 o más niveles.  
✅ Aplicación de filtros en tiempo de carga.  
✅ Banco de imágenes con selección aleatoria.  
✅ Instrucciones de juego claras.  
✅ Temporizador funcional.  
✅ Imágenes desordenadas con rotaciones aleatorias.  
✅ Integración con la estructura del TP2.  

## 👨‍🎓 Autor

Agustin Van Waarde  
Desarrollado para la materia "Interfaces de Usuario e Interacción" - TUDAI

---

© 2025 RetroGames - Todos los derechos reservados.