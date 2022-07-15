import { showAbout } from './about.js';
import { showCatalog } from './catalog.js';
import { showHome } from './home.js';
document.querySelector('nav').addEventListener('click', navigate);

function navigate(ev) {
    let section = {
        'catalogBtn': showCatalog,
        'homeBtn': showHome,
        'aboutBtn': showAbout,
    }
    if (ev.target.tagName == 'A') {
        const view = section[ev.target.id];
        if (typeof view == 'function') {
            view();
        }
    }

}