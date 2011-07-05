<?php
if (!isset($_GET["p"]) && !isset($_GET["fl"]) && !isset($_GET["tl"]) && session_id) {
    die();
}
// query inserisci nel db
include('db_functions.php');
session_start();
save_log(session_id(), $_GET["p"],  $_GET["fl"], $_GET["tl"], $_SERVER['REMOTE_ADDR']);
?>
