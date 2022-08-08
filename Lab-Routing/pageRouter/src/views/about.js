import { html } from "../../node_modules/lit-html/lit-html.js";

const aboutTemplate = () => html`
<h1>About Us</h1>
<p>Contact: +359-8546-245</p>
`

export function aboutView (ctx){
    ctx.render(aboutTemplate());
}
