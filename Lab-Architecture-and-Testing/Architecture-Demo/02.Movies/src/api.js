const host = 'http://localhost:3030';
async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    }
    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
    }
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const res = await fetch(`${host}${url}`, options);
        if (!res.ok) {
            if (res.status == 401) {
                alert('Should be logged in!');
                return;
            }
            const error = await res.json();
            throw new Error(error.message);
        }
        if (res.status == 204) {
            return res;
        } else {
            return await res.json();
        }
    } catch (error) {
        alert(error.message);

        throw error;
    }
}
export async function get(url) {
    return request('get', url);
}

export async function post(url, data) {
    return request('post', url, data);
}