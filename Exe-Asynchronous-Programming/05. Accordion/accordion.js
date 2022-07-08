function solution() {
    const main = document.getElementById('main');
    let res = fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(res => res.json())
        .then(data => {
            data.forEach(el => {
                main.appendChild(createDivAccordion(el));
            })
        })
        .catch(error => {
            console.log(error.message);
        })
}
solution();

function createDivAccordion({ _id, title }) {
    let divAccordion = createEl('div', '', 'accordion');
    let divHead = createEl('div', '', 'head', divAccordion);
    let spanArticle = createEl('span', title, '', divHead);
    let btn = createEl('button', 'MORE', 'button', divHead);
    btn.id = _id;
    let divExtra = createEl('div', '', 'extra', divAccordion);
    let p = createEl('p', '', '', divExtra);
    divExtra.style.display = 'none';

    btn.addEventListener('click', handleBtn);
    return divAccordion;
}
function handleBtn(e) {
    let currentBtn = e.currentTarget;
    let divExtra = (currentBtn.parentElement.parentElement.children[1]);
    let p = divExtra.children[0];
    if (p.textContent === '') {
        let _id = currentBtn.id;
        let res = fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${_id}`)
            .then(res => res.json())
            .then(data => {
                let content = data.content;
                p.textContent = content;
            })
            .catch(error => {
                console.log(error.message);
            })
    } else {
        if (currentBtn.textContent === 'MORE') {
            currentBtn.textContent = 'LESS';
            divExtra.style.display = 'block';
        } else {
            currentBtn.textContent = 'MORE';
            divExtra.style.display = 'none';
        }
    }

}

function createEl(type, content, clazz, parent) {
    let el = document.createElement(type);
    el.textContent = content;
    el.className = clazz;
    if (parent) {
        parent.appendChild(el);
    }
    return el;
}
