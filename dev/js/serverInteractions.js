import {server} from "./constants";
const serverUrl = server + "/planner/core.php";

function encodeData(obj) {
    let str = "";
    for (let key in obj) {
        str += `&${key}=${obj[key]}`;
    }
    return str;
}

function getData(data, url = serverUrl) {
    return fetch(url, {
        method: "POST",
        headers: {"Content-Type":"application/x-www-form-urlencoded"},
        body: encodeData(data)
    }).then(response => response.json());
}



export const checkToken = (token, callback) => {
    console.log("Cookie token: ", token);
    if(token.length !== 0) {
        getData({
            "type": "token_check",
            "token": token
        }).then(response => {
            console.log("Response: ", response);
            response.isTokenAccepted ? callback(true) : callback(false);
        });
    } else {
        // no token was found
        callback(undefined);
    }
};

export const tryLogin = (nickname, password, callback) => {
    getData({
        type: "login",
        login_nickname: nickname,
        login_password: password
    }).then(response => {
        if(response.logged_in === true) {
            document.cookie = `token=${response.token}; expires=Thu, 21 Mar 2050 12:00:00 UTC; path=/`;
            callback(response.token);
        } else {
            // set error
        }
    });
};

export const getDay = (time, token, callback) => {
    getData({
        type: "get_day",
        token: token,
        time: time
    }).then(response => {
        callback(response);
    });
};

export const setEventDone = (token, id, callback) => {
    getData({
        type: "set_event_done",
        token: token,
        id: id
    }).then(response => {
        callback(response);
    });
};

export const addEvent = (token, data, callback) => {
    getData({
        type: "add_event",
        token: token,
        start: data.start,
        dur: data.dur,
        idea: data.idea
    }).then(response => {
        if(response.isEventAdded) {
            callback();
        }
    });
};

export const deleteEvent = (token, id, callback) => {
    getData({
        type: "delete_event",
        token: token,
        id: id
    }).then(response => {
        if(response.isEventDeleted) {
            callback();
        }
    });
};

export const eventDone = (token, id, callback) => {
    getData({
        type: "event_done",
        token: token,
        id: id
    }).then(response => {
        if(response.isEventDone) {
            callback();
        }
    });
};

export const eventUndone = (token, id, callback) => {
    getData({
        type: "event_undone",
        token: token,
        id: id
    }).then(response => {
        if(response.isEventUndone) {
            callback();
        }
    });
};

export const moveEvent = (token, id, newTime, dur, callback) => {
    getData({
        type: "move_event",
        token: token,
        id: id,
        time: newTime,
        dur: dur
    }).then(response => {
        if(response.isEventMoved) {
            callback();
        }
    });
};

export const editEvent = (token, data, callback) => {
    getData({
        type: "edit_event",
        token: token,
        id: data.id,
        dur: data.dur,
        idea: data.idea
    }).then(response => {
        if(response.isEventEdited) {
            callback();
        }
    });
};