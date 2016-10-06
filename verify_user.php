<?php
	session_start(); 
	//First line should be session start after php opening

	require_once "config.php";

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$email = $request->email;
	$password = $request->password;

	$sql="SELECT * from `users` WHERE `email`='".$email."' AND `password`='".$password."'";

	//Result set which contains methods for fetching data
	$result=$mysql->query($sql);

	//Actual user from database
	$user=$result->fetch_assoc();

	//Validating User
	if($user){
		echo json_encode($user);
		//User Found

		//From user object from database
		/*$_SESSION['username']=$user[1];
		$_SESSION['email']=$user[2];
		$_SESSION['user_id']=$user[0];
		$_SESSION['message']='User logged in successfully';
		header("Location:dashboard.php");*/
	}else{
		echo "false";
		//User not found
		/*$_SESSION['message']='Either email/password is incorrect';
		header("Location:index.php");*/
	}
?>