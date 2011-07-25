<?php
include("db_config.php");

mysql_connect($hostname, $username, $password)
    or die("Unable to connect to MySQL");
mysql_select_db($db_name)
    or die("Could not selet db!");

function create_table_logs() {
    $qry = "CREATE TABLE IF NOT EXISTS `aimashup11_logs` (
             `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
             `session_id` VARCHAR(50) NOT NULL,
             `when` TIMESTAMP DEFAULT NOW() NOT NULL,
             `page` TEXT NOT NULL,
             `first_lang` VARCHAR(20) NOT NULL,
             `second_lang` VARCHAR(20) NOT NULL,
             `ip` TEXT NOT NULL
           );";
    $result = mysql_query($qry);
    if ($result) {
        echo "OK!!!";
    }
    else {
        echo "FAIL :( ".mysql_error();
    }
}

function create_table_featured() {
    $qry = "CREATE TABLE IF NOT EXISTS `aimashup11_featured` (
             `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
             `first_lang` VARCHAR(20) NOT NULL,
             `page` TEXT NOT NULL,
             `second_lang` VARCHAR(20) NOT NULL
           );";
    $result = mysql_query($qry);
    if ($result) {
        echo "OK!!!";
    }
    else {
        echo "FAIL :( ".mysql_error();
    }
}

function get_featured() {
    $qry = "SELECT page, first_lang, second_lang FROM `aimashup11_featured` WHERE page!='User:Phauly/Land_Manypedia' ORDER BY RAND() DESC LIMIT 4";
    $result = mysql_query($qry);
    $res = "";
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $res .= '<a href="#|'.$row["first_lang"]."|".$row["page"]."|".$row["second_lang"].'">'.str_replace("_", " ", $row["page"])." <img alt='flag' src='img/flags/".$row["first_lang"].".png'/> | <img alt='flag' src='img/flags/".$row["second_lang"].".png' /></a><br/>";
    }
    mysql_free_result($result);
    return $res;
}

function get_one_featured() {
    $qry = "SELECT page, first_lang, second_lang FROM `aimashup11_featured` ORDER BY RAND() DESC LIMIT 1";
    $result = mysql_query($qry);
    $res = "";
    $row = mysql_fetch_array($result, MYSQL_ASSOC);
    $res .= "|".$row["first_lang"]."|".$row["page"]."|".$row["second_lang"];
    mysql_free_result($result);
    return $res;
}

function save_log($sess_id, $page, $fl, $tl, $ip) {
    $sess_id = mysql_real_escape_string(strip_tags($sess_id));
    $page = mysql_real_escape_string(strip_tags($page));
    $fl = mysql_real_escape_string(strip_tags($fl));
    $tl = mysql_real_escape_string(strip_tags($tl));
    $ip = mysql_real_escape_string(strip_tags($ip));
    $qry = "INSERT INTO `aimashup11_logs` (`session_id`, `page`, `second_lang`, `first_lang`, `ip`) VALUES('".$sess_id."', '".$page."', '".$fl."', '".$tl."', '".$ip."');";
    $result = mysql_query($qry);
    if (!$result) echo "FAIL!";
}

function most_searched() {
    $qry = "SELECT DISTINCT logs.page, logs.first_lang, logs.second_lang, count(*) AS occurrencies
            FROM aimashup11_logs AS logs LEFT JOIN aimashup11_featured AS feat ON logs.page = feat.page
            WHERE feat.page IS NULL AND logs.when > SUBTIME(NOW(), 2592000)
            GROUP BY logs.page, logs.second_lang, logs.first_lang
            ORDER BY occurrencies DESC LIMIT 4";
    //$qry = "SELECT page, from_lang, to_lang, count(*) as occurrencies FROM `aimashup11_logs` GROUP BY page ORDER BY occurrencies DESC LIMIT 3";
    $result = mysql_query($qry);
    $res = "";
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $res .= '<a href="#|'.$row["first_lang"]."|".$row["page"]."|".$row["second_lang"].'">'.str_replace("_", " ", $row["page"])." <img alt='flag' src='img/flags/".$row["first_lang"].".png'/> | <img alt='flag' src='img/flags/".$row["second_lang"].".png' /></a><br/>";
    }
    mysql_free_result($result);
    return $res;
}

function last_searched() {
    $qry = "SELECT logs.page, logs.first_lang, logs.second_lang, max(logs.id) AS max_id
            FROM aimashup11_logs AS logs LEFT JOIN aimashup11_featured AS feat ON logs.page = feat.page
            WHERE feat.page IS NULL
            GROUP BY logs.page, logs.first_lang, logs.second_lang
            ORDER BY max_id DESC LIMIT 4";
    //$qry = "SELECT page, from_lang, to_lang FROM `aimashup11_logs` GROUP BY `page` ORDER BY `when` DESC LIMIT 3";
    $result = mysql_query($qry);
    $res = "";
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $res .= '<a href="#|'.$row["first_lang"]."|".$row["page"]."|".$row["second_lang"].'">'.str_replace("_", " ", $row["page"])." <img alt='flag' src='img/flags/".$row["first_lang"].".png'/> | <img alt='flag' src='img/flags/".$row["second_lang"].".png' /></a><br/>";
    }
    mysql_free_result($result);
    return $res;
}

?>
