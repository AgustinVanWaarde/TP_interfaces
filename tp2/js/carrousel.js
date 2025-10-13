"use strict";

const juegos = [];//--> array global de juegos
let generos = [];//--> array global de generos


// Datos de los juegos propios para crear la card
const juegosPropios = [
    {
        name: "Peg Solitarie", 
        background_image: "./imgs/pegSolitariePropio.png",
        released: "2025-05-29",
        rating: 5, 
        value: "peg-solitarie"
    }, 
    {
        name: "Blocka", 
        background_image: "./imgs/portadaBlocka.png",
        released: "2025-05-29",
        rating: 5, 
        value: "blocka"
    }

];

export async function fetchJuegos(){
    try {
        juegos.length = 0;
        const response = await fetch('https://vj.interfaces.jima.com.ar/api');
        const games = await response.json();
        if(response.ok){
            games.forEach(juego => {
                juegos.push(juego);
            });
        }
        console.log("juegos cargados: ",juegos);

        // Extraigo todos los generos unicos de los juegos
        juegos.forEach(juego => {
            juego.genres.forEach(genero => {
                if(!generos.includes(genero.name)){
                    generos.push(genero.name);
                }
            });
        });
        console.log("generos cargados: ",generos);
    } catch (error) {
        console.error('Error fetching juegos:', error);
    }
}


// FUNCION PARA CREAR UN CARROUSEL GRANDE
async function crearCarrouselGrande(juegos,genero){
    //selecciono el main donde van los carrousels
    const main = document.getElementById('main-content');

    //creo la seccion del carrousel
    const section = document.createElement('section');
    section.className = 'cards-grandes';

    //creo el contenedor del carrousel
    const carrouselContainer = document.createElement('div');
    carrouselContainer.className = 'carrousel-conteiner-grande';

    //creo el titulo de categoria del carrousel
    const tituloCategoria = document.createElement('h2');
    tituloCategoria.className = 'titulo-categoria-grande';
    tituloCategoria.textContent = 'Juegos ' + genero;

    //creo un boton siguiente
    const botonTempCarrouselSiguiente = document.createElement('button');
    botonTempCarrouselSiguiente.className = 'boton-carrusel boton-carrusel-grande boton-siguiente';
    const divBotonSiguiente = document.createElement('div');
    divBotonSiguiente.className = 'flecha-pixel flecha-derecha';
    botonTempCarrouselSiguiente.appendChild(divBotonSiguiente);

    //creo un boton anterior
    const botonTempCarrouselAnterior = document.createElement('button');
    botonTempCarrouselAnterior.className = 'boton-carrusel boton-carrusel-grande boton-anterior';
    const divBotonAnterior = document.createElement('div');
    divBotonAnterior.className = 'flecha-pixel flecha-izquierda';
    botonTempCarrouselAnterior.appendChild(divBotonAnterior);

    //creo las cards
    const juegosCarrousel = document.createElement('article');
    juegosCarrousel.className = 'cards-categoria-grande';
    juegos.forEach(juego => {
        const card = crearCard(juego,"card-grande");
        juegosCarrousel.appendChild(card);
    })

    //armo toda la section del carrousel
    section.appendChild(carrouselContainer);
    carrouselContainer.appendChild(tituloCategoria);
    carrouselContainer.appendChild(botonTempCarrouselAnterior);
    carrouselContainer.appendChild(juegosCarrousel);
    carrouselContainer.appendChild(botonTempCarrouselSiguiente);

    //inserto la section en el main
    main.appendChild(section);

    // configuro el carrusel grande
    configurarCarrusel(juegosCarrousel, botonTempCarrouselAnterior, botonTempCarrouselSiguiente, "grande");
}


