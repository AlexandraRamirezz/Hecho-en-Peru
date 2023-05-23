var nameError = document.getElementById('name-error');
var emailError = document.getElementById('email-error');
var motivoError = document.getElementById('motivo-error');
var mensajeError = document.getElementById('mensaje-error');
var submitError = document.getElementById('subit-error');


function validateName(){
    var name = document.getElementById('contact-name').value;
    var inputElement = document.getElementById('contact-name');

    if(name.length == 0){
        nameError.innerHTML= 'Name is required'
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML = 'Nombre invalido'
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;
}

function validateEmail() {
    var email = document.getElementById('contact-email').value; // Obtén el elemento donde se muestra el mensaje de error
    var inputElement = document.getElementById('contact-email');

    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!emailPattern.test(email)) {
      emailError.innerHTML = 'Invalid Email';
      inputElement.classList.remove('valid');
      inputElement.classList.add('invalid');
      return false;
    }
  
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;
}


function validateAsunto() {
    var motivo = document.getElementById('contact-asunto').value;
    var inputElement = document.getElementById('contact-asunto');
    var requerido = 4;
    var x = requerido - motivo.length;

    if(motivo.length == 0){
        motivoError.innerHTML= 'Asunto is required'
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    if(x > 0){
        motivoError.innerHTML = 'Asunto invalido'
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }
    motivoError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;
}

function validateMensaje() {
    var message = document.getElementById('contact-menssage').value;
    var inputElement = document.getElementById('contact-menssage');
    var required = 50;
    var left = required - message.length;


    if(message.length == 0){
        mensajeError.innerHTML= 'Mensaje is required'
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    if(left > 0){
        mensajeError.innerHTML = left + ' caracteres requeridos mas'
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    mensajeError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;

}
  


function validateForm() {
    if (!validateName() || !validateEmail() || !validateAsunto() || !validateMensaje()) {
      submitError.style.display = 'block';
      submitError.innerHTML = 'Completa correctamente todos los datos';
      submitError.style.color = 'red';
      setTimeout(function() {
        submitError.style.display = 'none';
      }, 3000);
      return false;
    }
  
    submitError.style.display = 'block';
    submitError.innerHTML = 'Se ha enviado correctamente los datos';
    submitError.style.color = 'green';
    setTimeout(function() {
      submitError.style.display = 'none';
    }, 10000);
    return true;
}
  


function resetForm() {

    emailError.innerHTML = ''; 
    nameError.innerHTML= '';
    mensajeError.innerHTML = '';
    motivoError.innerHTML = '';

    var inputElement = document.getElementById('contact-name');
    
    inputElement.classList.remove('invalid');
    inputElement.classList.remove('valid');

    var inputElement = document.getElementById('contact-email');

    
    inputElement.classList.remove('invalid');
    inputElement.classList.remove('valid');

    var inputElement = document.getElementById('contact-asunto');
    
    inputElement.classList.remove('invalid');
    inputElement.classList.remove('valid');

    var inputElement = document.getElementById('contact-menssage');

    
    inputElement.classList.remove('invalid');
    inputElement.classList.remove('valid');


}