"use strict"

import Ficha from "./Ficha.js";

class Tablero {
    constructor(tamanioCelda, radioFichas, xTablero, yTablero) {
        this.tamanioCelda = tamanioCelda; // Tamaño de cada celda del tablero
        this.radioFichas = radioFichas; // Radio de las fichas
        this.xTablero = xTablero; // Posición X del tablero en el canvas(donde arranco a dibujar)
        this.yTablero = yTablero; // Posición Y del tablero en el canvas


        /* 
        * Matriz para representar el tablero
        * -1 indica que la celda está vacía(NO SE DIBUJA)
        * 0 indica que la celda esta vacia(SIN FICHA)
        * 1 indica que la celda tiene una ficha
        */
        this.matriz = [
            [-1, -1, 1, 1, 1, -1, -1],
            [-1, -1, 1, 1, 1, -1, -1],
              [1, 1, 1, 1, 1, 1, 1],
              [1, 1, 1, 0, 1, 1, 1],
              [1, 1, 1, 1, 1, 1, 1],
            [-1, -1, 1, 1, 1, -1, -1],
            [-1, -1, 1, 1, 1, -1, -1]
        ];


        // Arreglo de posibles imagenes para las fichas
        this.imagenesFichasPosibles = [
            { src : "./js/pegGame/fichas/pacmanFicha.png", imagen : null},
            { src: "./js/pegGame/fichas/fantasmaRojoFicha.png", imagen : null},
            { src: "./js/pegGame/fichas/fantasmaCelesteFicha.png", imagen : null},
            { src: "./js/pegGame/fichas/fantasmaVerdeFicha.png", imagen : null}
        ];
        // Estado de si las imagenes se han cargado
        this.imagenesCargadas = false;
        // Invoco la funcion para cargar las imagenes
        this.cargarImagenes();


        // Arreglo para almacenar las fichas en el tablero
        this.fichas = [];


        // Esperar a que las imagenes se carguen y luego inicializar las fichas
        const intervalo = setInterval(() => {
            if(this.imagenesCargadas) {
                clearInterval(intervalo);

                // Inicializar las fichas en el tablero según la matriz
                this.inicializarFichas();
            }
        }, 50);
    }


    // Metodo para incializar las fichas en el tablero según la matriz
    inicializarFichas() {
        // Recorrer la matriz por filas
        for(let fila = 0; fila < this.matriz.length; fila++) {
            // Recorrer la matriz por columnas
            for(let columna = 0; columna < this.matriz[fila].length; columna++) {

                // Solo agrego fichas donde la matriz tiene un 1(TIENE FICHA)
                if(this.matriz[fila][columna] === 1) {
                    // Calcular posición X e Y de la ficha en el canvas
                    // La formula toma en cuenta el tamaño de la celda y la posición que se dibuja el tablero
                    // + tamanioCelda/2 para centrar la ficha en la celda(circulo se dibuja desde el centro)
                    const x = (this.xTablero) + (columna * this.tamanioCelda) + (this.tamanioCelda / 2);
                    const y = (this.yTablero) + (fila * this.tamanioCelda) + (this.tamanioCelda / 2);

                    // Selecciono una imagen para la ficha,segun la region del tablero
                    let imagenFicha = this.obtenerImagenFicha(fila,columna);

                    // Crear una nueva ficha y agregarla al arreglo de fichas
                    let ficha = new Ficha(fila,columna,x,y,this.radioFichas,"#65849bff", imagenFicha);

                    // Agregar la ficha al arreglo
                    this.fichas.push(ficha);
                }

            }

        }
    }


    // Metodo para sacar una imagen aleatoria para la ficha
    obtenerImagenFicha(fila,columna) {
        // Diferentes colores según la región del tablero
        const indice = (fila + columna) % this.imagenesFichasPosibles.length;
        return this.imagenesFichasPosibles[indice].imagen;
    }


