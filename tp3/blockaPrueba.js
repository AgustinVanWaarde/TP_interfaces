const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const canvas2 = document.getElementById('myCanvas2');
const ctx2 = canvas2.getContext('2d');

let imagen = new Image();
imagen.src = 'image.png';

function dividirImagen(img, divisionEnPartes, tamSubImagen){
    const w = img.width / 2; // ancho de cada parte en px de la imagen original, /2 porque quiero 2 sub-imagenes por fila
    const h = img.height / (divisionEnPartes/2);// alto de cada parte en px de la imagen original, /2 porque quiero 2 sub-imagenes por columna
    const fraccionSubImagen = tamSubImagen; // tamaño en px de cada sub-imagen en el canvas destino
    const espacioEntreSubImagenes = 15; // espacio en px entre cada sub-imagen en el canvas destino
    let yDibujar = 0, xDibujar = 0; // coordenadas donde se va a dibujar la sub-imagen en el canvas
    let yImagen = 0, xImagen = 0; // coordenadas de la sub-imagen en la imagen original


    // Recorre filas y columnas para dibujar cada sub-imagen
    for(let fila = 0; fila < divisionEnPartes/2; fila++){
        xDibujar = 0;
        xImagen = 0;
        for(let col = 0; col < divisionEnPartes/2; col++){
            // Funcion de la libreria de canvas para dibujar una parte de la imagen original en el canvas
            ctx2.drawImage(img, xImagen, yImagen, w, h, xDibujar, yDibujar, fraccionSubImagen, fraccionSubImagen);
            xDibujar += fraccionSubImagen + espacioEntreSubImagenes;
            xImagen += w;
        }
        yDibujar += fraccionSubImagen + espacioEntreSubImagenes;
        yImagen += h;
    }

}

imagen.onload = function() {
    ctx.drawImage(imagen, 0, 0, 500, 500);

    dividirImagen(imagen, 4, 300);
}