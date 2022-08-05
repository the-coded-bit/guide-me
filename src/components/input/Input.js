import React, { useContext, useState } from 'react'
import { Marker } from '../../utils/assets';
import { inputTypes, output } from '../../utils/constants';
import { InputContext } from '../../utils/contexts/InputContext';
import './input.css';

function Input() {
    const { distance, calculateRoute, setDistance } = useContext(InputContext)
    // state to maintain source and destination input
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    // function to change source/destination
    const handleChanges = (type, item) => {
        console.log(item);
        switch (type) {
            case inputTypes.SOURCE:
                setSource(item);
                break;
            case inputTypes.DESTINATION:
                setDestination(item);
                break;
            case output.DISTANCE:
                setDistance(item);
                break;
            default:
                break;
        }
    }

    return (
        <div className='input__container'>
            {/* origin input */}
            <div className='input__wrapper'>
                <span className='input__heading'>Origin</span>
                <div className='input__wrapper__input'>
                    <img src={Marker} alt='marker' width={20} />
                    <input
                        type='text'
                        placeholder='eg. Lucknow'
                        className='input'
                        spellCheck='false'
                        onChange={(e) => handleChanges(inputTypes.SOURCE, e.target.value)} />
                </div>

            </div>
            {/* calculate button */}
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <button onClick={() => calculateRoute(source, destination)}>calculate</button>
            </div>

            {/* destination input */}
            <div className='input__wrapper'>
                <span className='input__heading'>Destination</span>
                <div className='input__wrapper__input'>
                    <img src={Marker} alt='marker' width={20} />
                    <input
                        type='text'
                        placeholder='eg. Agra'
                        className='input'
                        spellCheck='false'
                        onChange={(e) => handleChanges(inputTypes.DESTINATION, e.target.value)} />
                </div>

            </div>

            {/* output distance */}
            <div className='output__container'>
                <div className='output__distance__wrapper'>
                    <span style={{ fontFamily: 'Work Sans', fontWeight: '400', fontSize: '15px', lineHeight: '20px' }}>Distance</span>
                    <span className='output__distance'>{distance} kms</span>
                </div>
                <p>The distance between <span>{source}</span> and <span>{destination}</span> is <span>{distance} kms</span>.</p>
            </div>
        </div>
    )
}

export default Input