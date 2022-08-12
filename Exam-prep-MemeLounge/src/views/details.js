import { getAllMemes, getMemeById } from "../api/memes.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const detailsTemplate = (meme, isOwner) => html`
      <section id="meme-details">
            <h1>Meme Title: ${meme.title} </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${meme.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${meme.description}
                    </p>
                     
                    ${isOwner ? html`
                    <a class="button warning" href="#">Edit</a>
                    <button class="button danger">Delete</button>`
                    : ''}
                     
                    
                </div>
            </div>
        </section>
`;


//ctx e от page
export async function detailsView(ctx) {
    const meme = await getMemeById(ctx.params.id)
    const userData = await getUserData();
    const isOwner = userData?.id == meme._ownerId;
    ctx.render(detailsTemplate(meme, isOwner));
}