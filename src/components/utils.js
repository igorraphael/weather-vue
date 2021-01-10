export function arrLatLong(position) {
    console.log('lat', position.coords.latitude, 'lon', position.coords.longitude)
    return [position.coords.latitude, position.coords.longitude]
}

export async function getLocation() {

    return new Promise((resolve, reject) => {

        if (!("geolocation" in navigator)) {
            reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
            resolve(pos);
        }, err => {
            reject(err);
        });

    });
}

export async function locateMe() {

    try {

        const geo = await getLocation();
        // console.log(geo);
        arrLatLong(geo);

    } catch (e) {
        //if error in geolocation.
        console.log(e)
    }

}