//BREADCRUMB

function updateBreadcrumb() {
  const productName = document.querySelector(".general-info h3").textContent;
  const breadcrumbLink = document.querySelector(".breadcrumbs-item:nth-child(3) .breadcrumbs-link");
  breadcrumbLink.textContent = productName;
}

// Al cargar la página
window.addEventListener("DOMContentLoaded", function() {
  // Llamar a la función para actualizar el breadcrumb
  updateBreadcrumb();
});

// ZOOM IMG

const imgContElm = document.querySelector(".main-images");
const imgElm = document.querySelector(".main-images figure img");

const zoom = 200;

//Evemt mouse enter
imgContElm.addEventListener("mouseenter", function(){
  imgElm.style.width = zoom + "%";
});

//Event mouse leave
imgContElm.addEventListener("mouseleave", function(){
  imgElm.style.width = "100%";
  imgElm.style.left = "0";
  imgElm.style.top = "0";
});

//Event mouse move

imgContElm.addEventListener("mousemove", function(){
  let obj = imgContElm;
  let obj_left = 0;
  let obj_top = 0;
  let xpos;
  let ypos;

  while(obj.offsetParent)
  {
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
  }

  if (MouseEvent)
  {
    xpos = window.event.x + document.body.scrollLeft - 2;
    ypos = window.event.y + document.body.scrollTop - 2;
  }
  
  xpos -= obj_left;
  ypos -= obj_top;

  if (ypos < 0) ypos = 0;

  console.log("x: " + xpos);
  console.log("y: " +ypos);

  const imgWidth = imgElm.clientWidth;
  const imgHeight = imgElm.clientHeight;

  imgElm.style.top = -(((imgHeight - this.clientHeight)*ypos)/this.clientHeight) + "px";
  imgElm.style.left = -(((imgWidth - this.clientWidth)*xpos)/this.clientWidth) + "px";

  console.log(imgElm.style.top);
  console.log( imgElm.style.left);

});

function changeHeight(){
  imgContElm.style.height = imgContElm.clientWidth + "px";
}

window.addEventListener("resize", changeHeight);

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

//NUEVO COMENTARIO

let sumStars = 9;

function nComentario() {
  let li = document.createElement("li");
  let userName = document.querySelector(".new-comment-section .comment-column h4").textContent;
  let valorIngresado = document.getElementById("newComment").value;
  let inputBox = document.querySelector(".input-comment");
  let text = document.createTextNode(valorIngresado);
  let commentError = document.querySelector(".error-input");
  let ratingError = document.querySelector(".error-rating");
  li.appendChild(text);

  if (valorIngresado === '' || stars_point_user === 0) {
    //alert("Ingrese un comentario");
    if (valorIngresado === '')
    {
      commentError.classList.add("active");
      inputBox.classList.add("error");
    }else{
      commentError.classList.remove("active");
      inputBox.classList.remove("error");
    }
    if (stars_point_user === 0)
      ratingError.classList.add("active");
    else ratingError.classList.remove("active");
  }else {
    li.className = "comment";
    li.innerHTML = `
      <div class="comment-user">
        <i class="fa-solid fa-user fa-2x"></i>
      </div>
      <div class="comment-text">
        <h4>${userName}</h4>
        <div class="rating-comment-box">
          ${getStarIcons(stars_point_user)}
        </div>
        ${valorIngresado}
      </div>
      <div class="comment-votes">
        <div class="liked-comment" onclick="likeComment(this)">
          <i class="fa-regular fa-thumbs-up"></i>
          <p class="count">0</p>
        </div>
        <div class="dislike-comment" onclick="dislikeComment(this)">
          <i class="fa-regular fa-thumbs-down"></i>
          <p class="count">0</p>
        </div>
      </div>
    `;
    let commentsList = document.getElementById("comments-list");
    let firstComment = commentsList.firstChild;
    commentsList.insertBefore(li, firstComment);

    sumStars += stars_point_user;

    document.getElementById("newComment").value = "";
    stars_new_comment.forEach((star) =>{
      star.classList.remove("active");
    });
    
    commentError.classList.remove("active");
    inputBox.classList.remove("error");
    ratingError.classList.remove("active");

    stars_point_user = 0;
    showComments();
    updateCommentCount();
    updateRatingCount();
  }
}

