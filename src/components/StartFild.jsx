import React from 'react';
import GameFild from './GameFild';
import StartGame from './StartGame';

class StartFild extends React.Component {

	constructor() {
		super();
		this.state = { isStartGame: false };
	}

	componentDidMount() {

		document.addEventListener("keyup", (event) => {
			if (event.key === 'Enter') {
				this.setState({ isStartGame: true })
			}
		});
	}


	startingOrNot = () => {
		return (
			this.state.isStartGame ? <GameFild /> : <StartGame />
		)
	}

	render() {
		return (
			<div className="game-fild">
				{
					this.startingOrNot()
				}
			</div >

		);
	}
};




export default StartFild;