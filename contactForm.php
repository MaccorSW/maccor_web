<?php

if (isset($_POST['submit'])) {
$name = $_POST['name'];
$subject = $_POST[''];
$mailFrom = $_POST[''];
$message = $_POST[''];

$mailto = "MAIL-RECEIVING-EMAIL";
$headers = "From: ".$mailFrom;
$txt = "You have recieved an e-mail from ".$name.".\n\n".$message;

mail($mailto, $subject, $txt, $headers);
header("Location: AFTER-SEND-PAGE?mailsend");
}