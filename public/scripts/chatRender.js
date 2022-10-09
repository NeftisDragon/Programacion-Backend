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
var submitBtn = document.getElementById('submit-btn');

if (user.value.length === 0 || input.value.length === 0) {
    submitBtn.disabled = true;
    submitBtn.classList.remove("submit-btn-enabled");
    submitBtn.classList.add("submit-btn-disabled");
}

[user, input].forEach(function (element) {
    element.addEventListener("change", () => {
        submitBtn.disabled = false;
        submitBtn.classList.add("submit-btn-enabled");
        submitBtn.classList.remove("submit-btn-disabled");
        if (user.value.length === 0 || input.value.length === 0) {
            submitBtn.disabled = true;
            submitBtn.classList.remove("submit-btn-enabled");
            submitBtn.classList.add("submit-btn-disabled");
            return false;
        }
        return false;
    })
})

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