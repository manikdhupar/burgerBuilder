import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modals from '../../components/UI/Modals/Modals';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.8,
	bacon: 1.5,
	meat: 1.8
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			cheese: 0,
			bacon: 0,
			meat: 0
		},
		totalPrice: 0,
		purchasable: false,
		purchasing: false
	};

	addIngredientHandler = (type) => {
		// onClick handler for adding ingredients
		const oldValue = this.state.ingredients[type];
		const updatedValue = oldValue + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedValue;

		// adding price for checkout
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + INGREDIENT_PRICES[type];
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		});
		this.updatePurchaseState(updatedIngredients);
	};
	removeIngredientHandler = (type) => {
		// onClick handler for adding ingredients
		const oldValue = this.state.ingredients[type];
		if (oldValue === 0) {
			return;
		}
		const updatedValue = oldValue - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedValue;

		// adding price for checkout
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - INGREDIENT_PRICES[type];
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		});
		this.updatePurchaseState(updatedIngredients);
	};

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((ele) => {
				return ingredients[ele];
			})
			.reduce((preValue, newValue) => {
				return preValue + newValue;
			}, 0);
		console.log(sum);
		this.setState({
			purchasable: sum > 0
		});
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<React.Fragment>
				<Modals modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
					<OrderSummary ingridients={this.state.ingredients} />
				</Modals>
				<Burger ingridients={this.state.ingredients} />
				<BuildControls
					removed={this.removeIngredientHandler}
					price={this.state.totalPrice}
					added={this.addIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</React.Fragment>
		);
	}
}

export default BurgerBuilder;
