import { getAllItems } from '../api/requests.js';
import {html} from '../lib.js'


const dashboardTemplate = (allItems) => html`
<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
            ${allItems.length == 0 ? html` <h2>There are no items added yet.</h2>`
            : allItems.map(itemCard)}
        </section>`;

const itemCard = (item) => html`
<li class="card">
              <img src="${item.imageUrl}" alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${item.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${item.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
              <a class="details-btn" href="/dashboard/${item._id}">Details</a>
            </li>`;
export async function dashboardView(ctx){
    const allItems = await getAllItems();
    ctx.render(dashboardTemplate(allItems));
};