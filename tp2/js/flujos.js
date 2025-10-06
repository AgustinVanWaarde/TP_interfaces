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
export async function inicializarCarrouselsEnMain(){
    main.innerHTML = ''; // Limpia todo
    mostrarLoader();

    await inicializarCarrousels();

    console.log("Carrousels Cargados");
}



//inicializarConLogin
export async function inicializarConLogin(){
    main.innerHTML = ''; // Limpia todo
    await generarFormularios();

    // Eventos para los links y cargar carrousels al iniciar sesion
    let btnIniciarSesion = document.querySelectorAll('.btn-iniciar-sesion');
    btnIniciarSesion.forEach(btn => {
        btn.addEventListener('click', inicializarCarrouselsEnMain);
    });

    
    // Evento para boton registrar en formulario de registro para ir al home
    let btnRegistrar = document.getElementById('boton-registrar');
    btnRegistrar.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevenir envío por defecto
            
        // obtener el formulario
        const form = btnRegistrar.closest('form');
        
        // validar usando validation
        if (form.checkValidity()) {
            // formulario válido, proceder
            await inicializarCarrouselsEnMain();
        } else {
            // formulario inválido, mostrar errores
            form.reportValidity(); // Muestra los mensajes de error nativos
            console.log('Por favor completa todos los campos requeridos');
        }
    });

}



// Incializacion de la pagina con login
inicializarConLogin();




    

