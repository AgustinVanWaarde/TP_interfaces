"use strict";

// ========================================================================= //
// ARCHIVO ENCARGADO DE RENDERIZAR LA ESTRUCTURA HTML DEL JUEGO EN EJECUCION
// ========================================================================= //


// Funcion para crear toda la estructura HTML del juego en ejecucion dentro de la aside
export function crearEstructuraJuego(juegoPedido,nombreJuego) {
    // 1. Crear el elemento principal <aside>
    const aside = document.createElement('aside');
    aside.className = 'fondo-juego-en-ejecucion';


    if(juegoPedido === 'blocka') {
        // 2. Crear las secciones del contenido (devuelven HTML como string)
        const breadcrumbHTML = crearSeccionBreadcrumb();
        const marcoJuegoHTML = crearSeccionMarcoJuego(nombreJuego);
        const marcoInstruccionesHTML = crearSeccionMarcoInstrucciones();

        // 3. Ensamblar todo el HTML de forma limpia y eficiente
        aside.innerHTML = breadcrumbHTML + marcoJuegoHTML + marcoInstruccionesHTML;
    }

    return aside;
}


// Crear la seccion del marco del juego BLOCKA
function crearSeccionMarcoJuego(nombreJuego) {
    return `
    <div class="marco-contenedor-juego">
        <div class="contenedor-juego-main" id="contenedor-juego">

            ${crearPantallaInicio()}

            ${crearPanelJuego()}

            <canvas id="myCanvas" width="495px" height="245px" style="display: none;"></canvas>

            ${crearControlesJuego()}

            ${crearPantallaVictoria()}

            ${crearPantallaDerrota()}

            ${crearPantallaJuegoCompletado()}

        </div> ${crearSeccionTituloCompartir(nombreJuego)}
    </div> `;
}
// ========================================================= //




// ========================================================= //
// Crear la pantalla de inicio del juego BLOCKA
function crearPantallaInicio() {
    return `
    <div id="pantalla-inicio" class="pantalla-overlay">
        <button id="btn-salir-juego" class="btn-salir-juego">
                <i class="fa-solid fa-right-from-bracket"></i>
        </button>
        <div class="menu-comenzar-juego">
            <h2>🎮 BLOCKA 🎮</h2>
            <p>¡Listo para resolver el rompecabezas!</p>
            <button id="btn-comenzar" class="btn-jugar-inicio btn-game">Jugar</button>
        </div>
        <div class="contenedor-particiones">
            <h4>Particiones:</h4>
            <div class="particiones">
                <button class="btn-particion" value="4">4</button>
                <button class="btn-particion" value="6">6</button>
                <button class="btn-particion" value="8">8</button>
            </div> 
        </div>
    </div>
    `;
}

// Crear el panel de informacion del juego BLOCKA
function crearPanelJuego() {
    return `
    <div class="panel-juego">
        <div class="info-nivel">
            <i class="fa-solid fa-puzzle-piece"></i>
            <p>Nivel: <span id="nivel-actual">1</span></p>
        </div>
        <div class="tiempo-transcurrido">
            <i class="fa-solid fa-clock"></i>
            Tiempo: <span id="tiempo">00:00</span>
        </div>
    </div>
    `;
}

// Crear los controles del juego BLOCKA
function crearControlesJuego() {
    return `
    <div id="control-juego" style="display: none;">
        <button id="btn-reiniciar" class="btn-game btn-reiniciar">
            <i class="fa-solid fa-rotate-right"></i> Reiniciar
        </button>
        <button class="btn-game btn-menu-principal btn-menu-juego">
            Menú
        </button>
        <button id="btn-dar-pista" class="btn-game btn-pista">
            <i class="fa-solid fa-lightbulb"></i>
        </button>
    </div>
    `;
}

