"use strict";
import { inicializarCarrousels } from './carrousel.js';

// Alternar formularios con animacion de volteo

// Va hacia el formulario de REGISTRO
// Oculta el login y muestra el registro con efecto de volteo
function flipToRegister() {
    const loginForm = document.querySelector('.fondo-formulario:not(.formulario-registro)');
    const registerForm = document.querySelector('.formulario-registro');
    
    // Inicia la animacion de volteo en el login
    loginForm.classList.add('flipping');
    
    // Despues de 300ms oculta el login y muestra el registro
    setTimeout(() => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        registerForm.classList.add('flipping');
        
        // Remueve la clase de animacion para que quede estatico
        setTimeout(() => {
            registerForm.classList.remove('flipping');
        }, 50);
    }, 300);
}

// Va hacia el formulario de LOGIN
// Oculta el registro y muestra el login con efecto de volteo
function flipToLogin() {
    const loginForm = document.querySelector('.fondo-formulario:not(.formulario-registro)');
    const registerForm = document.querySelector('.formulario-registro');
    
    // Inicia la animacion de volteo en el registro
    registerForm.classList.add('flipping');
    
    // Despues de 300ms oculta el registro y muestra el login
    setTimeout(() => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'flex';
        loginForm.classList.add('flipping');
        
        // Remueve la clase de animacion para que quede estatico
        setTimeout(() => {
            loginForm.classList.remove('flipping');
        }, 50);
    }, 300);
}

// Eventos para los links





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

                    <button type="submit" id="boton-registrar" class="boton-iniciar ">Registrar</button>
                </form>
                <div class="opciones-extra">
                    <span class="texto-no-cuenta">¿Ya tienes una cuenta?</span>
                    <a href="#" class="link-iniciar">Iniciar sesión</a>
                </div>
                <div class="botones-sociales botones-sociales-registro">
                    <button class="boton-facebook btn-iniciar-sesion"><img class="logo-facebook" src="imgs/logo facebook.jpg" alt="Facebook"><span class="texto-facebook">Continuar con Facebook</span></button>
                    <button class="boton-google btn-iniciar-sesion"><img class="logo-google" src="imgs/logo google.jpg" alt="Google"><span class="texto-google">Continuar con Google</span></button>
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

    // Agregar eventos a los links después de insertar el HTML para dar vuelta los forms
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

    // Mostrar u ocultar contraseña al hacer click en el icono del ojo
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Obtiene el input de password que esta antes de la imagen
            const passwordInput = toggle.previousElementSibling;
            
            // Alterna entre mostrar y ocultar la contraseña
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text'; // Muestra la contraseña
                this.src = './imgs/mostrar.png';
            } else {
                passwordInput.type = 'password'; // Oculta la contraseña
                this.src = './imgs/esconder.png';
            }
        });
    });
}