import { Marker } from '@tomtom-international/web-sdk-maps';
import { services } from '@tomtom-international/web-sdk-services';
import React, { createContext, useState } from 'react'
import { getLocation } from '../requestUtils';

export const InputContext = createContext();

function InputContextProvider({ children }) {

    const [distance, setDistance] = useState('xyz');
    const [map, setMap] = useState(null);
    // state to maintain the markers
    const [markers, setMarkers] = useState([]);

    // calculate route button
    const calculateRoute = async (source, destination) => {
        if (source === '' || destination === '') return;
        console.log('clicked here');
        // if there if already an layer applied then remove all layers
        if (map.getLayer('route')) {
            map.removeLayer('route');
            map.removeSource('route');
            markers.forEach(marker => marker.remove());
    
        }
        try {
            const sourceLocation = await getLocation(source);
            const destinationLocation = await getLocation(destination);

            var sourceMarker = new Marker().setLngLat(sourceLocation).addTo(map);
            var destinationMarker = new Marker().setLngLat(destinationLocation).addTo(map);

            

            // route options 
            const routeOptions = {
                key: process.env.REACT_APP_TOMTOM_MAPS_API_KEY,
                locations: [sourceMarker.getLngLat(), destinationMarker.getLngLat()],
                travelMode: 'car'
            }
            const response = await services.calculateRoute(routeOptions);
            
            const geojson = response.toGeoJson();
            map.addLayer({
                id: 'route',
                locations: [sourceMarker.getLngLat(), destinationMarker.getLngLat()],
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson
                },
                paint: {
                    'line-color': 'skyblue',
                    'line-width': 3
                }
            })

            console.log('route response', response);
            // focus the map to the source and destination area
            map.panTo(sourceMarker.getLngLat());
            setMarkers([sourceMarker, destinationMarker]);
            setDistance(response.routes[0].summary.lengthInMeters / 1000);
           
        } catch (err) {
            markers.forEach(marker => marker.remove());
            alert('no route found');
            console.log(err);
        }

    }

    // add properties and function to input context
    const options = {
        distance,
        setDistance,
        map,
        setMap,
        calculateRoute
    }

    console.log('context rendered first', 'map = ', map);
    return (
        <InputContext.Provider value={options}>
            {children}
        </InputContext.Provider>
    )
}

export default InputContextProvider