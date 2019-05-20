import React, { Component } from 'react';
import axios from '../../../axios-instances/axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {

    elementInputs = (placeholder, number, minLength, maxLength) => {
        return {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: placeholder,                    
            },
            value: '',
            validation: {
                required: true,
                minLength: minLength,
                maxLength: maxLength,
                number: number
            },
            valid: false,
        }
    }

    state = {
        orderForm: {
            name: this.elementInputs('name'), 
            street: this.elementInputs('Street'), 
            zipCode: this.elementInputs('Zip Code',true,5,5), 
            country: this.elementInputs('Country'),             
            email: this.elementInputs('EmailAddress@email.com','@'),
            deliveryMethod: { 
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest',displayValue: 'Fastest'},
                        {value: 'slowest',displayValue: 'Slowest'},
                        {value: 'any',displayValue: 'Any'},
                    ]                
                },
            value: '',

            }          
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            customerID: 'a',
            totalprice: this.props.price,
            ingredients: this.props.ingredients,
            orderData: formData,
        }
        axios.post('/orders.json', order)
            .then(response => { 
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error =>  
                this.setState({loading: false}));
        event.preventDefault();
        
    }

    inputChangedHandler = (event, inputIdentifier) =>{
       const updatedOrderForm = {
           ...this.state.orderForm
       };
       const updatedFormElement = {
           ...updatedOrderForm[inputIdentifier]
       };
       updatedFormElement.value = event.target.value;
       updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
       updatedOrderForm[inputIdentifier] = updatedFormElement;
       console.log(updatedFormElement);
       this.setState({orderForm: updatedOrderForm});
    }

    checkValidity(value, rules){
        let isValid = false;
        if(rules.required){
            isValid = value.trim() !== '';
        }
        if(rules.number){
            isValid = !isNaN(value);
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && value.length <= rules.maxLength;
        }
        
        return isValid;
    }
    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/> 
                ))}
                <Button buttonType="Success">ORDER</Button>
            </form>);
        if (this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;