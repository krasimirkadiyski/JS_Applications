const section = document.getElementById('catalogView');
const list = section.querySelector('ul');
section.remove();

export async function showCatalog () {

    document.querySelector('main').replaceChildren(section);
    list.replaceChildren('Loading...');
    try {
        let res = await fetch(`http://localhost:3030/data/movies`);
        let data = await res.json();

        const fragment = document.createDocumentFragment();

        data.forEach(m => {
            let li = createMovieLi(m);
            fragment.appendChild(li);
        })

    
        list.replaceChildren(fragment);
    } catch (error) {
        alert(error.message);
    }
}
function createMovieLi(movie){
    const li = document.createElement('li');
    li.textContent = movie.title;
    const p = document.createElement('p');
    p.textContent = movie.description;
    li.appendChild(p);
    return li;
}