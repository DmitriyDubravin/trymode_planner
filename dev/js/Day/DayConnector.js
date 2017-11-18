import {connect} from 'react-redux';
import Day from './Day';
import * as Actions from './../store/actions';

const mapStateToProps = (state) => {
	return {
		user: state.user,
		date: state.date,
		data: state.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setDay(day) {
			dispatch(Actions.setDayAction(day))
		},
		// setEvent(key) {
		// 	dispatch(Actions.addEventAction(key))
		// },
		// setMovingEvent(movingEvent) {
		// 	dispatch(Actions.setMovingEventAction(movingEvent))
		// },
		// movingEventOn() {
		// 	dispatch(Actions.movingEventOnAction())
		// },
		// movingEventOff() {
		// 	dispatch(Actions.movingEventOffAction())
		// }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);