    // Metodo el cual devuelve una imagen para la ficha
    cargarImagenes() {
        let contadorCargas = 0;
        let contadorTotal = this.imagenesFichasPosibles.length;

        for(let imgObj of this.imagenesFichasPosibles) {
            // Crear un nuevo objeto de imagen
            const imagen = new Image();

            // Establecer la fuente de la imagen (puedes cambiar la ruta a la imagen que desees)
            imagen.src = imgObj.src;

            // Evento onload para saber cuando la imagen se ha cargado
            imagen.onload = () => {
                contadorCargas++;
                imgObj.imagen = imagen; // Guardar la imagen cargada en el objeto correspondiente
                if(contadorCargas === contadorTotal) {
                    this.imagenesCargadas = true;
                }
            }
        }
    }


    // Metodo para dibujar el tablero y las fichas en el canvas
    dibujar(ctx) {
        // Dibujar las celdas del tablero
        this.dibujarCeldas(ctx);

        // Dibujar las fichas una vez dibujado el tablero
        for(let ficha of this.fichas){
            ficha.dibujarConImagen(ctx);
        }
    }


    // Metodo para reiniciar el tablero a su estado inicial
    reiniciarTablero() {
        // Reiniciar la matriz al estado inicial
        this.matriz = [
            [-1, -1, 1, 1, 1, -1, -1],
            [-1, -1, 1, 1, 1, -1, -1],
              [1, 1, 1, 1, 1, 1, 1],
              [1, 1, 1, 0, 1, 1, 1],
              [1, 1, 1, 1, 1, 1, 1],
            [-1, -1, 1, 1, 1, -1, -1],
            [-1, -1, 1, 1, 1, -1, -1]
        ];

        // Vaciar el arreglo de fichas
        this.fichas = [];

        // Inicializar las fichas nuevamente
        this.inicializarFichas();
    }


