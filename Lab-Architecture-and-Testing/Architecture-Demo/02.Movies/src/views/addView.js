import { post } from "../api.js";
import { formHandler } from "../util.js";
const section = document.getElementById('add-movie');
const form = document.querySelector('form');
formHandler(form,onSubmit);
section.remove();
let ctx = null
export function addView (inCtx){
    ctx = inCtx;
    ctx.render([section]);
};




function onSubmit({title, description, img}){
    if (!title, !description, !img) {
        alert('All fields are required');
        return;
    }
    const data = post('/data/movies',{title,description,img});
    //ToDo не се визуализира последно добавенияр филм, трябва да се рефрешне за да се появи!!!
    ctx.goTo('home');
}

