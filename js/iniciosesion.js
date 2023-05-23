// Obtén el formulario de inicio de sesión
var loginForm = document.getElementById('login-form');
var emailError = document.getElementById('email-error');
var passwordError = document.getElementById('password-error');

// Agrega un evento de envío al formulario
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtén los valores ingresados por el usuario
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    // Verifica si el usuario existe en la base de datos local
    var users = JSON.parse(localStorage.getItem('users'));
    var foundUser = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (foundUser) {
        // El usuario existe, inicia sesión exitosamente
        window.location.href = "index.html";
        // Aquí puedes redirigir al usuario a la página de inicio después de iniciar sesión
    } else {
        // El usuario no existe, muestra mensajes de error y resalta los campos incorrectos
        
        document.getElementById('login-email').classList.add('invalid');

        document.getElementById('login-password').classList.add('invalid');
    }
});

// Valida el formato del correo electrónico al perder el foco del campo
document.getElementById('login-email').addEventListener('blur', function() {
    var emailInput = document.getElementById('login-email');
    var emailValue = emailInput.value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.innerHTML = '';

    if (emailPattern.test(emailValue)) {
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
    } else {
        emailError.innerHTML = 'Invalid Email';
        emailError.style.color = 'red';
        emailInput.classList.remove('valid');
        emailInput.classList.add('invalid');
    }

});

// Valida el formato de la contraseña al perder el foco del campo
document.getElementById('login-password').addEventListener('blur', function() {
    var passwordInput = document.getElementById('login-password');
    var passwordValue = passwordInput.value;
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    passwordError.innerHTML = '';

    if (passwordPattern.test(passwordValue)) {
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
    } else {
        passwordError.innerHTML = 'Invalid Password';
        passwordError.style.color = 'red';
        passwordInput.classList.remove('valid');
        passwordInput.classList.add('invalid');
    }

});