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

    //Buy Button
    document.getElementsByClassName("btn-buy-cart")[0].addEventListener("click", buyButtonClicked);
}

//Buy Button
function buyButtonClicked(){
    alert("Su compra ha sido procesada.");
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
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("precio-product")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    
    /*for (var i = 0; i < cartItemsNames.length; i++)
    {
        if (cartItemsNames[i].innerText == title)
        {
            alert("El producto ya ha sido agregado al carrito");
            return;
        }
    }*/

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            var cartQuantityInput = cartItemsNames[i].parentElement.querySelector('.unidades-selected');
            var currentQuantity = parseInt(cartQuantityInput.value);
            cartQuantityInput.value = currentQuantity + 1;
            updateTotal();
            return;
        }
    }

    var cartBoxContent = `
        <figure><img src="${productImg}" class="product-img" alt="poncho"></figure>
        <div class="detail-box">
            <h4 class="cart-product-title">${title}</h4>
            <p class="cart-price">${price}</p>
            <div class="cart-quantity">
                <button class="minus">-</button>
                <input type="number" class="unidades-selected" value="1">
                <button class="plus">+</button>
            </div>
        </div>
        <i class="fa-solid fa-trash-can remove-cart"></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("remove-cart")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("plus")[0].addEventListener("click", addUnitProduct);
    cartShopBox.getElementsByClassName("minus")[0].addEventListener("click", quitUnitProduct);
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

        //document.getElementsByClassName("total-price")[0].innerText = "s/." + total.toFixed(2);
    }

    if (total == 0)
    {
        document.getElementsByClassName("empty-cart")[0].style.display = "block";
        document.getElementsByClassName("btn-buy-cart")[0].style.display = "none";
    }else{
        document.getElementsByClassName("empty-cart")[0].style.display = "none";
        document.getElementsByClassName("btn-buy-cart")[0].style.display = "block";
    }

    document.getElementsByClassName("total-price")[0].innerText = "s/." + total.toFixed(2);
}


window.addEventListener("DOMContentLoaded", function() {
    // Llamar a la función para actualizar el número de comentarios
    updateTotal();
});
