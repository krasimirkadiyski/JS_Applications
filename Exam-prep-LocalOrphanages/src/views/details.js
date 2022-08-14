import { delPost, getPostById } from '../api/requests.js';
import { html } from '../lib.js'
import { getUserData } from '../util.js';

const detailsTemplate = (current,isOwner,onDelete) => html`
 <section id="details-page">
            <h1 class="title">Post Details</h1>
            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${current.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${current.title}</h2>
                        <p class="post-description">Description: ${current.description}</p>
                        <p class="post-address">Address: ${current.address}</p>
                        <p class="post-number">Phone number: ${current.phone}</p>
                        <p class="donate-Item">Donate Materials: 0</p>

                        <!--Edit and Delete are only for creator-->
                        ${isOwner ? html`<div class="btns">
                            <a href="/edit/${current._id}" class="edit-btn btn">Edit</a>
                            <a @click=${onDelete} class="delete-btn btn">Delete</a>

                            <!-- Bonus - Only for logged-in users ( not authors )
                            <a href="#" class="donate-btn btn">Donate</a> -->
                        </div>`
                        : ''}
                        

                    </div>
                </div>
            </div>
        </section>`;

export async function detailsView(ctx){
    const current = await  getPostById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData?.id == current._ownerId;
    ctx.render(detailsTemplate(current,isOwner,onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this meme?');
        if (choice) {
            await delPost(ctx.params.id);
            ctx.page.redirect('/dashboard')
        }
    }
}