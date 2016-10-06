<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>project</title>
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css">
</head>
<body>
   	
	<?php 
		if(isset($_SESSION['message'])){
			echo "<script>sweetAlert('".$_SESSION['message']."');</script>";
			unset($_SESSION['message']);
		}
	?>
</body>
</html>