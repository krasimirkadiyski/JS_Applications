import { post } from "../data/request.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { formHandler } from "../../util.js";

const loginTemplate = () => html`
<form>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <input type="submit" value="Login">
</form>
`


export function loginView (ctx){
    ctx.render(loginTemplate());
    const form = document.querySelector('form');
    formHandler(form,onSubmit);
}


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
    window.location.pathname = '/';
}
