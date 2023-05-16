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
