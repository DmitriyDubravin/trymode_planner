import {connect} from 'react-redux';
import Calendar from './Calendar'
import * as Actions from './../store/actions';



const mapStateToProps = (state) => {
	return {
		date: state.date
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentTime(time) {
			dispatch(Actions.setCurrentTimeAction(time))
		},
		setSelectedTime(time) {
			dispatch(Actions.setSelectedTimeAction(time))
		},
		setShowingTime(time) {
			dispatch(Actions.setShowingTimeAction(time))
		},
		calendarOff() {
			dispatch(Actions.calendarOffAction())
		},
		dayToggle() {
			dispatch(Actions.dayToggleAction())
		}
	}
}

const CalendarContainer = connect(mapStateToProps, mapDispatchToProps)(Calendar);
export default CalendarContainer;