import React, {Component} from "react";
import {getCookie} from "./functions";
import {checkToken} from "./serverInteractions";
import Login from "./Login/LoginCommutator";
import Toolbar from "./Toolbar/ToolbarCommutator";
import Calendar from "./Calendar/CalendarCommutator";
import Header from "./Header/HeaderConnector";
import Day from "./Day/DayCommutator";

import * as cf from "./functions";

export default class Planner extends Component {
    constructor(props) {
        super(props);
    }

    decideUserStatus() {
        const token = getCookie("token");
        const handleCookieCheckResult = result => {
            console.log("Result: ", result);
            if(result === true) {
                this.props.setToken(token);
                this.props.switchToPageMain();
                console.log("token was accepted");
            } else if(result === false) {
                this.props.switchToPageLogin();
                document.cookie = `${token}=false; expires=Thu, 21 Mar 1984 10:00:00 UTC; path=/`;
                console.log("token was declined and cookie destroyed");
            } else {
                if(result === undefined) console.log("no token was found");
                this.props.switchToPageLogin();
            }
        };
        checkToken(token, handleCookieCheckResult);
    }

    setInitialTime() {
        if(!this.props.date.current) this.props.setCurrentTime(cf.getUTCTimestamp());
        if(!this.props.date.selected) {
            let date = new Date();
            this.props.setSelectedTime(cf.getLocalTimestamp(date.getFullYear(), date.getMonth(), date.getDate()));
        }
    }

    componentDidMount() {
        this.decideUserStatus();
        this.setInitialTime();
    }

    render() {
        return (
            <div>
                <Header />
                <Login />
                <Toolbar />
                <Calendar />
                <Day />
            </div>
        );
    }
}
