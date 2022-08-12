const errBox = document.getElementById('errorBox');
const errMessage = document.querySelector('#errorBox span');


export function notify (message){
    errMessage.textContent = message;
    errBox.style.display = 'block';

    setTimeout(() => {errBox.style.display = 'none'}, 3000);
}