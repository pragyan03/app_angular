<?php

	$mysql=new mysqli('localhost', 'root', '', 'project');

	if($mysql->connect_errno){
		echo "Connection Failed";
	}

?>