import { logout } from './api/users.js';
import {page, render} from './lib.js'
import { getUserData } from './util.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { profileView } from './views/profile.js';
import { registerView } from './views/register.js';
import { notify } from './notice.js';

const main = document.querySelector('main');
window.notify = notify;

document.getElementById('logoutBtn').addEventListener('click', onLogout);
//закачаме функцията, която сме създали
page(decorateCtx);
page('/memes/create', '/create');
page('/', homeView);
page('/memes', catalogView);
page('/memes/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/profile', profileView);


updateNav();
//start application
page.start();
//добавяме функция към вече съществуващия ctx на 'page'
function decorateCtx(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next(); 
}

function renderMain(teplateResult) {
    render(teplateResult,main);
}

function updateNav (){
    const userData = getUserData();
    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`;
       
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}
function onLogout (){
    logout();
    updateNav();
    page.redirect('/');
}