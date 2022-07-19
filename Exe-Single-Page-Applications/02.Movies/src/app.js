import { addMoviewView } from "./addMovie.js";
import { editMovieView } from "./editMovie.js";
import { formLoginView } from "./formLogin.js";
import { fromSingUpView } from "./formSingUp.js";
import { homeView } from "./homePage.js";
import { movieExampleView } from "./movieExample.js";
import { clearHTML, handleUser, logOut } from "./utility.js";

homeView();
const nav = document.querySelector('nav');
nav.addEventListener('click', showView);

function showView(ev){
    const navViews = {
        'Login': formLoginView,
        'Register': fromSingUpView,
        'Logout': logOut,
    }
    if (ev.target.tagName == 'A' &&  ev.target.className == 'nav-link') {
        const clickedSection = (ev.target.parentElement.textContent).trim();
        const view = navViews[clickedSection];
        view();
    }
   
}




