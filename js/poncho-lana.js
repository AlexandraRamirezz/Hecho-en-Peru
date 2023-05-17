//SLICE IMG

function clickImg(smallImg)
{
    var fullImg = document.getElementById("image-box");
    fullImg.src = smallImg.src;
}

//NUMBER OF UNITS

const plus = document.querySelector(".plus"), minus = document.querySelector(".minus"), num = document.querySelector(".unidades-selected");

let unidades = parseInt(num.value);

plus.addEventListener("click", ()=>{
    unidades+=1;
    num.value = unidades;
});

minus.addEventListener("click", ()=>{
    if(unidades > 1)
    unidades -= 1;
    num.value = unidades;
});

//COLOR SELECTOR

const colorItems = document.querySelectorAll('.color-item');

colorItems.forEach((item) => {
    const button = item.querySelector('.option');
    button.addEventListener('click', () => {
    // Remover la clase 'selected' de todos los color-item
    colorItems.forEach((item) => {
        item.classList.remove('selected');
    });
    
    // Agregar la clase 'selected' al color-item padre del botón actual
    item.classList.add('selected');
    });
});

//TALLA DROPDOWN

const selectedTalla = document.querySelector(".f-talla .option-selected");
const optionsContainerTalla = document.querySelector(".f-talla .options-container");

const optionsListTalla = document.querySelectorAll(".f-talla .option");

selectedTalla.addEventListener("click", () => {
    optionsContainerTalla.classList.toggle("active");
});

optionsListTalla.forEach(o => {
    o.addEventListener("click", () => {
    selectedTalla.innerHTML = o.querySelector("label").innerHTML;
    optionsContainerTalla.classList.remove("active");
    });
});

//CARRUSEL

const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".container-slider .caret");
const firstCardWidth = carousel.querySelector(".carousel-product").offsetWidth;
const carouselProducts = Array.from(carousel.querySelectorAll(".carousel-product"));
const firstCard = carouselProducts[0];
const lastCard = carouselProducts[carouselProducts.length - 1];

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselProducts.slice(0, cardPerView).forEach((card) => {
    const cloneFirstCard = card.cloneNode(true);
    carousel.appendChild(cloneFirstCard);
});

carouselProducts.slice(-cardPerView).forEach((card) => {
    const cloneLastCard = card.cloneNode(true);
    carousel.insertBefore(cloneLastCard, firstCard);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    })
});
