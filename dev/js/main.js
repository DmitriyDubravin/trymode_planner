require('../css/main.scss');

import React, {Component} from 'react';
import {render} from 'react-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {date, user, layout, data} from './store/reducers';
import logger from 'redux-logger';

import PlannerContainer from './plannerContainer';


const reducers = combineReducers({
	date,
	user,
	layout,
	data
});

const store = createStore(
	reducers,
	applyMiddleware(logger)
);
const {dispatch} = store;

if(dev) {
	if(module.hot) {
		// module.hot.accept();
		module.hot.accept(reducers, () => {
			const nextRootReducer = require(reducers);
			store.replaceReducer(nextRootReducer);
		});
	}
}

/*
check time
save time (min)
every min check for time
save time every min
*/

render(
	<Provider store={store}>
		<div>
			<PlannerContainer />
		</div>
	</Provider>,
	document.getElementById('planner')
);