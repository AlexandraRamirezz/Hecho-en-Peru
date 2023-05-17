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

function nComentario() {
  let li = document.createElement("li");
  let valorIngresado = document.getElementById("newComment").value;
  let text = document.createTextNode(valorIngresado);
  li.appendChild(text);

  if (valorIngresado === '') {
      alert("Ingrese un comentario");
  } else {
    li.className = "comment";
    li.innerHTML = `
      <div class="comment-user">
        <i class="fa-solid fa-user fa-2x"></i>
      </div>
      <div class="comment-text">${valorIngresado}</div>
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
    /*document.getElementById("comments-list").appendChild(li);*/
    let commentsList = document.getElementById("comments-list");
    let firstComment = commentsList.firstChild;
    commentsList.insertBefore(li, firstComment);
  }
  
  document.getElementById("newComment").value = "";
  showComments();
}

// Función para manejar el evento de presionar tecla en el campo de entrada
function handleKeyPress(event) {
  // Verificar si la tecla presionada es "Enter" (código de tecla 13)
  if (event.keyCode === 13) {
    nComentario();
    showComments(); // Llamar a la función nComentario si se presiona "Enter"
  }
}

// Agregar el evento de escucha de teclado al campo de entrada de comentarios
document.getElementById("newComment").addEventListener("keypress", handleKeyPress);
  
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
