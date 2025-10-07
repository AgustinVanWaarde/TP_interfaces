# 🎮 Retro Games - TP2

## 📋 Descripción del Proyecto

**Retro Games** es una Single Page Application (SPA) de una plataforma de juegos retro desarrollada con **HTML5, CSS3 y JavaScript Vanilla (ES6 Modules)**. Implementa navegación dinámica sin recarga de página, sistema de autenticación, carruseles de juegos y visualización de páginas de juego con publicidad rotativa.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura **modular** con separación de responsabilidades:
- **HTML**: Archivo principal con estructura base (header, main, footer)
- **CSS**: Estilos organizados por componentes
- **JavaScript**: Módulos ES6 que generan contenido dinámicamente
- **Suplementos**: Imágenes y videos

---

## 📁 Estructura de Archivos

```
tp2/
│
├── index.html                    # Archivo HTML principal con estructura base
│
├── css/                          # Estilos organizados por componentes
│   ├── General.css              # Estilos globales (reset, body, scrollbar)
│   ├── Header.css               # Header, navegación, menús
│   ├── CarrouselAndCardsHome.css # Carruseles y cards de juegos
│   ├── Footer.css               # Footer
│   ├── Login.css                # Formularios de autenticación
│   ├── Loader.css               # Animación de carga (Pac-Man)
│   └── PaginaDeJuego.css        # Página individual del juego
│
├── js/                           # Módulos JavaScript (ES6)
│   ├── flujos.js                # Controlador principal de navegación
│   ├── carrousel.js             # Generación de carruseles
│   ├── login.js                 # Formularios de login/registro
│   ├── menus.js                 # Menús hamburguesa y perfil
│   └── paginaDeJuego.js         # Página de juego
│
├── imgs/                         # Imágenes (logos, iconos, backgrounds)
├── videos/                       # Videos publicitarios
└── html/                         # Archivos de prueba/documentación
```

---

## 📄 Descripción de Módulos JavaScript

### **`flujos.js`** - Controlador Principal
Orquesta toda la navegación y flujos de la aplicación.

**Funciones clave**:
- `inicializarConLogin()`: Carga la vista de login/registro al iniciar
- `inicializarCarrouselsEnMain()`: Carga el home con carruseles de juegos
- `inicializarPaginaDeJuegoEnMain()`: Carga la página individual del juego
- `mostrarLoader()` / `ocultarLoader()`: Controla el loader animado

**Variables globales**:
- `main`: Contenedor principal donde se inyecta el contenido dinámico

### **`carrousel.js`** - Carruseles Dinámicos
Genera múltiples carruseles de juegos por categoría.

**Funciones**:
- `inicializarCarrousels()`: Crea toda la estructura HTML de carruseles
- Configura botones de navegación (← →) con scroll horizontal suave
- Agrega eventos click a las cards para navegar a la página del juego

### **`login.js`** - Autenticación
Genera formularios de login y registro con validación.

**Funcionalidades**:
- Formularios con campos validados (email, password, confirmación)
- Toggle para mostrar/ocultar contraseña
- Botones OAuth (Google, Facebook)
- Validación de campos con `checkValidity()`

### **`menus.js`** - Navegación Interactiva
Gestiona menús desplegables del header.

**Funcionalidades**:
- Menú hamburguesa con categorías de juegos
- Menú de perfil (Ver perfil, Configuración, Cerrar sesión)
- Animaciones de apertura/cierre
- Cierre automático al hacer click fuera

### **`paginaDeJuego.js`** - Página Individual
Genera la vista completa de un juego específico.

**Elementos generados**:
- Breadcrumb de navegación
- Contenedor del juego con botón "Jugar"
- Sección de instrucciones y objetivo
- Comentarios
- Widget de Discord integrado

---

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Animaciones, gradientes, flexbox, grid
- **JavaScript ES6**: Módulos, async/await, template literals
- **Font Awesome**: Iconos vectoriales
- **Google Fonts**: Tipografías Inter y Jersey

---

## Flujo de Navegación

```
1. Inicio de la aplicación
   ↓
2. Vista de Login/Registro (flujos.js → login.js)
   ↓
3. Submit del formulario
   ↓
4. Loader animado (5 segundos con barra de progreso)
   ↓
5. Home con Carruseles (flujos.js → carrousel.js)
   ↓
6. Click en card de juego
   ↓
7. Página del Juego (flujos.js → paginaDeJuego.js)
   - Video publicitario inicia automáticamente
   - Rotación automática de videos al finalizar
```

---

## 🚀 Cómo Ejecutar

**Requisitos Live Server (VS Code)**: Servidor local

---

## 👨‍💻 Autores

**Agustín Van Waarde**
**Paz Molfese**
**Santiago Macht**

---

*Última actualización: Octubre 2025*
