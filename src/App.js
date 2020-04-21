import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './stores/store';
import MainComponent from './components/MainComponent';

const store = configureStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<MainComponent />
			</Provider>
		);
	}
}

export default App;
