import { post } from "../api.js";
import { formHandler } from "../util.js";

const section = document.getElementById('form-login');
const form = document.querySelector('form');
formHandler(form,onSubmit);
section.remove();


let ctx = null;
export function loginView (inCtx){
    ctx = inCtx;
    ctx.render(section);
};


async function onSubmit({email,password}){
    if (!email || !password) {
        alert('All fields are require')
        return;
    }

    const data = await post('/users/login',{email, password});

    const userData = {
        email,
        accessToken: data.accessToken,
        id: data._id,
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
    ctx.checkUserNav();
    ctx.goTo('home');
    
}
