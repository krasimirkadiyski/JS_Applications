const section = document.getElementById('home-page');
section.remove();


export function homeView (ctx){
 ctx.render(section);
};