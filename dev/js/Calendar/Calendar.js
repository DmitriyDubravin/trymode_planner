import React, {Component} from 'react';
import * as cf from './../functions';

export default class Calendar extends Component {

	componentDidMount() {
		let currentTime = cf.getUTCTime();
		if(!this.props.date.current) this.props.setCurrentTime(currentTime);
		if(!this.props.date.selected) this.props.setSelectedTime(currentTime);
		if(!this.props.date.showing && !this.props.date.selected) this.props.setShowingTime(currentTime);
		if(!this.props.date.showing && this.props.date.selected) this.props.setShowingTime(this.props.date.selected);
	}

	selectDate = (year, month, day) => {
		console.log(year, month, day);
		this.props.setSelectedTime(cf.getUTCTime(year, month, day));
	}

	switchMonth = (dir) => {
		let date = cf.convertUTCTimeToLocalDate(this.props.date.showing);
		let step = dir === 'prev' ? step = -1 : step = 1;
		date.setDate(15);
		date.setMonth(date.getMonth() + step);
		this.props.setShowingTime(cf.convertLocalDateToUTCTime(date));
	}

	render() {
		if(!this.props.date.selected) return null;

		let currentDate = cf.convertUTCTimeToLocalDate(this.props.date.current);
		let currentYear = currentDate.getFullYear();
		let currentMonth = currentDate.getMonth();
		let currentDay = currentDate.getDate();
		
		let selectedDate = cf.convertUTCTimeToLocalDate(this.props.date.selected);
		let selectedYear = selectedDate.getFullYear();
		let selectedMonth = selectedDate.getMonth();
		let selectedDay = selectedDate.getDate();

		let showingDate = cf.convertUTCTimeToLocalDate(this.props.date.showing);
		let showingYear = showingDate.getFullYear();
		let showingMonth = showingDate.getMonth();
		let showingDay = showingDate.getDate();

		let firstDayInMonthIndex = new Date(showingYear, showingMonth).getDay();
		if(firstDayInMonthIndex === 0) firstDayInMonthIndex = 7;
		let daysInMonth = showingMonth === 1 && showingYear % 4 === 0 ? 29 : [31,28,31,30,31,30,31,31,30,31,30,31].filter((num, i) => i === showingMonth)[0];

		let showingMonthText = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][showingMonth];

		let showingMonthDays = Array.from({length: 42}, (v, i) => i).map((num, i) => {
			let n = i + 1;
			let dayIndex = n - firstDayInMonthIndex + 1;
			let classes = 'cell';
			if(showingYear === currentYear && showingMonth === currentMonth && dayIndex === currentDay) classes += ' today';
			if(showingYear === selectedYear && showingMonth === selectedMonth && dayIndex === selectedDay) classes += ' selected';
			let button = n >= firstDayInMonthIndex && n < daysInMonth + firstDayInMonthIndex ? <button onClick={() => this.selectDate(showingYear, showingMonth, dayIndex)}>{dayIndex}</button> : null;
			return <div key={n} className={classes}>{button}</div>
		});

		return (
			<div className="calendar-holder">
				<div className="calendar">
					<div className="switchers">
						<button className="switcher prev" onClick={() => this.switchMonth('prev')}><span><i className="icon-arrow-left2"></i></span></button>
						<button className="switcher next" onClick={() => this.switchMonth('next')}><span><i className="icon-arrow-right2"></i></span></button>
						<div className="label"><span>{showingMonthText} {showingYear}</span></div>
					</div>
					<div className="cell weekday"><span>Mon</span></div>
					<div className="cell weekday"><span>Tue</span></div>
					<div className="cell weekday"><span>Wed</span></div>
					<div className="cell weekday"><span>Thu</span></div>
					<div className="cell weekday"><span>Fri</span></div>
					<div className="cell weekday"><span>Sat</span></div>
					<div className="cell weekday"><span>Sun</span></div>
					{showingMonthDays}
				</div>
			</div>
		)
	}
}