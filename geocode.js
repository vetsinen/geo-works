import {Client} from "@googlemaps/google-maps-services-js";
import 'dotenv/config'

const client = new Client({});

let metros = ["Академгородок","Арсенальная","Берестейская","Бориспольская","Васильковская","Вокзальная","Выдубичи","Выставочный центр","Героев Днепра","Гидропарк","Голосеевская","Дарница","Дворец Украина","Дворец спорта","Демиевская","Днепр","Дорогожичи","Дружбы народов","Житомирская","Золотые ворота","Ипподром","Кловская","Контрактовая площадь","Красный хутор","Крещатик","Левобережная","Лесная","Лукьяновская","Лыбедская","Майдан Незалежности","Минская","Нивки","Оболонь","Олимпийская","Осокорки","Почайная","Печерская","Площадь Льва Толстого","Позняки","Политехнический институт","Почтовая площадь","Святошин","Славутич","Сырец","Тараса Шевченко","Театральная","Теремки","Университет","Харьковская","Черниговская","Шулявская"]
//metros = ["Выдубичи","Выставочный центр"]


export default async function geocode(address) {
    try {
        let rez = await client.geocode({
            params: {
                address: address,
                key: process.env.GOOGLE_API_KEY,
            },
            timeout: 1000, // milliseconds
        })
        return (rez.data.results[0])

    } catch (e) {
        console.log(e.response.data.error_message)
    }
}

async function get(){
    //console.log(await geocode("вул. Оноре де Бальзака, 91/29А, Київ"))

    let db = {}
    for (let metro of metros){
        db[metro] = await geocode('Киев, метро '+metro)
    }
    console.log(JSON.stringify(db))
}

get()