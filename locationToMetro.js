import geocode from "./geocode.js"
import metrodb from "./metrodb.js"

let metroCoords = {}
for (let metro in metrodb){metroCoords[metro]=metrodb[metro].geometry.location}
// console.log(metroCoords)

function calcCrow(adress, point2)
{
    // Converts numeric degrees to radians
    function toRad(Value)
    {
        return Value * Math.PI / 180;
    }

    let lat1  = adress.lat
    let lon1 = adress.lng
    let lat2 = point2.lat
    let lon2 = point2.lng

    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

function findTwoSmallestInObject(distancesToMetro){
    function smallestInObject(obj){
        let min = 888888
        let key = ''
        for (let el  in obj)
            if (obj[el]<min){
                min = obj[el]
                key = el
        }
        return key
    }
    let metro1 = smallestInObject(distancesToMetro)
    let copy = {...distancesToMetro}
    delete copy[metro1]
    let metro2 = smallestInObject(copy)
    return `${metro1},${metro2}`
}

async function getClosestMetroIds(adress){
    const locationCoords = (await geocode(adress)).geometry.location
    let distancesToMetro = {}
    for (let metro in metroCoords){
        distancesToMetro[metro] = calcCrow(locationCoords, metroCoords[metro])
    }

    return(findTwoSmallestInObject(distancesToMetro))
}

// getClosestMetroIds('вулиця Дорогожицька, 3, Київ, 02000')
//console.log(calcCrow({lat:50.448, lng: 30.28}, {lat:50.418, lng: 30.28}))

