import React from 'react';
import classes from './Buttons.css';

const button = (props) => {
	return (
		<button
			onClick={props.clicked}
			disabled={props.disabled}
			className={[ classes.Button, classes[props.btnType] ].join(' ')}
		>
			{props.children}
		</button>
	);
};

export default button;
