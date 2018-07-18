import React from 'react';
import classes from './Modals.css';
import Backdrop from '../Backdrop/Backdrop';

const modals = (props) => {
	return (
		<React.Fragment>
			<Backdrop clicked={props.modalClosed} show={props.show} />
			<div
				style={{
					transform: props.show ? 'translateX(0)' : 'translateX(-100vh)',
					opacity: props.show ? '1' : '0'
				}}
				className={classes.Modal}
			>
				{props.children}
			</div>
		</React.Fragment>
	);
};

export default modals;
