import React, { Component } from 'react';
import Axios from 'axios';

import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/actions'

class AppPremission extends Component {

    componentWillMount(){
        this.AccessCheck();
        this.getFavouritesRecipes()
    }

    AccessCheck = () => {
        Axios.get('https://cors-anywhere.herokuapp.com/'+'https://apikeys-5e3d9.firebaseio.com/edamam.json')
        .then(res => this.props.setPremissoin(res.data))
        .catch(err => console.log(err, 'nie działa'))
    }

    getFavouritesRecipes = () => {
        Axios.get('https://cors-anywhere.herokuapp.com/'+'https://fooddatabase-75cfa.firebaseio.com/favourites.json')
        .then(res => this.props.setFavourites(res.data))
        .catch(err => console.log(err, 'nie działa'))
    }

    render () {
        return (
            null
        )
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        setPremissoin: data => dispatch(actions.setPremissions(data)),
        setFavourites: recipes => dispatch(actions.setFavourites(recipes))
    }
}

export default connect(null, mapDispatchToProps)(AppPremission);