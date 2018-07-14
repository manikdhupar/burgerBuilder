import React from 'react';
import BurgerIngridients from './BurgerIngridients/BurgerIngridients';
import classes from './Burger.css';

const burger = (props) => {
	return (
		<div className={classes.Burger}>
			<BurgerIngridients type="bread-top" />
			<BurgerIngridients type="bread-bottom" />
		</div>
	);
};

export default burger;
