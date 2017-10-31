import {connect} from 'react-redux';
import MovingEvent from './MovingEvent';
import * as Actions from './../store/actions';

const mapStateToProps = (state) => {
	return {
		movingEvent: state.data.movingEvent
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMovingEvent(movingEvent) {
			dispatch(Actions.setMovingEventAction(movingEvent))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MovingEvent);