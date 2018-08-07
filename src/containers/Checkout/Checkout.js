import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
	state = {
		ingridients: {
			salad: 1,
			meat: 1,
			bacon: 1,
			cheese: 1
		}
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
		for (let param of query.entries()) {
			ingredients[param[0]] = +param[1];
		}

		this.setState({ ingredients: ingredients });
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					checkoutCancelled={this.checkoutCancelled}
					checkoutContinued={this.checkoutContinued}
					ingridients={this.state.ingridients}
				/>
				<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
			</div>
		);
	}
}

export default Checkout;
