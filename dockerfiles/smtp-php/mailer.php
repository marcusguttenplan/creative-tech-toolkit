<?php
use PHPMailer\PHPMailer\PHPMailer;
require "/usr/lib/vendor/autoload.php";

$username = "<email address>";
$password = "<password>";

// Relay SMTP service configuration
$host = 'smtp.gmail.com';
$port = 587;

// Custom data
$fromEmail = 'testaccount@sparksonline.com';
$fromName = 'Sparks';
$to1Email = 'mguttenplan@wearesparks.com';
$to1Name = 'Developer Unknown';
// $to2Email = 'recipient2@example2.com';
// $to2Name = 'Recipient2 Name';
$subject = 'Welcome';
$text = "Welcome to the Life of Your Code";
$html = "Welcome to the Life of Your Code";
//
// // Send message using PHP Mailer
$mail = new PHPMailer(true);
$mail->IsSMTP();
$mail->Host = $host;
$mail->Port = $port;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
// $mail->AuthType ='LOGIN';
$mail->Username = $username;
$mail->Password = $password;
$mail->From = $fromEmail;
$mail->FromName = $fromName;
$mail->AddAddress($to1Email, $to1Name);
// $mail->AddAddress($to2Email, $to2Name);
$mail->IsHTML(true);
$mail->Subject = $subject;
$mail->Body = $html;
$mail->AltBody = $text;

if(!$mail->Send()) {
   echo 'Message could not be sent.';
   echo 'Mailer Error: ' . $mail->ErrorInfo;
   exit;
}
echo 'Message has been sent';
