function validateName(){
    var name = document.getElementById('registro-name').value;
    var inputElement = document.getElementById('registro-name');
    var nameError = document.getElementById('name-error');
    nameError.style.top ='auto'
    nameError.style.right ='auto'

    if(name.length == 0){
        nameError.style.color = 'red';
        nameError.innerHTML= 'Name is required';
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.style.color = 'red';
        nameError.innerHTML = 'Nombre invalido';
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }
    nameError.style.color = 'green';
    nameError.style.position ='absolute'
    nameError.style.top ='45%'
    nameError.style.right ='10%'
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;
}

function validateLastName(){
    var LastName = document.getElementById('registro-LastName').value;
    var inputElement = document.getElementById('registro-LastName');
    var LastNameError = document.getElementById('LastName-error');

    LastNameError.style.top ='auto'
    LastNameError.style.right ='auto'

    if(LastName.length == 0){
        LastNameError.style.color = 'red';
        LastNameError.innerHTML= 'LastName is required';
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    if(!LastName.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        LastNameError.style.color = 'red';
        LastNameError.innerHTML = 'LastName invalido';
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    LastNameError.style.color = 'green';
    LastNameError.style.position ='absolute'
    LastNameError.style.top ='45%'
    LastNameError.style.right ='10%'
    LastNameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;
}

 
function validatePassword() {
    var password = document.getElementById('registro-password').value;
    var inputElement = document.getElementById('registro-password');
    var passwordError = document.getElementById('password-error');
    passwordError.style.top ='auto'
    passwordError.style.right ='auto'

    if (password.length === 0) {
      passwordError.style.color = 'red';
      passwordError.innerHTML = 'La contraseña es obligatoria';
      inputElement.classList.remove('valid');
      inputElement.classList.add('invalid');
      return false;
    }
  
    // Requisitos para la contraseña
    var regexLongitud = /.{8,}/;
    var regexMinuscula = /[a-z]+/;
    var regexMayuscula = /[A-Z]+/;
    var regexDigito = /\d+/;
  
    if (!regexLongitud.test(password) || !regexMinuscula.test(password) || !regexMayuscula.test(password) || !regexDigito.test(password)) {
      passwordError.style.color = 'red';
      passwordError.innerHTML = 'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula y un dígito';
      inputElement.classList.remove('valid');
      inputElement.classList.add('invalid');
      return false;
    }
    passwordError.style.color = 'green';
    passwordError.style.position ='absolute'
    passwordError.style.top ='45%'
    passwordError.style.right ='10%'
    passwordError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;
  }
  


function validateEmail() {
    var email = document.getElementById('registro-email').value; // Obtén el elemento donde se muestra el mensaje de error
    var inputElement = document.getElementById('registro-email');
    var emailError = document.getElementById('email-error');

    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!emailPattern.test(email)) {
      emailError.innerHTML = 'Invalid Email';
      inputElement.classList.remove('valid');
      inputElement.classList.add('invalid');
      return false;
    }
  
    emailError.style.color = 'green';
    emailError.style.position ='absolute'
    emailError.style.top ='45%'
    emailError.style.right ='10%'
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;
}

function validateForm() {
    var submitError = document.getElementById('subit-error');
    if (!validateName() || !validateEmail() || !validatePassword() || !validateLastName()) {
      submitError.style.display = 'block';
      submitError.innerHTML = 'Completa correctamente todos los datos';
      submitError.style.color = 'red';
      setTimeout(function() {
        submitError.style.display = 'none';
      }, 3000);
      return false;
    }

    submitError.style.display = 'block';
    submitError.innerHTML = 'Registro correcto';
    submitError.style.color = 'green';
    setTimeout(function() {
      submitError.style.display = 'none';
    }, 10000);
    // Crear un objeto que representa al usuario
    var user = {
        firstName: document.getElementById('registro-name').value,
        lastName: document.getElementById('registro-LastName').value,
        email: document.getElementById('registro-email').value,
        password: document.getElementById('registro-password').value
    };

    // Guardar el usuario en la base de datos local
    saveUserToDatabase(user);

    submitError.style.display = 'block';
    submitError.innerHTML = 'Registro correcto';
    submitError.style.color = 'green';
    setTimeout(function () {
        submitError.style.display = 'none';
    }, 10000);

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'iniciosesion.html';

    return true;
    
}
  
// Función para guardar el usuario en la base de datos local
function saveUserToDatabase(user) {
    // Verifica si existe un array de usuarios en la base de datos local
    if (!localStorage.getItem('users')) {
        // Si no existe, crea un nuevo array y guarda el usuario
        var users = [user];
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        // Si existe, obtén el array de usuarios y agrega el nuevo usuario
        var users = JSON.parse(localStorage.getItem('users'));
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function validateEmail() {
    var email = document.getElementById('registro-email').value; // Obtén el elemento donde se muestra el mensaje de error
    var inputElement = document.getElementById('registro-email');
    var emailError = document.getElementById('email-error');

    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!emailPattern.test(email)) {
      emailError.innerHTML = 'Invalid Email';
      inputElement.classList.remove('valid');
      inputElement.classList.add('invalid');
      return false;
    }
  
    emailError.style.color = 'green';
    emailError.style.position ='absolute'
    emailError.style.top ='45%'
    emailError.style.right ='10%'
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;
}

function validateForm() {
    var submitError = document.getElementById('subit-error');
    if (!validateName() || !validateEmail() || !validatePassword() || !validateLastName()) {
      submitError.style.display = 'block';
      submitError.innerHTML = 'Completa correctamente todos los datos';
      submitError.style.color = 'red';
      setTimeout(function() {
        submitError.style.display = 'none';
      }, 3000);
      return false;
    }

    submitError.style.display = 'block';
    submitError.innerHTML = 'Registro correcto';
    submitError.style.color = 'green';
    setTimeout(function() {
      submitError.style.display = 'none';
    }, 10000);
    // Crear un objeto que representa al usuario
    var user = {
        firstName: document.getElementById('registro-name').value,
        lastName: document.getElementById('registro-LastName').value,
        email: document.getElementById('registro-email').value,
        password: document.getElementById('registro-password').value
    };

    // Guardar el usuario en la base de datos local
    saveUserToDatabase(user);

    submitError.style.display = 'block';
    submitError.innerHTML = 'Registro correcto';
    submitError.style.color = 'green';
    setTimeout(function () {
        submitError.style.display = 'none';
    }, 10000);

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'iniciosesion.html';

    return true;
    
}
  
// Función para guardar el usuario en la base de datos local
function saveUserToDatabase(user) {
    // Verifica si existe un array de usuarios en la base de datos local
    if (!localStorage.getItem('users')) {
        // Si no existe, crea un nuevo array y guarda el usuario
        var users = [user];
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        // Si existe, obtén el array de usuarios y agrega el nuevo usuario
        var users = JSON.parse(localStorage.getItem('users'));
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
}