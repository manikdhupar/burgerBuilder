import React from 'react';

const orderSummary = (props) => {
	const order = Object.keys(props.ingridients).map((igKey) => {
		return (
			<li key={igKey}>
				<strong>{igKey.toUpperCase()}</strong> : {props.ingridients[igKey]}
			</li>
		);
	});

	return (
		<React.Fragment>
			<h3>Your Order:</h3>
			<p>Have a nice brunch by eating our healthy Burger!</p>
			<ul>{order}</ul>
			<p>Continue to checkout?</p>
		</React.Fragment>
	);
};

export default orderSummary;
