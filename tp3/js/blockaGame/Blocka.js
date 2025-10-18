"use strict";

import SubImagen from './Subimagen.js';

// Clase Blocka: representa el rompecabezas completo

class Blocka {

    constructor(canvas, imagen, divisionEnPartes, tamSubImagen) {
        // Inicializar propiedades de contexto y canvas
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.imagen = imagen;

        // Datos del rompecabezas
        this.divisionEnPartes = divisionEnPartes;
        this.tamSubImagen = tamSubImagen;
        this.ESPACIOENTRESUBIMAGENES = 10;

        // Array donde voy a almacenar las sub-imagenes
        this.subImagenes = [];

        this.dividirRompecabezas();
        this.mezclarRotaciones();
    }


    // FUNCION PARA SETEAR EL ESPACIO ENTRE SUB-IMAGENES Y DIVIDIR EL ROMPECABEZAS NUEVAMENTE
    setEspacioEntreSubImagenes(espacio) {
        this.ESPACIOENTRESUBIMAGENES = espacio;
        this.subImagenes = [];
        this.dividirRompecabezas();
    }

    // Divide la imagen original en sub-imagenes y las almacena en el array subImagenes al instanciar el objeto
    dividirRompecabezas() {
        // Ancho de cada parte en px de la imagen original,(divisionEnPartes/2) 
        // porque quiero la mitad de particiones sub-imagenes por FILA
        const w = this.imagen.width / (this.divisionEnPartes/2); 

        // Alto de cada parte en px de la imagen original, /2 porque quiero solamente 2 FILAS
        const h = this.imagen.height / 2;

        // FÓRMULA PARA CENTRAR: Calculamos el espacio total que ocuparan los bloques,cantidad de columnas
        const columnas = this.divisionEnPartes/2;
        const filas = 2;// 2 filas fijas
        
        // Calculamos el ancho y alto total que ocuparán todos los bloques con sus espacios
        // Bloque total de todas las sub-imagnes por FILA
        // Bloque total de todas las sub-imagnes por COLUMNA COMPLETA
        const anchoTotal = columnas * this.tamSubImagen + (columnas - 1) * this.ESPACIOENTRESUBIMAGENES;
        const altoTotal = filas * this.tamSubImagen + (filas - 1) * this.ESPACIOENTRESUBIMAGENES;
        
        // Calculamos el punto de inicio para centrar (esquina superior izquierda del primer bloque)
        const inicioX = (this.canvas.width - anchoTotal) / 2;
        const inicioY = (this.canvas.height - altoTotal) / 2;

        let yDibujo = inicioY, xDibujo = inicioX; // coordenadas donde se va a dibujar la sub-imagen en el canvas
        let yImagen = 0, xImagen = 0; // coordenadas de la sub-imagen en la imagen original

        let id = 0; // id para cada sub-imagen "static y unico"

        // Recorre filas y columnas para dibujar cada sub-imagen, 2 filas fijas
        for(let fila = 0; fila < 2; fila++) {
            xDibujo = inicioX;
            xImagen = 0;
            
            for(let col = 0; col < this.divisionEnPartes/2; col++) {
                // Instancio cada sub-imagen
                let subImg = new SubImagen(
                    id,
                    xDibujo, yDibujo,
                    this.imagen, w , h, xImagen, yImagen,
                    this.tamSubImagen
                );

                // Almaceno la sub-imagen en el array
                this.subImagenes.push(subImg);

                xDibujo += this.tamSubImagen + this.ESPACIOENTRESUBIMAGENES;
                xImagen += w;
                id++;
            }

            yDibujo += this.tamSubImagen + this.ESPACIOENTRESUBIMAGENES;
            yImagen += h;
        }
    }


    // Devuelve la sub-imagen donde se hizo click, o null si no hizo click en ninguna
    obtenerSubImagenPorClick(x, y) {
        // Recorro todas las sub-imagenes y pregunto si el click esta dentro de alguna
        for(let i = 0; i < this.subImagenes.length; i++) {
            if(this.subImagenes[i].clickDentro(x, y)) {
                return this.subImagenes[i];
            }
        }

        return null; // Si no hizo click en ninguna
    }


    // Asigna una rotacion aleatoria a cada sub-imagen
    mezclarRotaciones() {
        this.subImagenes.forEach(subImg => {
            // Asigna una rotacion aleatoria entre 0, 90, 180, 270
            const rotacionesPosibles = [0, 90, 180, 270];
            const indiceAleatorio = Math.round(Math.random() * (rotacionesPosibles.length - 1));
            subImg.rotacion = rotacionesPosibles[indiceAleatorio];
        })
    }


    // Dibuja todo el blocka en el canvas
    dibujar() {
        // Limpia el canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibuja cada sub-imagen
        this.subImagenes.forEach(subImg => subImg.dibujar(this.ctx));
    }


    // Rota la sub-imagen con el id pasado en angulos fijos (90 o -90) y redibuja todo el blocka
    async rotarSubImagen(id, angulos) {
        if(id >= 0 && id < this.subImagenes.length) {
            this.subImagenes[id].rotarAlClickear(angulos);
            // this.subImagenes[id].dibujar(this.ctx); 
            this.dibujar(); // Redibuja todo el blocka
        }
    }


    // Verifica si todas las sub-imagenes estan bien posicionadas para saber si gane el blocka o no
    blockaCompletado() {
        return this.subImagenes.every(subImg => subImg.estaBienPosicionada());
    }
}


// Exportar la clase Blocka para usarla en otros archivos(para su instanciacion)
export default Blocka;