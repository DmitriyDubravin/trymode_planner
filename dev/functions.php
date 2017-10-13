<?php

function clear($value) {
	return htmlspecialchars(trim($value));
}

function token_create($arg1,$arg2) {
	return encrypt_time_solt($arg1).encrypt_solt($arg2);
}

// input number (time = 10chr) - output solty number (64chr)
function encrypt_time_solt($value) {
	$value_part1 = substr($value, 0,1);
	$value_part2 = substr($value, 1,1);
	$value_part3 = substr($value, 2,1);
	$value_part4 = substr($value, 3,1);
	$value_part5 = substr($value, 4,1);
	$value_part6 = substr($value, 5,1);
	$value_part7 = substr($value, 6,1);
	$value_part8 = substr($value, 7,1);
	$value_part9 = substr($value, 8,1);
	$value_part10 = substr($value, 9,1);
	$solt_part1 = random_salt(4);
	$solt_part2 = random_salt(5);
	$solt_part3 = random_salt(2);
	$solt_part4 = random_salt(7);
	$solt_part5 = random_salt(8);
	$solt_part6 = random_salt(9);
	$solt_part7 = random_salt(8);
	$solt_part8 = random_salt(3);
	$solt_part9 = random_salt(2);
	$solt_part10 = random_salt(4);
	$solt_part11 = random_salt(2);
	$encrypted_value = $solt_part1.$value_part1.$solt_part2.$value_part2.$solt_part3.$value_part3.$solt_part4.$value_part4.$solt_part5.$value_part5.$solt_part6.$value_part6.$solt_part7.$value_part7.$solt_part8.$value_part8.$solt_part9.$value_part9.$solt_part10.$value_part10.$solt_part11;
	return $encrypted_value;
}

// input sha1 (40chr) - output solty sha1 (64chr)
function encrypt_solt($value) {
	$value_part1 = substr($value, 0,10);
	$value_part2 = substr($value, 10,10);
	$value_part3 = substr($value, 20,10);
	$value_part4 = substr($value, 30,10);
	$solt_part1 = random_salt(7);
	$solt_part2 = random_salt(3);
	$solt_part3 = random_salt(4);
	$solt_part4 = random_salt(3);
	$solt_part5 = random_salt(7);
	$encrypted_value = $solt_part1.$value_part1.$solt_part2.$value_part2.$solt_part3.$value_part3.$solt_part4.$value_part4.$solt_part5;
	return $encrypted_value;
}

// outputs random chars in argnum length
function random_salt($number) {
	$randorm_salt_array = array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
	shuffle($randorm_salt_array);
	$random_salt = '';
	for($x = 0; $x < $number; $x++) {
		$random_salt .= $randorm_salt_array[$x];
	}
	return $random_salt;
}

// input solty time (64chr) - output time (10chr)
function decrypt_time_solt($value) {
	$value_part1 = substr($value, 4,1);
	$value_part2 = substr($value, 10,1);
	$value_part3 = substr($value, 13,1);
	$value_part4 = substr($value, 21,1);
	$value_part5 = substr($value, 30,1);
	$value_part6 = substr($value, 40,1);
	$value_part7 = substr($value, 49,1);
	$value_part8 = substr($value, 53,1);
	$value_part9 = substr($value, 56,1);
	$value_part10 = substr($value, 61,1);
	$decrypted_value = $value_part1.$value_part2.$value_part3.$value_part4.$value_part5.$value_part6.$value_part7.$value_part8.$value_part9.$value_part10;
	return $decrypted_value;
}

// input solty sha1 (64chr) - output sha1 (40chr)
function decrypt_solt($value) {
	$value_part1 = substr($value, 7,10);
	$value_part2 = substr($value, 20,10);
	$value_part3 = substr($value, 34,10);
	$value_part4 = substr($value, 47,10);
	$decrypted_value = $value_part1.$value_part2.$value_part3.$value_part4;
	return $decrypted_value;
}

?>
