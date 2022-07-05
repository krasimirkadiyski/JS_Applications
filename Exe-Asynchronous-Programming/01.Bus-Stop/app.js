async function getInfo() {
    let stopID = document.getElementById('stopId');
    let baseURL = 'http://localhost:3030/jsonstore/bus/businfo/';
    let stopName = document.getElementById('stopName');
    let ul = document.getElementById('buses');
    stopName.textContent = '';
    ul.innerHTML = '';
    try{
        let response =  await fetch(`${baseURL}${stopID.value}`);   
        let data = await response.json();
        let busArriveTime = Object.entries(data.buses);
        stopName.textContent = data.name;
        displayBuses(ul,busArriveTime);
    }catch(error){
        stopName.textContent = `Error: Bus Stop with id: ${stopID.value} not found!`
        ul.innerHTML = '';
    }
}








function displayBuses (ul,busArriveTime){
    for (const current of busArriveTime) {
        let [bus,time] = current;
        let li = document.createElement('li');
        li.textContent = `Bus ${bus} arrives in ${time} minutes`
        ul.appendChild(li);
    }
}