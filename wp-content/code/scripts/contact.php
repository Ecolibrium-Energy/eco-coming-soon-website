<?php

if($_POST) {
    
    $msg_success = addslashes(trim($_POST["formmSuccess"]));
    $msg_invalid = addslashes(trim($_POST["formmInvalid"]));
    $msg_empty = addslashes(trim($_POST["formmEmpty"]));
    
    $name = addslashes(trim($_POST["name"]));
    $clientEmail = addslashes(trim($_POST["email"]));
    $message = addslashes(trim($_POST["message"]));
    $honeypotCaptcha = addslashes(trim($_POST["phone"]));
    
    $targetemail = openssl_decrypt( $_POST["formide"], "AES-128-ECB", "TitanRot13");

    $array = array("nameMessage" => "", "emailMessage" => "", "messageMessage" => "","succesMessage" => "");

    if($name == "") {
    	$array["nameMessage"] = $msg_empty;
    }
	if($clientEmail == "") {
        $array["emailMessage"] = $msg_empty;
    } elseif(!filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) {
        $array["emailMessage"] = $msg_invalid;
    }
	
    if($message == "") {
        $array["messageMessage"] = $msg_empty;
    }
    
    if( $honeypotCaptcha != "") {
        $array["messageMessage"] = "Bot detected return.";
    }
	
    if($name != "" && filter_var($clientEmail, FILTER_VALIDATE_EMAIL) && $message != "" && $honeypotCaptcha == "") {
        
		$array["succesMessage"] = $msg_success;
		
		$headers= "MIME-Version: 1.0" . "\r\n";
        $headers.= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers= "From: " . $name . " <" . $clientEmail .">\r\n";
		$headers.= "Reply-To: " . $clientEmail;
		
		mail($targetemail, "Message sent via contact form from " . $_SERVER["SERVER_NAME"], $message, $headers);
		
    }

    echo json_encode($array);

}