// Función para manejar el evento de presionar tecla en el campo de entrada
function handleKeyPress(event) {
  // Verificar si la tecla presionada es "Enter" (código de tecla 13)
  if (event.keyCode === 13) {
    nComentario();// Llamar a la función nComentario si se presiona "Enter"
    showComments(); 
    updateCommentCount();
  }
}

// Agregar el evento de escucha de teclado al campo de entrada de comentarios
document.getElementById("newComment").addEventListener("keypress", handleKeyPress);
  

function getStarIcons(starCount) {
  let starIcons = "";
  for (let i = 0; i < 5; i++) {
    if (i < starCount) {
      starIcons += '<i class="fa-solid fa-star active"></i>';
    } else {
      starIcons += '<i class="fa-solid fa-star"></i>';
    }
  }
  return starIcons;
}

function likeComment(element) {
  let comment = element.closest(".comment");
  let countElement = element.querySelector(".count");
  let count = parseInt(countElement.textContent);

  if (!comment.classList.contains("liked") && !comment.classList.contains("disliked")) {
    count++;
    countElement.textContent = count.toString();

    let icon = element.querySelector("i");
    icon.className = "fa-solid fa-thumbs-up";

    comment.classList.add("liked");
    element.classList.add("selected");
  } else if (comment.classList.contains("liked")) {
    count--;
    countElement.textContent = count.toString();

    let icon = element.querySelector("i");
    icon.className = "fa-regular fa-thumbs-up";

    comment.classList.remove("liked");
    element.classList.remove("selected");
  } else if (comment.classList.contains("disliked")) {
    count++;
    countElement.textContent = count.toString();

    let icon = element.querySelector("i");
    icon.className = "fa-solid fa-thumbs-up";

    let dislikeElement = comment.querySelector(".dislike-comment");
    let dislikeIcon = dislikeElement.querySelector("i");

    let dislikeCountElement = dislikeElement.querySelector(".count");
    let dislikeCount = parseInt(dislikeCountElement.textContent);
    if (dislikeCount !== 0)
      dislikeCount--;
    dislikeCountElement.textContent = dislikeCount.toString();
    comment.classList.remove("disliked");
    dislikeElement.classList.remove("selected");
    dislikeIcon.className = "fa-regular fa-thumbs-down";

    comment.classList.add("liked");
    element.classList.add("selected");
  }
}

function dislikeComment(element) {
  let comment = element.closest(".comment");
  let countElement = element.querySelector(".count");
  let count = parseInt(countElement.textContent);

  if (!comment.classList.contains("liked") && !comment.classList.contains("disliked")) {
    count++;
    countElement.textContent = count.toString();

    let icon = element.querySelector("i");
    icon.className = "fa-solid fa-thumbs-down";

    comment.classList.add("disliked");
    element.classList.add("selected");
  } else if (comment.classList.contains("disliked")) {
    count--;
    countElement.textContent = count.toString();

    let icon = element.querySelector("i");
    icon.className = "fa-regular fa-thumbs-down";

    comment.classList.remove("disliked");
    element.classList.remove("selected");
  } else if (comment.classList.contains("liked")) {
    count++;
    countElement.textContent = count.toString();

    let icon = element.querySelector("i");
    icon.className = "fa-solid fa-thumbs-down";

    let likeElement = comment.querySelector(".liked-comment");
    let likeIcon = likeElement.querySelector("i");

    let likeCountElement = likeElement.querySelector(".count");
    let likeCount = parseInt(likeCountElement.textContent);
    if (likeCount !== 0)
      likeCount--;
    likeCountElement.textContent = likeCount.toString();
    comment.classList.remove("liked");
    likeElement.classList.remove("selected");
    likeIcon.className = "fa-regular fa-thumbs-up";

    comment.classList.add("disliked");
    element.classList.add("selected");
  }
}

