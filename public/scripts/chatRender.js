const socket = io.connect();

socket.on('messages', messages => {
    render(messages);
})

const render = (messages) => {
    let html = ' ';
    messages.forEach(message => {
        html += `
                <li class="message">
                    <strong class="user">${message.user}</strong>
                    <label class="date">${message.date}</label>
                    <p class="input">${message.input}</p>
                </li>
                `
    })
    return document.getElementById('messages').innerHTML = html;
}

let user = document.getElementById('username');
let input = document.getElementById('input');
var sendBtn = document.getElementById('send-btn');

if (user.value.length === 0 || input.value.length === 0) {
    sendBtn.disabled = true;
    sendBtn.classList.remove("send-btn-enabled");
    sendBtn.classList.add("send-btn-disabled");
}

[user, input].forEach(function (element) {
    element.addEventListener("change", () => {
        sendBtn.disabled = false;
        sendBtn.classList.add("send-btn-enabled");
        sendBtn.classList.remove("send-btn-disabled");
        if (user.value.length === 0 || input.value.length === 0) {
            sendBtn.disabled = true;
            sendBtn.classList.remove("send-btn-enabled");
            sendBtn.classList.add("send-btn-disabled");
            return false;
        }
        return false;
    })
})

//Issue 3: page refreshes on message sent, causing server to restart:
function newMessage() {
    const message = {
        user: user.value,
        input: input.value
    };
    socket.emit('newMessage', message);
    input.value = '';
    input.focus();
    return false;
}
//Issue 3 end.