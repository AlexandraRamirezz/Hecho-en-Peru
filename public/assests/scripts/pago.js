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
        openPopup();
    } else {
        alert('Por favor, completa los campos del formulario.');
        // Aquí puedes mostrar un mensaje de error o realizar otras acciones
    }
}

function openPopup() {
    var popup = document.getElementById("popup");
    popup.classList.add("open-popup");
}

function closePopup() {
    var popup = document.getElementById("popup");
    popup.classList.remove("open-popup");
}

function handleFormAndPopup(event) {
    validateForm(event);
    openPopup();
}

function handleFormAndClosePopup(event) {
    validateForm(event);
    closePopup();
    window.location.href = "paginaaredireccionar.html"
}


function loadCartItems() {
    var cartItems = getCartItemsFromLocalStorage();
    var cartContent = document.querySelector(".cart-products");

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
            cartShopBox.classList.add("cart-box");
            var cartBoxContent = `
                <figure><img src="${item.productImg}" class="product-img" alt="poncho"></figure>
                <div class="detail-box">
                    <h4 class="cart-product-title">${item.title}</h4>
                    <p class="cart-price">${item.price}</p>
                    <div class="cart-quantity">
                        <button class="minus">-</button>
                        <input type="number" class="unidades-selected" value="${item.quantity}">
                        <button class="plus">+</button>
                    </div>
                </div>
                <i class="fa-solid fa-trash-can remove-cart"></i>
            `;
            cartShopBox.innerHTML = cartBoxContent;
            cartContent.appendChild(cartShopBox);
        }
    }

    // Agregar eventos a los botones del carrito
    var removeCartButtons = document.getElementsByClassName("remove-cart");
    for (var j = 0; j < removeCartButtons.length; j++) {
        removeCartButtons[j].addEventListener("click", removeCartItem);
    }

    // Agregar eventos a los botones de incremento y decremento de unidades
    var minusButtons = document.getElementsByClassName("minus");
    for (var k = 0; k < minusButtons.length; k++) {
        minusButtons[k].addEventListener("click", quitUnitProduct);
    }

    var plusButtons = document.getElementsByClassName("plus");
    for (var l = 0; l < plusButtons.length; l++) {
        plusButtons[l].addEventListener("click", addUnitProduct);
    }
}

// Llamar a la función para cargar los productos del carrito cuando se cargue la página
window.addEventListener("load", function() {
    loadCartItems();
});