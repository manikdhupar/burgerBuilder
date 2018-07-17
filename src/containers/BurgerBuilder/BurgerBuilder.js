import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
		totalPrice: 0
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
				{console.log(disabledInfo)}
				<Burger ingridients={this.state.ingredients} />
				<BuildControls
					removed={this.removeIngredientHandler}
					price={this.state.totalPrice}
					added={this.addIngredientHandler}
					disabled={disabledInfo}
				/>
			</React.Fragment>
		);
	}
}

export default BurgerBuilder;
