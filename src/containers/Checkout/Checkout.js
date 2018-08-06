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
	render() {
		return (
			<div>
				<CheckoutSummary ingridients={this.state.ingridients} />
			</div>
		);
	}
}

export default Checkout;

// 1) essay
// 2) application to the principal requesting a job as high scool teacher
// 3)application for 1 week lap to sse mechanical departmet.
