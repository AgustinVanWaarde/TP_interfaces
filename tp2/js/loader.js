"use strict";

/* Control del loader de la pagina */
function cargarPagina() {
    const loader = document.getElementById('loader');
    if(loader) {
        loader.classList.remove('loader-container-hidden');
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('loader-container-hidden');
            }, 5000);
        });
    }
}

cargarPagina();
