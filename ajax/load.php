<?php
// Set your return content type
#header('Content-type: application/xml');
ini_set('user_agent', 'AIMashUp');
//allowed hosts
$allowed = array("wikipedia.org", "toolserver.org");

if (!isset($_GET["url"]))
    die();

// Website url to open
$daurl = $_GET["url"];

$tmp = explode(".", parse_url($daurl, PHP_URL_HOST));

if (!in_array($tmp[count($tmp)-2].".".$tmp[count($tmp)-1], $allowed))
    die();

//If file is present in cache serve it, otherwise get it fro the interwebz
if (file_exists("cache/".urlencode($daurl))) {
    $content = @file_get_contents("cache/".urlencode($daurl));
    echo $content;
}
else {
    // Get that website's content
    $content = @file_get_contents($daurl);

    // serve it!
    if (!(strpos($http_response_header[0], "200"))) {
        if (strpos($http_response_header[0], "404")) {
            echo "No results found!";
        }
        else {
            echo "Error: ".$http_response_header[0];
        }
    }
    else {
        // cache it!
        $file = @fopen("cache/".urlencode($daurl), "w");
        @fwrite($file, $content);
        @fclose ($file);
        echo $content;
    }
}
?>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-56174-22']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
