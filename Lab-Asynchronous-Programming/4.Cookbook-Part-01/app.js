async function getRecipes() {
    try {
        let response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
        let data = await response.json();
        let dataRecipies = Object.values(data)
        return dataRecipies
    }
    catch (error) {
        console.log(error.message);
    }
    
}
function createPreview(main,title,imgsrc,_id){
   let article = e('article','','preview');
   let div1 = e('div','','title',article);
   let h2 = e('h2',title,'',div1);
   let div2 = e('div', '', 'small', article);
   let img = e('img', '', '', div2, imgsrc)
   article.setAttribute('id', _id)
   article.addEventListener('click', recipeInfo);
   main.appendChild(article);
}
function createFullView(title,imgsrc,ingredients,steps,_id){
    let article = e('article');
    let h2 = e('h2',title,'',article);
    let div1 = e('div','','band',article);

    let div2 = e('div','','thumb',div1);

    let img = e('img','','',div2,imgsrc);
    let div3 = e('div','','ingredients',div1);
    let h3 = e('h3','Ingredients:','',div3);
    let ul = e('ul','','',div3);
    ingredients.forEach(el =>{
        e('li',el,'',ul);
    });
    let divDescription = e('div', '', 'description', article);
    let h33 = e('h3','Preparation:','',divDescription);
    steps.forEach(el => {
        e('p',el,'',divDescription);
    });
    article.setAttribute('id',_id);
    return article;
    
};
function e(type, content, clazz,parent, src){
    let el = document.createElement(type);
    if(content){el.textContent = content;}
    if(clazz){el.className = clazz;}
    if(src){ el.src = src; }
    if(parent){parent.appendChild(el); }
    return el;
    
}
async function recipeInfo(e){
    let target = e.currentTarget;
    let _id = target.id;
    let response = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${_id}`);
    let data = await response.json();
    console.log(data);
    target.replaceWith(createFullView(data.name,data.img,data.ingredients,data.steps));

}
window.addEventListener('load', async () => {
    const main = document.querySelector('main');
    main.innerHTML = '';
    let dataRecipies = await getRecipes();
    dataRecipies.forEach(e => {
        createPreview(main,e.name,e.img,e._id)
    })
    
});
