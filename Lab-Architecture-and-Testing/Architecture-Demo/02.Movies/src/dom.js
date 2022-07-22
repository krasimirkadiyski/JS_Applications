import { baseHtml } from "./app.js";

export function render(sections){
    const container = document.getElementById('container')
    const footer = document.querySelector('footer');
    const currents = document.querySelectorAll('section.view-section')
    if (currents !== null) {
        currents.forEach(c => c.remove());
    }
    sections.forEach(s => container.insertBefore(s,footer));
}