//Productos más vendidos

const pCarousel = document.querySelector(".container-productos-vendidos .carousel");
const pArrowBtns = document.querySelectorAll(".container-productos-vendidos .container-slider .caret");
const pFirstCardWidth = pCarousel.querySelector(".carousel-product").offsetWidth;
const pCarouselProducts = Array.from(pCarousel.querySelectorAll(".carousel-product"));
const pFirstCard = pCarouselProducts[0];
const pLastCard = pCarouselProducts[pCarouselProducts.length - 1];

let pCardPerView = Math.round(pCarousel.offsetWidth / pFirstCardWidth);

pCarouselProducts.slice(0, pCardPerView).forEach((card) => {
    const cloneFirstCard = card.cloneNode(true);
    pCarousel.appendChild(cloneFirstCard);
});

pCarouselProducts.slice(-pCardPerView).forEach((card) => {
    const cloneLastCard = card.cloneNode(true);
    pCarousel.insertBefore(cloneLastCard, pFirstCard);
});

pCarousel.classList.add("no-transition");
pCarousel.scrollLeft = pCarousel.offsetWidth;
pCarousel.classList.remove("no-transition");

pArrowBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        pCarousel.scrollLeft += btn.id == "left" ? -pFirstCardWidth : pFirstCardWidth;
    })
});

//Nuestros servicios

const sCarousel = document.querySelector(".container-servicios .carousel");
const sArrowBtns = document.querySelectorAll(".container-servicios .container-slider .caret");
const sFirstCardWidth = sCarousel.querySelector(".carousel-product").offsetWidth;
const sCarouselProducts = Array.from(sCarousel.querySelectorAll(".carousel-product"));
const sFirstCard = sCarouselProducts[0];
const sLastCard = sCarouselProducts[sCarouselProducts.length - 1];

let sCardPerView = Math.round(sCarousel.offsetWidth / sFirstCardWidth);

sCarouselProducts.slice(0, sCardPerView).forEach((card) => {
    const cloneFirstCard = card.cloneNode(true);
    sCarousel.appendChild(cloneFirstCard);
});

sCarouselProducts.slice(-sCardPerView).forEach((card) => {
    const cloneLastCard = card.cloneNode(true);
    sCarousel.insertBefore(cloneLastCard, sFirstCard);
});

sCarousel.classList.add("no-transition");
sCarousel.scrollLeft = sCarousel.offsetWidth;
sCarousel.classList.remove("no-transition");

sArrowBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        sCarousel.scrollLeft += btn.id == "left" ? -sFirstCardWidth : sFirstCardWidth;
    })
});

//Testimonios

const tCarousel = document.querySelector(".container-testimonios .carousel");
const tArrowBtns = document.querySelectorAll(".container-testimonios .container-slider .caret");
const tFirstCardWidth = tCarousel.querySelector(".carousel-product").offsetWidth;
const tCarouselProducts = Array.from(tCarousel.querySelectorAll(".carousel-product"));
const tFirstCard = tCarouselProducts[0];
const tLastCard = tCarouselProducts[tCarouselProducts.length - 1];

let tCardPerView = Math.round(tCarousel.offsetWidth / tFirstCardWidth);

tCarouselProducts.slice(0, tCardPerView).forEach((card) => {
    const cloneFirstCard = card.cloneNode(true);
    tCarousel.appendChild(cloneFirstCard);
});

tCarouselProducts.slice(-tCardPerView).forEach((card) => {
    const cloneLastCard = card.cloneNode(true);
    tCarousel.insertBefore(cloneLastCard, tFirstCard);
});

tCarousel.classList.add("no-transition");
tCarousel.scrollLeft = tCarousel.offsetWidth;
tCarousel.classList.remove("no-transition");

tArrowBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        tCarousel.scrollLeft += btn.id == "left" ? -tFirstCardWidth : tFirstCardWidth;
    })
});