import React, { Component } from 'react';

import './ContactForm.css'

class ContactForm extends Component {
    state = {}

    render() {

        const contactFormStyle = ['contactForm__container',
            this.props.isActive
            ? 'contactForm__container--active'
            : 'contactForm__container--noActive'
        ];
            
        return (
            <div className={contactFormStyle.join(' ')}>
                <h4>Contact form</h4>
                <input /> <br />
                <input /> <br />
                <button>Send</button>
            </div>
        )
    }
}

export default ContactForm