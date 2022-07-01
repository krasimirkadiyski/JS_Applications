function loadRepos() {
   let url = 'https://api.github.com/users/testnakov/repos';
   const httpRequest = new XMLHttpRequest();
   httpRequest.addEventListener('readystatechange', () => {
       //httpRequest.readyState == 4 mean 'Done'
       //httpRequest.status == 200 mean 'OK'
       //if both of them are true
       if (httpRequest.readyState == 4 && httpRequest.status == 200) {
           let data = JSON.parse(httpRequest.responseText);

           document.getElementById("res").textContent = JSON.stringify(data);
       }
   });
   httpRequest.open("GET", url);
   httpRequest.send();
}