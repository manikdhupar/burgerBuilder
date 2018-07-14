import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
				<BuildControls />
			</React.Fragment>
		);
	}
}

export default BurgerBuilder;
