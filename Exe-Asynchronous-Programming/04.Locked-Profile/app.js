function lockedProfile() {

    let main = document.getElementById('main');
    console.log(main.innerHTML);
    main.innerHTML = '';
    showsProfiles(main);

}
async function showsProfiles(main) {
    try {
        let response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        let data = await response.json();
        let dataArr = Object.values(data);
        for (const current of dataArr) {
            let username = current.username;
            let email = current.email;
            let age = current.age;
            console.log(username, email, age);
            let innerHTMLForm = `<div class="profile">
            <img src="./iconProfile2.png" class="userIcon">
            <label>Lock</label>
            <input type="radio" name="user1Locked" value="lock" checked="">
            <label>Unlock</label>
            <input type="radio" name="user1Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user1Username" value="${username}" disabled="" readonly="">
            <div class="user1Username">
                <hr>
                <label>Email:</label>
                <input type="email" name="user1Email" value="${email}" disabled="" readonly="">
                <label>Age:</label>
                <input type="text" name="user1Age" value="${age}" disabled="" readonly="">
            </div>
            
            <button>Hide it</button>
        </div>`

            main.innerHTML += innerHTMLForm;
        }


        
        let buttons = Array.from(document.querySelectorAll('button'));
        buttons.forEach((b) => b.addEventListener('click', (e) => {

            let currentBtn = e.currentTarget;
            let checkLockEl = (currentBtn.parentElement.children[2]);

            let div = (currentBtn.parentElement.children[9]);
            if (currentBtn.textContent == 'Show more' && !checkLockEl.checked) {
                currentBtn.textContent = 'Hide it';
                div.style.display = 'block';
            } else if (currentBtn.textContent == 'Hide it' && !checkLockEl.checked) {
                currentBtn.textContent = 'Show more';
                div.style.display = 'none';
            }
        }))

    } catch (error) {
        console.log(error.message);
    }
}