document.addEventListener("DOMContentLoaded", function () {
    var chatLog = document.getElementById("chat-log");
    var chatContainer = document.getElementById("chat-container");
    var faqButtons = document.getElementsByClassName("faq-button");
    var clearChatButton = document.getElementById("clear-chat-button");
    var chatbotContainer = document.getElementById('chatbotContainer');
    var toggleButton = document.getElementById('toggleButton');
  
    chatbotContainer.style.display = 'none'; // Ocultar el chatbot
  
    toggleButton.addEventListener('click', function () {
        chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'block' : 'none';
    });
  
    // Agregar evento click a los botones de preguntas frecuentes
    for (var i = 0; i < faqButtons.length; i++) {
        faqButtons[i].addEventListener("click", function () {
            var selectedQuestion = this.getAttribute("data-question");
            if (selectedQuestion) {
                addMessage(selectedQuestion, "user");
                addMessage(generateAnswerForFAQ(selectedQuestion), "bot");
                showRelatedQuestions(selectedQuestion);  // Mostrar las preguntas relacionadas
            }
        });
    }

    clearChatButton.addEventListener("click", function () {
        while (chatLog.firstChild) {
            chatLog.removeChild(chatLog.firstChild);
        }
    });

    // Escucha para las subpreguntas relacionadas
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("related-question-button")) {
            var relatedQuestion = event.target.textContent;
            addMessage(relatedQuestion, "user");
            addMessage(generateAnswerForRelatedQuestion(relatedQuestion), "bot");
        }
    });

    function showRelatedQuestions(selectedQuestion) {
        var relatedQuestions = getRelatedQuestions(selectedQuestion);
        var previousRelatedQuestionButtons = document.getElementsByClassName("related-question-button");
        while (previousRelatedQuestionButtons.length > 0) {
            previousRelatedQuestionButtons[0].parentNode.removeChild(previousRelatedQuestionButtons[0]);
        }
        if (relatedQuestions.length > 0) {
            for (var i = 0; i < relatedQuestions.length; i++) {
                var relatedQuestionButton = document.createElement("button");
                relatedQuestionButton.classList.add("related-question-button");
                relatedQuestionButton.textContent = relatedQuestions[i];
                chatLog.appendChild(relatedQuestionButton);
            }
        }
        setTimeout(function () {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
    }

    function addMessage(message, sender) {
        var messageContainer = document.createElement("div");
        messageContainer.classList.add("message", sender);
        messageContainer.textContent = message;
        chatLog.appendChild(messageContainer);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function generateAnswerForFAQ(selectedQuestion) {
        var faqAnswers = {
            "¿Cuáles son los bolsos más populares?": "Nuestros bolsos más populares son los modelos personalizados y de cuero vegano, ideales para universitarias.",
            "¿Tienen envíos a todo Perú?": "Sí, realizamos envíos a todo Perú con opción de envío exprés en Lima.",
            "¿Cómo puedo personalizar mi bolso?": "Puedes personalizar tu bolso eligiendo colores, iniciales grabadas y detalles únicos en nuestro catálogo online."
        };
        return faqAnswers[selectedQuestion] || "Lo siento, no tengo una respuesta para esa pregunta en este momento.";
    }

    function generateAnswerForRelatedQuestion(relatedQuestion) {
        var relatedQuestionAnswers = {
            "¿Qué tipo de bolsos tienen?": "En Axellesfe ofrecemos bolsos de cuero vegano, tela resistente y modelos multifuncionales, perfectos para el día a día universitario.",
            "¿Tienen bolsos sostenibles?": "Sí, nuestros bolsos sostenibles están fabricados con materiales ecológicos, como cuero vegano y telas recicladas.",
            "¿Cuánto duran los bolsos?": "Nuestros bolsos están diseñados para ser duraderos. Con el cuidado adecuado, pueden durar varios años incluso con uso diario.",

            "¿Cuánto cuesta el envío?": "El costo del envío varía según la ubicación, pero ofrecemos envíos gratuitos para compras mayores a S/200 en todo Perú.",
            "¿Cuánto tarda en llegar el envío?": "El tiempo de entrega es de 2 a 5 días hábiles, dependiendo de tu ubicación. En Lima, puedes optar por envío exprés de 1 a 2 días.",
            "¿Tienen envíos internacionales?": "Actualmente solo realizamos envíos dentro de Perú, pero estamos trabajando para ofrecer envíos internacionales próximamente.",

            "¿Cuáles son las opciones de personalización?": "Puedes elegir el color, agregar tus iniciales y seleccionar diferentes tipos de herrajes para tu bolso.",
            "¿Puedo agregar mi nombre al bolso?": "Sí, puedes personalizar tu bolso con tus iniciales o tu nombre grabado en diferentes áreas del bolso.",
            "¿Qué colores están disponibles?": "Ofrecemos una amplia variedad de colores: desde neutros como negro y beige, hasta tonos más vibrantes como rosa y verde oliva."
        };
        return relatedQuestionAnswers[relatedQuestion] || "Lo siento, no tengo una respuesta para esa pregunta relacionada en este momento.";
    }

    function getRelatedQuestions(selectedQuestion) {
        var relatedQuestions = [];
        if (selectedQuestion === "¿Cuáles son los bolsos más populares?") {
            relatedQuestions = [
                "¿Qué tipo de bolsos tienen?",
                "¿Tienen bolsos sostenibles?",
                "¿Cuánto duran los bolsos?"
            ];
        } else if (selectedQuestion === "¿Tienen envíos a todo Perú?") {
            relatedQuestions = [
                "¿Cuánto cuesta el envío?",
                "¿Cuánto tarda en llegar el envío?",
                "¿Tienen envíos internacionales?"
            ];
        } else if (selectedQuestion === "¿Cómo puedo personalizar mi bolso?") {
            relatedQuestions = [
                "¿Cuáles son las opciones de personalización?",
                "¿Puedo agregar mi nombre al bolso?",
                "¿Qué colores están disponibles?"
            ];
        }
        return relatedQuestions;
    }
});
