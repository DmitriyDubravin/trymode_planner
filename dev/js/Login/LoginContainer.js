import {connect} from 'react-redux';
import Login from './Login'
import * as Actions from './../store/actions';

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setToken(token) {
			dispatch(Actions.setTokenAction(token))
		},
		switchToPageMain() {
			dispatch(Actions.switchToPageMainAction())
		}
	}
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;