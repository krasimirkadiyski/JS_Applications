import { section } from "./home.js";

export function userHandler(user){
    const nav = document.querySelector('nav');
    let [home,catalog,login,register,about,logout] = Array.from(nav.children)
    if(user == 'login'){
        home.style.display = 'inline-block';
        catalog.style.display = 'inline-block';
        login.style.display = 'none';
        register.style.display = 'none';
        about.style.display = 'inline-block';
        logout.style.display = 'inline-block';
        document.querySelector('main').replaceChildren(section);
    }
    if(user == 'logout'){
        home.style.display = 'inline-block';
        catalog.style.display = 'inline-block';
        login.style.display = 'inline-block';
        register.style.display = 'inline-block';
        about.style.display = 'inline-block';
        logout.style.display = 'none';
        document.querySelector('main').replaceChildren(section);
    }
}
export function greetings(){
    const greetingsSpan = document.getElementById('greetings');
    const email = sessionStorage.getItem('email');
    if(!email){
        greetingsSpan.textContent = '';
    }else{
        greetingsSpan.textContent = `Hello, ${email}!`
    }
}
