document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("login-form");
    var emailInput = document.getElementById("email-input");
    var correoGuardadoElement = document.getElementById("correo-guardado");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Evitar el envío del formulario
  
      // Redirigir a la página principal
      window.location.href = "index.html";
    });
  
    // Recuperar el correo electrónico almacenado al cargar la página
    var storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      correoGuardadoElement.textContent = "Correo guardado: " + storedEmail;
    }
  });