import React, { Component } from 'react';
import Buttons from '../../../components/UI/Buttons/Buttons';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: 'fastest',
				validation: {},
				valid: true,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			}
		},
		formIsValid: false,
		loading: false
	};

	clickedHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let formDataElement in this.state.orderForm) {
			formData[formDataElement] = this.state.orderForm[formDataElement].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.totalPrice,
			orderData: formData
		};
		this.props.onOrderBurger(order);
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderedForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderedForm[inputIdentifier]
		};

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderedForm[inputIdentifier] = updatedFormElement;
		let formIsValid = true;
		for (let inputIdentifier in updatedOrderedForm) {
			formIsValid = updatedOrderedForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({
			orderForm: updatedOrderedForm,
			formIsValid: formIsValid
		});
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '';
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		return isValid;
	}

	render() {
		const formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.clickedHandler}>
				{formElementArray.map((formElement) => {
					return (
						<Input
							invalid={!formElement.config.valid}
							touched={formElement.config.touched}
							shouldValidate={formElement.config.validation}
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							changed={(event) => this.inputChangedHandler(event, formElement.id)}
						/>
					);
				})}
				<Buttons btnType="Success" disabled={!this.state.formIsValid}>
					Order
				</Buttons>
			</form>
		);

		if (this.props.loading) {
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

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		totalPrice: state.totalPrice,
		loading: state.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
