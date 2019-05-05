import React, { Component } from 'react';
import Axios from 'axios';

const YOUR_APP_ID = '0aefacbc';
const YOUR_APP_KEY = 'be2139700598dbffcb502ef8eb83fb5c';

class SearchReceipt extends Component {
    state = {
        recepipts: {},
        loading: false,
        error: {
            occurred: false,
            message: null
        }
    };

    componentWillMount () {
        if(this.state.recepipts !== null) {
            console.log(this.state);
            this.getReceipts();
        };
    };

    getReceipts = () => {
        Axios.get(`https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
        .then(res => console.log(res))
    }

    render() {
        return(
            <div>
                searcher
            </div>
        )
    };
};

export default SearchReceipt;