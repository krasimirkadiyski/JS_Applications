import {exampleView, section as exampleSection} from "./exampleView.js";
const section = document.getElementById('home-page');
section.remove();
exampleView();

export function homeView (ctx){
 ctx.render([section,exampleSection]);
};