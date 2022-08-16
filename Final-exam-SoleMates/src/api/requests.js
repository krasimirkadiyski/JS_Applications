import { del, get, post, put } from '../api/api.js'


export async function getAllItems(){
    return get('/data/shoes?sortBy=_createdOn%20desc');
}
export async function addItem(item){
    return post('/data/shoes', item);
}

export async function getItemById(id){
    return get('/data/shoes/' + id);
};

export async function deleteItem(id){
    return del('/data/shoes/' + id);
}

export async function editItem(id, item){
    return put('/data/shoes/' + id, item);
}
export async function searchItem(query){
    return get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
}