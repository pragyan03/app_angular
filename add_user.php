<?php 
	session_start();
	require_once "config.php";

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$email = $request->email;
	$password = $request->password;
	$name = $request->name;

	$sql="INSERT INTO `users` (`name`, `email`, `password`) values ('".$name."', '".$email."', '".$password."')";

	$mysql->query($sql);

	$sql="select * from `users` where `id`=".$mysql->insert_id;

	$result=$mysql->query($sql);

	$user=$result->fetch_assoc();

	echo json_encode($user);
?>