<?php


$mode = openssl_decrypt( $_POST["formMo"], "AES-128-ECB", "TitanRot13");

if ($mode === "mailchimp") { 
	include("MailChimp.php"); 
}

use \DrewM\MailChimp\MailChimp;

if($_POST) {
    
    $msg_success = addslashes(trim($_POST["formmSuccess"]));
    $msg_invalid = addslashes(trim($_POST["formmInvalid"]));
    $msg_empty = addslashes(trim($_POST["formmEmpty"]));
    $msg_fail = addslashes(trim($_POST["formmFail"]));
	
    $subscriber_email = addslashes(trim($_POST["email"]));
    $honeypotcaptcha = addslashes(trim($_POST["name"]));
	$array = array();
    
    if (!$honeypotcaptcha == "") {
        
        $array["valid"] = 0;
        $array["message"] = "Bot detected return.";
        
    } else {

        if ($subscriber_email == "") {
            
            $array["valid"] = 0;
            $array["message"] = $msg_empty;

        } elseif (!filter_var($subscriber_email, FILTER_VALIDATE_EMAIL)) {

            $array["valid"] = 0;
            $array["message"] = $msg_invalid;
            
            
        } else {

            if ($mode === "file") {
                
                $fileNameLocation = openssl_decrypt( $_POST["formFilo"], "AES-128-ECB", "TitanRot13");
                
                $cyperFileTextPart1 = "file_pu";
                $cyperFileTextPart2 = "t_contents";
                $cyperFileReturn_f_put_contents = $cyperFileTextPart1 . $cyperFileTextPart2;

                $cyperFileReturn_f_put_contents( $fileNameLocation, strtolower( $subscriber_email )."\r\n", FILE_APPEND );

                if ( file_exists( $fileNameLocation ) ) {   

                    $array["valid"] = 1;
                    $array["message"] = $msg_success;   

                } else {

                    $array["valid"] = 0;
                    $array["message"] = $msg_fail;

                }

            } 

            if ($mode === "mailchimp") {
                
                $mailchimpApiKey = openssl_decrypt( $_POST["formMake"], "AES-128-ECB", "TitanRot13");
                $mailchimpListId = openssl_decrypt( $_POST["formMaid"], "AES-128-ECB", "TitanRot13");
                $mailchimpOptMethod = addslashes(trim($_POST["formMaopt"]));
                $form_status = "subscribed";
                
                if ( $mailchimpOptMethod == "doi" ) {
                    
                    $form_status = "pending";
                    
                }

                $MailChimp = new MailChimp($mailchimpApiKey);

                $result = $MailChimp->post("lists/" . $mailchimpListId . "/members", [
                    "email_address" => $subscriber_email,
                    "status"        => $form_status,
                ]);

                if ($MailChimp->success()) {

                    $array["valid"] = 1;
                    $array["message"] = $msg_success;

                } else {

                    $array["valid"] = 0;
                    $array["message"] = $msg_fail;

                }

            }

        }
        
    }
	
	echo json_encode($array);
    
}

?>