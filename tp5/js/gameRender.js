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
        const breadcrumbHTML = crearSeccionBreadcrumb(nombreJuego);
        const marcoJuegoHTML = crearSeccionMarcoJuegoBlocka(nombreJuego);
        const marcoInstruccionesHTML = crearSeccionMarcoInstruccionesBlocka();

        // 3. Ensamblar todo el HTML de forma limpia y eficiente
        aside.innerHTML = breadcrumbHTML + marcoJuegoHTML + marcoInstruccionesHTML;
    } 
    else if (juegoPedido === 'peg-solitarie') {
        // 2. Crear las secciones del contenido (devuelven HTML como string)
        const breadcrumbHTML = crearSeccionBreadcrumb(nombreJuego);
        const marcoJuegoHTML = crearSeccionMarcoJuegoPeg(nombreJuego);
        const marcoInstruccionesHTML = crearSeccionMarcoInstruccionesPeg();

        // 3. Ensamblar todo el HTML de forma limpia y eficiente
        aside.innerHTML = breadcrumbHTML + marcoJuegoHTML + marcoInstruccionesHTML;
    }
    else if (juegoPedido === 'flappy-bird') {
        // 2. Crear las secciones del contenido (devuelven HTML como string)
        const breadcrumbHTML = crearSeccionBreadcrumb(nombreJuego);
        const marcoJuegoHTML = crearSeccionMarcoJuegoFlappy(nombreJuego);
        const marcoInstruccionesHTML = crearSeccionMarcoInstruccionesFlappy();


        // 3. Ensamblar todo el HTML de forma limpia y eficiente
        aside.innerHTML = breadcrumbHTML + marcoJuegoHTML + marcoInstruccionesHTML;
    }

    return aside;
}






