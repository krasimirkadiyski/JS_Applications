import { showAbout } from './about.js';
import { showCatalog } from './catalog.js';
import { showHome } from './home.js';
import { showLogin } from './login.js';
import { logoutUser } from './logout.js';
import { showRegister } from './register.js';
document.querySelector('nav').addEventListener('click', navigate);

function navigate(ev) {
    let section = {
        'catalogBtn': showCatalog,
        'homeBtn': showHome,
        'aboutBtn': showAbout,
        'loginBtn': showLogin,
        'logoutBtn': logoutUser,
        'registerBtn': showRegister,

    }
    if (ev.target.tagName == 'A') {
        const view = section[ev.target.id];
        if (typeof view == 'function') {
            view();
        }
    }

}