import { editPost, getPostById } from '../api/requests.js';
import { html } from '../lib.js'

const editTemplate = (current,onSubmit) => html`
 <section id="edit-page" class="auth">
            <form @submit=${onSubmit} id="edit">
                <h1 class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title" value="${current.title}">
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description" value="${current.description}">
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl" value="${current.imageUrl}">
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address" value="${current.address}">
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone" value="${current.phone}">
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
            </form>
        </section>`;


export async function editView(ctx){
    const current = await getPostById(ctx.params.id);
    ctx.render(editTemplate(current,onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);

        const current = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            address: formData.get('address'),
            phone: formData.get('phone'),
        };
        if (current.title == '' || current.description == '' || current.imageUrl == '' || current.address == '' || current.phone == '') {
            return alert('All fields are required!');
         }
         await editPost(ctx.params.id, current);
         event.target.reset();
         ctx.page.redirect(`/dashboard/${ctx.params.id}`)
    }
}