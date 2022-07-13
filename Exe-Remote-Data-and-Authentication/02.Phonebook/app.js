function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', getDataPhones);
    document.getElementById('btnCreate').addEventListener('click', postNewContact);
}
function refreshInputFields() {
    document.getElementById('person').value = '';
    document.getElementById('phone').value = '';
}
 async function removePhone(ev){
   let clickedLi = (ev.currentTarget.parentElement);
   clickedLi.remove();
   let _id = clickedLi.id;
   
   let response = await fetch(`http://localhost:3030/jsonstore/phonebook/${_id}`,{
    method: 'delete'
   });
   

};
function displayData(data) {
  
    let ul = document.getElementById('phonebook');
    ul.innerHTML = '';
    let dataArr = Object.values(data);
    dataArr.forEach(e => {
        let li = document.createElement('li');
        li.textContent = `${e.person}: ${e.phone}`
        li.setAttribute('id',e._id);
        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete'
        delBtn.addEventListener('click', removePhone);
        li.appendChild(delBtn);
        ul.appendChild(li);
    })
};
async function postNewContact() {
    let person = document.getElementById('person').value;
    let phone = document.getElementById('phone').value;
    if (!person || !phone) {
        refreshInputFields();
        return;
    }
    refreshInputFields();
    try {
        let response = await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person,
                phone,
            })
        });
        if (!response.ok) {
            throw new Error('Data was not posted to the server');
        }
        let data = await response.json();
    } catch (error) {
        alert(error.message);
    };
}
async function getDataPhones() {
    let response = await fetch('http://localhost:3030/jsonstore/phonebook');
    let data = await response.json();
    displayData(data);
};
attachEvents();
