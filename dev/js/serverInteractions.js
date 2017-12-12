import {server} from "./constants";
const serverUrl = server + "/planner/core.php";

// export const checkToken = (token, result) => {
//     if(token.length !== 0) {
//         $.ajax({
//             url: serverUrl,
//             data: {
//                 "type": "token_check",
//                 "token": token
//             },
//             type: "POST",
//             success: function(response) {
//                 let res = $.parseJSON(response);

//                 if(res.isTokenAccepted) {
//                     // successfully checked
//                     result(true);
//                 } else {
//                     // need to destroy cookies with invalid token
//                     result(false);
//                 }
//             }
//         });
//     } else {
//         // no token was found
//         result(undefined);
//     }
// };

export const checkToken = (token, result) => {
    if(token.length !== 0) {

        var request = new Request(serverUrl, {
            method: "POST",
            body: JSON.stringify({
                "type": "token_check",
                "token": token
            })
        });

        fetch(request)
            .then(function(response) {
                console.log(1, response);
                // return JSON.parse(resp);
                return response.json();
            })
            .then(function(response) {
                console.log(2, JSON.stringify(response));
                // let res = $.parseJSON(resp);

                // if(res.isTokenAccepted) {
                //     // successfully checked
                //     result(true);
                // } else {
                //     // need to destroy cookies with invalid token
                //     result(false);
                // }
            }).catch(function(error) {
                console.log("Error:\n", error.message);
            });
    } else {
        // no token was found
        result(undefined);
    }
};

/**
 * Created by bigdrop on 12.05.17.
 */
// import 'whatwg-fetch';

// export default function requestApi(path, callback) {
//     let myHeaders = new Headers({
//         'Content-Language': 'en-US'
//     });
//     let options = {
//         method: 'GET',
//         headers: myHeaders
//     };

//     fetch(path, options)
//         .then(function (response) {
//             return response.json()
//         })
//         .then(function (json) {
//             if (callback) callback(json);
//             // console.log(json);
//         })
//         .catch(function (ex) {
//             console.log('parsing failed', ex)
//         });
// }





export const tryLogin = (nickname, password, callback) => {
    $.ajax({
        url: serverUrl,
        data: {
            type: "login",
            login_nickname: nickname,
            login_password: password
        },
        type: "POST",
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
};

export const getDay = (time, token, callback) => {
    $.ajax({
        url: serverUrl,
        data: {
            type: "get_day",
            token: token,
            time: time
        },
        type: "POST",
        success: function(response) {
            let res = $.parseJSON(response);
            callback(res);
        }
    });
};

export const setEventDone = (token, id, callback) => {
    $.ajax({
        url: serverUrl,
        data: {
            type: "set_event_done",
            token: token,
            id: id
        },
        type: "POST",
        success: function(response) {
            let res = $.parseJSON(response);
            callback(res);
        }
    });
};

export const addEvent = (token, data, callback) => {
    $.ajax({
        url: serverUrl,
        data: {
            type: "add_event",
            token: token,
            start: data.start,
            dur: data.dur,
            idea: data.idea
        },
        type: "POST",
        success: function(response) {
            let res = $.parseJSON(response);
            if(res.isEventAdded) {
                callback();
            }
        }
    });
};

export const deleteEvent = (token, id, callback) => {
    $.ajax({
        url: serverUrl,
        data: {
            type: "delete_event",
            token: token,
            id: id
        },
        type: "POST",
        success: function(response) {
            let res = $.parseJSON(response);
            if(res.isEventDeleted) {
                callback();
            }
        }
    });
};

export const eventDone = (token, id, callback) => {
    $.ajax({
        url: serverUrl,
        data: {
            type: "event_done",
            token: token,
            id: id
        },
        type: "POST",
        success: function(response) {
            let res = $.parseJSON(response);
            if(res.isEventDone) {
                callback();
            }
        }
    });
};

export const eventUndone = (token, id, callback) => {
    $.ajax({
        url: serverUrl,
        data: {
            type: "event_undone",
            token: token,
            id: id
        },
        type: "POST",
        success: function(response) {
            let res = $.parseJSON(response);
            if(res.isEventUndone) {
                callback();
            }
        }
    });
};

export const moveEvent = (token, id, newTime, dur, callback) => {
    $.ajax({
        url: serverUrl,
        data: {
            type: "move_event",
            token: token,
            id: id,
            time: newTime,
            dur: dur
        },
        type: "POST",
        success: function(response) {
            let res = $.parseJSON(response);
            if(res.isEventMoved) {
                callback();
            }
        }
    });
};

export const editEvent = (token, data, callback) => {
    $.ajax({
        url: serverUrl,
        data: {
            type: "edit_event",
            token: token,
            id: data.id,
            dur: data.dur,
            idea: data.idea
        },
        type: "POST",
        success: function(response) {
            let res = $.parseJSON(response);
            if(res.isEventEdited) {
                callback();
            }
        }
    });
};
