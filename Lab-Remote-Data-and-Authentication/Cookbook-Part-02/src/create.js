const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

async function onSubmit(ev){
  ev.preventDefault();

  let formData = new FormData(ev.target);

  let recipeName = formData.get('name');
  let img = formData.get('img');
  let ingredients = formData.get('ingredients').split('\n');
  let steps = formData.get('steps').split('\n');


let data = {
    recipeName,
    img,
    ingredients,
    steps,
};
const token = sessionStorage.getItem('accessToken');
if(!token){
    alert('Please LOGIN');
    window.location = ('/Cookbook-Part-02/login.html');
    return;
};
 try{
    const response = await fetch("http://localhost:3030/data/recipes",{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(data),
        
    });
    if(!response.ok){
        const error = await response.json();
        throw new Error(error.message);
    }
    window.location = '/Cookbook-Part-02/index.html';
 }catch(error){
    alert(error.message);
 }
}