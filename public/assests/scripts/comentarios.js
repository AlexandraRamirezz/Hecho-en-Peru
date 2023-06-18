//NUEVO COMENTARIO

function nComentario() {
    let li = document.createElement("li");
    let userName = document.querySelector(".new-comment-section .input-box h4").textContent;
    let valorIngresado = document.getElementById("newComment").value;
    let inputBox = document.querySelector(".input-comment");
    let text = document.createTextNode(valorIngresado);
    let commentError = document.querySelector(".error-input");
    li.appendChild(text);

    if (valorIngresado === '') {
        commentError.classList.add("active");
        inputBox.classList.add("error");
        console.log("error");
    } else {
        li.className = "comment";
        li.innerHTML = `
            <div class="comment-user">
            <i class="fa-solid fa-user fa-2x"></i>
            </div>
            <div class="comment-text">
                <h4>${userName}</h4>
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
    
        document.getElementById("newComment").value = "";
        showComments();
        updateCommentCount();
        commentError.classList.remove("active");
        inputBox.classList.remove("error");
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

//NUMBER OF COMMENTS 

function updateCommentCount() {
    const commentsList = document.getElementById("comments-list");
    const commentCount = commentsList.getElementsByClassName("comment").length;
    const commentsElement = document.getElementsByClassName("number-comments");

    
    commentsElement[0].textContent = `${commentCount} comentario${commentCount !== 1 ? "s" : ""}`;
}

window.addEventListener("DOMContentLoaded", function() {
    // Llamar a la función para actualizar el número de comentarios
    updateCommentCount();
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