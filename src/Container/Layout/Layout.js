import React, { Component } from 'react';

class Layout extends Component {
    state = {
        navbar: {}
    };

    render() {

        return (
            <div>
                <h1>Header</h1>
                <h1>Navbar</h1>
                <h1>List</h1>
                <h1>Receipt</h1>
            </div>
        )
    }
}

export default Layout;