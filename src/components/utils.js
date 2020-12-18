function getPosition(position) {
    console.log('lat', position.coords.latitude, 'lon', position.coords.longitude);
}

async function getLocation() {

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

async function locateMe() {

    try {

        const geo = await getLocation();
        // console.log(geo);
        getPosition(geo);

    } catch (e) {
        //if error in geolocation.
        console.log(e)
    }

}