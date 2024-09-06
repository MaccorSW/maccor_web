<?php

if (isset($_POST['submit'])) {
$name = $_POST['name'];
$subject = $_POST['Web Inquiry'];
$mailFrom = $_POST['email'];
$message = $_POST['message'];

$mailto = "m.sandoval@maccor.com";
$headers = "From: ".$mailFrom;
$txt = "You have recieved an e-mail from ".$name.".\n\n".$message;

mail($mailto, $subject, $txt, $headers);
header("https://maccor-web-prototype-3wgyp.ondigitalocean.app/thankyou.html");
}