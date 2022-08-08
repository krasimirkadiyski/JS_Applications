import { html } from "../../node_modules/lit-html/lit-html.js";

const catalogTemplate = () => html`
<h1>Catalog Page</h1>
<ul>
  <a href="catalog/p3">Product 3</a>
  <a href="catalog/p2">Product 2</a>  
  <a href="catalog/p1">Product 1</a>  
</ul>
`
export function catalogView (ctx){
    ctx.render(catalogTemplate());
}
