const serverUrl = 'http://trymode.com/planner/core.php';

export const checkToken = (token, result) => {
	if(token.length !== 0) {
		$.ajax({
			url: serverUrl,
			data: {
				'type': 'token_check',
				'token': token
			},
			type: 'POST',
			success: function(response) {
				let res = $.parseJSON(response);

				if(res.isTokenAccepted) {
					// successfully checked
					result(true);
				} else {
					// need to destroy cookies with invalid token
					result(false);
				}
			}
		});
	} else {
		// no token was found
		result(undefined);
	}
}

export const tryLogin = (nickname, password, callback) => {
	$.ajax({
		url: serverUrl,
		data: {
			type: 'login',
			login_nickname: nickname,
			login_password: password
		},
		type: 'POST',
		success: function(response) {
			// console.log('Server error', response);
			let res = $.parseJSON(response);
			if(res.logged_in === true) {
				document.cookie = `token=${res.token}; expires=Thu, 21 Mar 2050 12:00:00 UTC; path=/`;
				callback(res.token);
			} else {
				// set error
			}
		}
	});
}

export const getDay = (time, token, callback) => {
	$.ajax({
		url: serverUrl,
		data: {
			type: 'get_day',
			token: token,
			time: time
		},
		type: 'POST',
		success: function(response) {
			let res = $.parseJSON(response);
			callback(res);
		}
	});
}

export const setEventDone = (token, id, callback) => {
	$.ajax({
		url: serverUrl,
		data: {
			type: 'set_event_done',
			token: token,
			id: id
		},
		type: 'POST',
		success: function(response) {
			let res = $.parseJSON(response);
			callback(res);
		}
	});
}