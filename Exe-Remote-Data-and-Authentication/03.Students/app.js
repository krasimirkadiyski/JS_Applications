
window.addEventListener('load', onLoad);
function onLoad() {
    displayIt();
    document.getElementById('form').addEventListener('submit', onSubmit);

}
async function displayIt() {
    let response = await fetch('http://localhost:3030/jsonstore/collections/students');
    let data = await response.json();
    let dataArr = Object.values(data);
    let tbody = document.querySelector('table tbody');
    console.log(tbody);
    dataArr.forEach(s => {
        let tr = createTR(s);
        tbody.appendChild(tr);
    })
}

async function onSubmit(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');
    refreshInputFields();
    try {
        if (!firstName || !lastName || !facultyNumber || !grade) {

            throw new Error('All fields are required');
        }
        let response = await fetch(`http://localhost:3030/jsonstore/collections/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                facultyNumber,
                grade,
            })
        })
        let data = await response.json();
        document.querySelector('table tbody').innerHTML = '';
        displayIt();


    } catch (error) {
        alert(error.message);
    }

}
function createTR(student) {
    let tr = e('tr');
    let thFirstName = e('th',student.firstName,tr);
    let thLastName = e('th',student.lastName,tr);
    let thFacultyNumber = e('th',student.facultyNumber,tr);
    let thGrade = e('th',student.grade,tr);
    return tr;
}
function e(type,content,parent){
    let e = document.createElement(type);
    if(content){
    e.textContent = content;
    }
    if(parent){
        parent.appendChild(e);
    }
    return e;
}
function refreshInputFields() {
    let arr = Array.from(document.querySelectorAll('[type="text"]'));
    arr.forEach(e => e.value = '');
}