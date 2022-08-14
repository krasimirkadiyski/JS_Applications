import { del, get, post, put } from '../api/api.js'

export async function getAllMaterials(){
    return get('/data/posts?sortBy=_createdOn%20desc');
}
export async function createPost(data){
    return post('/data/posts', data);
}
export async function getPostById(id){
    return get('/data/posts/' + id);
}
export async function delPost(id){
    return del('/data/posts/' + id);
}
export async function editPost(id, data){
    return put('/data/posts/' + id,data);
}
export async function getPostByUserId(userId){
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}