import { post } from "../api.js";
import { formHandler } from "../util.js";
const section = document.getElementById('form-sign-up');
const form = document.querySelector('form');
formHandler(form,onSubmit);
section.remove();

let ctx = null;
export function registerView (inCtx){
    ctx = inCtx;
    ctx.render([section]);
};
async function onSubmit({email,password, repeatPassword}){
    if(!email || !password){
        alert('All fields are required');
        return;
    }
    if(password !== repeatPassword){
        alert('Password do not match');
        return;
    }
    const data = await post('/users/register', {email, password});
    const userData = {
        email,
        accessToken: data.accessToken,
        id: data._id
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
    ctx.checkUserNav();
    ctx.goTo('home');
}