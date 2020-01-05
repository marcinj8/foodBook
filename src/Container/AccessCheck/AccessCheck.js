import {Component} from 'react';
import Axios from 'axios';

import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/actions';

const CORS = 'https://cors-anywhere.herokuapp.com/';

class AppPremission extends Component {
  UNSAFE_componentWillMount () {
    this.AccessCheck ();
    this.getFavouritesRecipes ();
  }

  AccessCheck = () => {
    Axios.get (CORS + 'https://apikeys-5e3d9.firebaseio.com/edamam.json')
      .then (res => this.props.setPremissoin (res.data))
      .catch (err => console.log (err, 'nie działa'));
  };

  getFavouritesRecipes = () => {
    Axios.get (
      CORS + 'https://fooddatabase-75cfa.firebaseio.com/favouritesList.json'
    )
      .then (res => {
        let response = [];
        let dataBaseKey = '';
        for (let key in res.data) {
          response = res.data[key];
          dataBaseKey = key;
        }
        this.props.setFavourites (response, dataBaseKey);
      })
      .catch (err => console.log (err, 'nie działa'));
  };

  render () {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPremissoin: data => dispatch (actions.setPremissions (data)),
    setFavourites: (recipes, dataBaseKey) =>  dispatch (actions.setFavourites (recipes, dataBaseKey)),
  };
};

export default connect (null, mapDispatchToProps) (AppPremission);
