import React from 'react';
import {connect} from 'react-redux';
import CalendarContainer from './CalendarContainer';
const CalendarCommutator = ({calendar}) => (<div>{calendar && <CalendarContainer />}</div>);
export default connect(state => ({calendar: state.layout.calendar}))(CalendarCommutator);