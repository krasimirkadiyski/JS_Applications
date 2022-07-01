function loadRepos() {
	let ul = document.getElementById('repos');
	ul.innerHTML = '';
	let username = document.getElementById('username');
	let url = `https://api.github.com/users/${username.value}/repos`;
	let resultArr = [];
	fetch(url)
	.then(response => response.json())
	.then(data => {
		resultArr = data.map(e => e.full_name + "|" + e.owner.html_url);
		resultArr.forEach(element => {
			let [name,url] = element.split('|');
			let li = document.createElement('li');
			let a = document.createElement('a');
			a.textContent = name;
			a.href = url;
			li.appendChild(a);
			ul.appendChild(li);
		});
	})
	.catch(err => {
		console.log(err);
	})
	
};