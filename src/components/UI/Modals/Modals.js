import React from 'react';
import classes from './Modals.css';

const modals = (props) => {
	return (
		<div
			style={{ transform: props.show ? 'translateX(0)' : 'translateX(-100vh)', opacity: props.show ? '1' : '0' }}
			className={classes.Modal}
		>
			{props.children}
		</div>
	);
};

export default modals;
