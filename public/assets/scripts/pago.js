function validateName(){
    var name = document.getElementById('registro-name').value;
    var inputElement = document.getElementById('registro-name');
    var nameError = document.getElementById('name-error');
    nameError.style.top ='auto'
    nameError.style.right ='auto'

    if(name.length == 0){
        nameError.style.border = 'red solid 2px';
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.style.border = 'red solid 2px';
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    if(name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.style.border = 'green solid 2px';
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return true;
    }
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;
}

// Obtener referencias a los elementos HTML
var cvvInput = document.getElementById('cvv');
var cvvError = document.getElementById('cvv-error');

// Agregar eventos de escucha al campo de entrada
cvvInput.addEventListener('input', validateCVV);
cvvInput.addEventListener('blur', validateCVV);

// Función de validación del CVV
function validateCVV() {
    var cvv = cvvInput.value.trim();

    // Validar la longitud del CVV
    if (cvv.length !== 3) {
        showwError();
        return false;
    }

    // Validar que el CVV solo contenga dígitos numéricos
    if (!/^\d+$/.test(cvv)) {
        showError();
        return false;
    }

    // El CVV es válido
    hideeError();
    return true;
}

// Función para mostrar el mensaje de error
function showwError() {
    cvvError.style.borderTop = 'red solid 3px';
    cvvInput.classList.remove('valid');
    cvvInput.classList.add('invalid');
}

// Función para ocultar el mensaje de error
function hideeError() {
    cvvError.style.borderTop = 'green solid 3px';
    cvvInput.classList.remove('invalid');
    cvvInput.classList.add('valid');
}

function validateCardNumber() {
    var cardNumber = document.getElementById('cardNumber').value;
    var inputElement = document.getElementById('cardNumber');
    var errorElement = document.getElementById('cardNumber-error');

    if (cardNumber.length === 0) {
        errorElement.style.border = 'red solid 2px';
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    if (!cardNumber.match(/^\d{4}-\d{4}-\d{4}-\d{4}$/)) {
        errorElement.style.border = 'red solid 2px';
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        return false;
    }

    errorElement.style.border = 'green solid 2px';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    return true;
}


function formatCardNumber(input) {
    var value = input.value;
    value = value.replace(/\D/g, '');

var formattedValue = '';
for (var i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
    formattedValue += '-';
    }
    formattedValue += value.charAt(i);
}

input.value = formattedValue;
}


// Obtener referencias a los elementos HTML
var expirationDateInput = document.getElementById('expirationDate');
var expirationDateError = document.getElementById('expirationDateError');

// Agregar eventos de escucha al campo de entrada
expirationDateInput.addEventListener('input', validateExpirationDate);
expirationDateInput.addEventListener('blur', validateExpirationDate);

// Función de validación de fecha de vencimiento
function validateExpirationDate() {
    var expirationDate = expirationDateInput.value.trim();

    // Validar el formato MM/AA utilizando una expresión regular
    var formatRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!formatRegex.test(expirationDate)) {
        showError();
        return false;
    }

    // Obtener el mes y el año de la fecha de vencimiento
    var month = parseInt(expirationDate.substring(0, 2), 10);
    var year = parseInt(expirationDate.substring(3), 10);

    // Validar el mes y el año
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear() % 100; // Obtener los últimos dos dígitos del año actual

    if (year < currentYear || (year === currentYear && month < currentDate.getMonth() + 1)) {
        showError();
        return false;
    }

    // La fecha de vencimiento es válida
    hideError();
    return true;
}

// Función para formatear la fecha de vencimiento
function formatExpirationDate() {
    var value = expirationDateInput.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
    if (value.length > 4) value = value.slice(0, 4); // Limita a 4 dígitos

    // Inserta el '/' después de los primeros dos dígitos
    var formattedValue = value;
    if (value.length > 2) {
        formattedValue = value.slice(0, 2) + '/' + value.slice(2);
    }

    expirationDateInput.value = formattedValue;
}

// Función para mostrar el mensaje de error
function showError() {
    expirationDateError.style.borderTop = 'red solid 3px';
    expirationDateInput.classList.remove('valid');
    expirationDateInput.classList.add('invalid');
}

