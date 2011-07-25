<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php include("db_functions.php"); ?>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>
        Manypedia - Comparing Linguistic Points Of View (LPOV) of different language Wikipedias!
        </title>
        <meta name="generator" content="vim" />
        <meta name="author" content="fox"/>
        <meta name="description" content="Manypedia is a tool to compare different Linguistic Points Of View (LPOV) across different language Wikipedias" />
        <meta name="keywords" content="manypedia,lpov,compare,wikipedia,languages,language,cross-cultural,analysis,jquery,toolserver,statistics,tag" />
        <!--
            <meta property="og:image" content="http://manypedia.com/img/manypedia_logo.png" />
            <meta property="og:description" content="Manypedia is a tool to compare different Linguistic point of view across different language Wikipedias" />
        -->
        <link href="style.css" rel="stylesheet" type="text/css" />
        <link href="style_wiki.css" rel="stylesheet" type="text/css" />
        <script src="https://www.google.com/jsapi?key=ABQIAAAAMzzSSWDhjeTnoqeE_IchWhS76WXARIgmns88qvycGcR5BzD59xRgACa5fDWFCZAqwafrsKvxGW_Tlw" type="text/javascript"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
        <script type="text/javascript" src="jquery.translate-1.4.7-debug-all.js"></script>
        <script type="text/javascript" src="jquery.history.js"></script>
        <link rel="stylesheet" href="jquery.autocomplete.css" type="text/css" />
        <script type="text/javascript" src="jquery.bgiframe.min.js"></script>
        <script type="text/javascript" src="jquery.dimensions.js"></script>
        <script type="text/javascript" src="jquery.autocomplete.min.js"></script>
        <script type="text/javascript" src="jquery.safeEnter.js"></script>
        <script type="text/javascript" src="jquery.cookies.js"></script>
        <script type="text/javascript" src="jquery.dynacloud.js"></script>
        <script type="text/javascript" src="stopwords.js"></script>
        <script type="text/javascript" src="jquery.tableofcontents.min.js"></script>
        <link href="facebox/facebox.css" media="screen" rel="stylesheet" type="text/css"/>
        <script src="facebox/facebox.js" type="text/javascript"></script>
        <script src="jquery.toptips.js" type="text/javascript"></script>
        <script type="text/javascript" src="script.js"></script>
        <script type="text/javascript">
          var _gaq = _gaq || [];
          _gaq.push(['_setAccount', 'UA-56174-20']);
          _gaq.push(['_setDomainName', 'none']);
          _gaq.push(['_setAllowLinker', true]);
          _gaq.push(['_trackPageview']);

            (function() {
                    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();

        </script>

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
    </head>
    <body>
        <noscript>
            <div class="noscript">
                Please enable Javascript in order to use this wep app!
            </div>
        </noscript>
        <div class="noscript" id="warnIE">
            <b>Warning:</b> You're visiting Manypedia using the browser "Internet explorer". Manypedia is much faster and better if you use <a href=\"www.getfirefox.net/\">Mozilla Firefox</a> or <a href=\"http://www.google.com/chrome\">Google Chrome</a>. Please download <a href=\"www.getfirefox.net/\">Firefox</a> or <a href=\"http://www.google.com/chrome\">Chrome</a>, if Manypedia is slow (which is likely).
        </div>
        <div id="main">
            <div id="header">
                <div id="search_div">
                    <label for="search"><img src="img/magnifier.png" alt="magnifier" />Search</label>
                    <input type="text" name="search" id="search" />
                    <label for="main_select">in the </label>
                    <select id="main_select" name="main_select">
                        <option value="en">English Wikipedia</option>
                        <option value="fr">French Wikipedia</option>
                        <option value="es">Spanish Wikipedia</option>
                        <option value="it">Italian Wikipedia</option>
                        <option value="de">German Wikipedia</option>
                        <option value="zh">Chinese Wikipedia</option>
                        <option value="ar">Arabic Wikipedia</option>
                        <option value="da">Danish Wikipedia</option>
                        <option value="nl">Dutch Wikipedia</option>
                        <option value="af">Afrikaans Wikipedia</option>
                        <option value="sq">Albanian Wikipedia</option>
                        <option value="be">Belarusian Wikipedia</option>
                        <option value="bg">Bulgarian Wikipedia</option>
                        <option value="ca">Catalan Wikipedia</option>
                        <option value="hr">Croatian Wikipedia</option>
                        <option value="cs">Czech Wikipedia</option>
                        <option value="et">Estonian Wikipedia</option>
                        <option value="tl">Filipino Wikipedia</option>
                        <option value="fi">Finnish Wikipedia</option>
                        <option value="gl">Galician Wikipedia</option>
                        <option value="el">Greek Wikipedia</option>
                        <option value="ht">Haitian Creole Wikipedia</option>
                        <option value="he">Hebrew Wikipedia</option>
                        <option value="hi">Hindi Wikipedia</option>
                        <option value="hu">Hungarian Wikipedia</option>
                        <option value="is">Icelandic Wikipedia</option>
                        <option value="id">Indonesian Wikipedia</option>
                        <option value="ga">Irish Wikipedia</option>
                        <option value="ja">Japanese Wikipedia</option>
                        <option value="ko">Korean Wikipedia</option>
                        <option value="lv">Latvian Wikipedia</option>
                        <option value="lt">Lithuanian Wikipedia</option>
                        <option value="mk">Macedonian Wikipedia</option>
                        <option value="ms">Malay Wikipedia</option>
                        <option value="mt">Maltese Wikipedia</option>
                        <option value="no">Norwegian Wikipedia</option>
                        <option value="fa">Persian Wikipedia</option>
                        <option value="pl">Polish Wikipedia</option>
                        <option value="pt">Portuguese Wikipedia</option>
                        <option value="ro">Romanian Wikipedia</option>
                        <option value="ru">Russian Wikipedia</option>
                        <option value="sr">Serbian Wikipedia</option>
                        <option value="sk">Slovak Wikipedia</option>
                        <option value="sl">Slovenian Wikipedia</option>
                        <option value="sw">Swahili Wikipedia</option>
                        <option value="sv">Swedish Wikipedia</option>
                        <option value="tl">Tagalog Wikipedia</option>
                        <option value="th">Thai Wikipedia</option>
                        <option value="tr">Turkish Wikipedia</option>
                        <option value="uk">Ukrainian Wikipedia</option>
                        <option value="vi">Vietnamese Wikipedia</option>
                        <option value="cy">Welsh Wikipedia</option>
                        <option value="yi">Yiddish Wikipedia</option>
                    </select>
                    <input type="submit" value="Go" id="go" /><br/>
                    <label for="lang_select">Compare with the </label>
                    <select id="lang_select" name="lang_select">
                        <option value="">Choose language for translation...</option>
                    </select>
                </div>
                <div id="most_searched">
                    <table>
                        <tr>
                            <td><b>Popular</b></td>
                            <td><b>Latest</b></td>
                            <td><b>Featured</b></td>
                        </tr>
                        <tr>
                            <td><?php echo most_searched(); ?></td>
                            <td><?php echo last_searched(); ?></td>
                            <td><?php echo get_featured(); ?></td>
                        </tr>
                    </table>
                </div>
                <div id="magnifier">
                <span class="tagline_left"><img style="width:15px;" src="img/arrow.gif" alt="search" /> Move here to search another page to compare</span><span class="tagline">Manypedia! - <em>"Comparing Linguistic Points Of View (LPOV) of different language Wikipedias!"</em></span><span class="tagline_right">
                <iframe src="http://www.facebook.com/plugins/like.php?app_id=238278506201020&amp;href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FManypedia%2F202808583098332&amp;send=false&amp;layout=button_count&amp;width=30&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:120px; height:22px;"></iframe>
                <a href="#" onclick="help();">Help</a> | <a href="#about" onclick="get_about()" rel="facebox">About/FAQ</a></span>
                </div>
            </div>
            <div id="title_div">
            </div>
            <div id="container">
                <div id="page1_container">
                    <div id="page1_header">
                        <h3 id="page1_title"></h3>
                        <div id="page1_info">
                            <div id="img1"></div>
                            <div id="tag_cloud1"></div>
                            <div id="stats1"></div>
                        </div>
                    </div>
                    <div id="page1">
                    </div>
                    <div id="source1"></div>
                </div>
                <div id="page2_container">
                    <div id="page2_header">
                        <h3 id="page2_title"></h3>
                        <div id="page2_info">
                            <div id="img2"></div>
                            <div id="tag_cloud2"></div>
                            <div id="stats2"></div>
                        </div>
                    </div>
                    <div id="page2">
                    </div>
                    <div id="source2"></div>
                </div>
            </div>
            <div id="site_footer">
                <p>Manypedia is a project of <a href="http://www.gnuband.org">Paolo Massa</a> and <a href="http://autistici.org/fox/">Federico "fox" Scrinzi</a> of <a href="http://sonet.fbk.eu">SoNet group at FBK</a>. We love but are not affiliated with Wikipedia. Manypedia content is released under <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike License</a>.<img alt="CC" src="http://i.creativecommons.org/l/by-sa/3.0/80x15.png" /> <a href="#about" rel="facebox" onclick="get_about();">Read more</a>.</p>
            </div>
        </div>
        <div id="about" style="display:none;">
            <p>Loading...Please wait <img src='img/indicator.gif' alt='loading...' /></p>
        </div>
        <div id="loading" style="display:none;"><p>Loading user stats...Please wait <img src='img/indicator.gif' alt='loading...' /></p></div>
    </body>
</html>
<?php
session_start();
?>