    // Metodo para dibujar las celdas del tablero
    dibujarCeldas(ctx) {
        for(let fila = 0; fila < this.matriz.length; fila++) {
            for(let columna = 0; columna < this.matriz[fila].length; columna++) {

                // Solo dibujo las celdas que no son -1(ESPACIOS VACIOS)
                if(this.matriz[fila][columna] !== -1) {

                    // Calcular posición X e Y de la celda en el canvas
                    const x = (this.xTablero) + (columna * this.tamanioCelda);
                    const y = (this.yTablero) + (fila * this.tamanioCelda);

                    // Veo que tipo de color de celda correspone
                    if(this.matriz[fila][columna] === 0)
                        ctx.fillStyle = "#DDD"; // Celda vacia
                    else
                        ctx.fillStyle = "#F5F5F5"; // Celda con ficha

                    // Dibujar la celda como un rectángulo relleno
                    ctx.fillRect(x, y, this.tamanioCelda, this.tamanioCelda);

                    // Dibujar borde de la celda
                    ctx.strokeStyle = "#999";
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, this.tamanioCelda, this.tamanioCelda);

                    // Dibujar un circulo en el centro de la celda si esta vacio
                    if(this.matriz[fila][columna] === 0) {
                        ctx.beginPath();
                        ctx.arc(
                            x + this.tamanioCelda / 2, // Centro X de la celda
                            y + this.tamanioCelda / 2, // Centro Y de la celda
                            7, // Radio del circulo
                            0,
                            Math.PI * 2
                        );
                        ctx.fillStyle = "#AAA";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }
    }


    // Metodo para ver cuantas fichas quedan en el tablero
    contarFichas() {
        return this.fichas.length;
    }


    // Metodo para obtener el ancho y alto del tablero en pixeles
    obtenerDimensionesTablero() {
        const ancho = this.matriz[0].length * this.tamanioCelda;
        const alto = this.matriz.length * this.tamanioCelda;
        return { ancho: ancho, alto: alto };
    }


    // Metodo para obtener una ficha si es que esta en tal posicion
    obtenerFichaEnPosicion(x, y) {
        // Recorrer todas las fichas en el tablero usando for (no forEach porque necesitamos return)
        for(let ficha of this.fichas) {
            // Verificar si la ficha contiene el punto (x, y)
            if(ficha.contienePunto(x, y)) {
                return ficha; // Retornar la ficha encontrada
            }
        }
        return null; // No se encontró ninguna ficha en esa posición
    }


    // Metodo para convertir coordenadas x e y a indices de la matriz del tablero
    coordenadasAPosicionMatriz(x, y) {
        // Calcular la fila y columna en la matriz del tablero basándose en las coordenadas x e y
        // Restar la posición del tablero para obtener coordenadas relativas dentro del tablero(canvas)
        // Math.floor para redondear hacia abajo y obtener el índice correcto
        const columna = Math.floor((x - this.xTablero) / this.tamanioCelda);
        const fila = Math.floor( (y - this.yTablero) / this.tamanioCelda);

        // Verificar si esta dentro de los indices de la matrziz
        if(fila >= 0 && fila < this.matriz.length &&
            columna >= 0 && columna < this.matriz[fila].length) {
            return { fila: fila, columna: columna }; // Retornar la posición en la matriz
        }

        // Si esta fuera de los indices, retornar null
        return null;
    }


    // Metodo para obtener coordenadas en base a indices de la matriz
    posicionMatrizACoordenadas(fila, columna) {
        const x = (this.xTablero) + (columna * this.tamanioCelda) + (this.tamanioCelda / 2);
        const y = (this.yTablero) + (fila * this.tamanioCelda) + (this.tamanioCelda / 2);
        return { x: x, y: y };
    }


    // Metodo para verificar si el movimiento esta dentro del tablero
    estaDentroDelTablero(fila, columna) {
        // Retornar true si la fila y columna estan dentro de los limites de la matriz y distinto de -1
        return (fila >= 0 && fila < this.matriz.length &&
                columna >= 0 && columna < this.matriz[fila].length &&
                this.matriz[fila][columna] !== -1
        );
    }


    // Metodo para verificar que es movimiento valido(segun las reglas del juego)
    esMovimientoValido(filaOrigen, columnaOrigen, filaDestino, columnaDestino) {
        // Verificar que las posiciones esten dentro de los indices
        if(!this.estaDentroDelTablero(filaOrigen, columnaOrigen) ||
            !this.estaDentroDelTablero(filaDestino, columnaDestino)){
                return false;
        }

        // verificar que la celda de origen tenga una ficha y la celda destino este vacia
        if(this.matriz[filaOrigen][columnaOrigen] !== 1 ||
            this.matriz[filaDestino][columnaDestino] !== 0){
                return false;
        }

        // Calcular las celdas(filas o columnas) que se mueve la ficha --> diferencia
        // Uno de los dos debe ser 2 y el otro 0 (movimiento horizontal o vertical)
        const movFila = filaDestino - filaOrigen;
        const movColumna = columnaDestino - columnaOrigen;

        // Math.abs para obtener el valor absoluto(sin signo,positivo)
        // Sino puede romper cuando se mueve hacia arriba o izquierda
        if( (movColumna === 0 && Math.abs(movFila) === 2) || 
            (movFila === 0 && Math.abs(movColumna) === 2) ){
                
                // Calcular la posicion de la ficha del medio entre el origen y destino
                const filaMedia = filaOrigen + (movFila / 2);
                const columnaMedia = columnaOrigen + (movColumna / 2);

                return this.matriz[filaMedia][columnaMedia] === 1; // Debe haber una ficha en el medio
        }

        return false; // Movimiento no valido
    }


    // Metodo para ejecutar un movimiento en el tablero
    ejecutarMovimiento(filaOrigen, columnaOrigen, filaDestino, columnaDestino) {
        // Verificar si el movimiento es valido
        if(!this.esMovimientoValido(filaOrigen, columnaOrigen, filaDestino, columnaDestino)) {
            return false; // No se puede ejecutar el movimiento
        }


        // Actualizar la matriz del tablero
        // (fichaEliminada en origen, ficha agregada en destino, ficha eliminada en el medio)
        this.matriz[filaOrigen][columnaOrigen] = 0; // Origen queda vacio
        this.matriz[filaDestino][columnaDestino] = 1; // Destino tiene una ficha


        // Calcular ficha en el medio y eliminarla
        // (indiceDestino - indiceOrigen) / 2 me da la mitad del movimiento --> ficha en el medio
        const filaMedia = filaOrigen + ( (filaDestino - filaOrigen) / 2);
        const columnaMedia = columnaOrigen + ( (columnaDestino - columnaOrigen) / 2);
        this.matriz[filaMedia][columnaMedia] = 0; // Eliminar ficha en el medio


        // Obtener fichasPorMatriz
        const fichaMovida = this.obtenerFichaEnMatriz(filaOrigen, columnaOrigen);
        const fichaEliminada = this.obtenerFichaEnMatriz(filaMedia, columnaMedia);


        // Eliminar la ficha saltada si existe(debe existir a esta altura)
        if(fichaEliminada) {
            const indexFichaEliminada = this.fichas.indexOf(fichaEliminada);
            this.fichas.splice(indexFichaEliminada, 1); // Eliminar ficha del arreglo
        }


        // Actulizar coordenadas y indices de la ficha movida
        if(fichaMovida) {
            fichaMovida.fila = filaDestino;
            fichaMovida.columna = columnaDestino;
            const nuevasCoordenadas = this.posicionMatrizACoordenadas(filaDestino, columnaDestino);
            fichaMovida.setearCoordenadas(nuevasCoordenadas.x, nuevasCoordenadas.y);
        }


        return true; // Movimiento ejecutado con exito
    }


    // Metodo para obtener una ficha si es que esta en la matriz del tabler
    obtenerFichaEnMatriz(fila, columna) {
        // Retornar la ficha que coincida con la fila y columna dadas
        return this.fichas.find((ficha) =>
            ficha.fila === fila && ficha.columna === columna
        ) 
        || null; // Retornar null si no se encuentra ninguna ficha
    }


    // Metodo para obtener los movimiento posibles desde una posicion dada(ficha)
    obtenerPosiblesMovimientos(filaOrigen, columnaOrigen) {
        const movimientos = [];

        // Definir las posibles direcciones de movimiento (arriba, abajo, izquierda, derecha)
        const direcciones = [
            { fila: -2, columna: 0 }, // Arriba
            { fila: 2, columna: 0 },  // Abajo
            { fila: 0, columna: -2 }, // Izquierda
            { fila: 0, columna: 2 }   // Derecha
        ]

        // Verificar cada dirección para ver si el movimiento es válido
        direcciones.forEach(direccion => {
            // Calcular la posición de destino basándose en la dirección actual + las de los posibles movimientos
            const filaDestino = filaOrigen + direccion.fila;
            const columnaDestino = columnaOrigen + direccion.columna;

            // Verificar si el movimiento es válido y agregarlo a la lista de movimientos posibles
            if(this.esMovimientoValido(filaOrigen, columnaOrigen, filaDestino, columnaDestino)) {
                movimientos.push({ fila: filaDestino, columna: columnaDestino });
            }
        })

        return movimientos; // Retornar el arreglo de movimientos posibles
    }


    // Metodo para verificar si en el juego quedan movimientos posibles
    quedanMovimientosPosibles() {
        // Recorrer todas las filas y columnas de la matriz(tablero)
        for(let fila = 0; fila < this.matriz.length; fila++) {
            for(let columna = 0; columna < this.matriz[fila].length; columna++) {

                // Solo verificar las celdas que tienen una ficha
                if(this.matriz[fila][columna] === 1) {
                    // Obtener los posibles movimientos desde esta posicion
                    const movimientos = this.obtenerPosiblesMovimientos(fila, columna);

                    // Si hay al menos un movimiento ya retorno true
                    if(movimientos.length > 0)
                        return true;
                }
            }
        }
        return false; // Si no se encontraron movimientos, retornar false
    }
}


export default Tablero;