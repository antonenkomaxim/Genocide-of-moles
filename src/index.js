import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from "redux";
// import store from './store';

import './index.css';



const initialState = {
	points: 0,
	lvl: 1,
	fails: 0,
	time: 4000
}


function score(state = initialState, action) {

	switch (action.type) {
		case "ADD_SCORE":
			return {
				...state,
				points: action.payload
			}

		case "ADD_FAIL":
			return {
				...state,
				fails: action.payload
			}

		case "ADD_LVL":
			return {
				...state,
				lvl: action.payload
			}

		case "ADD_TIME":
			return {
				...state,
				time: action.payload
			}

		default:
			return state;
	}
}

const store = createStore(score);

store.subscribe(() => {
	// console.log(store.getState());
})


// store.dispatch({ type: "ADD_SCORE", payload: "156" })


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
