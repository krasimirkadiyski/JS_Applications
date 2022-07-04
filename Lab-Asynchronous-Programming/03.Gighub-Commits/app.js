async function loadCommits() {
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let ul = document.getElementById('commits');
    ul.innerHTML = '';
    try{
    let promise  = fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
    let response = await promise;
    if(!response.ok){
        throw new Error(`ERROR: ${response.status}!`)
    }
    let data = await response.json();
    console.log(data);
    for (const current of data) {
        ul.innerHTML += `<li>${current.commit.author.name}: ${current.commit.message}</li>`;
    }
    
    }catch(error){
        ul.innerHTML += `${error.message}!!!</li>`;
    }

    
}