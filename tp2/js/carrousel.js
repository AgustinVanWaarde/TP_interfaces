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



async function inicializarCarrousels(){
    await fetchJuegos();
}

inicializarCarrousels();

