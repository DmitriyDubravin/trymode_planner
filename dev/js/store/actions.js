export function setCurrentTimeAction(time) {
	return {type: 'SET_CURRENT_TIME', current: time}
}
export function setSelectedTimeAction(time) {
	return {type: 'SET_SELECTED_TIME', selected: time}
}
export function setShowingTimeAction(time) {
	return {type: 'SET_SHOWING_TIME', showing: time}
}



export function setTokenAction(token) {
	return {type: 'SET_TOKEN', token: token}
}



export function setDayAction(day) {
	return {type: 'SET_DAY', day: day}
}
export function setEventAction(event) {
	return {type: 'SET_EVENT', event: event}
}



export function calendarToggleAction() {
	return {type: 'CALENDAR_TOGGLE'}
}
export function calendarOffAction() {
	return {type: 'CALENDAR_OFF'}
}
export function loginToggleAction() {
	return {type: 'LOGIN_TOGGLE'}
}
export function dayToggleAction() {
	return {type: 'DAY_TOGGLE'}
}



// pages switchers
export function switchToPageLoginAction() {
	return {type: 'PAGE_LOGIN'}
}
export function switchToPageMainAction() {
	return {type: 'PAGE_MAIN'}
}
