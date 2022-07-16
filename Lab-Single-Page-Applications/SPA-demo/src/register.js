import { userHandler } from "./util.js";
import { greetings } from "./util.js";

const section = document.getElementById('registerView')
section.remove();

export function showRegister() {
    document.querySelector('main').replaceChildren(section);
    const form = document.querySelector('form').addEventListener('submit', onSubmit)
}

async function onSubmit(ev) {
    ev.preventDefault()
    const formData = new FormData(ev.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('repass');
    try {
        if (!email || !password) {
            throw new Error('All fields are required')
        }
        if (password != repass) {
            throw new Error('Password do not match');
        }
        const res = await fetch('http://localhost:3030/users/register',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        if (!res.ok) {
            throw new Error('Captain, we have a problem')
        }
        let data = await res.json();
        console.log(data);
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', email);
        greetings();
        userHandler('login');

    } catch (error) {
        alert(error.message);
    }

}