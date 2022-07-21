import { baseHtml } from "./app.js";

export function render(section){
    const container = document.getElementById('container')
    const footer = document.querySelector('footer');
    const current = document.querySelector('section.view-section')
    if (current !== null) {
        current.remove();
    }
    container.insertBefore(section,footer);
}