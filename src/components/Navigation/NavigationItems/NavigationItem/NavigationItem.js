import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink
				exact
				className={props.active ? classes.active : null}
				to={props.link}
				activeClassName={classes.active}
			>
				{props.children}
			</NavLink>
		</li>
	);
};

export default navigationItem;
