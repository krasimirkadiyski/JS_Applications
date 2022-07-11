const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);


    let email = formData.get('email');
    let password = formData.get('password');
    let repass = formData.get('rePass')

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required!');
        }
        if (password != repass){
            throw new Error('Passwords do not match!')
        }
        const response = await fetch('http://localhost:3030/users/register',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }
        const data = await response.json();
        sessionStorage.setItem('accessToken', data.accessToken);

        window.location = '/Cookbook-Part-02/index.html'
    } catch (error) {
        alert(error.message);
    }
}