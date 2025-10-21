"use strict";

import { crearEstructuraJuego } from "./gameRender.js";

// Datos de los juegos propios respecto a la pagina de juego
const juegosPropios = [
    {
        name: "Peg Solitarie Pac-Man", 

        load_image: "../imgs/pacmanCarga.png",
        
        como_jugar: `Clic izquierdo en la ficha que quieras mover.
                    Luego clic en el agujero vacío donde caerá tras el salto.
                    El juego eliminará automáticamente la ficha intermedia.`,
                    
        objetivo: "Quedarte con una sola ficha en el tablero, preferentemente en el agujero central.",
        
        descripcion: `Guía a una banda de mini-Pac-Man en un tablero de luces neón.
                    Salta de ficha en ficha para absorber su energía, como si comieras fantasmas,
                    hasta que solo quede un Pac-Man supremo en el centro.
                    Planifica cada movimiento: un paso en falso y tus minipacs quedarán atrapados sin salida.`,
                    
        id_juego: "peg-solitarie"
    }, 
    {
        name: "Blocka-Game", 

        load_image: "../imgs/blockaEjecucion.png",

        como_jugar: `Click Izquierdo: Rota la pieza hacia la izquierda (-90°)<br>
                    Click Derecho: Rota la pieza hacia la derecha (90°)<br>
                    Gira todas las piezas hasta formar la imagen completa.`,

        objetivo: `Rotar cada pieza del rompecabezas hasta que las 4 partes estén en su posición correcta
                    y formen la imagen original. ¡Hazlo en el menor tiempo posible!`,
                    
        descripcion: `Blocka es un rompecabezas retro donde cada nivel presenta una imagen dividida en 4 piezas 
                        con un filtro visual aplicado. A medida que avanzas, los filtros cambian: escala de grises, 
                        brillo aumentado y colores negativos. Cuando completes el puzzle, ¡verás la imagen original 
                        sin filtros!`,
                    
        id_juego: "blocka"
    }
];

