import React from 'react';
import { connect } from "react-redux";




class GameFild extends React.Component {

	constructor() {
		super();
		this.state = {
			score: 0,
			failed: 0,
			lvl: 1,
			molesLifetime: 4000,
			cards: [
				{
					classStatus: "hole"
				},
				{
					classStatus: "hole"
				},
				{
					classStatus: "hole"
				},
				{
					classStatus: "hole"
				},
				{
					classStatus: "hole"
				},
				{
					classStatus: "hole"
				},
			]
		};
	}

	//время жизни крота
	lifetime = () => {
		let newMolesLifetime;

		switch (this.state.score) {
			case 10:
				newMolesLifetime = 3600;
				this.props.onAddTime(newMolesLifetime);
				this.setState({ molesLifetime: newMolesLifetime });
				break;

			case 20:
				newMolesLifetime = 3200;
				this.props.onAddTime(newMolesLifetime);
				this.setState({ molesLifetime: newMolesLifetime });
				break;

			case 30:
				newMolesLifetime = 2800;
				this.props.onAddTime(newMolesLifetime);
				this.setState({ molesLifetime: newMolesLifetime });
				break;

			case 40:
				newMolesLifetime = 2400;
				this.props.onAddTime(newMolesLifetime);
				this.setState({ molesLifetime: newMolesLifetime });
				break;

			case 50:
				newMolesLifetime = 2000;
				this.props.onAddTime(newMolesLifetime);
				this.setState({ molesLifetime: newMolesLifetime });
				break;

			case 60:
				newMolesLifetime = 1600;
				this.props.onAddTime(newMolesLifetime);
				this.setState({ molesLifetime: newMolesLifetime });
				break;

			case 70:
				newMolesLifetime = 1200;
				this.props.onAddTime(newMolesLifetime);
				this.setState({ molesLifetime: newMolesLifetime });
				break;

			case 80:
				newMolesLifetime = 800;
				this.props.onAddTime(newMolesLifetime);
				this.setState({ molesLifetime: newMolesLifetime });
				break;

			case 90:
				newMolesLifetime = 600;
				this.props.onAddTime(newMolesLifetime);
				this.setState({ molesLifetime: newMolesLifetime });
				break;
		}
		// if (this.state.score > 10) {
		// 	newMolesLifetime -= (this.state.lvl * 350);
		// }
		// this.props.onAddTime(newMolesLifetime);
		// this.setState({ molesLifetime: newMolesLifetime });
	}

	//создаем игровые плитки
	createMosaic = () => {
		let holes = [];
		for (let i = 0; i < 6; i++) {
			holes.push(<div
				className={this.state.cards[i].classStatus}
				id={i}
				key={i}
				onClick={this.onMosaicClick}>
			</div>);
		}
		return holes;
	}

	//создаем поле Победа
	сreateWinMosaic = () => {
		//стопим интервал чтоб он не перезапускал игру
		clearInterval(this.state.interval);

		return (
			<div className="game-over"><h1>Победа!</h1></div>
		);
	}

	//создаем поле GameOver
	createGameOverMosaic = () => {
		//стопим интервал чтоб он не перезапускал игру
		clearInterval(this.state.interval);

		return (
			<div className="game-over"><h1>Конец игры!</h1></div>
		);
	}

	//увеличиваем лвл каждые 10 очков
	lvlUp = () => {
		let newLvl = Math.floor((10 + this.state.score) / 10);
		this.props.onAddLvl(newLvl);
		this.setState({ lvl: newLvl });

		// console.log("score", this.state.score,
		// 	"failes", this.state.failed,
		// 	"LVL", this.state.lvl,
		// 	"life time", this.state.molesLifetime
		// );
	}

	//затераем крота и рисуем в новом месте
	setRandomHole = () => {
		let random = Math.floor(Math.random() * 6);
		let newCards = [...this.state.cards];

		for (let i = 0; i < newCards.length; i++) {
			newCards[i].classStatus = "hole";
		}

		newCards[random].classStatus = "hole active";

		this.setState({
			cards: newCards
		});
	}

	componentDidMount() {
		setTimeout(() => {
			this.setRandomHole();
			let interval = setInterval(() => {
				//увеличиваем количччество ошибок если проспали 
				let newFailes = this.state.failed;
				++newFailes;
				this.props.onAddFail(newFailes);
				this.setState({ failed: newFailes });

				this.setRandomHole();
				// console.log("запуск интервала");
			}, 4000);
			this.setState({ interval: interval });

		}, 200);
	}


	//назначаем класс active другому <div>
	onMosaicClick = () => {
		let newScore = this.state.score;
		let newFailes = this.state.failed;

		clearInterval(this.state.interval);
		//останавливаем игру на 40 мс и затераем крота
		setTimeout(() => {
			let newCards = [...this.state.cards];

			for (let i = 0; i < newCards.length; i++) {
				newCards[i].classStatus = "hole";
			}
			this.setState({
				cards: newCards
			});

			//перекрашиваем <div> в цвет по умолчанию
			for (let i = 0; i < 6; i++) {
				let elem = document.getElementById(i);

				elem.style.backgroundColor = "rgb(240, 162, 73)";
			}

			//с задержкой в 20мс запускаем новый интервал
			setTimeout(() => {
				this.setRandomHole();
				let interval = setInterval(() => {
					//увеличиваем количччество ошибок если проспали 
					let newFailes = this.state.failed;
					++newFailes;
					this.props.onAddFail(newFailes);
					this.setState({ failed: newFailes });

					this.setRandomHole();
					// console.log("запуск интервала");
				}, this.state.molesLifetime);
				this.setState({ interval: interval });

			}, 200);
		}, 400);

		// console.log(this.state.cards);
		// console.log(event.target.id);
		// console.log(event.target.className);
		// console.log(event.target.style);

		//Считаем ошибки и очки
		if (event.target.className === "hole active") {
			++newScore;
			event.target.style.backgroundColor = "forestgreen";
			this.props.onAddScore(newScore);
			this.setState({ score: newScore });
		} else {
			++newFailes;
			event.target.style.backgroundColor = "maroon";
			this.props.onAddFail(newFailes);
			this.setState({ failed: newFailes });
		}
		this.lvlUp();
		this.lifetime();
	}

	//игра в процессе ли окончена
	gameStatus = () => {
		if (this.state.score === 100) {
			return this.сreateWinMosaic();
		}
		return (
			this.state.failed === 3 ? this.createGameOverMosaic() : this.createMosaic()
		)
	}

	addScore() {

	}

	render() {
		return (
			<div className="start">
				{this.gameStatus()}
			</div>
		);
	}
};



export default connect(
	state => ({}),
	dispatch => ({
		onAddScore: (points) => {
			dispatch({ type: "ADD_SCORE", payload: points })
		},
		onAddFail: (fails) => {
			dispatch({ type: "ADD_FAIL", payload: fails })
		},
		onAddLvl: (lvl) => {
			dispatch({ type: "ADD_LVL", payload: lvl })
		},
		onAddTime: (time) => {
			dispatch({ type: "ADD_TIME", payload: time })
		}
	})
)(GameFild);