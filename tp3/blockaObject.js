"use strict";

class SubImagen {
    
    constructor(id, x, y, imagen, width, height, imgX, imgY, tamanioSubImagen) {
        this.id = id;

        // Posicion de la foto original
        this.width = width;
        this.height = height;
        this.imgX = imgX;
        this.imgY = imgY;

        // Posicion del dibujo en el canvas
        this.x = x;
        this.y = y;
        this.tamanioSubImagen = tamanioSubImagen;

        // Rotacion actual arranca en 0
        this.rotacion = 0;

        // Imagen original
        this.imagen = imagen;
    }


    estaBienPosicionada() {
        return this.rotacion === 0;
    }


    // Rota la sub-imagen en angulos fijos pasados por el evento de click (90 o -90)
    rotarAlClickear(angulos) {
        // Rota 90 grados en sentido horario
        this.rotacion += angulos;

        // Mantener la rotacion entre 0 y 360 grados
        this.rotacion = this.rotacion % 360;

        // Asegurar que la rotacion sea positiva y si es negativa la ajusto lo ajusto a 360 que es lo mismo que 0
        if(this.rotacion < 0) this.rotacion += 360;
    }


    // Dibuja la sub-imagen en el canvas
    dibujar(ctx) {
        ctx.save(); // Guardar el estado actual del canvas

        // Posicion centrica de la sub-imagen
        const cenX = this.x + this.tamanioSubImagen / 2;
        const cenY = this.y + this.tamanioSubImagen / 2;


        // Mover el origen al centro de la sub-imagen, TRASLADO la coordenada 0,0 del canvas al centro de la sub-imagen
        ctx.translate(cenX, cenY); 

        // Rotar el canvas COMPLETO IMPORTANTE
        ctx.rotate((this.rotacion * Math.PI) / 180);


        // Coordenadas para dibujar nuevamente por el cambio del translate
        //IMPORTANTE HACERLO para que mi coordenada 0,0 vuelva a ser la esquina superior izquierda de la sub-imagen
        let coordDibujo = -this.tamanioSubImagen / 2;

        ctx.drawImage(
            this.imagen, // Imagen original
            this.imgX, this.imgY, this.width, this.height, // Parte de la imagen original a dibujar
            coordDibujo, coordDibujo, this.tamanioSubImagen, this.tamanioSubImagen // Donde y tamaño en el canvas
        );

        ctx.restore(); // Restaurar el estado original del canvas ya que rote y traslade TODO el canvas
    }


    // Verifica si el click (x,y) esta dentro de la sub-imagen
    clickDentro(x, y) {
        return  x >= this.x && 
                x <= this.x + this.tamanioSubImagen &&
                y >= this.y && 
                y <= this.y + this.tamanioSubImagen;
    }
}


class Blocka {

    constructor(canvas, imagen, divisionEnPartes, tamSubImagen) {
        // Inicializar propiedades de contexto y canvas
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.imagen = imagen;

        // Datos del rompecabezas
        this.divisionEnPartes = divisionEnPartes;
        this.tamSubImagen = tamSubImagen;
        this.ESPACIOENTRESUBIMAGENES = 15;

        // Array donde voy a almacenar las sub-imagenes
        this.subImagenes = [];

        this.dividirRompecabezas();
        this.mezclarRotaciones();
    }


    // Divide la imagen original en sub-imagenes y las almacena en el array subImagenes al instanciar el objeto
    dividirRompecabezas() {
        const w = this.imagen.width / 2; // ancho de cada parte en px de la imagen original, /2 porque quiero 2 sub-imagenes por fila
        const h = this.imagen.height / (this.divisionEnPartes/2);// alto de cada parte en px de la imagen original, /2 porque quiero 2 sub-imagenes por columna

        let yDibujo = 0, xDibujo = 0; // coordenadas donde se va a dibujar la sub-imagen en el canvas
        let yImagen = 0, xImagen = 0; // coordenadas de la sub-imagen en la imagen original

        let id = 0; // id para cada sub-imagen "static y unico"

        // Recorre filas y columnas para dibujar cada sub-imagen
        for(let fila = 0; fila < this.divisionEnPartes/2; fila++) {
            xDibujo = 0;
            xImagen = 0;
            
            for(let col = 0; col < this.divisionEnPartes/2; col++) {
                // Instancion cada sub-imagen
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
            const indiceAleatorio = Math.round(Math.random() * (rotacionesPosibles.length) - 1);
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




// Selectores del DOM
const canvas = document.getElementById('myCanvas');

const imagen = new Image();
imagen.src = 'image.png';


imagen.onload = function() {
    const blocka = new Blocka(canvas, imagen, 4, 300);

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