import { homeView } from "./homePage.js";
import { clearHTML, handleUser } from "./utility.js";

const section = document.getElementById('form-sign-up');
const form = document.querySelector('form')
console.log(form);
section.remove();

export function fromSingUpView() {
    clearHTML();
    const mainContainer = document.getElementById('container');
    const footer = document.querySelector('footer');

    mainContainer.insertBefore(section, footer);
    form.addEventListener('submit', onSubmit);

};
async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('repeatPassword')

    try {
        if (!email || !password) {
            throw new Error('All field are required!')
        }
        if (password !== repass) {
            throw new Error('Passwords do not match');
        }
        const res = await fetch('http://localhost:3030/users/register',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        const data = await res.json();
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', email);
        homeView();
    } catch (error) {
        alert(error.message);
    }
    ev.target.reset();
}