import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burgerbuilder-react-285da.firebaseio.com/'
});

export default instance;
