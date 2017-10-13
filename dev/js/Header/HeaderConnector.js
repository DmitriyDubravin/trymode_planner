import {connect} from 'react-redux';
import Header from './Header'
import * as Actions from './../store/actions';

const mapDispatchToProps = (dispatch) => {
	return {
		setToken(token) {
			dispatch(Actions.setTokenAction(token))
		},
		switchToPageLogin() {
			dispatch(Actions.switchToPageLoginAction())
		}
	}
}

const HeaderConnector = connect(null, mapDispatchToProps)(Header);
export default HeaderConnector;