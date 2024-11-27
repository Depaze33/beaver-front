import { useGeolocated } from "react-geolocated";

const useGeoLocation = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    console.log("useGeoLocation Debug:", {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
    });

    return { coords, isGeolocationAvailable, isGeolocationEnabled };
};

export default useGeoLocation;
