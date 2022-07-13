function attachEvents() {
    document.getElementById('submit').addEventListener('click', postData);
    document.getElementById('refresh').addEventListener('click', refreshData);
}
function refreshInputFields(){
    document.querySelector('[name="author"]').value = '';
    document.querySelector('[name="content"]').value = '';
}
function displayIt(e) {
    let textarea = document.getElementById('messages');
    textarea.textContent += (`${e.author}: ${e.content}\n`);

}
async function refreshData() {
    let response = await fetch('http://localhost:3030/jsonstore/messenger');
    let data = await response.json();
    let dataArr = (Object.values(data));
    dataArr.forEach((e) => displayIt(e));
}
async function postData() {
    let author = document.querySelector('[name="author"]').value;
    let content = document.querySelector('[name="content"]').value;
    if (!author || !content) {
       refreshInputFields();
        return;

    }
    refreshInputFields();
    try {
        let response = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author,
                content,
            })
        });
        if (!response.ok) {
            throw new Error('Data was not posted to the server')
        }
        let data = await response.json();
        console.log(data);

    } catch (error) {
        alert(error.message);
    }
}
attachEvents();