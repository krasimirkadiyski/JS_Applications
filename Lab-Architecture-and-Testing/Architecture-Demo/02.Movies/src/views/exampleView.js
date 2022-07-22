import { get } from "../api.js";
const section = document.getElementById('movie-example');
section.remove();
exampleView();
export {section};
//TODO не се визуализират филмите от сървъра!!! 
export async function exampleView(ctx) {
    const data = await get('/data/movies');
    const mainDiv = document.createElement('div');
    mainDiv.className = 'row bg-light text-dark';
    data.forEach(m => {
        const innerDiv = document.createElement('div');
        innerDiv.innerHtml = `<h1>Movie title: ${m.title}</h1>
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
    </div>`
    mainDiv.appendChild(innerDiv);
    });
 section.appendChild(mainDiv);
};