/*  ========================================================= */
//            Funcion genericas para los juegos              //
/*  ========================================================= */
// ========================================================= //
// Crear la seccion del breadcrumb
function crearSeccionBreadcrumb(nombreJuego) {
    return `
    <h2 class="breadcrum-en-juego">Inicio > Estrategia > ${nombreJuego}</h2>
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
//             Creacion juego blocka desde aqui              //
// ========================================================= //
function crearSeccionMarcoJuegoBlocka(nombreJuego) {
    return `
    <div class="marco-contenedor-juego">
        <div class="contenedor-juego-main" id="contenedor-juego">

            ${crearPantallaInicioBlocka()}

            ${crearPanelJuegoBlocka()}

            <canvas id="myCanvasBlocka" width="495px" height="245px" style="display: none;"></canvas>

            ${crearControlesJuegoBlocka()}

            ${crearPantallaVictoriaBlocka()}

            ${crearPantallaDerrotaBlocka()}

            ${crearPantallaJuegoCompletadoBlocka()}

        </div> 
        ${crearSeccionTituloCompartir(nombreJuego)}
    </div> `;
}
// ========================================================= //




// ========================================================= //
// Crear la pantalla de inicio del juego BLOCKA
function crearPantallaInicioBlocka() {
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
function crearPanelJuegoBlocka() {
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
function crearControlesJuegoBlocka() {
    return `
    <div id="control-juego" style="display: none;">
        <button id="btn-reiniciar" class="btn-game btn-reiniciar">
            <i class="fa-solid fa-rotate-right"></i> Reiniciar
        </button>
        <button id="btn-dar-pista" class="btn-game btn-pista">
            <i class="fa-solid fa-lightbulb"></i>
        </button>
        <button class="btn-game btn-menu-principal btn-menu-juego">
            Menú
        </button>
    </div>
    `;
}

// Crear la pantalla de victoria del juego BLOCKA
function crearPantallaVictoriaBlocka() {
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
function crearPantallaDerrotaBlocka() {
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
function crearPantallaJuegoCompletadoBlocka() {
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
// Crear la seccion del marco de instrucciones
function crearSeccionMarcoInstruccionesBlocka() {
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














/* ========================================================= */
//            Desde aqui comienza el creador del peg         */
// ========================================================= //

// Crear la seccion del marco del juego PEG
function crearSeccionMarcoJuegoPeg(nombreJuego) {
    return `
    <div class="marco-contenedor-juego">
        <div class="contenedor-juego-main" id="contenedor-juego">

            ${crearPantallaInicioPeg()}

            ${crearPanelJuegoPeg()}

            <canvas id="myCanvasPeg" width="370" height="370" style="display: none;"></canvas>

            ${crearControlesJuegoPeg()}

            ${crearPantallaDerrotaPeg()}

            ${crearPantallaJuegoCompletadoPeg()}

        </div> 
        ${crearSeccionTituloCompartir(nombreJuego)}
    </div> `;
}
// ========================================================= //



// Funcion para crear la pantalla de inico del peg
function crearPantallaInicioPeg() {
    return `
        <!-- Pantalla De Inicio + pantalla overlay -->
        <div id="pantalla-inicio" class="pantalla-overlay">
            <button id="btn-salir-juego" class="btn-salir-juego">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
            <div class="menu-comenzar-juego">
                <div class="titulo-peg">
                    <h2>🎮</h2>
                    <h2>Peg Solitarie</h2>
                    <h2>🎮</h2>
                </div>
                <p>¡Listo para resolver el juego!</p>
                <button id="btn-comenzar" class="btn-jugar-inicio btn-game">Jugar</button>
            </div>
        </div>
    `;
}
/* ========================================================= */






/* Funcion para crear el panel del juego piezas y tiempo del peg */
function crearPanelJuegoPeg() {
    return `
        <div>
            <div class="piezas-restantes panel-juego-peg">
                <i class="fa-solid fa-puzzle-piece"></i>
                <p>Fichas Restantes: <span id="fichas-restantes">32</span></p>
            </div>
            <!-- panel de tiempo transcurrido/restante -->
            <div class="tiempo-restante panel-juego-peg">
                <i class="fa-solid fa-clock"></i>
                Tiempo: <span id="tiempo">00:00</span>
            </div>
        </div>
    `;
}
/* ========================================================= */





/* Funcion para crear los controles del juego peg */
function crearControlesJuegoPeg() {
    return `
        <!-- Botones de reiniciar y menú dentro del juego -->
        <div id="botonera-juego" style="display: none;">
            <button id="btn-reiniciar" class="btn-game btn-reiniciar-peg">
                    <i class="fa-solid fa-rotate-right"></i> Reiniciar
            </button>
            <button class="btn-game btn-menu-principal btn-menu-juego-peg event-menu">
                    Menú
            </button>
        </div>
    `;
}
/* ========================================================= */





/* Funcion para crear la pantalla de derrota del peg */
function crearPantallaDerrotaPeg() {
    return `
        <!-- pantalla de derrota -->
        <div id="pantalla-derrota" class="pantalla-overlay" style="display: none;">
            <div class="menu-derrota-peg">
                <h2>💔 ¡Perdiste! 💔</h2>

                <!-- Mensaje de derrota por movimientos -->
                <div id="derrota-por-movimientos">
                    <p id="causa-derrota">No hay más movimientos posibles</p>
                    <p>Fichas restantes: <span id="fichas-restantes-derrota">0</span></p>
                </div>
                <!-- Mensaje de derrota por tiempo limite -->
                <div id="derrota-por-tiempoLimite">
                    <p>Tiempo esperado: <span id="tiempo-esperado-juego">00:00</span></p>
                </div>

                <div class="botones-menu-derrota-peg">
                    <button class="btn-game btn-menu-principal-peg event-menu">Menú Principal</button>
                </div>
            </div>
        </div>
    `;
}
/* ========================================================= */





/* Funcion para crear la pantalla de juego completado del peg */
function crearPantallaJuegoCompletadoPeg() {
    return `
        <!-- Display de juego completado -->
        <div id="pantalla-juego-completado" class="pantalla-overlay" style="display: none;">
            <div class="menu-fin-juego-peg">
                <div class="emoji-grande">🏆</div>
                <h2>¡Juego Completado!</h2>
                <p class="mensaje-felicitacion">¡Felicidades, has eliminado todas las fichas!</p>
                <p>Tiempo: <span id="tiempo-final">00:00</span></p>
                <p class="mensaje-redireccion">Redirigiendo al menú principal en: <span id="tiempo-redireccion">10</span></p>
            </div>
        </div>
    `;
}
/* ========================================================= */




/* Funcion para crear la seccion del marco de instrucciones del peg */
function crearSeccionMarcoInstruccionesPeg() {
    return `
        <!-- Marco contenedor instrucciones -->
        <div class="marco-contenedor-instrucciones">
            <div class="instrucciones">
                <div class="titulo-instrucciones">
                    <i class="fa-solid fa-arrow-pointer"></i>
                    <h3>Como jugar?</h3>
                </div>
                <p>
                    Click y arrastra una ficha hacia un espacio vacío saltando sobre otra ficha.<br>
                    Solo puedes saltar horizontal o verticalmente (no en diagonal).<br>
                    La ficha saltada será eliminada del tablero.
                </p>
            </div>
            <div class="objetivo-juego">
                <div class="titulo-instrucciones">
                    <i class="fa-regular fa-lightbulb"></i>
                    <h3>Objetivo del juego</h3>
                </div>
                <p>
                    Eliminar todas las fichas del tablero hasta quedarte con una sola,
                    preferentemente en el centro. ¡Planifica tus movimientos con cuidado!
                </p>
            </div>
            <div class="descripcion-juego">
                <div class="titulo-instrucciones">
                    <i class="fa-solid fa-book-open"></i>
                    <h3>Descripcion del juego</h3>
                </div>
                <p>
                    Peg Solitaire es un clásico juego de estrategia con temática Pac-Man. 
                    Cada ficha representa un personaje del universo Pac-Man. Deberás saltar 
                    sobre las fichas para eliminarlas, pero cuidado: ¡solo hay un camino 
                    correcto hacia la victoria!
                </p>
            </div>
        </div>
    `;
}













/* ========================================================= */
//            Desde aqui comienza el creador del Flappy      */
// ========================================================= //

function crearSeccionMarcoJuegoFlappy(nombreJuego) {
    return `
    <div class="marco-contenedor-juego">
        <div class="contenedor-juego-main-flappy" id="contenedor-juego">

            <!-- Capas del parallax -->
            <div class="layer layer-1"></div>
            <div class="layer layer-2"></div>
            <div class="layer layer-3"></div>
            <div class="layer layer-4"></div>
            <div class="layer layer-5"></div>
            
            <!-- pajaro -->
            <div class="bird" id="bird"></div>

            
            <!-- Interfaz del juego -->
            <div class="game-ui">
                
                <div class="score">Puntuación: <span id="score">0</span></div>
                <!-- Indicador de nivel actual -->
                <div class="nivel-display"><span id="nivel">Nivel 1</span></div>
                <div class="lives-display">Vidas: <div id="lives"></div></div>
                <div class="game-over" id="gameOver">
                    <h2>¡Game Over!</h2>
                    <p>Puntuación final: <span id="finalScore">0</span></p>
                    <button class="btn-flappy" id="restartBtn">Menú</button>
                </div>
                <div class="start-screen" id="startScreen">
                    <button id="btn-salir-juego" class="btn-salir-juego-flappy">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                    <h1>Flappy Bird</h1>
                    <p>Haz click para volar</p>
                    <button class="btn-flappy" id="startBtn">Comenzar</button>
                </div>
            </div>
        
        </div> 
        ${crearSeccionTituloCompartir(nombreJuego)}
    </div> `;
}




function crearSeccionMarcoInstruccionesFlappy() {
    return `
    <!-- Marco contenedor instrucciones -->
    <div class="marco-contenedor-instrucciones">
        <div class="instrucciones">
            <div class="titulo-instrucciones">
                <i class="fa-solid fa-arrow-pointer"></i>
                <h3>Como jugar?</h3>
            </div>
            <p>
                Haz clic en cualquier parte de la pantalla para hacer volar al pájaro.<br>
                Cada clic lo impulsa hacia arriba, soltándolo caerá por gravedad.<br>
                Evita chocar con los tubos y los bordes de la pantalla.
            </p>
        </div>
        <div class="objetivo-juego">
            <div class="titulo-instrucciones">
                <i class="fa-regular fa-lightbulb"></i>
                <h3>Objetivo del juego</h3>
            </div>
            <p>
                Pasa entre los tubos sin chocar para sumar puntos.
                Recolecta corazones para ganar vidas extra. ¡Supera tu récord!
            </p>
        </div>
        <div class="descripcion-juego">
            <div class="titulo-instrucciones">
                <i class="fa-solid fa-book-open"></i>
                <h3>Descripcion del juego</h3>
            </div>
            <p>
                Flappy Bird es un clásico juego arcade de reflejos y coordinación. 
                Controla un pájaro que vuela entre tubos infinitos mientras la dificultad 
                aumenta progresivamente. ¡Un juego simple pero adictivo que pondrá a prueba 
                tu paciencia y habilidad!
            </p>
        </div>
    </div>
    `;
}