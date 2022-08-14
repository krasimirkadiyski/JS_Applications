import {page, render} from './lib.js'
import * as api from './api/users.js'
import { getUserData } from './util.js';
import {logout} from './api/users.js'
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { dashboardView } from './views/dashboard.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { myPostView } from './views/myposts.js';

window.api = api;

const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);
page(decorateCtx);
page('/','/dashboard')
page('/dashboard', dashboardView);
page('/dashboard/:id', detailsView)
page('/edit/:id', editView);
page('/myposts', myPostView);
page('/create', createView);
page('/login', loginView);
page('/register', registerView);

updateUserNav();

page.start();


function decorateCtx(ctx, next){
    ctx.render = litRender;
    ctx.updateNav = updateUserNav;
    next();
}

function litRender(resultTemplate){
    render(resultTemplate,main);
}

function updateUserNav(){
    const userData = getUserData();
    if (userData) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}
function onLogout(){
    logout();
    updateUserNav();
    page.redirect('/');
}

