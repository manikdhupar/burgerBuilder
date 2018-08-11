import React from 'react';
import classes from './Order.css';
const orders = (props) => {
	const ingredients = [];
	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		});
	}
	const ingredientOutput = ingredients.map((ig) => {
		return (
			<span
				key={ig.name}
				style={{
					display: 'inline-block',
					margin: '0 8px',
					border: '1px solid #ccc',
					padding: '5px'
				}}
			>
				{ig.name}:{ig.amount}
			</span>
		);
	});
	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>Price: USD ${props.price.toFixed(2)}</p>
		</div>
	);
};
export default orders;
