import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
	state = {
		ingridients: null,
		totalPrice: 0
	};

	checkoutCancelled = () => {
		this.props.history.goBack();
	};

	checkoutContinued = () => {
		this.props.history.push('/checkout/contact-data');
	};

	componentWillMount = () => {
		const query = new URLSearchParams(this.props.location.search);
		console.log(query);
		console.log(query.entries());
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = +param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}

		this.setState({ ingridients: ingredients, totalPrice: price });
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					checkoutCancelled={this.checkoutCancelled}
					checkoutContinued={this.checkoutContinued}
					ingridients={this.state.ingridients}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					render={(props) => (
						<ContactData {...props} ingredients={this.state.ingridients} price={this.state.totalPrice} />
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
