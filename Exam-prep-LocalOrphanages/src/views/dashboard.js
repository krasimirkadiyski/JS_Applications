import { getAllMaterials } from '../api/requests.js';
import { html } from '../lib.js'


const dashboardTemplate = (allMaterials) => html`<section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    <div class="all-posts">
    ${allMaterials.length == 0 ? html `<h1 class="title no-posts-title">No posts yet!</h1>`
    : allMaterials.map(materialCard)}
    </div> 
</section>
`

const materialCard = (current) => html`<div class="post">
<h2 class="post-title">${current.title}</h2>
<img class="post-image" src="${current.imageUrl}" alt="Material Image">
<div class="btn-wrapper">
    <a href="/dashboard/${current._id}" class="details-btn btn">Details</a>
</div>
</div>`

export async function dashboardView(ctx) {
    
    const allMaterials = await getAllMaterials();
    ctx.render(dashboardTemplate(allMaterials));

}