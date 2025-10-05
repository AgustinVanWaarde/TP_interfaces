"use strict";

import { inicializarCarrousels } from './carrousel.js';
import { generarFormularios } from './login.js';


// Elementos del DOM
const main = document.getElementById('main-content');


//inicializarConLogin
generarFormularios();


// Eventos para los links y cargar carrousels al iniciar sesion
let btnIniciarSesion = document.querySelectorAll('.btn-iniciar-sesion');
btnIniciarSesion.forEach(btn => {
    btn.addEventListener('click', inicializarCarrousels);
});


// Evento para cerrar sesion
let btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
btnCerrarSesion.addEventListener('click', generarFormularios);

