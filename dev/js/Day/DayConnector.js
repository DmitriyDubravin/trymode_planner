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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);