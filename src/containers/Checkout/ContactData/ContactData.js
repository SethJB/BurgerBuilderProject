import React, { Component } from 'react';
import axios from '../../../axios-instances/axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip: ''
        },
        loading: false
    }

    orderHandler = (event) => {       
        this.setState({loading: true});
        const order = {
            customerID: 'a',
            totalprice: this.props.price,
            ingredients: this.props.ingredients,
            customer: {
                name: 'Seth Brouhard',
                address: {
                    street: 'Street Name',
                    zipCode: '12345',
                    country: 'United States'
                },
                email: 'testEmail@test.com'
            },
            deliveryMethod: 'fastest',
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

    render () {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name"/>
                <Input inputtype="input" type="email" name="email" placeholder="email address"/>
                <Input inputtype="input" type="text" name="street" placeholder="street"/>
                <Input inputtype="input" type="text" name="zip" placeholder="zip code"/>
                <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
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