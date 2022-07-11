const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);


    const email = formData.get('email');
    const password = formData.get('password');

    try{
        if(!email || !password){
            throw new Error('Email and password are required!')
        }

        const response = await fetch('http://localhost:3030/users/login',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if(!response.ok){
            const error = await response.json();
            throw new Error (error.message);
        }
        const data = await response.json();
        sessionStorage.setItem('accessToken', data.accessToken);

        window.location = '/Cookbook-Part-02/index.html'


    }catch(error){
        alert(error.message);
    }
}