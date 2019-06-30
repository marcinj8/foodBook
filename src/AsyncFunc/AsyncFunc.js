import Axios from 'axios';

export const postFavouriteList = list => {
    Axios.post('https://cors-anywhere.herokuapp.com/'+'https://fooddatabase-75cfa.firebaseio.com/favouritesList.json', list)
}

export const updateFavouriteList = list => {
    Axios.put('https://cors-anywhere.herokuapp.com/'+'https://fooddatabase-75cfa.firebaseio.com/favouritesList.json', list)
}

export const getFavouriteList = list => {
    Axios.get('https://cors-anywhere.herokuapp.com/'+'https://fooddatabase-75cfa.firebaseio.com/favouritesList.json', list)
    .then(res => console.log(res))
}

export const test = () => {
    console.log('test')
}