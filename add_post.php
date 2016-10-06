<?php
	session_start();
	require_once "config.php";

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$title = $request->title;
	$body = $request->body;
	$user = $request->user;

	$sql="INSERT INTO `posts` (`user_id`, `title`, `body`) values ('".$user."', '".$title."', '".$body."')";

	$mysql->query($sql);

	$sql="select * from `posts` where `id`=".$mysql->insert_id;

	$result=$mysql->query($sql);

	$post=$result->fetch_assoc();

	echo json_encode($post);

?>