import { addItem } from '../api/requests.js';
import {html} from '../lib.js'


const addTemplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`;

export async function addView(ctx){
    ctx.render(addTemplate(onSubmit));
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
        await addItem(item);
        event.target.reset();
        ctx.page.redirect('/dashboard');
    }
}