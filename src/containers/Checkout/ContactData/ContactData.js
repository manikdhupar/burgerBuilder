import React, { Component } from 'react';
import Buttons from '../../../components/UI/Buttons/Buttons';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		email: '',
		phone: '',
		address: {
			postalCode: '',
			street: ''
		},
		loading: false
	};

	clickedHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'manik',
				email: 'manik.dhupar7@gmail.com'
			}
		};
		axios
			.post('/orders.json', order)
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((error) => this.setState({ loading: false }));
	};
	render() {
		let form = (
			<form>
				<input type="text" name="name" placeholder="Name" />
				<input type="email" name="email" placeholder="email" />
				<input type="text" name="street" placeholder="Street" />
				<input type="text" name="zipCode" placeholder="zipCode" />
				<Buttons btnType="Success" clicked={this.clickedHandler}>
					Order
				</Buttons>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your details!</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
