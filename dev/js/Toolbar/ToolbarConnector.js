import {connect} from 'react-redux';
import Toolbar from './Toolbar'
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
		calendarToggle() {
			dispatch(Actions.calendarToggleAction())
		},
		calendarOff() {
			dispatch(Actions.calendarOffAction())
		}
	}
}

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);
export default ToolbarContainer;