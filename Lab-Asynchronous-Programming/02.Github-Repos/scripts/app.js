function loadRepos() {
	let ul = document.getElementById('repos');
	ul.innerHTML = '';
	let username = document.getElementById('username');
	let url = `https://api.github.com/users/${username.value}/repos`;
	let resultArr = [];
	fetch(url)
		.then(handleResponse)
		.then(data => {
			resultArr = data.map(e => e.full_name + "|" + e.owner.html_url);
			resultArr.forEach(element => {
				let [name, url] = element.split('|');
				let li = document.createElement('li');
				let a = document.createElement('a');
				a.textContent = name;
				a.href = url;
				li.appendChild(a);
				ul.appendChild(li);
			});
		})
		.catch(handleError)
	function handleResponse(response) {
		if (!response.ok) {
			throw new Error(`ERROR: ${response.status}!!!`)
		}
		return response.json();

	}
	function handleError(error){
		ul.textContent = error.message;
	}

};