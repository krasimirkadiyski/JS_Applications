import {html} from '../lib.js';
import {register} from '../api/users.js'
import { notify } from '../notice.js';


const registerTamplate = (onSubmit) => html`
   <section id="register">
            <form @submit=${onSubmit} id="register-form">
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male" checked>
                        <label for="male">Male</label>
                    </div>
                    <input type="submit" class="registerbtn button" value="Register">
                    <div class="container signin">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>
`;
//тази функция я податаваме на page.js и от там взимаме 'ctx'
export function registerView(ctx) {
 ctx.render(registerTamplate(onSubmit));

 async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const username = formData.get('username').trim();
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('repeatPass').trim();
    const gender = formData.get('gender');

    if(username == '' || email == '', password == ''){
        return notify('All fields are required!')
    }
    if (password != repass) {
        return notify(`Passwords  don\`t match`)
    }

    await register(username, email, password, gender);

    ctx.updateNav();
    ctx.page.redirect('/memes')

 }
}