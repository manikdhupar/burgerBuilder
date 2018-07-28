import React from 'react';
import Modals from '../../components/UI/Modals/Modals';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends React.Component {
		state = {
			error: null
		};

		errorConfirmedHandler = () => {
			this.setState({
				error: null
			});
		};

		componentWillMount() {
			axios.interceptors.request.use((req) => {
				this.setState({
					error: null
				});
				return req;
			});
			axios.interceptors.response.use(
				(res) => res,
				(error) => {
					this.setState({
						error: error
					});
					console.log(error);
				}
			);
		}
		render() {
			return (
				<React.Fragment>
					<Modals show={this.state.error} clicked={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modals>
					<WrappedComponent {...this.props} />
				</React.Fragment>
			);
		}
	};
};

export default withErrorHandler;
