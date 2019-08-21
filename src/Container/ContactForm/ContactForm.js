import React, { Component } from 'react';

import FormElements from '../../Component/ContactForm/FormElements';
import FormConfig from './formConfig.json';

import postCard from '../../Assets/sentMessage.png';

import './ContactForm.css';

class ContactForm extends Component {
    state = {
        emailData: {},
        placeholders: {},
        isSent: false,
        animatePlaceholder: true
    };

    componentWillMount() {
        this.setStateOnMount();
    }

    setStateOnMount = () => {
        const emailData = this.state.emailData;
        const placeholders = this.state.placeholders;

        FormConfig.map(item => {
            emailData[item.id] = '';
            placeholders[item.id] = {};
            placeholders[item.id].placeholder = {};
            placeholders[item.id].placeholder.start = item.placeholder.start;
            placeholders[item.id].placeholder.end = item.placeholder.end;

            return placeholders
        })
        this.setState({
            emailData: emailData,
            placeholders: placeholders
        })
    }

    onInputChange = e => {
        const updatedEmailData = { ...this.state.emailData };
        updatedEmailData[e.target.placeholder] = e.target.value;
        this.setState({ emailData: updatedEmailData });
    };

    sendEmail = () => {
        this.setState({
            isSent: true
        })
    }

    // animacja placeholdera
    writePlaceholder = (placeholder, writePlaceholder) => {
        setTimeout(() => {
            placeholder.push(writePlaceholder[0]);
            const updatedPlaceholder = placeholder.join('');
            writePlaceholder.shift();
            const updatedWritePlaceholder = writePlaceholder.join('');

            this.setState({
                placeholder: updatedPlaceholder,
                writePlaceholder: updatedWritePlaceholder
            });
        }, 130)
    }

    animatePlaceholder = () => {
        let writePlaceholder = [...this.state.placeholders];
        let placeholder = [...this.state.placeholder];
        if (this.state.placeholder === 'Loading...') {
            placeholder = [];
        }

        if (writePlaceholder.length >= 1) {
            this.writePlaceholder(placeholder, writePlaceholder)
        }
    }
    // koniec bloku animacji

    render() {
        const contactFormStyle = [
            'contactForm__container',
            this.props.isActive
                ? 'contactForm__container--active'
                : 'contactForm__container--noActive',
        ];

        const postCardStyle = [
            'contactForm__postCard',
            this.state.isSent
                ? 'contactForm__postCard--show'
                : null
        ]

        const contactForm = (
            <div className={contactFormStyle.join(' ')}>
                <h4>Contact me</h4>
                <form className="contactForm__forsm">
                    <FormElements
                        placeholders={this.state.placeholders}
                        onInputChange={this.onInputChange}
                        values={this.state.emailData}
                    />
                </form>
                <button
                    className='contactForm__button'
                    onClick={this.sendEmail}>Send</button>
            </div>
        );

        const confirmation = (
            <div className={contactFormStyle.join(' ')}>
                <h4>
                    Thank you!
                </h4>
            </div>
        );


        return (
            <div style={{ 'width': '100%', 'background': 'red'}}>
                <img alt='post card' src={postCard} className={postCardStyle.join(' ')} />
                {
                    this.state.isSent
                        ? confirmation // dodać animację - zjazd podziękowania w dół
                        : contactForm   // dodać animację - wysłanie koperty (png asset)
                }
            </div>
        );
    }
}

export default ContactForm;
