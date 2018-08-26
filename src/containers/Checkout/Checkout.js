import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
	checkoutCancelled = () => {
		this.props.history.goBack();
	};

	checkoutContinued = () => {
		this.props.history.push('/checkout/contact-data');
	};

	render() {
		console.log(this.props.match);
		console.log(this.props.history);
		return (
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
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients
	};
};

export default connect(mapStateToProps)(Checkout);
