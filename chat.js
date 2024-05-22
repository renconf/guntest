// Initialize Gun with a relay peer server
const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);

// Reference to the chat node
const chat = gun.get('chat');

// HTML Elements
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Function to add message to the chat
function addMessage(username, message) {
    const li = document.createElement('li');
    li.textContent = `${username}: ${message}`;
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight; // Auto-scroll to the bottom
}

// Listen for new messages
chat.map().on((data, id) => {
    if (data) {
        addMessage(data.username, data.message);
    }
});

// Send message on button click
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        chat.set({
            username: 'User', // Replace with dynamic username if needed
            message: message,
            timestamp: Gun.state()
        });
        messageInput.value = '';
    }
});

// Send message on Enter key press
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
