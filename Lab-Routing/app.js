import { createHRouter } from "./historyRouter.js";

const views = {
    '/index.html': () => '<h2>Home page<h2>',
    '/catalog': () => '<h2>Catalog page<h2>',
    '/home': () => '<h2>Home page<h2>',
    '/about': () => '<h2>About Us<h2>',
}
const main = document.querySelector('main');

const start = createHRouter(views,main);

start();