// FUNCION PARA CREAR UN CARROUSEL CHICO
async function crearCarrouselChico(juegos,genero){
    //selecciono el main donde van los carrousels
    const main = document.getElementById('main-content');

    //creo la seccion del carrousel
    const section = document.createElement('section');
    section.className = 'cards-chicas';

    //creo el titulo de categoria del carrousel
    const tituloCategoria = document.createElement('h2');
    tituloCategoria.className = 'titulo-categoria-chico';
    tituloCategoria.textContent = 'Juegos de ' + genero;

    //creo el contenedor del carrousel
    const carrouselContainer = document.createElement('div');
    carrouselContainer.className = 'carrousel-conteiner-chico';

    //creo un boton siguiente
    const botonTempCarrouselSiguiente = document.createElement('button');
    botonTempCarrouselSiguiente.className = 'boton-carrusel boton-carrusel-chico boton-siguiente';
    const divBotonSiguiente = document.createElement('div');
    divBotonSiguiente.className = 'flecha-pixel flecha-derecha';
    botonTempCarrouselSiguiente.appendChild(divBotonSiguiente);

    //creo un boton anterior
    const botonTempCarrouselAnterior = document.createElement('button');
    botonTempCarrouselAnterior.className = 'boton-carrusel boton-carrusel-chico boton-anterior';
    const divBotonAnterior = document.createElement('div');
    divBotonAnterior.className = 'flecha-pixel flecha-izquierda';
    botonTempCarrouselAnterior.appendChild(divBotonAnterior);

    //creo las cards
    const juegosCarrousel = document.createElement('article');
    juegosCarrousel.className = 'cards-categoria-chico';
    juegos.forEach(juego => {
        const card = crearCard(juego,"card-chica");
        juegosCarrousel.appendChild(card);
    })

    //armo toda la section del carrousel
    section.appendChild(tituloCategoria);
    section.appendChild(carrouselContainer);
    carrouselContainer.appendChild(botonTempCarrouselAnterior);
    carrouselContainer.appendChild(juegosCarrousel);
    carrouselContainer.appendChild(botonTempCarrouselSiguiente);

    //inserto la section en el main
    main.appendChild(section);

    // configuro el carrusel chico
    configurarCarrusel(juegosCarrousel, botonTempCarrouselAnterior, botonTempCarrouselSiguiente, "chico");
}


// FUNCION PARA MOVER EL CARRUSEL (GENERICA)
// Configura el comportamiento de desplazamiento de un carrusel
// Funciona tanto para carrusel grande como chico
function configurarCarrusel(carrusel, botonAnterior, botonSiguiente, tipo) {
    let cardWidth; // Ancho de cada carta en pixeles
    let gap = 15; // Espacio entre cartas en pixeles (igual para ambos tipos)
    let cardsToShow; // Cuantas cards se ven al mismo tiempo en pantalla
    let cardsToMove; // Cuantas cards se mueven por click
    let cards; // Todas las cards del carrusel

    // Configuracion segun el tipo de carrusel
    if(tipo.toLowerCase() === 'grande'){
        cardWidth = 330;
        cardsToShow = 3; 
        cardsToMove = 1.5;
        cards = carrusel.querySelectorAll('.card-grande');
    }else if(tipo.toLowerCase() === 'chico'){
        cardWidth = 165;
        cardsToShow = 7;
        cardsToMove = 2;
        cards = carrusel.querySelectorAll('.card-chica')
    }

    let currentIndex = 0; // Posicion actual del carrusel (empieza en 0)
    let totalCards = cards.length; // Cantidad total de cards
    let maxIndex = totalCards - cardsToShow; // Posicion maxima a la que puede llegar (evita espacios vacios)

    // Funcion para actualizar la posicion del carrusel
    // Calcula cuanto debe moverse el carrusel segun el indice actual
    function updateCarrusel() {
        // Calcula el desplazamiento: (ancho de card + espacio) multiplicado por la posicion actual
        // El signo negativo es porque se mueve hacia la izquierda
        let offset = -(cardWidth + gap) * currentIndex;
        carrusel.style.transform = `translateX(${offset}px)`;

        // Oculta el boton anterior si estamos al inicio
        if (currentIndex === 0) {
            botonAnterior.classList.add('boton-anterior-hidden');
        } else {
            botonAnterior.classList.remove('boton-anterior-hidden');
        }

        // Oculta el boton siguiente si estamos al final
        if (currentIndex === maxIndex) {
            botonSiguiente.classList.add('boton-siguiente-hidden');
        } else {
            botonSiguiente.classList.remove('boton-siguiente-hidden');
        }
    }

    // Funcion para avanzar el carrusel
    function nextImage() {
        if (currentIndex < maxIndex) {
            // Suma la cantidad de cards a mover, pero sin pasar del maximo
            // Math.min asegura que no sobrepase maxIndex
            currentIndex = Math.min(currentIndex + cardsToMove, maxIndex);
            updateCarrusel();
        }
    }

    // Funcion para retroceder el carrusel
    function prevImage() {
        if (currentIndex > 0) {
            // Resta la cantidad de cards a mover, pero sin bajar de 0
            // Math.max asegura que no sea menor a 0
            currentIndex = Math.max(currentIndex - cardsToMove, 0);
            updateCarrusel();
        }
    }


    // Eventos para los botones de navegacion

    // Boton siguiente: mueve el carrusel a la derecha con animacion skew
    botonSiguiente.addEventListener('click', () => {
        // Agrega clase de animacion a todas las cards (inclinacion hacia la derecha)
        cards.forEach(card => {
            card.classList.add('card-skew-right');
        });

        // Mueve el carrusel
        nextImage();

        // Remueve la animacion despues de 500ms (duracion de la animacion en CSS)
        setTimeout(() => {
            cards.forEach(card => {
                card.classList.remove('card-skew-right');
            });
        }, 500);
    });

    // Boton anterior: mueve el carrusel a la izquierda con animacion skew
    botonAnterior.addEventListener('click', () => {
        // Agrega clase de animacion a todas las cards (inclinacion hacia la izquierda)
        cards.forEach(card => {
            card.classList.add('card-skew-left');
        });

        // Mueve el carrusel
        prevImage();

        // Remueve la animacion despues de 500ms
        setTimeout(() => {
            cards.forEach(card => {
                card.classList.remove('card-skew-left');
            });
        }, 500);
    });

    // Boton anterior deshabilitado al inicio
    botonAnterior.classList.add('boton-anterior-hidden');
}


