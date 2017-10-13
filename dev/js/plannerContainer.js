import {connect} from 'react-redux';
import Planner from './planner'
import * as Actions from './store/actions';

const mapStateToProps = (state) => {
	return {
		date: state.date,
		calendar: state.layout.calendar
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
		calendarToggle() {
			dispatch(Actions.calendarToggleAction())
		},
		setToken(token) {
			dispatch(Actions.setTokenAction(token))
		},
		switchToPageLogin() {
			dispatch(Actions.switchToPageLoginAction())
		},
		switchToPageMain() {
			dispatch(Actions.switchToPageMainAction())
		}
	}
}

const PlannerContainer = connect(mapStateToProps, mapDispatchToProps)(Planner);
export default PlannerContainer;