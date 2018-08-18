import * as actionTypes from './actions';

const initialState = {
	ingredients: {
		salad: '0',
		cheese: '0',
		bacon: '0',
		meat: '0'
	},
	totalPrice: 0
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.8,
	bacon: 1.5,
	meat: 1.8
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[ingredientName] + 1
				}
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[ingredientName] - 1
				}
			};
		default:
			return state;
	}
};

export default reducer;