// FUNCION PARA CREAR UNA CARD
function crearCard(juego,estilo){
    const card = document.createElement('div');
    card.className = estilo;

    if(estilo.toLowerCase() === "card-grande"){
        // Prueba pra verificar si llegan los datos --->LLEGAN
        //console.log("Creando card para:", juego.name, "Imagen:", juego.background_image);

        let claseBtn = "boton-jugar";
        if(juego.value != undefined){
            claseBtn += ` btn-ir-juego" value="${juego.value}"`;
        }

        const divImagen = document.createElement('div');
        divImagen.style.backgroundImage = `url(${juego.background_image})`;

        const nombreJuego = document.createElement('h3');
        nombreJuego.className = 'nombre-juego';
        nombreJuego.textContent = juego.name;

        card.style.backgroundImage = `url(${juego.background_image})`;
        card.innerHTML = `
            <h2>${juego.name}</h2>
            <p>Lanzamiento: ${juego.released}</p>
            <p class="valoracion">Valoración: ${juego.rating}</p>
            <button class="${claseBtn} ${juego.value != '' ? 'btn-con-valoracion' : ''}">Jugar</button>
        `;
        return card;
    }

    else if(estilo.toLowerCase() === "card-chica"){
        const card = document.createElement('div');
        card.className = estilo;
        
        // Prueba para verificar si llegan los datos--->LLEGAN
        //console.log("Creando card para:", juego.name, "Imagen:", juego.background_image);
        
        card.style.backgroundImage = `url(${juego.background_image})`;
        card.innerHTML = `
            <h2>${juego.name}</h2>
            <button class="boton-jugar">Jugar</button>
        `;

        return card;       
    }
}


// FUNCION PARA FILTRAR JUEGOS POR GENERO
// Recorre todos los juegos y devuelve solo los que pertenecen al genero solicitado
async function juegosPorGenero(genero){
    const juegosFiltrados = [];
    // Primer bucle recorre todos los juegos
    for(let j=0; j < juegos.length; j++){
        // Segundo bucle recorre los generos de cada juego (un juego puede tener varios generos)
        for(let g=0; g < juegos[j].genres.length; g++){
            // Si encuentra el genero buscado, agrega el juego al array y sale del bucle interno
            if(juegos[j].genres[g].name.toLowerCase() === genero.toLowerCase()){
                juegosFiltrados.push(juegos[j]);
            }
        }
    }
    return juegosFiltrados;
}

// FUNCION PARA FILTRAR JUEGOS MAS VALORADOS
// Ordena los juegos por rating de mayor a menor y devuelve los primeros 20
async function juegosMasValorados(){
    // Ordena el array de juegos por rating de forma descendente
    // sort compara dos elementos: si b.rating > a.rating, b va primero como en JAVA con el collections.sort
    const juegosOrdenados = juegos;
    juegosOrdenados.sort((a, b) => b.rating - a.rating);

    // Toma solo los primeros 20 juegos (del 0 al 19)
    // map crea una copia del array y slice corta desde el inicio hasta la posicion 19
    const juegosFiltrados = juegos.map(j => j).slice(0, 18);
    
    // Agrega nuestro juego propio al inicio del array
    juegosFiltrados.unshift(juegosPropios[0]);
    juegosFiltrados.unshift(juegosPropios[1]);
    return juegosFiltrados;
}


// FUNCION PARA FILTRAR TODOS LOS GENEROS Y RETORNARLOS
export async function getGeneros(){
    await fetchJuegos();
    return generos;
}


// FUNCION PARA INICIALIZAR LOS CARROUSELS
export async function inicializarCarrousels(){
    if(juegos.length === 0)
        await fetchJuegos();

    await crearCarrouselGrande(await juegosMasValorados(),'Mas Valorados');
    await crearCarrouselChico(await juegosPorGenero('Action'),'Acción');
    await crearCarrouselChico(await juegosPorGenero('Indie'),'Indie');
    await crearCarrouselChico(await juegosPorGenero('Adventure'),'Aventura');
    await crearCarrouselChico(await juegosPorGenero('RPG'),'RPG');
    await crearCarrouselChico(await juegosPorGenero('Shooter'),'Shooter');
}


