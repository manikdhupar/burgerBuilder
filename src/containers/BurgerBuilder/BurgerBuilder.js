import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
	state = {
		ingridients: {
			salad: 0,
			cheese: 0,
			bacon: 0,
			meat: 0
		}
	};
	render() {
		return (
			<React.Fragment>
				<Burger ingridients={this.state.ingridients} />
				<div>Build Controls</div>
			</React.Fragment>
		);
	}
}

export default BurgerBuilder;
