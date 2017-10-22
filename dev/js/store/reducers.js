
const initialDate = {
	current: null,
	selected: null,
	showing: null
}
export const date = (state = initialDate, action) => {
	switch(action.type) {
		case 'SET_CURRENT_TIME':
			return {...state, current: action.current};
		case 'SET_SELECTED_TIME':
			return {...state, selected: action.selected};
		case 'SET_SHOWING_TIME':
			return {...state, showing: action.showing};
		default:
			return state
	}
}



const initialUser = {
	token: null
}
export const user = (state = initialUser, action) => {
	switch(action.type) {
		case 'SET_TOKEN':
			return {...state, token: action.token};
		default:
			return state
	}
}



const initialLayout = {
	login: false,
	toolbar: false,
	calendar: false
}
export const layout = (state = initialLayout, action) => {
	switch(action.type) {
		case 'LOGIN_TOGGLE':
			return {...state, login: !state.login};
		case 'TOOLBAR_TOGGLE':
			return {...state, toolbar: !state.toolbar};
		case 'CALENDAR_TOGGLE':
			return {...state, calendar: !state.calendar};
		case 'DAY_TOGGLE':
			return {...state, day: !state.day};
		case 'CALENDAR_OFF':
			return {...state, calendar: false};
		case 'PAGE_MAIN':
			return {
				...state,
				login: false,
				toolbar: true,
				calendar: false,
				day: true
			};
		case 'PAGE_LOGIN':
			return {
				...state,
				login: true,
				toolbar: false,
				calendar: false,
				day: true
			};
		default:
			return state
	}
}



const initialData = {
	day: null
}
export const data = (state = initialData, action) => {
	switch(action.type) {
		case 'SET_DAY':
			return {
				...state,
				day: action.day
			};
		// case 'ADD_EVENT':
		// 	return {
		// 		...state,
		// 		day: {
		// 			...state.day,
		// 			[action.key]: {
		// 				...state.day[action.key],
		// 				status: 'adding'
		// 			}
		// 		}
		// 	};
		default:
			return state
	}
}
