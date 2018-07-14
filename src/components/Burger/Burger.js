import React from 'react';
import BurgerIngridients from './BurgerIngridients/BurgerIngridients';
import classes from './Burger.css';

const burger = (props) => {
	let transformedIngridients = Object.keys(props.ingridients)
		.map((igKey) => {
			return [ ...Array(props.ingridients[igKey]) ].map((_, index) => {
				return <BurgerIngridients key={igKey + index} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (transformedIngridients.length === 0) {
		transformedIngridients = <div>You need to add ingidients!</div>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngridients type="bread-top" />
			{transformedIngridients}
			<BurgerIngridients type="bread-bottom" />
		</div>
	);
};

export default burger;
