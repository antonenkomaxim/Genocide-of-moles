import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import StartFild from './StartFild';
import StatusBar from './StatusBar';


class MainComponent extends Component {
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

export default MainComponent;
