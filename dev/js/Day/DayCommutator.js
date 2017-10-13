import React from 'react';
import {connect} from 'react-redux';
import DayConnector from './DayConnector';

const mapStateToProps = (state) => {
	return {
		canBeShown: state.layout.day,
		hasToken: state.user.token,
		timeSelected: state.date.selected
	}
}

export default connect(mapStateToProps)(
	({canBeShown, hasToken, timeSelected}) => (<div>{
		canBeShown &&
		hasToken &&
		timeSelected &&
		<DayConnector />
	}</div>)
);