//STAR RATING INFORMACIÓN GENERAL

function updateStarRating() {
  const ratingValue = parseFloat(document.getElementsByClassName("rating-value")[0].textContent);
  const stars = document.getElementsByClassName("fa-star");

  // Recorrer los íconos de estrellas y aplicar el color adecuado
  for (let i = 0; i < stars.length; i++) {
    if (i < ratingValue) {
      stars[i].classList.add("rated");
    } else {
      stars[i].classList.remove("rated");
    }
  }
}

// Al cargar la página
window.addEventListener("DOMContentLoaded", function() {
  // Llamar a la función para actualizar el rating de estrellas
  updateStarRating();
});

//RATING POINTS GENERAL INFO

function updateRatingCount() {
  const commentsList = document.getElementById("comments-list");
  const commentCount = commentsList.getElementsByClassName("comment").length;
  const ratingValue = document.getElementsByClassName("rating-value");

    ratingValue[0].textContent = (sumStars/commentCount).toFixed(1);
}


//NUMBER OF COMMENTS GENERAL INFO

function updateCommentCount() {
  const commentsList = document.getElementById("comments-list");
  const commentCount = commentsList.getElementsByClassName("comment").length;
  const commentsElement = document.getElementsByClassName("number-comments");

  for(let i = 0; i < commentsElement.length; i++){
    commentsElement[i].textContent = `${commentCount} comentario${commentCount !== 1 ? "s" : ""}`;
  }
}

window.addEventListener("DOMContentLoaded", function() {
  // Llamar a la función para actualizar el número de comentarios
  updateCommentCount();
  updateRatingCount();
});

//COMENTARIOS POR PÁGINA

const commentsPerPage = 5; // Cantidad de comentarios por página
let currentPage = 1; // Página actual de comentarios

// Función para mostrar los comentarios de acuerdo a la página actual
function showComments() {
  const comments = document.getElementsByClassName("comment");
  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / commentsPerPage);

  // Mostrar los comentarios correspondientes a la página actual y ocultar los demás
  for (let i = 0; i < totalComments; i++) {
    if (i >= (currentPage - 1) * commentsPerPage && i < currentPage * commentsPerPage) {
      comments[i].style.display = "grid";
    } else {
      comments[i].style.display = "none";
    }
  }

  // Habilitar o deshabilitar los botones de navegación según la página actual
  const prevPageBtn = document.getElementById("prevPageBtn");
  const nextPageBtn = document.getElementById("nextPageBtn");
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;

  // Actualizar el indicador de página actual
  const currentPageIndicator = document.getElementById("currentPageIndicator");
  currentPageIndicator.innerText = `Página ${currentPage} de ${totalPages}`;
}

// Función para mostrar la página anterior de comentarios
function showPreviousPage() {
  if (currentPage > 1) {
    currentPage--; // Disminuir la página actual
    showComments(); // Mostrar los comentarios actualizados
  }
}

// Función para mostrar la página siguiente de comentarios
function showNextPage() {
  const comments = document.getElementsByClassName("comment");
  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / commentsPerPage);

  if (currentPage < totalPages) {
    currentPage++; // Incrementar la página actual
    showComments(); // Mostrar los comentarios actualizados
  }
}

// Llamar a la función showComments() para mostrar los comentarios al cargar la página
showComments();


//STAR RATING COMENTARIO

const stars_new_comment = document.querySelectorAll(".rating-input i");
let stars_point_user = 0;

stars_new_comment.forEach((star, index1) =>{
  star.addEventListener("click", () =>{
    stars_new_comment.forEach((star, index2)=>{
      index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
      stars_point_user = index1 + 1;
    });
  });
});