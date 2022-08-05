import axios from "axios"

// this function is used to get the latitude and longitude query place.
export default async function getLocation(query){
    const url = `${process.env.REACT_APP_BASE_URL}search/2/search/${query}.json?key=${process.env.REACT_APP_TOMTOM_MAPS_API_KEY}`
    const response = await axios.get(url);
    console.log(response);
    return response.data.results[0].position;
}