import React, { Component } from 'react';

import AccessCheck from '../../Container/AccessCheck/AccessCheck';

class Layout extends Component {
    state = {
        navbar: {},
        access: {
            apiKey: '',
            apiId: ''
        }
    };

    setUpAccesData = data =>{
        const updateAccesData = {...this.state.access};
        updateAccesData.apiKey = data.apiKey;
        updateAccesData.apiId = data.user;
        this.setState({
            access: updateAccesData
        })
    }

    render() {

        return (
            <div>
                <h1>Header</h1>
                <h1>Navbar</h1>
                <h1>List</h1>
                <h1>Receipt</h1>
                <AccessCheck />
            </div>
        )
    }
}

export default Layout;