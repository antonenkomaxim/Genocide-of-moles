import React, { Component } from 'react';
import { connect } from "react-redux";


class StatusBar extends Component {

	render() {
		return (
			<div className="status-bar">
				<h2>Статистика</h2>
				<ul>
					<li>Сложность игры: {this.props.lvl} </li>
					<li>Счет: {this.props.points} /100</li>
					<li>Количество ошибок: {this.props.fails} /3</li>
					<li>Время: {this.props.time}мс</li>
				</ul>
			</div>
		);
	}
};

export default connect(
	state => ({
		points: state.points,
		fails: state.fails,
		lvl: state.lvl,
		time: state.time
	}),
	dispatch => ({})
)(StatusBar);