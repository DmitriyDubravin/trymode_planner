<?php
include('connect.php');
include('functions.php');


function userCheck($token) {
	global $db;
	$query = mysqli_query($db, "SELECT * FROM users WHERE token='$token'");
	$row = mysqli_fetch_array($query, MYSQLI_ASSOC);
	if($row) {
		return $row['nickname'];
	} else {
		return false;
	}
}


// LOGIN

if($_POST['type'] === 'login') {
	// get name and password from post
	$nickname = clear($_POST['login_nickname']);
	$password = clear($_POST['login_password']);

	// encrypt password
	$encrypted_password = sha1($password);

	// compare with db data
	$query = mysqli_query($db, "SELECT * FROM users WHERE nickname='$nickname' AND password = '$encrypted_password'");
	$row = mysqli_fetch_array($query, MYSQLI_ASSOC);

	// if match found
	if($row) {
		if($row['status'] !== 'active') {
			$email = $row['email'];
			$arr = array('logged_in' => false, 'nickname' => $nickname, 'email' => $email, 'status' => false);
		} else {
			// create token
			$token = token_create($row['time'],$row['password']);

			// write token to db
			mysqli_query($db, "UPDATE users SET token='$token' WHERE nickname='$nickname' AND password='$encrypted_password'");

			// send token to user
			$arr = array('logged_in' => true, 'nickname' => $nickname, 'token' => $token);
		}

	// if match not found
	} else {

		// send false to user
		$arr = array('logged_in' => false);
	}
	echo json_encode($arr);
}



if($_POST['type'] === 'token_check') {
	// get token from post
	$token = clear($_POST['token']);

	// compare with db data
	$query = mysqli_query ($db, "SELECT * FROM users WHERE token = '$token'");
	$row = mysqli_fetch_array($query, MYSQLI_ASSOC);

	// if match found
	if($row) {
		$arr = array('isTokenAccepted' => true);
	} else {
		$arr = array('isTokenAccepted' => false);
	}
	echo json_encode($arr);
}



if($_POST['type'] === 'get_day') {

	$token = clear($_POST['token']);
	$time = clear($_POST['time']);
	$user = userCheck($token);
	$dayFinish = $time + 86400;

	if($user !== false) {
		$query = mysqli_query ($db, "SELECT * FROM planner WHERE user = '$user' AND start >= '$time' AND start < '$dayFinish' ORDER BY start ASC");
		$row = mysqli_fetch_array($query, MYSQLI_ASSOC);

		if($row) {
			$data = array();
			do {
				$data[] = array(
					"id" => $row['id'],
					"start" => $row['start'],
					"dur" => $row['dur'],
					"idea" => $row['idea']
				);
			}
			while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC));

			$arr = array(
				'data' => $data
			);
		} else {
			$arr = array('response' => 'no events was found', 'user' => $user, 'time' => $time);
		}
	} else {
		$arr = array('response' => 'no user was found');
	}
	echo json_encode($arr);
}



if($_POST['type'] === 'get_events') {
	$token = clear($_POST['token']);
	$date = clear($_POST['date']);

	$nickname = userCheck($token);

	// if match found
	if($nickname) {
		$start = $date;
		// найти конец периода в unix
		$finish = $start + 86399;
		// выбрать все в обозначенных пределах, т.е. за выбранный/текущий день
		$query = mysqli_query($db, "SELECT * FROM chronometry WHERE user = '$nickname' AND start >= '$start' AND start <= '$finish' ORDER BY start ASC");
		$row = mysqli_fetch_array($query, MYSQLI_ASSOC);

		if($row) {
			$data = array();
			do {
				$data[] = array(
					"id" => $row['id'],
					"start" => $row['start'],
					"finish" => $row['finish'],
					"type" => $row['type'],
					"category" => $row['category'],
					"subcategory" => $row['subcategory'],
					"comment" => $row['comment']
				);
			}
			while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC));


			// send to user
			$arr = array(
				'data' => $data
			);
		} else {
			$arr = array(
				'data' => false
			);
		}

	// if match not found
	} else {
		$arr = array('error' => 'bad token');
		echo json_encode($arr);
	}
	echo json_encode($arr);
}














?>