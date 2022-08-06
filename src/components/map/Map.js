import tt from '@tomtom-international/web-sdk-maps';
import React, { useContext, useEffect, useRef } from 'react'
import { InputContext } from '../../utils/contexts/InputContext';
import './map.css';


const center = {
    lat: 26.907763025017978,
    lng: 80.93423166614241
};


function Map() {
    const { setMap } = useContext(InputContext);
    const mapElement = useRef();

    useEffect(() =>{
        let map = tt.map({
            key: process.env.REACT_APP_TOMTOM_MAPS_API_KEY,
            center: [center.lng, center.lat],
            container: mapElement.current,
            zoom: 4,
        });
        
        setMap(map);

        //remove resources used by map at the time of unmounting 
        return () =>{
            map.remove();
        }
    },[]) 
   
  
  
    return (
        <div className='map__container' ref={mapElement}>
            {/* tom tom map box */}
        </div>
    )
}

export default Map