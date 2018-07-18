import React from 'react';
import Buttons from '../../UI/Buttons/Buttons';

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
			<Buttons btnType="Danger" clicked={props.purchaseCancelHandler}>
				Cancel
			</Buttons>
			<Buttons btnType="Success" clicked={props.purchaseContinueHandler}>
				Checkout
			</Buttons>
			<p>
				<strong>Total Price: $ {props.price.toFixed(2)} </strong>
			</p>
		</React.Fragment>
	);
};

export default orderSummary;
