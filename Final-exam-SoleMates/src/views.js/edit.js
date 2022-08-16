import { getItemById } from '../api/requests.js';
import {html} from '../lib.js'
import { editItem } from '../api/requests.js';
const editTemplate = (onSubmit,item) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                .value = "${item.brand}"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                .value = "${item.model}"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                .value = "${item.imageUrl}"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                .value = "${item.release}"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                .value = "${item.designer}"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                .value = "${item.value}"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`;

export async function editView(ctx){
    const item = await getItemById(ctx.params.id)
    ctx.render(editTemplate(onSubmit,item));
     async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const item = {
            brand: formData.get('brand'),
            model: formData.get('model'),
            imageUrl: formData.get('imageUrl'),
            release: formData.get('release'),
            designer: formData.get('designer'),
            value: formData.get('value')
        };

        if (item.brand == '' || item.model == '' || item.imageUrl == '' || item.release == '' || item.designer == '' || item.value == '') {
           return alert('All fields are required!')
        }
        await editItem(ctx.params.id, item);
        event.target.reset();
        ctx.page.redirect(`/dashboard/${ctx.params.id}`);
     }
}