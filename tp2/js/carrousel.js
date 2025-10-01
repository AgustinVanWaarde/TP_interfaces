const juegos = [];//--> array global de juegos

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
    const main = document.getElementById('main-carrousels');

    //creo la seccion del carrousel
    const section = document.createElement('section');
    section.className = 'cards-grandes';

    //creo el contenedor del carrousel
    const carrouselContainer = document.createElement('div');
    carrouselContainer.className = 'carrousel-conteiner-grande';

    //creo el titulo de categoria del carrousel
    const tituloCategoria = document.createElement('h2');
    tituloCategoria.textContent = 'Juegos de la Categoria ' + genero;

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

}

// FUNCION PARA CREAR UN CARROUSEL CHICO
async function crearCarrouselChico(juegos,genero){
    //selecciono el main donde van los carrousels
    const main = document.getElementById('main-carrousels');

    //creo la seccion del carrousel
    const section = document.createElement('section');
    section.className = 'cards-chicas';

    //creo el titulo de categoria del carrousel
    const tituloCategoria = document.createElement('h2');
    tituloCategoria.textContent = 'Juegos de la Categoria ' + genero;

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

    // *** FUNCIONALIDAD DEL CARRUSEL CHICO ***
    configurarCarruselChico(juegosCarrousel, botonAnterior, botonSiguiente);
}

// FUNCIÓN PARA MOVER EL CARRUSEL CHICO
function configurarCarruselChico(carrusel, botonAnterior, botonSiguiente) {
    let currentIndex = 0;
    const cardsToShow = 6; // Número de cards visibles
    const cardWidth = 185; // Ancho de la carta + margenes

    function updateCarrusel() {
        const offset = -currentIndex * cardWidth;
        carrusel.style.transform = `translateX(${offset}px)`;
    }

    function siguienteImagen() {
        const totalCards = carrusel.children.length;
        const maxIndex = totalCards - cardsToShow;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarrusel();
        }
    }

    function anteriorImagen() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarrusel();
        }
    }

    // Event listeners
    botonSiguiente.addEventListener('click', siguienteImagen);
    botonAnterior.addEventListener('click', anteriorImagen);
}

// FUNCION PARA CREAR UNA CARD
function crearCard(juego,estilo){
    const card = document.createElement('div');
    card.className = estilo;

    if(estilo === "card-grande"){
        // Debug: verificar si llegan los datos --->LLEGAN
        //console.log("Creando card para:", juego.name, "Imagen:", juego.background_image);

        const divImagen = document.createElement('div');
        divImagen.style.backgroundImage = `url(${juego.background_image})`;

        const nombreJuego = document.createElement('p');
        nombreJuego.innerHTML = juego.name;
        card.appendChild(divImagen);
        card.appendChild(nombreJuego);
        /*card.innerHTML = `
            <h2>${juego.name}</h2>
            <p>Descripción: ${juego.description}</p>
            <p>Valoración: ${juego.rating}</p>
            <button class="boton-jugar">Jugar</button>
        `;*/
        return card;
    }

    else if(estilo === "card-chica"){
        const card = document.createElement('div');
        card.className = estilo;
        
        // Debug: verificar si llegan los datos--->LLEGAN
        //console.log("Creando card para:", juego.name, "Imagen:", juego.background_image);
        
        card.style.backgroundImage = `url(${juego.background_image})`;
        /*card.innerHTML = `
            <h2>${juego.name}</h2>
            <p>Valoracion: ${juego.rating}</p>
            <button class="boton-jugar">Jugar</button>
        `;*/
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

// FUNCION PARA INICIALIZAR LOS CARROUSELS
async function inicializarCarrousels(){
    await fetchJuegos();
    await crearCarrouselGrande(await juegosPorGenero('sHooTer'),'Shooter');
    await crearCarrouselChico(await juegosPorGenero('Action'),'Action');
    await crearCarrouselChico(await juegosPorGenero('Indie'),'Indie');
    await crearCarrouselChico(await juegosPorGenero('Adventure'),'Adventure');
}

inicializarCarrousels();

