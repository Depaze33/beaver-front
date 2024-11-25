import React from "react";
import useGeoLocation from "../Hook/Hooks.jsx";

const Geo = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeoLocation();

    if (!isGeolocationAvailable) {
        return <div>Your browser does not support Geolocation</div>;
    }

    if (!isGeolocationEnabled) {
        return <div>Geolocation is not enabled</div>;
    }

    return coords ? (
        <table>
            <tbody>
            <tr>
                <td>latitude</td>
                <td>{coords.latitude}</td>
            </tr>
            <tr>
                <td>longitude</td>
                <td>{coords.longitude}</td>
            </tr>
            <tr>
                <td>altitude</td>
                <td>{coords.altitude}</td>
            </tr>
            <tr>
                <td>heading</td>
                <td>{coords.heading}</td>
            </tr>
            <tr>
                <td>speed</td>
                <td>{coords.speed}</td>
            </tr>
            </tbody>
        </table>
    ) : (
        <div>Getting the location data&hellip;</div>
    );
};

export default Geo;
