import { clearHTML } from "./utility.js";

const section = document.getElementById('form-login');
section.remove();


export function formLoginView (){
clearHTML();
const mainContainer = document.getElementById('container');
const footer = document.querySelector('footer');
mainContainer.insertBefore(section,footer);
};