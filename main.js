import geocode from "./geocode.js";

async function get(){
    console.log(await geocode("вул. Оноре де Бальзака, 91/29А, Київ"))
}