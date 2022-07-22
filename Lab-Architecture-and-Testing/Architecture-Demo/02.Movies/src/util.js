import {get} from "../src/api.js"
export function formHandler(form, callback) {
    form.addEventListener('submit', onSubmit);
    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        callback(Object.fromEntries([...formData.entries()]));
    }
}
export function checkUserNav(){
    const [greetings, logout, login, register] = document.querySelector('nav ul').children;
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        greetings.style.display = 'inline-block';
        greetings.querySelector('a').textContent = `Hellp, ${userData.email}`
        logout.style.display = 'inline-block';
        login.style.display = 'none';
        register.style.display = 'none';
    }else{
        greetings.style.display = 'none';
        greetings.querySelector('a').textContent = ``
        logout.style.display = 'none';
        login.style.display = 'inline-block';
        register.style.display = 'inline-block';
    }
}
export function onLogout(ctx){
    get('/users/logout');
    sessionStorage.removeItem('userData');
    ctx.checkUserNav();
    ctx.goTo('homeBtn');
}