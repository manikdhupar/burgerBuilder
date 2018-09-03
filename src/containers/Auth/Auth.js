import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttons/Buttons';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		}
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].value),
				touched: true
			}
		};

		this.setState({ controls: updatedControls });
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

	onFormSubmitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
	};

	render() {
		const formElementArray = [];
		for (let key in this.state.controls) {
			formElementArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		const form = formElementArray.map((formElement) => {
			return (
				<Input
					key={formElement.id}
					invalid={!formElement.config.valid}
					touched={formElement.config.touched}
					shouldValidate={formElement.config.validation}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					changed={(event) => this.inputChangedHandler(event, formElement.id)}
				/>
			);
		});

		return (
			<div className={classes.Auth}>
				<form onSubmit={this.onFormSubmitHandler}>
					{form}
					<Button btnType="Success">Submit</Button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password) => dispatch(actions.auth(email, password))
	};
};

export default connect(null, mapDispatchToProps)(Auth);
