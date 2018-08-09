import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/orders/orders';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Route path="/" exact component={BurgerBuilder} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
				</Layout>
			</div>
		);
	}
}

export default App;
