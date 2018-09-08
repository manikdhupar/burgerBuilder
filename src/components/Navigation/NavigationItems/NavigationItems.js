import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = props => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem exact link="/">
				BurgerBuilder
			</NavigationItem>
			<NavigationItem link="/orders" exact>
				ORDERS
			</NavigationItem>
			{props.isAuthenticated ? (
				<NavigationItem exact link="/logout">
					LOGOUT
				</NavigationItem>
			) : (
				<NavigationItem exact link="/auth">
					AUTH
				</NavigationItem>
			)}
		</ul>
	);
};

export default navigationItems;
