import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

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

	render() {
		return (
			<div>
				<CheckoutSummary
					checkoutCancelled={this.checkoutCancelled}
					checkoutContinued={this.checkoutContinued}
					ingridients={this.state.ingridients}
				/>
			</div>
		);
	}
}

export default Checkout;
