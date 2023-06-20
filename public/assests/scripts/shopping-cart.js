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

//Remove Items From Cart
var removeCartButtons = document.querySelectorAll(".remove-cart");

for (var i = 0; i < removeCartButtons.length; i++)
{
    var button = removeCartButtons[i];
    button.addEventListener("click", function(e){
        var buttonClicked = e.target;
        buttonClicked.parentElement.remove();
        updateTotal();
    });
}

//Update total

const cartContent = document.querySelector(".cart-content");
// Obtener todos los elementos con la clase "cart-box"
const cartBoxes = cartContent.getElementsByClassName("cart-box");
const emptyCart = document.getElementsByClassName("empty-cart")[0];
const btnBuyCart = cartContent.getElementsByClassName("btn-buy-cart")[0];

function updateTotal(){
    //var cartBoxes = document.getElementsByClassName("cart-box");
    var total = 0;
    if (cartBoxes.length == 0)
    {
        document.getElementsByClassName("total-price")[0].innerText = "s/. 0.00";
        emptyCart.style.display = "block";
        btnBuyCart.style.display = "none";
    }else{
        emptyCart.style.display = "none";
        btnBuyCart.style.display = "block";
        for (var i = 0; i < cartBoxes.length; i++){
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName("cart-price")[0];
            var quantityElement = cartBox.getElementsByClassName("unidades-selected")[0];
            var price = parseFloat(priceElement.innerText.replace("s/.",""));
            var quantity = quantityElement.value;
            console.log(quantityElement);
            total = total + (price * quantity);
    
            document.getElementsByClassName("total-price")[0].innerText = "s/. " + total.toFixed(2);
        }
    }
}

window.addEventListener("DOMContentLoaded", function() {
    // Llamar a la función para actualizar el número de comentarios
    updateTotal();
});

//Número de unidades

// Iterar sobre cada elemento del carrito
for (var i = 0; i < cartBoxes.length; i++){
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
}
