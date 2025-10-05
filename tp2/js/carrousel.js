"use strict";

const juegos = [];//--> array global de juegos

const juegoPropioPeg = {
    name: "Peg Solitarie", 
    background_image: "./imgs/pegSolitariePropio.png",
    released: "2025-05-29",
    rating: 5
}

async function fetchJuegos(){
    try {
        const response = await fetch('https://vj.interfaces.jima.com.ar/api');
        const games = await response.json();
        if(response.ok){
            games.forEach(juego => {
                juegos.push(juego);
            });
        }
        console.log("juegos cargados: ",juegos);
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

    //creo el boton siguiente
    const botonSiguiente = document.createElement('img');
    botonSiguiente.className = 'button-carrousel-grande button-next-grande';
    botonSiguiente.src = './imgs/botonCarrusel.png';

    //creo el boton anterior
    const botonAnterior = document.createElement('img');
    botonAnterior.className = 'button-carrousel-grande button-prev-grande';
    botonAnterior.src = './imgs/botonCarrusel.png';

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
    carrouselContainer.appendChild(botonAnterior);
    carrouselContainer.appendChild(juegosCarrousel);
    carrouselContainer.appendChild(botonSiguiente);

    //inserto la section en el main
    main.appendChild(section);

    // configuro el carrusel grande
    configurarCarrusel(juegosCarrousel, botonAnterior, botonSiguiente, "grande");
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

    //creo el boton siguiente
    const botonSiguiente = document.createElement('img');
    botonSiguiente.className = 'button-carrousel-chico button-next-chico';
    botonSiguiente.src = './imgs/botonCarrusel.png';

    //creo el boton anterior
    const botonAnterior = document.createElement('img');
    botonAnterior.className = 'button-carrousel-chico button-prev-chico';
    botonAnterior.src = './imgs/botonCarrusel.png';

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
    carrouselContainer.appendChild(botonAnterior);
    carrouselContainer.appendChild(juegosCarrousel);
    carrouselContainer.appendChild(botonSiguiente);

    //inserto la section en el main
    main.appendChild(section);

    // configuro el carrusel chico
    configurarCarrusel(juegosCarrousel, botonAnterior, botonSiguiente, "chico");
}


// FUNCION PARA MOVER EL CARRUSEL (GENERICA)
function configurarCarrusel(carrusel, botonAnterior, botonSiguiente, tipo) {
    let maxWidth;// Ancho de la carta + margenes
    let cardsToShow// Numero de cards visibles
    if(tipo.toLowerCase() === 'grande'){
        maxWidth = 340;
        cardsToShow = 3; 
    }else if(tipo.toLowerCase() === 'chico'){
        maxWidth = 168;
        cardsToShow = 6;
    }

    let currentIndex = 0;// Indice actual del carrusel

    // Función para actualizar la posición del carrusel
    function updateCarrusel() {
        const offset = -currentIndex * maxWidth;// Ancho de la carta + margenes
        carrusel.style.transform = `translateX(${offset}px)`;// Muevo el carrusel
    }

    // Funciones para ir a la imagen siguiente
    function nextImage() {
        const totalCards = carrusel.children.length;
        const maxIndex = totalCards - cardsToShow;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarrusel();
        }
    }

    // Función para ir a la imagen anterior
    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarrusel();
        }
    }

    // Event listeners
    botonSiguiente.addEventListener('click', nextImage);
    botonAnterior.addEventListener('click', prevImage);
}


// FUNCION PARA CREAR UNA CARD
function crearCard(juego,estilo){
    const card = document.createElement('div');
    card.className = estilo;

    if(estilo.toLowerCase() === "card-grande"){
        // Debug: verificar si llegan los datos --->LLEGAN
        //console.log("Creando card para:", juego.name, "Imagen:", juego.background_image);

        const divImagen = document.createElement('div');
        divImagen.style.backgroundImage = `url(${juego.background_image})`;

        const nombreJuego = document.createElement('h3');
        nombreJuego.className = 'nombre-juego';
        nombreJuego.textContent = juego.name;
        //card.appendChild(divImagen);
        //card.appendChild(nombreJuego);
        card.style.backgroundImage = `url(${juego.background_image})`;
        card.innerHTML = `
            <h2>${juego.name}</h2>
            <p>Lanzamiento: ${juego.released}</p>
            <p class="valoracion">Valoración: ${juego.rating}</p>
            <button class="boton-jugar">Jugar</button>
        `;
        return card;
    }

    else if(estilo.toLowerCase() === "card-chica"){
        const card = document.createElement('div');
        card.className = estilo;
        
        // Debug: verificar si llegan los datos--->LLEGAN
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
async function juegosPorGenero(genero){
    const juegosFiltrados = [];
    for(let j=0; j < juegos.length; j++){
        for(let g=0; g < juegos[j].genres.length; g++){
            if(juegos[j].genres[g].name.toLowerCase() === genero.toLowerCase()){
                juegosFiltrados.push(juegos[j]);
            }
        }
    }
    return juegosFiltrados;
}

// FUNCION PARA FILTRAR JUEGOS MAS VALORADOS
async function juegosMasValorados(){
    //copia el array de juegos y lo ordena por rating
    const juegosOrdenados = juegos;
    juegosOrdenados.sort((a, b) => b.rating - a.rating);

    // toma los primeros 20 juegos,por lo tanto los 20 mas valorados
    const juegosFiltrados = juegos.map(j => j).slice(0, 19);
    juegosFiltrados.unshift(juegoPropioPeg);//agrego mi juego propio al inicio del array
    return juegosFiltrados;
}


// FUNCION PARA INICIALIZAR LOS CARROUSELS
export async function inicializarCarrousels(){
    const main = document.getElementById('main-content');
    main.innerHTML = '';//limpio el main para evitar duplicados
    await fetchJuegos();
    await crearCarrouselGrande(await juegosMasValorados(),'Mas Valorados');
    await crearCarrouselChico(await juegosPorGenero('Action'),'Action');
    await crearCarrouselChico(await juegosPorGenero('Indie'),'Indie');
    await crearCarrouselChico(await juegosPorGenero('Adventure'),'Adventure');
    await crearCarrouselChico(await juegosPorGenero('RPG'),'RPG');

    console.log("Carrousels creados");
}

//inicializarCarrousels();


