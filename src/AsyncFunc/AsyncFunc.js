import Axios from 'axios';

export const postFavouriteList = list => {
    Axios.post('https://cors-anywhere.herokuapp.com/'+'https://apikeys-5e3d9.firebaseio.com/edamam.json', list)
}

export const updateFavouriteList = list => {
    Axios.put('https://cors-anywhere.herokuapp.com/'+'https://apikeys-5e3d9.firebaseio.com/edamam.json', list)
}

export const getFavouriteList = list => {
    Axios.get('https://cors-anywhere.herokuapp.com/'+'https://apikeys-5e3d9.firebaseio.com/edamam.json', list)
}

export const test = () => {
    console.log('test')
}