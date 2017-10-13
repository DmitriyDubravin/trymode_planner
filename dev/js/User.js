
import React, {Component} from 'react';
import {getCookie} from './functions';
import {checkCookie, tryLogin} from './serverInteractions';
import {Form, FormRow, Input, Button, FormError} from './forms';

// let serverUrl = 'http://trymode.com/core.php';
function escapeHtml(string) {
	var entityMap = {'&': '&amp;', '<': '&lt;', '>': "&gt;", '"': '&quot;', '\'': '&#39;', '/': '&#x2F;'};
	return String(string).replace(/[&<>"'\/]/g, function (s) {
		return entityMap[s];
	});
}

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nickname: null,
			password: null
		};
	}

	handleLogin = () => {
		let nickname = escapeHtml(this.nickname.value);
		let password = escapeHtml(this.password.value);
		tryLogin(nickname, password);
	}

	componentDidMount() {
		let cookieCheckResult = checkCookie(getCookie('token'));
		console.log('Cookie check result: ', cookieCheckResult);
	}

	render() {

		return (
			<div className='login-form'>
				<Form>
					<FormRow>
						<Input reference={nickname => this.nickname = nickname} placeholder='Nickname' />
					</FormRow>
					<FormRow>
						<Input reference={password => this.password = password} type='password' placeholder='Password' />
					</FormRow>
					<FormRow>
						<Button clickHandler={this.handleLogin} type='button' text='Log In' />
					</FormRow>
				</Form>
			</div>
		);
	}
};