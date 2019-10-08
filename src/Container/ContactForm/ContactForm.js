import React, { Component } from 'react';

import FormElements from '../../Component/ContactForm/FormElements';
import checkValidation from '../../Component/ContactForm/FormValidation';

import formConfig from './formConfig.json'
import postCard from '../../Assets/sentMessage.png';

import './ContactForm.css';

class ContactForm extends Component {
    state = {
        emailData: {},
        emailValidation: {},
        placeholders: {},
        isSent: false,
        showMessage: false,
        animatePlaceholder: true,
        disableSendButton: true
    };

    componentWillMount() {
        this.setStateOnMount();
    }

    setStateOnMount = () => {
        const emailData = {};
        const emailValidation = {}
        const placeholders = {};

        formConfig.map(item => {
            emailData[item.id] = '';
            placeholders[item.id] = {};
            emailValidation[item.id] = {};
            placeholders[item.id].placeholder = {};
            // placeholders[item.id].placeholder.start = item.placeholder.start;
            placeholders[item.id].placeholder.end = item.placeholder.end;
            emailValidation[item.id].isValid = false;
            emailValidation[item.id].message = '';
            emailValidation[item.id].showMessage = false;
            // show message dla każdego pozycji czy ogólnie, live validation

            // return 
        })
        this.setState({
            emailData: emailData,
            emailValidation: emailValidation,
            placeholders: placeholders
        })
    }

    enableSendButton = conditionsObj => {
        const isValidArray = [];
        let enableButton = false;

        for(let key in conditionsObj) {
            isValidArray.push(conditionsObj[key].isValid)
        }
        console.log(isValidArray);

        for(let value of isValidArray) {
            if(value) {
                enableButton = true;
            } else {
                enableButton = false;
                break;
            }
        }
        
        this.setState({
            disableSendButton: !enableButton,
            showMessage: enableButton
        })
    }

    onInputChange = e => {
        const updatedEmailData = { ...this.state.emailData };
        const emailValidationUpdated = { ...this.state.emailValidation };
        const emailValidationIndex = formConfig.findIndex( item => item.placeholder.end === e.target.placeholder);
        updatedEmailData[e.target.placeholder] = e.target.value;
        
        if(formConfig[emailValidationIndex].validation){
            emailValidationUpdated[e.target.placeholder] = checkValidation(e.target.value, formConfig[emailValidationIndex].validation);
        }
        this.setState({ 
            emailData: updatedEmailData,
            emailValidation: emailValidationUpdated
        });
        this.enableSendButton(emailValidationUpdated);
    };

    sendEmail = () => {
        this.setState({
            isSent: true
        })
    }

    // animacja placeholdera
    // writePlaceholder = (placeholder, writePlaceholder) => {
    //     setTimeout(() => {
    //         placeholder.push(writePlaceholder[0]);
    //         const updatedPlaceholder = placeholder.join('');
    //         writePlaceholder.shift();
    //         const updatedWritePlaceholder = writePlaceholder.join('');

    //         this.setState({
    //             placeholder: updatedPlaceholder,
    //             writePlaceholder: updatedWritePlaceholder
    //         });
    //     }, 130)
    // }

    // animatePlaceholder = () => {
    //     let writePlaceholder = [...this.state.placeholders];
    //     let placeholder = [...this.state.placeholder];
    //     if (this.state.placeholder === 'Loading...') {
    //         placeholder = [];
    //     }

    //     if (writePlaceholder.length >= 1) {
    //         this.writePlaceholder(placeholder, writePlaceholder)
    //     }
    // }
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
                <h4 className='contactForm__title'>Contact me</h4>
                <form className="contactForm__form">
                    <FormElements
                        formConfig={formConfig}
                        placeholders={this.state.placeholders}
                        onChangeElement={this.onInputChange}
                        values={this.state.emailData}
                        emailValidation={this.state.emailValidation}
                        showMessage={this.state.showMessage}
                    />
                </form>
                <button
                    disabled={this.state.disableSendButton}
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
            <div style={{ 'width': '100%', 'background': 'red' }}>
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
