import { userHandler } from "./util.js";

const section = document.getElementById('loginView');
const form = document.querySelector('form');
section.remove();
console.log(form);
form.addEventListener('submit', onSubmit);
const formData = new FormData(form);
const email = formData.get('email');
const password = formData.get('password');


export function showLogin() {
    document.querySelector('main').replaceChildren(section);
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        if (!email || !password) {
            throw new Error('Email and password are required!')
        }

        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (!response.ok) {
            throw new Error('Captain, we have a problem!')
        }

        const data = await response.json();
        console.log(data);
        sessionStorage.setItem('accessToken', data.accessToken);

        userHandler('login');

    } catch (error) {
        alert(error.message);
    }
};