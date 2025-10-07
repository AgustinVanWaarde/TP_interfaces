"use strict";

import { getGeneros } from './carrousel.js';
import { inicializarCarrouselsEnMain , inicializarConLogin } from './flujos.js';

// Elementos del DOM
const btnHamburguesa = document.getElementById('btn-hamburguesa');
const btnPerfil = document.getElementById('btn-perfil');

const menuHamburguesa = document.querySelector('.opciones-menu-hamburguesa');
const menuPerfil = document.querySelector('.opciones-perfil');
const overlay = document.querySelector('.menu-overlay');


// Variables de estado
let hamburguesaAbierto = false;
let perfilAbierto = false;



// Funcion para abrir o cerrar el menu hamburguesa
// Solo puede haber un menu abierto a la vez
function toggleMenuHamburguesa() {
    if (hamburguesaAbierto) {
        // Si el menu ya esta abierto, lo cierra
        overlay.classList.remove('menu-overlay-active');
        menuHamburguesa.classList.remove('opciones-menu-hamburguesa-active');
        btnHamburguesa.src = './imgs/menuHamburguesa.png';
        hamburguesaAbierto = false;
    } 
    else {
        // Si el menu perfil esta abierto, lo cierra primero
        if(perfilAbierto){
            menuPerfil.classList.remove('opciones-perfil-active');
            perfilAbierto = false;
        }
        // Abre el menu hamburguesa
        overlay.classList.add('menu-overlay-active');
        menuHamburguesa.classList.add('opciones-menu-hamburguesa-active');
        btnHamburguesa.src = './imgs/cerrarHamburguesa.png';
        hamburguesaAbierto = true;
    }
}



// Funcion para abrir o cerrar el menu de perfil
// Solo puede haber un menu abierto a la vez
function toggleMenuPerfil() {
    if (perfilAbierto) {
        // Si el menu ya esta abierto, lo cierra
        overlay.classList.remove('menu-overlay-active');
        menuPerfil.classList.remove('opciones-perfil-active');
        perfilAbierto = false;
    } 
    else {
        // Si el menu hamburguesa esta abierto, lo cierra primero
        if(hamburguesaAbierto){
            menuHamburguesa.classList.remove('opciones-menu-hamburguesa-active');
            hamburguesaAbierto = false;
        }
        // Abre el menu de perfil
        overlay.classList.add('menu-overlay-active');
        menuPerfil.classList.add('opciones-perfil-active');
        perfilAbierto = true;
    }
}



// Funcion para cargar generos al menu hamburguesa al cargar la pagina
async function cargarGenerosAlMenu(){
    const generos = await getGeneros();

    // Agrego los generos al menu hamburguesa
    const categoriasLista = document.getElementById('categorias-lista');
    if(categoriasLista){
        categoriasLista.innerHTML = '';// Limpio el contenido actual

        // Agrego un enlace para volver al home
        const enlaceHome = document.createElement('a');
        enlaceHome.href = '#';
        enlaceHome.textContent = 'Inicio';
        enlaceHome.id = 'btn-home';
        categoriasLista.appendChild(enlaceHome);

        for(let i=0; i< 6; i++){
            const enlace = document.createElement('a');
            enlace.href = '#';
            enlace.textContent = generos[i];
            categoriasLista.appendChild(enlace);
        }
    }
}



// Evento click en botón hamburguesa
btnHamburguesa.addEventListener('click', toggleMenuHamburguesa);

// Evento click en botón perfil
btnPerfil.addEventListener('click', toggleMenuPerfil);

// Evento click en overlay(cualquier lado de la pantalla) para cerrar menús
overlay.addEventListener('click' , () => {
    if(hamburguesaAbierto){
        toggleMenuHamburguesa(); // Cierro el menu hamburguesa si está abierto
    }
    if(perfilAbierto){
        toggleMenuPerfil(); // Cierro el menu perfil si está abierto
    }
})



// Evento para volver al tope de arriba de la pagina al hacer click en logo
const logo = document.querySelector('.titulo-grupo');
logo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'//animacion suave
    });
});



// Evento para cargar carrousels al hacer click en "Inicio" del menu hamburguesa y generos al hamburguesa
async function cargarGenerosYbotonHome(){
    await cargarGenerosAlMenu();

    document.getElementById('btn-home').addEventListener('click', async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace

        await inicializarCarrouselsEnMain(); // Cargo los carrousels en el main

        if(hamburguesaAbierto){
            toggleMenuHamburguesa(); // Cierro el menu hamburguesa si está abierto
        }
        
    });
}



// Eventor para volver al login al hacer click en "Cerrar Sesion" del menu perfil
document.getElementById('btn-cerrar-sesion').addEventListener('click', async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del enlace

    await inicializarConLogin(); // Vuelvo al login

    if(perfilAbierto){
        toggleMenuPerfil(); // Cierro el menu perfil si está abierto
    }
});



// Cargo los generos y boton home al iniciar la pagina
cargarGenerosYbotonHome();


