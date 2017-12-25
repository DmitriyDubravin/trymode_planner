require("../css/main.scss");

import React, {Component} from "react";
import {render} from "react-dom";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {date, user, layout, data} from "./store/reducers";
import logger from "redux-logger";

import PlannerContainer from "./plannerContainer";
import { addEvent } from "./serverInteractions";


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


if(process.env.NODE_ENV === "development") {
    if(module.hot) {
        module.hot.accept();
        // module.hot.accept(reducers, () => {
        //     const nextRootReducer = require(reducers);
        //     store.replaceReducer(nextRootReducer);
        // });
    }
}



render(
    <Provider store={store}>
        <div>
            <PlannerContainer />
        </div>
    </Provider>,
    document.getElementById("planner")
);