// Función para ocultar el mensaje de error
function hideError() {
    expirationDateError.style.borderTop = 'green solid 3px';
    expirationDateInput.classList.remove('invalid');
    expirationDateInput.classList.add('valid');
}


function validateForm(event) {
    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    // Realiza la validación de cada campo del formulario
    var isNameValid = validateName();
    var isCardNumberValid = validateCardNumber();
    var isExpirationDateValid = validateExpirationDate();
    var isValidateValid = validateCVV();

    // Si todos los campos son válidos, se puede enviar el formulario
    if (isNameValid && isCardNumberValid && isValidateValid && isExpirationDateValid) {
        var popup = document.getElementById("popup-pago");
        var popupImg = popup.querySelector("img");
        var popupMainText = popup.querySelector("h2");
        var popupSecondaryText = popup.querySelector("p");
        var popupButton = popup.querySelector("button");

        popupButton.classList.add("success");
        popupButton.classList.remove("error");
        
        popupImg.src = "./assests/images/img-pago/popup-success.png"
        popupMainText.innerText = "Gracias";
        popupSecondaryText.innerHTML = 'Tu pago fue procesado correctamente<br>Gracias por tu compra.';
        popupButton.innerText = "OK";
        popupButton.style.backgroundColor = "#6fd649";
        popupButton.style.color = "white";

        localStorage.removeItem("cart");
        openPopup();
    } else {
        var popup = document.getElementById("popup-pago");
        var popupImg = popup.querySelector("img");
        var popupMainText = popup.querySelector("h2");
        var popupSecondaryText = popup.querySelector("p");
        var popupButton = popup.querySelector("button");

        popupImg.src = "./assests/images/img-pago/popup-error.png"
        popupImg.style.width = "100px";
        popupMainText.innerText = "Ocurrió un error";
        popupSecondaryText.innerText = "Por favor, completa todos los campos correctamente y vuelve a intentarlo."
        popupButton.innerText = "Cerrar";
        popupButton.style.backgroundColor = "red";
        popupButton.style.color = "white";
        popupButton.classList.remove("success");
        popupButton.classList.add("error");
        openPopup();
    }
}

function openPopup() {
    var popup = document.getElementById("popup-pago");
    popup.classList.add("open-popup");
}

function closePopup() {
    var popup = document.getElementById("popup-pago");
    popup.classList.remove("open-popup");
}

function handleFormAndPopup(event) {
    validateForm(event);
    openPopup();
}

function handleFormAndClosePopup(event) {
    var popup = document.getElementById("popup-pago");
    var popupButton = popup.querySelector("button");
    if (popupButton.classList.contains("success")){
        closePopup();
        window.location.href = "../index.html";
    }else{
        closePopup();
    }
    
}

function getCartItemsFromLocalStorage() {
    var cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
}

function loadCartItems() {
    var cartItems = getCartItemsFromLocalStorage();
    var cartContent = document.querySelector(".cart-items");

    // Limpiar el contenido actual del carrito
    cartContent.innerHTML = "";

    if (cartItems.length === 0) {
        // Mostrar mensaje de carrito vacío
        var emptyCart = document.querySelector(".empty-cart");
        emptyCart.style.display = "block";
    } else {
        // Agregar los productos al carrito
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            var cartShopBox = document.createElement("div");
            cartShopBox.classList.add("cart-item");
            var cartBoxContent = `
                <figure>
                    <img src="${item.productImg}" class="product-img" alt="poncho">
                </figure>
                <div class="detail-box">
                    <h4 class="cart-product-title">${item.title}</h4>
                    <p class="cart-units">Unidades: ${item.quantity}</p>
                    <p class="cart-price">Precio unitario: ${item.price}</p>
                </div>
            `;
            cartShopBox.innerHTML = cartBoxContent;
            cartContent.appendChild(cartShopBox);
        }
    }

    var montoTotal = document.getElementsByClassName("monto-total")[0];
    montoTotal.innerHTML = 's/.'+ localStorage.getItem("totalValue");
}

// Llamar a la función para cargar los productos del carrito cuando se cargue la página
window.addEventListener("load", function() {
    loadCartItems();
});