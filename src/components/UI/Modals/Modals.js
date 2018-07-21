import React from 'react';
import classes from './Modals.css';
import Backdrop from '../Backdrop/Backdrop';

class Modals extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.show !== nextProps.show) {
			return true;
		}
	}

	render() {
		return (
			<React.Fragment>
				<Backdrop clicked={this.props.modalClosed} show={this.props.show} />
				<div
					style={{
						transform: this.props.show ? 'translateX(0)' : 'translateX(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}
					className={classes.Modal}
				>
					{this.props.children}
				</div>
			</React.Fragment>
		);
	}
}

export default Modals;
