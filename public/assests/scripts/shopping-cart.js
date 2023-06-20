let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Show cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
};

//Close cart
closeCart.onclick = () =>{
    cart.classList.remove("active");
};

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

function ready()
{
    var removeCartButtons = document.getElementsByClassName("remove-cart")
    for (var i = 0; i < removeCartButtons.length; i++)
    {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    //Quantity Changes
    var quantityInputs = document.getElementsByClassName("unidades-selected");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];

        var minusButton = input.previousElementSibling;
        var plusButton = input.nextElementSibling;

        minusButton.addEventListener("click", quitUnitProduct);
        plusButton.addEventListener("click", addUnitProduct);
    }

    //Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++)
    {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

//Remove item

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//Quantity product

function quitUnitProduct() {
    var input = this.nextElementSibling;
    var currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
    updateTotal();
}

function addUnitProduct() {
    var input = this.previousElementSibling;
    var currentValue = parseInt(input.value);
    input.value = currentValue + 1;
    updateTotal();
}

//Add to cart

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName()
}

//Update total

function updateTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++)
    {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("unidades-selected")[0];
        var price = parseFloat(priceElement.innerText.replace("s/.",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);

        document.getElementsByClassName("total-price")[0].innerText = "s/." + total.toFixed(2);
    }
}


window.addEventListener("DOMContentLoaded", function() {
    // Llamar a la función para actualizar el número de comentarios
    updateTotal();
});

//Número de unidades

// Iterar sobre cada elemento del carrito
/*for (var i = 0; i < cartBoxes.length; i++){
    var cartItem = cartBoxes[i];
    const plus = cartItem.querySelector(".plus");
    const minus = cartItem.querySelector(".minus");
    const num = cartItem.querySelector(".unidades-selected");

    let unidades = parseInt(num.value);

    plus.addEventListener("click", () => {
        unidades += 1;
        num.value = unidades;
        updateTotal();
    });

    minus.addEventListener("click", () => {
        if (unidades > 1) {
        unidades -= 1;
        num.value = unidades;
        }
        updateTotal();
    });
}*/
