import { useGeolocated } from "react-geolocated";

const useGeoLocation = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    return { coords, isGeolocationAvailable, isGeolocationEnabled };
};

export default useGeoLocation;
