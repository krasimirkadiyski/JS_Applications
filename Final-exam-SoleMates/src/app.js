import {page, render} from './lib.js'
import { getUserData } from './util.js';
import { logout } from './api/users.js';
import { homeView } from './views.js/home.js';
import { loginView } from './views.js/login.js';
import { registerView } from './views.js/register.js';
import { dashboardView } from './views.js/dashboard.js';
import { addView } from './views.js/add.js';
import { detailsView } from './views.js/details.js';
import { editView } from './views.js/edit.js';
const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click',onLogout);


page(decorateCtx);
page('/', homeView);
page('/add', addView);
page('/dashboard', dashboardView);
page('/dashboard/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/search', () => console.log('searching'));
updateNav();
page.start();

function decorateCtx(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next();
}

function updateNav (){
    const userData = getUserData();
    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
       
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

function renderMain(teplateResult) {
    render(teplateResult,main);
}

function onLogout (){
    logout();
    updateNav();
    page.redirect('/');
}