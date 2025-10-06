"use strict";

import { inicializarCarrousels } from './carrousel.js';
import { generarFormularios } from './login.js';


const main = document.getElementById('main-content');



// Funcion para scrollear pantalla hacia arriba
// Se usa cuando cambiamos de vista (login a home) para empezar desde el tope
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Efecto de desplazamiento suave
    });
}



/* Control del loader de la pagina */
function mostrarLoader() {
    const loader = document.getElementById('loader');
    if(loader) {
        loader.classList.remove('loader-container-hidden');
        loader.classList.add('loader-container');
        document.body.style.overflow = 'hidden'; // Evita scroll mientras carga

        // Iniciar barra de progreso y animacion del loader
        iniciarBarraProgresoYLoader();
    }
}

function ocultarLoader(loader) {
    if(!loader) return;

    loader.classList.add('loader-container-hidden');
    loader.classList.remove('loader-container');
    document.body.style.overflow = 'auto'; // Rehabilita scroll
}

// Barra de progreso y animacion del loader
// Simula una carga de 5 segundos con actualizaciones cada 1 segundo
function iniciarBarraProgresoYLoader() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    let progress = 0;
    const duration = 5000; // Duracion total de la animacion en milisegundos
    const interval = 1000; // Frecuencia de actualizacion de la barra
    const increment = (100 / duration) * interval; // Calcula cuanto debe crecer la barra en cada actualizacion (20% por segundo en este caso)

    // Resetear al inicio
    progressBar.style.width = '0%';
    progressText.textContent = '0%';

    // Temporizador para ocultar el loader cuando termine
    setTimeout(() => {
        ocultarLoader(loader);
    }, 5000);

    // Intervalo que actualiza la barra cada segundo
    const timer = setInterval(() => {
        progress += increment;

        // Si llega al 100% detiene el intervalo
        if (progress >= 100) {
            progress = 100;
            clearInterval(timer);
        }

        // Actualizar barra y texto de progreso
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
    }, interval);
}



//inicializarCarrousels
export async function inicializarCarrouselsEnMain(){
    mostrarLoader();

    main.innerHTML = ''; // Limpia todo

    scrollToTop();

    await inicializarCarrousels();

    console.log("Carrousels Cargados");
}



//inicializarConLogin
export async function inicializarConLogin(){
    main.innerHTML = ''; // Limpia todo

    scrollToTop();

    await generarFormularios();

    // Eventos para los links y cargar carrousels al iniciar sesion
    let btnIniciarSesion = document.querySelectorAll('.btn-iniciar-sesion');
    btnIniciarSesion.forEach(btn => {
        btn.addEventListener('click', inicializarCarrouselsEnMain);
    });

    
    // Evento para boton registrar en formulario de registro para ir al home
    let btnRegistrar = document.getElementById('boton-registrar');
    btnRegistrar.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevenir envio por defecto del formulario
            
        // Buscar el formulario padre del boton
        const form = btnRegistrar.closest('form');
        
        // checkValidity revisa que todos los campos required esten completos y validos
        if (form.checkValidity()) {
            // Si el formulario es valido, proceder a cargar los carrousels
            await inicializarCarrouselsEnMain();
        } else {
            // Si el formulario es invalido, mostrar mensajes de error comunes del form
            form.reportValidity(); // Muestra los mensajes de error nativos del navegador
            console.log('Por favor completa todos los campos requeridos');
        }
    });

}



// Incializacion de la pagina con login
inicializarConLogin();




    

