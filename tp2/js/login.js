"use strict";
import { inicializarCarrousels } from './carrousel.js';

// Alternar formularios con animación

// Va hacia el formulario de REGISTRO
function flipToRegister() {
    const loginForm = document.querySelector('.fondo-formulario:not(.formulario-registro)');
    const registerForm = document.querySelector('.formulario-registro');
    
    loginForm.classList.add('flipping');
    
    setTimeout(() => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        registerForm.classList.add('flipping');
        
        setTimeout(() => {
            registerForm.classList.remove('flipping');
        }, 50);
    }, 300);
}

// Va hacia el formulario de LOGIN
function flipToLogin() {
    const loginForm = document.querySelector('.fondo-formulario:not(.formulario-registro)');
    const registerForm = document.querySelector('.formulario-registro');
    
    registerForm.classList.add('flipping');
    
    setTimeout(() => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'flex';
        loginForm.classList.add('flipping');
        
        setTimeout(() => {
            loginForm.classList.remove('flipping');
        }, 50);
    }, 300);
}

// Eventos para los links


// Mostrar/Ocultar contraseña
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const passwordInput = toggle.previousElementSibling;// Aggaro el hermano anterior del toggle (input de password anterior a imagen)
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.src = 'imgs/mostrar.png';
        } else {
            passwordInput.type = 'password';
            this.src = 'imgs/esconder.png';
        }
    });
});


const forumularioLogin = 
            `<!-- Formulario de inicio de sesión, inicialmente visible -->
            <div class="fondo-formulario">
                <h2 class="titulo-formulario">Iniciar Sesión</h2>
                <div class="botones-sociales">
                    <button class="boton-google btn-iniciar-sesion">
                        <span class="fondo-google"></span>
                        <img class="logo-google" src="imgs/logo google.jpg" alt="Google">
                        <span class="texto-google">Continuar con Google</span>
                    </button>
                    <button class="boton-facebook btn-iniciar-sesion">
                        <span class="fondo-facebook"></span>
                        <img class="logo-facebook" src="imgs/logo facebook.jpg" alt="Facebook">
                        <span class="texto-facebook">Continuar con Facebook</span>
                    </button>
                </div>
                <form class="formulario-credenciales">
                    <label for="usuario">Email</label>
                    <input type="text" id="usuario" name="usuario" placeholder="Usuario">

                    <label for="contrasena">Contraseña</label>
                    <div class="password-container">
                        <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña">
                        <img class="toggle-password" src="imgs/esconder.png" alt="Toggle password">
                    </div>

                    <button type="submit" class="boton-iniciar btn-iniciar-sesion">Iniciar sesión</button>
                </form>
                <div class="opciones-extra">
                    <span class="texto-no-cuenta">¿No tienes una cuenta?</span>
                    <a href="#" class="link-registrate">Regístrate</a>
                </div>
            </div><!-- cierre formulario-iniciarSesion -->`


const formularioRegistro =
            `<!-- Formulario de registro, inicialmente oculto -->
            <div class="formulario-registro fondo-formulario" style="display:none;">
                <h2 class="titulo-formulario">Registro</h2>
                <form class="formulario-credenciales">
                    <label>Nombre y apellido <span class="required">*</span><span class="required-text">campo obligatorio</span></label>
                    <input type="text" placeholder="Nombre y apellido" required>

                    <label>Apodo</label>
                    <input type="text" placeholder="Apodo">
                    
                    <label>Email <span class="required">*</span><span class="required-text">campo obligatorio</span></label>
                    <input type="email" placeholder="Email" required>
                    
                    <label>Contraseña <span class="required">*</span><span class="required-text">campo obligatorio</span></label>
                    <div class="password-container">
                        <input type="password" placeholder="Contraseña" required>
                        <img class="toggle-password" src="imgs/esconder.png" alt="Toggle password">
                    </div>

                    <label>Repetir contraseña <span class="required">*</span><span class="required-text">campo obligatorio</span></label>
                    <div class="password-container">
                        <input type="password" placeholder="Repetir contraseña" required>
                        <img class="toggle-password" src="imgs/esconder.png" alt="Toggle password">
                    </div>

                    <div class="edad-recaptcha-container">
                        <div class="edad-input-container">
                            <label>Edad <span class="required">*</span><span class="required-text">campo obligatorio</span></label>
                            <input type="date" placeholder="dd/mm/aaaa" required>
                        </div>

                        <div class="recaptcha-container-general">
                            <div class="captcha-container">
                                <input type="checkbox" id="captcha-checkbox" required>
                                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA logo">
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="boton-iniciar btn-iniciar-sesion">Registrar</button>
                </form>
                <div class="opciones-extra">
                    <span class="texto-no-cuenta">¿Ya tienes una cuenta?</span>
                    <a href="#" class="link-iniciar">Iniciar sesión</a>
                </div>
                <div class="botones-sociales botones-sociales-registro">
                    <button class="boton-facebook"><img class="logo-facebook" src="imgs/logo facebook.jpg" alt="Facebook"><span class="texto-facebook">Continuar con Facebook</span></button>
                    <button class="boton-google"><img class="logo-google" src="imgs/logo google.jpg" alt="Google"><span class="texto-google">Continuar con Google</span></button>
                </div>
            </div> <!-- cierre formulario-registro -->`


// metodo para generar el login/registro con html almacenado en variables
export function generarFormularios() {
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    const section = document.createElement('section');
    section.className = 'formulario-login';
    section.innerHTML = forumularioLogin + formularioRegistro;
    main.appendChild(section);

    // Agregar eventos a los links después de insertar el HTML
    let linkRegistrar = document.querySelector('.link-registrate')
    linkRegistrar.addEventListener('click', (e) => {
        e.preventDefault();
        flipToRegister();
    });

    let linkIniciarSesion = document.querySelector('.link-iniciar')
    linkIniciarSesion.addEventListener('click', (e) => {
        e.preventDefault();
        flipToLogin();
    });

    // Eventos para los links y cargar carrousels al iniciar sesion
    let btnIniciarSesion = document.querySelectorAll('.btn-iniciar-sesion');
    btnIniciarSesion.forEach(btn => {
        btn.addEventListener('click', inicializarCarrousels);
    });

}