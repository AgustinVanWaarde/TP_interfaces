"use strict";

// Elementos del DOM
const btnHamburguesa = document.getElementById('btn-hamburguesa');
const btnPerfil = document.getElementById('btn-perfil');

const menuHamburguesa = document.querySelector('.opciones-menu-hamburguesa');
const menuPerfil = document.querySelector('.opciones-perfil');
const overlay = document.querySelector('.menu-overlay');

// Variables de estado
let hamburguesaAbierto = false;
let perfilAbierto = false;

// Función para toggle del menú hamburguesa
function toggleMenuHamburguesa() {
    if (hamburguesaAbierto) {
        // CERRAR menú
        overlay.classList.remove('menu-overlay-active');
        menuHamburguesa.classList.remove('opciones-menu-hamburguesa-active');
        btnHamburguesa.src = './imgs/menuHamburguesa.png';
        hamburguesaAbierto = false;
    } else {
        if(perfilAbierto){
            // CERRAR menú perfil si está abierto
            menuPerfil.classList.remove('opciones-perfil-active');
            perfilAbierto = false;
        }
        // ABRIR menú
        overlay.classList.add('menu-overlay-active');
        menuHamburguesa.classList.add('opciones-menu-hamburguesa-active');
        btnHamburguesa.src = './imgs/cerrarHamburguesa.png';
        hamburguesaAbierto = true;
    }
}

// Funcion para toggle del menu perfil
function toggleMenuPerfil() {
    if (perfilAbierto) {
        // CERRAR menú
        overlay.classList.remove('menu-overlay-active');
        menuPerfil.classList.remove('opciones-perfil-active');
        perfilAbierto = false;
    } 
    else {
        if(hamburguesaAbierto){
            // CERRAR menú hamburguesa si está abierto
            menuHamburguesa.classList.remove('opciones-menu-hamburguesa-active');
            hamburguesaAbierto = false;
        }
        // ABRIR menú
        overlay.classList.add('menu-overlay-active');
        menuPerfil.classList.add('opciones-perfil-active');
        perfilAbierto = true;
    }
}


// Evento click en botón hamburguesa
btnHamburguesa.addEventListener('click', toggleMenuHamburguesa);

// Evento click en botón perfil
btnPerfil.addEventListener('click', toggleMenuPerfil);

// Evento para volver al home al hacer click en logo
const logo = document.querySelector('.titulo-grupo');
logo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // ⭐ Animación suave
    });
});
