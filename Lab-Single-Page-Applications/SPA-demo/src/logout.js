import { userHandler } from "./util.js";
import { greetings } from "./util.js";


export function logoutUser(){
    sessionStorage.clear();
    greetings();
    userHandler('logout');
}