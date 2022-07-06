function solve() {
    let infoSpan = document.querySelector('div span.info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    
    let baseURL = 'http://localhost:3030/jsonstore/bus/schedule/';
    let busStopsData = {
        name: '',
        next: 'depot', 
    };

    async function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;
        try{
          let response = await fetch(`${baseURL}${busStopsData.next}`);
          let data = await response.json()
          busStopsData = Object.assign(data);
        }catch(error){
            console.log(error.message);
        }
        infoSpan.textContent = `Next stop ${busStopsData.name}`;
        
    }

    function arrive() {
        departBtn.disabled = true;
        arriveBtn.disabled = true;
        infoSpan.textContent = `Arriving at ${busStopsData.name}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();