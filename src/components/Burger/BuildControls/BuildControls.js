import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
	return (
		<div className={classes.BuildControls}>
			<div>
				Price: $ <strong>{props.price.toFixed(2)}</strong>
			</div>
			{controls.map((ctrl) => {
				return (
					<BuildControl
						key={ctrl.label}
						label={ctrl.label}
						added={props.added.bind(this, ctrl.type)}
						removed={props.removed.bind(this, ctrl.type)}
						disabled={props.disabled[ctrl.type]}
					/>
				);
			})}
		</div>
	);
};

export default buildControls;
