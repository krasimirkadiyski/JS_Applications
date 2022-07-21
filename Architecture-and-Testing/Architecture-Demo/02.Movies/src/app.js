import { render } from "./dom.js";
import { onLogout, checkUserNav} from "./util.js";
import { addView } from "./views/addView.js";
import { editView } from "./views/editView.js";
import { exampleView } from "./views/exampleView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
export const baseHtml = document.getElementById('container').innerHTML;


document.querySelector('nav').addEventListener('click', onNavigate);
const [greetings, logout, login, register] = document.querySelector('nav ul').children;
console.log(greetings);

const sections = {
    'home': homeView,
    'example': exampleView,
    'add': addView,
    'login': loginView,
    'register': registerView,
    'edit': editView,
    'logout': onLogout,
};
goTo('home')

function onNavigate(event) {

    if (event.target.tagName == 'A') {
        const viewName = (event.target.textContent).toLowerCase().trim();
        if (goTo(viewName)) {
            event.preventDefault();
        }
    }
}

function goTo(viewName) {
    const view = sections[viewName];
    if (typeof view == 'function') {
        view({
            render,
            goTo,
            checkUserNav,
        })
        return true;
    } else {
        return false;
    }

}