// Funcion para crear toda la estructura HTML de la pagina de juego
export function crearPaginaDeJuego(juegoPedido) {
    let indexJuego = 0;// Por defecto el primer juego
    juegosPropios.forEach(juego => {
        if(juego.id_juego == juegoPedido){// Si el id("nombre") del juego coincide con el pedido
            indexJuego = juegosPropios.indexOf(juego);// Obtengo el indice del juego solicitado en el array
        }
    })

    const main = document.getElementById('main-content');
    
    // Crear la seccion principal
    const section = document.createElement('section');
    section.className = 'contenedor-principal-juego';
    
    // HTML completo de la pagina de juego
    section.innerHTML = `
        <div class="contenido-juego-y-breadcrumb">
            <h2 class="breadcrum">Inicio > Estrategia > ${juegosPropios[indexJuego].name}</h2>

            <div class="contenedor-juego">
                <div class="pantalla-carga-juego">
                    <button id="btn-ejecutar-juego" class="boton-jugar">Jugar</button>
                </div>

                <div class="contenedor-titulo-compartir">
                    <div class="tituloJuego-logo">
                        <h1 class="titulo-juego">${juegosPropios[indexJuego].name}</h1>
                        <img src="./imgs/logo.png" alt="logo">
                    </div>
                    <div class="iconos-compartir">
                        <i class="fa-solid fa-share"></i>
                        <i class="fa-solid fa-expand"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="contenedor-comoJugar-y-propaganda">
            <div class="como-jugar">
                <div class="instrucciones">
                    <div class="titulo-instrucciones">
                        <i class="fa-solid fa-arrow-pointer"></i>
                        <h3>Como jugar?</h3>
                    </div>
                    <p>
                        ${juegosPropios[indexJuego].como_jugar}
                    </p>
                </div>
                <div class="objetivo-juego">
                    <div class="titulo-instrucciones">
                        <i class="fa-regular fa-lightbulb"></i>
                        <h3>Objetivo del juego</h3>
                    </div>
                    <p>
                        ${juegosPropios[indexJuego].objetivo}
                    </p>
                </div>
                <div class="descripcion-juego">
                    <div class="titulo-instrucciones">
                        <i class="fa-solid fa-book-open"></i>
                        <h3>Descripcion del juego</h3>
                    </div>
                    <p>
                        ${juegosPropios[indexJuego].descripcion}
                    </p>
                </div>
            </div>

            <div class="propaganda">
                <video id="reproductor-video" loop muted autoplay playsinline>
                    <source src="./videos/Nuevas Papas Coated. Llegaron para hacer mucho ruido 😉🍟.mp4" type="video/mp4">
                    Tu navegador no soporta la etiqueta de video.
                </video>
            </div>
        </div>

        <div class="pacmans">
            <img src="./imgs/pacmans.png" alt="pacmans">
            <img src="./imgs/pacmans.png" alt="pacmans">
        </div>

        <div class="contenedor-comentarios-y-discord">
            <div class="seccion-comentarios">
                <div class="comentarios-container">
                    <div class="comentario">
                        <div class="avatar-pacman">
                            <i class="fa-solid fa-ghost"></i>
                        </div>
                        <div class="comentario-texto">
                            <span class="nombre">Carlos_Retro:</span> Los juegos retro tienen esa magia que no se encuentra en muchos títulos modernos. Gráficos simples pero llenos de identidad, música inolvidable y ese sentimiento de estar frente a un desafío genuino que te atrapa al instante.
                        </div>
                    </div>

                    <div class="comentario">
                        <div class="avatar-pacman">
                            <i class="fa-solid fa-ghost"></i>
                        </div>
                        <div class="comentario-texto">
                            <span class="nombre">GamerNostalgico:</span> Me encanta cómo este juego captura la esencia retro. Es perfecto para pasar el rato y ejercitar la mente al mismo tiempo.
                        </div>
                    </div>

                    <div class="comentario">
                        <div class="avatar-pacman">
                            <i class="fa-solid fa-ghost"></i>
                        </div>
                        <div class="comentario-texto">
                            <span class="nombre">PacManFan88:</span> La temática de Pac-Man le da un toque único al clásico Peg Solitaire. Muy original y adictivo!
                        </div>
                    </div>

                    <span id="ver-mas-comentarios">Ver mas...</span>
                </div>

                <div class="input-comentar">
                    <div class="avatar-pacman">
                        <i class="fa-solid fa-ghost"></i>
                    </div>
                    
                    <div class="input-container">
                        <input type="text" placeholder="Escribe tu comentario...">
                        <button class="btn-enviar">
                            <span class="flecha">▶</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="discord-container">
                <h3 class="titulo-discord">Unite a nuestro Discord</h3>
                <img class="qr-discord" src="./imgs/qrdiscord.png" alt="qr discord">
                <img src="./imgs/botonDiscord.png" alt="boton discord">
                <h3 class="titulo-importante-discord">Importante!</h3>
                <p class="texto-discord">
                    Respetar las reglas: no spam y
                    prohibido compra/venta en canales de texto
                </p>
            </div>
        </div>
    `;

    // Insertar la aside(juego en ejecucion) + seccion datos juego en el main
    if(juegosPropios[indexJuego].id_juego === "blocka")// por ahora por ser unico juego implementado
        main.appendChild(crearEstructuraJuego( juegosPropios[indexJuego].id_juego, juegosPropios[indexJuego].name ));

    main.appendChild(section);


    // Agregar la imagen de carga del juego en la pantalla de carga del juego tanto en la clase CSS como en el BEFORE
    // Utilizo la variable de CSS de la clase del selector para cambiar la imagen dinamicamente
    let fondoPaginaJuego = document.querySelector('.pantalla-carga-juego');
    fondoPaginaJuego.style.setProperty('--background-image', `url(${juegosPropios[indexJuego].load_image})`);
}

