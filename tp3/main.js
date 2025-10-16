"use strict";

import Blocka from './Blocka.js';


// Selectores del DOM
const canvas = document.getElementById('myCanvas');

const imagen = new Image();
imagen.src = './posiblesImagenes/image.png';


imagen.onload = function() {
    const blocka = new Blocka(canvas, imagen, 4, 110);

    blocka.dibujar();

    // Evento cuando hago click en el canvas
    canvas.addEventListener('mousedown' , (e) => {

        // Obtengo la sub-imagen donde hizo click, si es que hizo click en alguna en mi rango de coords
        const subImg = blocka.obtenerSubImagenPorClick(e.offsetX, e.offsetY);
        console.log(subImg);

        // Si hizo click en alguna sub-imagen, sigo
        if(subImg != null) {

            if(e.button === 0) {// Click izquierdo
                blocka.rotarSubImagen(subImg.id, -90);
            }

            else if(e.button === 2) {// Click derecho
                blocka.rotarSubImagen(subImg.id, 90);
            }


            // Verifico si ya completo el blocka
            if(blocka.blockaCompletado()) {
                console.log("FELICITACIONES GANASTE");
            }
        }
    })

    // Evitar el menu contextual al hacer click derecho en el canvas, menu desplegable del navegador con click derecho prevenido
    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}