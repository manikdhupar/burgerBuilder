import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttons/Buttons';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
		},
		isSignUp: true
	};

	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.onAuthRedirectPath();
		}
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].value
				),
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

	onFormSubmitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	switchOnAuthHandler = () => {
		this.setState(prevState => {
			return {
				isSignUp: !prevState.isSignUp
			};
		});
	};

	render() {
		const formElementArray = [];
		for (let key in this.state.controls) {
			formElementArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = formElementArray.map(formElement => {
			return (
				<Input
					key={formElement.id}
					invalid={!formElement.config.valid}
					touched={formElement.config.touched}
					shouldValidate={formElement.config.validation}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					changed={event => this.inputChangedHandler(event, formElement.id)}
				/>
			);
		});

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.onFormSubmitHandler}>
					{form}
					<Button btnType="Success">Submit</Button>
				</form>
				<Button btnType="Danger" clicked={this.switchOnAuthHandler}>
					Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
				</Button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.auth(email, password, isSignUp)),
		onAuthRedirectPath: () => dispatch(actions.authRedirectPath('/'))
	};
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		authRedirectPath: state.auth.authRedirectPath,
		buildingBurger: state.burgerBuilder.building
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
