export const getStoredLocation = () => {
    try {
        const loc = localStorage.getItem("userLocation");
        return loc ? JSON.parse(loc) : null;
    } catch {
        return null;
    }
};

export const saveLocation = (location) => {
    localStorage.setItem("userLocation", JSON.stringify(location));
};

export const fetchCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                resolve({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            (err) => reject(err),
            { enableHighAccuracy: true }
        );
    });
};
