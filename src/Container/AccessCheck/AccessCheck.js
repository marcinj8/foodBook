import React, { Component } from 'react';
import Axios from 'axios';

import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/actions'
import SearchReceipt from '../SearchReceipt/SearchReceipt';


class AppPremission extends Component {

    componentWillMount(){
        this.AccessCheck();
    }

    AccessCheck = () => {
        Axios.get('https://cors-anywhere.herokuapp.com/'+'https://apikeys-5e3d9.firebaseio.com/edamam.json')
        .then(res => this.props.setPremissoin(res.data))
    }

    render () {
        return (
            <SearchReceipt />
        )
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        setPremissoin: data => dispatch(actions.setPremissions(data))
    }
}

export default connect(null, mapDispatchToProps)(AppPremission);