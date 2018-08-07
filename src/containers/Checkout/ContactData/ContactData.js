import React, { Component } from 'react';
import Buttons from '../../../components/UI/Buttons/Buttons';
import classes from './ContactData.css';

class ContactData extends Component {
	state = {
		email: '',
		phone: '',
		address: {
			postalCode: '',
			street: ''
		}
	};
	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your details!</h4>
				<form>
					<input type="text" name="name" placeholder="Name" />
					<input type="email" name="email" placeholder="email" />
					<input type="text" name="street" placeholder="Street" />
					<input type="text" name="zipCode" placeholder="zipCode" />
					<Buttons btnType="Success">Order</Buttons>
				</form>
			</div>
		);
	}
}

export default ContactData;
