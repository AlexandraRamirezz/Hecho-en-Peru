//Filter

//Ordenar por

const selected = document.querySelector(".option-selected");
const optionsContainer = document.querySelector(".options-container");

const optionsListOrder = document.querySelectorAll(".f-ordenar-por .option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionsListOrder.forEach(o => {
    o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
    });
});

//Range slider

const rangeInput = document.querySelectorAll(".range-input input"), priceInput = document.querySelectorAll(".price-input input"), range = document.querySelector(".slider .progress");

let priceGap = 50;

priceInput.forEach(input =>{
    input.addEventListener("input", e=>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "precio_minimo"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice/rangeInput[0].max)*100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value), maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap;
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal/rangeInput[1].max)*100 + "%";
        }
    });
});

//Carousel

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
