import page from '../node_modules/page/page.mjs';
import { render as litRender} from '../node_modules/lit-html/lit-html.js'
import { homeView } from './views/home.js';
import { aboutView } from './views/about.js';
import { catalogView } from './views/catalog.js';
import { loginView } from './views/login.js';


let main = document.querySelector('main');
console.log(page.ctx);
page(contextDecoration);
page('/index.html', '/');
page('/',homeView);
page('/login',loginView);
page('/catalog',catalogView);
page('/about',aboutView);

page.start();

function render(template){
    litRender(template,main);
}
function contextDecoration(ctx,next){
    ctx.render = render;
    next();
}