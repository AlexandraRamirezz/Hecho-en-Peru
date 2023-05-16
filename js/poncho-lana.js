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