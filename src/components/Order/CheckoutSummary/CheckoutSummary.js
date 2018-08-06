import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Buttons/Buttons';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes Well!</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingridients={props.ingridients} />
			</div>
			<Button btnType="Danger" clicked>
				Cancel
			</Button>
			<Button btnType="Success" clicked>
				Success
			</Button>
		</div>
	);
};

export default CheckoutSummary;
