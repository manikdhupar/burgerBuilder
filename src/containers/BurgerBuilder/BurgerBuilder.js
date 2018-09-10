import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modals from '../../components/UI/Modals/Modals';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import { connect } from 'react-redux';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.8,
	bacon: 1.5,
	meat: 1.8
};

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	};

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(ele => {
				return ingredients[ele];
			})
			.reduce((preValue, newValue) => {
				return preValue + newValue;
			}, 0);

		return sum > 0;
	};

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	};
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};
	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	};

	render() {
		let burger = this.props.error ? (
			<p>Ingredients can't be shown</p>
		) : (
			<Spinner />
		);
		const disabledInfo = {
			...this.props.ing
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;

		if (this.props.ing) {
			burger = (
				<React.Fragment>
					<Burger ingridients={this.props.ing} />
					<BuildControls
						removed={this.props.onIngredientRemoved}
						price={this.props.price}
						added={this.props.onIngredientAdded}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ing)}
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
					/>
				</React.Fragment>
			);

			orderSummary = (
				<OrderSummary
					ingridients={this.props.ing}
					purchaseCancelHandler={this.purchaseCancelHandler}
					purchaseContinueHandler={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		return (
			<React.Fragment>
				<Modals
					modalClosed={this.purchaseCancelHandler}
					show={this.state.purchasing}>
					{orderSummary}
				</Modals>
				{burger}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		ing: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDisaptchToProps = dispatch => {
	return {
		onIngredientAdded: igName =>
			dispatch(burgerBuilderActions.addIngredient(igName)),
		onIngredientRemoved: igName =>
			dispatch(burgerBuilderActions.removeIngredient(igName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
		onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
		onAuthRedirectPath: path =>
			dispatch(burgerBuilderActions.authRedirectPath(path))
	};
};

export default connect(
	mapStateToProps,
	mapDisaptchToProps
)(withErrorHandler(BurgerBuilder, axios));
