import React from 'react';
import classes from './Order.css';
const orders = (props) => {
	return (
		<div className={classes.Order}>
			<p>Ingredients: salad (1)</p>
			<p>Price: USD $ 4.5</p>
		</div>
	);
};
export default orders;
