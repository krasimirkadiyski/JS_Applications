import { clearHTML } from "./utility.js";

const section = document.getElementById('home-page');
section.remove();
export function homeView() {
    clearHTML();
    const mainContainer = document.getElementById('container');
    const footer = document.querySelector('footer');
    mainContainer.insertBefore(section, footer)
}
