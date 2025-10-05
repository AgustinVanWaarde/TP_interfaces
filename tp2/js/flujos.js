"use strict";

import { inicializarCarrousels , fetchJuegos } from './carrousel.js';
import { generarFormularios } from './login.js';


const main = document.getElementById('main-content');


/* Control del loader de la pagina */
function mostrarLoader() {
    const loader = document.getElementById('loader');
    if(loader) {
        loader.classList.remove('loader-container-hidden');
        loader.classList.add('loader-container');
        document.body.style.overflow = 'hidden'; // Evita scroll mientras carga

        setTimeout(() => {
            ocultarLoader(loader);
        }, 1000);
    }
}

function ocultarLoader(loader) {
    if(!loader) return;

    loader.classList.add('loader-container-hidden');
    loader.classList.remove('loader-container');
    document.body.style.overflow = 'auto'; // Rehabilita scroll
}



//inicializarCarrousels
async function inicializarCarrouselsEnMain(){
    main.innerHTML = ''; // Limpia todo
    mostrarLoader();

    await inicializarCarrousels();

    console.log("Carrousels inicializados");
}



//inicializarConLogin
async function inicializarConLogin(){
    main.innerHTML = ''; // Limpia todo
    await generarFormularios();

    // Eventos para los links y cargar carrousels al iniciar sesion
    let btnIniciarSesion = document.querySelectorAll('.btn-iniciar-sesion');
    btnIniciarSesion.forEach(btn => {
        btn.addEventListener('click', inicializarCarrouselsEnMain);
    });
}


// Evento para cerrar sesion y volver al login generico
document.getElementById('btn-cerrar-sesion').addEventListener('click', inicializarConLogin);


// Incializacion de la pagina con login
inicializarConLogin();

// Cargo los juegos y para traer generos al iniciar la pagina
fetchJuegos();

// Evento para volver al home tocando la categoria "home"
document.getElementById('volver-al-home').addEventListener('click', inicializarCarrouselsEnMain);

    

