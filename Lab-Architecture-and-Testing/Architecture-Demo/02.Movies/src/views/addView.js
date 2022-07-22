import { post } from "../api.js";
import { formHandler } from "../util.js";
const section = document.getElementById('add-movie');
const form = document.querySelector('form');
formHandler(form,onSubmit);
section.remove();
export function addView (ctx){
    ctx.render([section]);
};




function onSubmit({title, description, img}){
    if (!title, !description, !img) {
        alert('All fields are required');
        return;
    }
    const data = post('/data/movies',{title,description,img});
}

