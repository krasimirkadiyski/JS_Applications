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
}