import { get } from "../api.js";
const section = document.getElementById('movie-example');
section.remove();
export async function exampleView(ctx) {
    section.innerHTML = '';
    const data = Array.from(await get('/data/movies'));
    data.forEach(m => {
        const innerDiv = document.createElement('div');
        innerDiv.innerHTML = `<div class="container">
        <div class="row bg-light text-dark">
          <h1>Movie title: ${m.title}</h1>

          <div class="col-md-8">
            <img class="img-thumbnail" src="${m.img}" alt="Movie">
          </div>
          <div class="col-md-4 text-center">
            <h3 class="my-3">Movie Description</h3>
            <p>
             ${m.description}
            </p>
            <a class="btn btn-danger" href="#">Delete</a>
            <a class="btn btn-warning" href="#">Edit</a>
            <a class="btn btn-primary" href="#">Like</a>
            <span class="enrolled-span">Liked 1</span>
          </div>
        </div>
      </div>
    <div class="row bg-light text-dark"><div></div><div></div><div></div></div>`
    section.appendChild(innerDiv);
    });
};
export {section}; 
