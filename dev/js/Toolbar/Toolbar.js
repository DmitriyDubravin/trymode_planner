import React, {Component} from "react";
import * as cf from "./../functions";

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xDownStart: null,
            yDownStart: null,
            xDown: null,
            yDown: null
        };
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.selectToday = this.selectToday.bind(this);
        this.selectPrevDay = this.selectPrevDay.bind(this);
        this.selectNextDay = this.selectNextDay.bind(this);
    }

    componentDidMount() {
        document.addEventListener("touchstart", this.handleTouchStart, false);
        document.addEventListener("touchmove", this.handleTouchMove, false);
        document.addEventListener("touchend", this.handleTouchEnd, false);
    }

    handleTouchStart(evt) {
        this.state.xDownStart = evt.touches[0].clientX;
        this.state.yDownStart = evt.touches[0].clientY;
        this.state.xDown = evt.touches[0].clientX;
        this.state.yDown = evt.touches[0].clientY;
    }
	
    handleTouchMove(evt) {
        if ( ! this.state.xDownStart || ! this.state.yDownStart ) {
            return;
        }
        this.state.xDown = evt.touches[0].clientX;
        this.state.yDown = evt.touches[0].clientY;
    }

    handleTouchEnd() {
        if(this.state.xDownStart === this.state.xDown && this.state.yDownStart === this.state.yDown) return;

        var sensibility = 100;

        var xDiff = this.state.xDownStart - this.state.xDown;
        var yDiff = this.state.yDownStart - this.state.yDown;
	
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
                /* left swipe */ 
                if(xDiff > sensibility) {
                    this.selectNextDay();
                }
            } else {
                /* right swipe */
                if(xDiff < -sensibility) {
                    this.selectPrevDay();
                }
            }
        } else {
            if ( yDiff > 0 ) {
                /* up swipe */ 
            } else { 
                /* down swipe */
            }
        }
        /* reset values */
        this.state.xDownStart = null;
        this.state.yDownStart = null;
        this.state.xDown = null;
        this.state.yDown = null;
    }

    selectToday() {
        this.props.setCurrentTime(cf.getUTCTimestamp());
        let date = new Date();
        this.props.setSelectedTime(cf.getLocalTimestamp(date.getFullYear(), date.getMonth(), date.getDate()));
        this.props.setShowingTime(cf.getLocalTimestamp(date.getFullYear(), date.getMonth(), date.getDate()));
        this.props.calendarOff();
        this.props.dayOn();
    }
    selectPrevDay() {
        this.props.setSelectedTime(this.props.date.selected - 86400000);
    }
    selectNextDay() {
        this.props.setSelectedTime(this.props.date.selected + 86400000);
    }

    render() {
        const formattedDate = cf.formatDate(cf.convertLocalTimeToLocalDate(this.props.date.selected));

        return (
            <div>
                <div className="diary">
                    <div className="date">
                        <button className="btn btn-prev-day" onClick={() => this.selectPrevDay()}><i className="icon-arrow-left2"></i></button>
                        <button className="btn btn-next-day" onClick={() => this.selectNextDay()}><i className="icon-arrow-right2"></i></button>
                        <button className="btn btn-today" onClick={() => this.selectToday()}><i className="icon-target"></i></button>
                        <button className="btn btn-calendar" onClick={() => {
                            this.props.calendarToggle();
                            this.props.dayToggle();
                        }}><i className="icon-calendar"></i></button>
                        {formattedDate}
                    </div>
                </div>
            </div>
        );
    }
}