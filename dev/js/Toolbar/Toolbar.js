import React, {Component} from 'react';
import * as cf from './../functions';

export default class Toolbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			xDown: null,
			yDown: null
		}
	}

	componentDidMount() {
		document.addEventListener('touchstart', this.handleTouchStart, false);
		document.addEventListener('touchmove', this.handleTouchMove, false);
	}

	handleTouchStart = (evt) => {
		this.state.xDown = evt.touches[0].clientX;
		this.state.yDown = evt.touches[0].clientY;
	};
	
	handleTouchMove = (evt) => {
		if ( ! this.state.xDown || ! this.state.yDown ) {
			return;
		}
	
		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;
	
		var xDiff = this.state.xDown - xUp;
		var yDiff = this.state.yDown - yUp;
	
		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
			if ( xDiff > 0 ) {
				console.log('left swipe');
				this.selectNextDay();
				/* left swipe */ 
			} else {
				
				this.selectPrevDay();
				console.log('right swipe');
				/* right swipe */
			}
		} else {
			if ( yDiff > 0 ) {
				console.log('up swipe');
				/* up swipe */ 
			} else { 
				console.log('down swipe');
				/* down swipe */
			}
		}
		/* reset values */
		this.state.xDown = null;
		this.state.yDown = null;
	};

	selectToday = () => {
		this.props.setCurrentTime(cf.getUTCTimestamp());
		let date = new Date();
		this.props.setSelectedTime(cf.getLocalTimestamp(date.getFullYear(), date.getMonth(), date.getDate()));
		// this.props.setShowingTime(cf.getUTCTimestamp());
		this.props.setShowingTime(cf.getLocalTimestamp(date.getFullYear(), date.getMonth(), date.getDate()));
		this.props.calendarOff();
		this.props.dayOn();
	}
	selectPrevDay = () => {
		this.props.setSelectedTime(this.props.date.selected - 86400000);
	}
	selectNextDay = () => {
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
		)
	}
}