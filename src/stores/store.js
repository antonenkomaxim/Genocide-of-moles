import { createStore } from "redux";


const initialState = {
	points: 0,
	lvl: 1,
	fails: 0,
	time: 4000
}

export default function configureStore() {
	const store = createStore(score);
	return store;
}

function score(state = initialState, action) {

	switch (action.type) {
		case "ADD_SCORE":
		case "ADD_FAIL":
		case "ADD_LVL":
		case "ADD_TIME":
			return {
				...state,
				...action.payload
			}

		default:
			return state;
	}
}
