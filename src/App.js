import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import StartFild from './components/StartFild';
import StatusBar from './components/StatusBar';


class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="Header">
					<Header />
				</div>
				<div className="Game">
					<StartFild />
					<StatusBar />
				</div>
			</div>
		);
	}
}

export default App;
