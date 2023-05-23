document.addEventListener("DOMContentLoaded", function () {
  var chatLog = document.getElementById("chat-log");
  var chatContainer = document.getElementById("chat-container");
  var faqButtons = document.getElementsByClassName("faq-button");
  var relatedQuestionButtons = document.getElementsByClassName("related-question-button");
  var clearChatButton = document.getElementById("clear-chat-button");
  var userInputForm = document.getElementById("user-input-form");
  var userInput = document.getElementById("user-input");
  var chatbotContainer = document.getElementById('chatbotContainer');
  var toggleButton = document.getElementById('toggleButton');


  chatbotContainer.style.display = 'none'; // Ocultar el chatbot

  toggleButton.addEventListener('click', function () {
    if (chatbotContainer.style.display === 'none') {
      chatbotContainer.style.display = 'block'; // Mostrar el chatbot
    } else {
      chatbotContainer.style.display = 'none'; // Ocultar el chatbot
    }
  });

  
  // Agregar evento click a los botones de preguntas frecuentes
  for (var i = 0; i < faqButtons.length; i++) {
    faqButtons[i].addEventListener("click", function () {
      var selectedQuestion = this.getAttribute("data-question");
      var selectedQuestionAnswer = this.getAttribute("data-answer");
      if (selectedQuestion) { // Validar si se ha seleccionado una pregunta
        addMessage(selectedQuestion, "user");
        addMessage(selectedQuestionAnswer, "bot");
        showRelatedQuestions(selectedQuestion);
      }
    });
  }


  clearChatButton.addEventListener("click", function () {
    // Eliminar todos los elementos hijos del contenedor del chat excepto el botón de cerrar chat
    while (chatLog.firstChild) {
      chatLog.removeChild(chatLog.firstChild);
    }
  });


  // Agregar evento click a los botones de preguntas relacionadas
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("related-question-button")) {
      var relatedQuestion = event.target.textContent;
      addMessage(relatedQuestion, "user");
      var relatedQuestionAnswer = generateAnswerForRelatedQuestion(relatedQuestion);
      addMessage(relatedQuestionAnswer, "bot");
    }
  });

  showRelatedQuestions(null);

  function showRelatedQuestions(selectedQuestion) {
    var relatedQuestions = getRelatedQuestions(selectedQuestion);

    // Borrar preguntas relacionadas anteriores (si las hay)
    var previousRelatedQuestionButtons = document.getElementsByClassName("related-question-button");
    while (previousRelatedQuestionButtons.length > 0) {
      previousRelatedQuestionButtons[0].parentNode.removeChild(previousRelatedQuestionButtons[0]);
    }

    if (relatedQuestions.length > 0) { // Validar si hay preguntas relacionadas
      // Agregar botones para las preguntas relacionadas
      for (var i = 0; i < relatedQuestions.length; i++) {
        var relatedQuestionButton = document.createElement("button");
        relatedQuestionButton.classList.add("related-question-button");
        relatedQuestionButton.textContent = relatedQuestions[i];
        relatedQuestionButton.style.fontFamily = "Open Sans, sans-serif";
        relatedQuestionButton.style.fontSize = "0.8rem";
        relatedQuestionButton.style.width = "80%";
        relatedQuestionButton.style.backgroundColor = "#E0E0E0";
        relatedQuestionButton.style.color = "black";
        relatedQuestionButton.style.padding = "0.3rem 0.7rem";
        relatedQuestionButton.style.margin = "0.2rem 2rem 0.2rem 2rem";
        chatLog.appendChild(relatedQuestionButton);
      }
    }

    // Desplazar automáticamente hacia abajo
    setTimeout(function () {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
  }


  // Pregunta general
  function addMessage(message, sender) {
    var messageContainer = document.createElement("div");
    messageContainer.classList.add("message", sender);
    messageContainer.textContent = message;
    messageContainer.style.fontFamily = "Open Sans, sans-serif";
    messageContainer.style.fontSize = "0.8rem";

    chatLog.appendChild(messageContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    if (sender === "bot") {
      messageContainer.style.backgroundColor = "white";
      messageContainer.style.width = "80%";
      messageContainer.style.borderRadius = "0.5rem";
      messageContainer.style.margin = "0.8rem 0.5rem";
      messageContainer.style.boxShadow = "0px 2px 2px #0000001a";
    }
  }


  function getRelatedQuestions(selectedQuestion) {
    var relatedQuestions = [];
    if (selectedQuestion === "¿Cuál es el horario de atención?") {
      relatedQuestions = [
        "¿Cuáles son los días laborables?",
        "¿A qué hora abren?",
        "¿A qué hora cierran?"
      ];
    } else if (selectedQuestion === "¿Cuáles son los métodos de pago aceptados?") {
      relatedQuestions = [
        "¿Cuánto cuesta el producto A?",
        "¿Tienen descuentos especiales?",
        "¿Cuál es la garantía del producto B?"
      ];
    } else if (selectedQuestion === "¿Cómo puedo contactar al servicio al cliente?") {
      relatedQuestions = [
        "¿Cómo puedo realizar una devolución?",
        "¿Tienen servicio de envío?",
        "¿Cuánto tiempo tarda la entrega?"
      ];
    }
    return relatedQuestions;
  }


  function generateAnswerForRelatedQuestion(relatedQuestion) {
    var relatedQuestionAnswers = {
      "¿Cuáles son los días laborables?": "Los días laborables son de lunes a viernes.",
      "¿A qué hora abren?": "Abrimos a las 9:00 a.m.",
      "¿A qué hora cierran?": "Cerramos a las 6:00 p.m.",
      "¿Cuánto cuesta el producto A?": "El precio del producto A es de $50.",
      "¿Tienen descuentos especiales?": "Sí, tenemos descuentos especiales en determinadas épocas del año.",
      "¿Cuál es la garantía del producto B?": "El producto B tiene una garantía de 1 año.",
      "¿Cómo puedo realizar una devolución?": "Puedes realizar una devolución contactando a nuestro servicio al cliente.",
      "¿Tienen servicio de envío?": "Sí, ofrecemos servicio de envío a domicilio.",
      "¿Cuánto tiempo tarda la entrega?": "El tiempo de entrega varía dependiendo de tu ubicación, generalmente de 2 a 5 días hábiles."
    };
    return relatedQuestionAnswers[relatedQuestion] || "Lo siento, no tengo una respuesta para esa pregunta relacionada en este momento.";
  }


  // Agregar evento submit al formulario de entrada
  /*userInputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    sendUserQuestion();
  });*/

  /*function sendUserQuestion() {
    var userQuestion = userInput.value;
    if (userQuestion.trim() !== "") {
      addMessage(userQuestion, "user");
      var botResponse = generateBotResponse(userQuestion);
      addMessage(botResponse, "bot");
      userInput.value = ""; // Limpiar el campo de entrada después de enviar la pregunta
      scrollChatLog();
    }
  }*/


  /*function generateBotResponse(userQuestion) {
    var botResponse = "Lo siento, no tengo una respuesta para esa pregunta en este momento.";

    // Compara la pregunta del usuario con las preguntas registradas y proporciona una respuesta adecuada
    if (userQuestion.includes("horario de atención")) {
      botResponse = "Nuestro horario de atención es de lunes a viernes, de 9:00 a.m. a 6:00 p.m.";
    } else if (userQuestion.includes("métodos de pago aceptados")) {
      botResponse = "Aceptamos tarjetas de crédito, transferencias bancarias y pagos en efectivo.";
    } else if (userQuestion.includes("contactar al servicio al cliente")) {
      botResponse = "Puedes contactar a nuestro servicio al cliente llamando al número 123456789 o enviando un correo electrónico a info@example.com.";
    }

    return botResponse;
  }*/

  /*function scrollChatLog() {
    chatLog.scrollTop = chatLog.scrollHeight;
  }*/

});