// Crear la pantalla de victoria del juego BLOCKA
function crearPantallaVictoria() {
    return `
    <div id="pantalla-victoria" class="pantalla-overlay" style="display: none;">
        <div class="menu-victoria">
            <h2>🎉 ¡Nivel Completado! 🎉</h2>
            <p>Tiempo: <span id="tiempo-final">00:00</span></p>
            <div class="botones-menu-victoria">
                <button id="btn-siguiente-nivel" class="btn-game btn-siguiente-nivel">Siguiente Nivel</button>
                <button class="btn-game btn-menu-principal">Menú Principal</button>
            </div>
        </div>
    </div>
    `;
}

// Crear la pantalla de derrota del juego BLOCKA
function crearPantallaDerrota() {
    return `
    <div id="pantalla-derrota" class="pantalla-overlay" style="display: none;">
        <div class="menu-derrota">
            <h2>💔 ¡Nivel Fallido! 💔</h2>
            <p>Tiempo esperado: <span id="tiempo-esperado-nivel">00:00</span></p>
            <div class="botones-menu-derrota">
                <button class="btn-game btn-menu-principal">Menú Principal</button>
            </div>
        </div>
    </div>
    `;
}

// Crear pantalla de juego completado(TODOS LOS NIVELES DEL BLOCKA)
function crearPantallaJuegoCompletado() {
    return `
    <!-- Pantalla del menu cuando completas todo el juego + pantalla overlay -->
    <div id="pantalla-juego-completado" class="pantalla-overlay" style="display: none;">
        <div class="menu-fin-juego">
            <div class="emoji-grande">🏆</div>
            <h2>¡Juego Completado!</h2>
            <p class="mensaje-felicitacion">¡Felicidades, has resuelto todos los rompecabezas de Blocka!</p>
            <p class="mensaje-redireccion">Redirigiendo al menú principal en: <span id="tiempo-redireccion"></span></p>
        </div>
    </div>
    `;
}
// ========================================================= //




// ========================================================= //
// Crear la seccion del breadcrumb
function crearSeccionBreadcrumb() {
    return `
    <h2 class="breadcrum-en-juego">Inicio > Estrategia > Blocka Rompecabezas</h2>
    `;
}

// Crear la seccion del titulo y los iconos de compartir
function crearSeccionTituloCompartir(nombreJuego) {
    return `
    <div class="contenedor-titulo-compartir">
        <div class="tituloJuego-logo">
            <h1 class="titulo-juego">${nombreJuego}</h1>
            <img src="./imgs/logo.png" alt="logo">
        </div>
        <div class="iconos-compartir">
            <i class="fa-solid fa-share"></i>
            <i class="fa-solid fa-expand"></i>
        </div>
    </div>
    `;
}
// ========================================================= //




// ========================================================= //
// Crear la seccion del marco de instrucciones
function crearSeccionMarcoInstrucciones() {
    return `
    <div class="marco-contenedor-instrucciones">
        <div class="instrucciones">
            <div class="titulo-instrucciones">
                <i class="fa-solid fa-arrow-pointer"></i>
                <h3>Como jugar?</h3>
            </div>
            <p>
                Click Izquierdo: Rota la pieza hacia la izquierda (-90°)<br>
                Click Derecho: Rota la pieza hacia la derecha (90°)<br>
                Gira todas las piezas hasta formar la imagen completa.
            </p>
        </div>
        <div class="objetivo-juego">
            <div class="titulo-instrucciones">
                <i class="fa-regular fa-lightbulb"></i>
                <h3>Objetivo del juego</h3>
            </div>
            <p>
                Rotar cada pieza del rompecabezas hasta que las 4 partes estén en su posición correcta 
                y formen la imagen original. ¡Hazlo en el menor tiempo posible!
            </p>
        </div>
        <div class="descripcion-juego">
            <div class="titulo-instrucciones">
                <i class="fa-solid fa-book-open"></i>
                <h3>Descripcion del juego</h3>
            </div>
            <p>
                Blocka es un rompecabezas retro donde cada nivel presenta una imagen dividida en 4 piezas 
                con un filtro visual aplicado. A medida que avanzas, los filtros cambian: escala de grises, 
                brillo aumentado y colores negativos. Cuando completes el puzzle, ¡verás la imagen original 
                sin filtros!
            </p>
        </div>
    </div>
    `;
}
