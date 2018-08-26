import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
	checkoutCancelled = () => {
		this.props.history.goBack();
	};

	checkoutContinued = () => {
		this.props.history.push('/checkout/contact-data');
	};

	render() {
		let summary = <Redirect to="/" />;
		if (this.props.ings) {
			summary = (
				<div>
					<CheckoutSummary
						checkoutCancelled={this.checkoutCancelled}
						checkoutContinued={this.checkoutContinued}
						ingridients={this.props.ings}
					/>
					<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients
	};
};

export default connect(mapStateToProps)(Checkout);
