const section = document.getElementById('add-movie');
section.remove();

export function addView (ctx){
    ctx.render(section);
};