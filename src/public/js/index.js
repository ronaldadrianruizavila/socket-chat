let nombreInput = document.getElementById('user');
let form = document.getElementById('form');
let sala = document.getElementById('sala');
let btn = document.getElementById('btn');

let configUser = () => {
    btn.addEventListener('click', () => {
        if (nombreInput.value.length >= 1 && sala.value.length >= 1) {
            form.submit();
        }
    })
}

configUser()