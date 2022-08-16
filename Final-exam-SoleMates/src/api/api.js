import { clearUserData, getUserData } from "../util.js";

const host = 'http://localhost:3030'
async function request(url, method, data) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const res = await fetch(host + url, options);
        if (res.ok == false) {
            //ако е подаден невалиден токен ще хвърли 403, който трябва да обработим
            //ако пробваме да се logout-нем без да има потребител ще хвърли 403
            if (res.status == 403) {
                clearUserData();
            }
            //ако респонса не е ok го await - ваме.
            //сървърът го връща кato json затова го парсваме '.json'
            const error = await res.json();
            //взимаме свойството message на error-ра и го хвърляме за да може да го хване catch - a.
            throw new Error(error.message);
        }
        //правим проверка дали в res, който е върнал сървърът има данни, зашото ако няма и извикаме '.json' ще гръмне
        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }
    } catch (error) {
        alert(error.message);
        throw error; // <-- хвърляме грешкате нагоре по веригата!
    }
};

export async function get (url){
   return request(url, 'get');
}
export async function post (url, data){
   return  request(url, 'post', data);
}
export async function put (url, data){
   return request(url, 'put', data);
}
export async function del (url){
   return request(url, 'delete');
}