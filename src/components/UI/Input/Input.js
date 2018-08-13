import React from 'react';
import classes from './Input.css';

const input = (props) => {
	let inputElement = null;

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					onChange={props.changed}
					className={classes.InputElement}
					value={props.value}
					{...props.elementConfig}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					onChange={props.changed}
					className={classes.InputElement}
					value={props.value}
					{...props.elementConfig}
				/>
			);
			break;
		// case 'select':
		// 	inputElement = (
		// 		<select className={classes.InputElement} value={props.value}>
		// 			{props.elementConfig.options.map((option) => (
		// 				<option key={option.value} value={option.value}>
		// 					{option.displayValue}
		// 				</option>
		// 			))}
		// 		</select>
		// 	);
		// 	break;

		case 'select':
			inputElement = (
				<select className={classes.InputElement} value={props.value} onChange={props.changed}>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					onChange={props.changed}
					className={classes.InputElement}
					value={props.value}
					{...props.elementConfig}
				/>
			);
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default input;
