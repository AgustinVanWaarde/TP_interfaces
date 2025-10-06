function toggleComentarios() {
    const comentariosOcultos = document.querySelectorAll('.comentario.oculto');
    const container = document.querySelector('.comentarios-container');
    const verMas = document.querySelector('.ver-mas');
    
    if (container.classList.contains('expandido')) {
        // Contraer
        comentariosOcultos.forEach(comentario => {
            comentario.classList.remove('mostrar');
            setTimeout(() => {
                comentario.style.display = 'none';
            }, 300);
        });
        container.classList.remove('expandido');
        verMas.textContent = 'ver mas...';
    } else {
        // Expandir
        container.classList.add('expandido');
        comentariosOcultos.forEach((comentario, index) => {
            setTimeout(() => {
                comentario.style.display = 'flex';
                setTimeout(() => {
                    comentario.classList.add('mostrar');
                }, 50);
            }, index * 100);
        });
        verMas.textContent = 'ver menos...';
        
        // Desplazamiento suave hacia abajo
        setTimeout(() => {
            container.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'end' 
            });
        }, 200);
    }
}

function agregarComentario() {
    const input = document.querySelector('.input-container input');
    const texto = input.value.trim();
    
    if (texto === '') return;
    
    const container = document.querySelector('.comentarios-container');
    const verMas = document.querySelector('.ver-mas');
    const tercerComentario = container.children[2];
    
    // Crear nuevo comentario
    const nuevoComentario = document.createElement('div');
    nuevoComentario.className = 'comentario';
    nuevoComentario.innerHTML = `
        <div class="avatar-pacman"></div>
        <div class="comentario-texto">
            <span class="nombre">pepegamer123:</span> ${texto}
        </div>
    `;
    
    // Mover el tercer comentario a ocultos
    tercerComentario.classList.add('oculto');
    tercerComentario.style.display = 'none';
    
    // Insertar nuevo comentario en posición del tercero
    container.insertBefore(nuevoComentario, tercerComentario);
    
    input.value = '';
}

// Event listener para el botón enviar
document.addEventListener('DOMContentLoaded', () => {
    const btnEnviar = document.querySelector('.btn-enviar');
    const input = document.querySelector('.input-container input');
    
    btnEnviar.addEventListener('click', agregarComentario);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') agregarComentario();
    });
});