

export const getUTCTimestamp = (year = null, month = null, day = null) => {
	if(year !== null && month !== null && day !== null) {
		return new Date(year, month, day).getTime();
	} else {
		return new Date().getTime();
	}
}

export const getLocalTimestamp = (year = null, month = null, day = null) => {
	let date = new Date();
	if(year !== null && month !== null && day !== null) {
		date = new Date(year, month, day);
	}
	return date.getTime() - date.getTimezoneOffset() * 60000;
}


export const getLocalDate = () => new Date();
export const getUTCTime = (year = null, month = null, day = null) => {
	if(year !== null && month !== null && day !== null) {
		return new Date(year, month, day).getTime();
	} else {
		return new Date().getTime();
	}
}
export const convertUTCTimeToLocalDate = (utcTime) => new Date(utcTime);
export const convertLocalTimeToLocalDate = (localTime) => {
	let date = new Date();
	return new Date(localTime + date.getTimezoneOffset() * 60000)
};

export const convertLocalDateToUTCTime = (localDate) => localDate.getTime();
export const formatDate = (date) => {
	let year = date.getFullYear();
	let rawMonth = date.getMonth() + 1;
	let month = rawMonth < 10 ? '0' + rawMonth : rawMonth;
	let rawDay = date.getDate();
	let day = rawDay < 10 ? '0' + rawDay : rawDay;
	let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let weekDay = weekDays[date.getDay()];
	return `${weekDay} ${day}.${month}.${year}`;
}



export const getCookie = (cookieName) => {
	var name = cookieName + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
	}
	return "";
}

export const escapeHtml = (string) => {
	var entityMap = {'&': '&amp;', '<': '&lt;', '>': "&gt;", '"': '&quot;', '\'': '&#39;', '/': '&#x2F;'};
	return String(string).replace(/[&<>"'\/]/g, function (s) {
		return entityMap[s];
	});
}