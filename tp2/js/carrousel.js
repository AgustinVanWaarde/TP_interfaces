let juegos = [];

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

function juegosPorGenero(genero){
    let juegosFiltrados = [];
    for(let j=0; i < juegos.length; i++){
        for(let g; g < juegos[i].genres.length; g++){
            if(juegos[i].genres[g] === genero){
                juegosFiltrados.push(juegos[i]);
            }
        }
    }
    return juegosFiltrados;
}

async function inicializarCarrousels(){
    await fetchJuegos();
}

inicializarCarrousels();

