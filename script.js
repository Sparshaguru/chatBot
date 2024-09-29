document.addEventListener('DOMContentLoaded', function() {
    const chatBtn = document.querySelector('.chatBtn');
    const boss = document.querySelector('.boss');
    const chatbox = document.querySelector('.chatbox');
    const sendBtn = document.getElementById('send-btn');
    const textarea = document.querySelector('.chat-input textarea');

    // Dummy chatbot replies
    const dummyResponses = [
        "I'm here to help you!",
        "Can I assist you with anything else?",
        "Sure, let me look into that.",
        "That's a good question!",
        "I'm still learning, but I'll do my best to answer."
    ];

    // Function to generate a random dummy response
    function getDummyResponse() {
        const randomIndex = Math.floor(Math.random() * dummyResponses.length);
        return dummyResponses[randomIndex];
    }

    // Function to append a new outgoing message
    function appendMessage(message) {
        const messageElement = document.createElement('li');
        messageElement.classList.add('chat', 'outgoing');
        messageElement.innerHTML = `<p class="outgoing">${message}</p>`;
        chatbox.appendChild(messageElement);
        scrollChatToBottom(); // Scroll to the bottom after message
    }

    // Function to append chatbot's reply with SVG logo
    function appendBotResponse(response) {
        const botMessageElement = document.createElement('li');
        botMessageElement.classList.add('chat', 'incoming');
        botMessageElement.innerHTML = `
            <div class="bot-logo">
                <!-- Add your SVG logo here -->
                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2C14 2.74028 13.5978 3.38663 13 3.73244V4H20C21.6569 4 23 5.34315 23 7V19C23 20.6569 21.6569 22 20 22H4C2.34315 22 1 20.6569 1 19V7C1 5.34315 2.34315 4 4 4H11V3.73244C10.4022 3.38663 10 2.74028 10 2C10 0.895431 10.8954 0 12 0C13.1046 0 14 0.895431 14 2ZM4 6H11H13H20C20.5523 6 21 6.44772 21 7V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V7C3 6.44772 3.44772 6 4 6ZM15 11.5C15 10.6716 15.6716 10 16.5 10C17.3284 10 18 10.6716 18 11.5C18 12.3284 17.3284 13 16.5 13C15.6716 13 15 12.3284 15 11.5ZM16.5 8C14.567 8 13 9.567 13 11.5C13 13.433 14.567 15 16.5 15C18.433 15 20 13.433 20 11.5C20 9.567 18.433 8 16.5 8ZM7.5 10C6.67157 10 6 10.6716 6 11.5C6 12.3284 6.67157 13 7.5 13C8.32843 13 9 12.3284 9 11.5C9 10.6716 8.32843 10 7.5 10ZM4 11.5C4 9.567 5.567 8 7.5 8C9.433 8 11 9.567 11 11.5C11 13.433 9.433 15 7.5 15C5.567 15 4 13.433 4 11.5ZM10.8944 16.5528C10.6474 16.0588 10.0468 15.8586 9.55279 16.1056C9.05881 16.3526 8.85858 16.9532 9.10557 17.4472C9.68052 18.5971 10.9822 19 12 19C13.0178 19 14.3195 18.5971 14.8944 17.4472C15.1414 16.9532 14.9412 16.3526 14.4472 16.1056C13.9532 15.8586 13.3526 16.0588 13.1056 16.5528C13.0139 16.7362 12.6488 17 12 17C11.3512 17 10.9861 16.7362 10.8944 16.5528Z" fill="#000000"/>
                </svg>
            </div>
            <p class="incoming">${response}</p>
        `;
        chatbox.appendChild(botMessageElement);
        scrollChatToBottom(); // Scroll to the bottom after bot response
    }

    // Function to auto-scroll chatbox to the bottom
    function scrollChatToBottom() {
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Toggle chatbot on chat button click
    chatBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        boss.classList.toggle('open');
    });

    // Close chatbot when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInside = boss.contains(event.target) || chatBtn.contains(event.target);
        if (!isClickInside) {
            boss.classList.remove('open');
        }
    });

    // Handle send button click
    sendBtn.addEventListener('click', function() {
        const message = textarea.value.trim();
        if (message !== "") {
            appendMessage(message);
            textarea.value = "";
            // Add a dummy chatbot response after a short delay
            setTimeout(function() {
                const botResponse = getDummyResponse();
                appendBotResponse(botResponse);
            }, 1000); // 1 second delay before bot responds
        }
    });

    // Handle pressing Enter key to send message
    textarea.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendBtn.click();
        }
    });
});
