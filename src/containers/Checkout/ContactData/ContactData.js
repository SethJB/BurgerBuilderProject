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
            touched: false
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
            value: 'fastest',
            validation: {},
            valid: true        
            }          
        },
        formIsValid: false,
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
       updatedFormElement.touched = true;
       updatedOrderForm[inputIdentifier] = updatedFormElement;
       
       let formIsValid = true;
       for(let inputIdentifier in updatedOrderForm){
           formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
       }

       this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '';
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = isValid && value.length <= rules.maxLength;
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
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/> 
                ))}
                <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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