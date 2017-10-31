import React from 'react';
import {connect} from 'react-redux';
import MovingEventConnector from './MovingEventConnector';

export default connect(
	state => ({
		canBeShown: state.layout.movingEvent,
		isMovingEventSet: state.data.movingEvent
	})
)(
	({canBeShown, isMovingEventSet}) => (<div>{
		canBeShown &&
		isMovingEventSet &&
		<MovingEventConnector />
	}</div>)
);