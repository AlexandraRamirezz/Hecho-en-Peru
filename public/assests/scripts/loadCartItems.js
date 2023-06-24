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