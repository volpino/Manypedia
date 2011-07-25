$.dynaCloud.scale = 4;
$.dynaCloud.auto = false;
$.dynaCloud.sort = false;
$.dynaCloud.single = false;
$.dynaCloud.wordStats = false;
//$.dynaCloud.max = -1;

$.merge($.dynaCloud.stopwords, ["retrieved", "isbn", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december", "wikipedia", "edit", "change", "giustizia", "however"]);
$.merge($.dynaCloud.stopwords, stopwords);
var originalStopwords = $.dynaCloud.stopwords.slice(0);
$.ajaxSetup ({
    cache: false
});
$.translate.load("ABQIAAAALg5ASpxcQqRf8hqsKy6QYxTzZQSsR8IRNiyECrZ4busWivGnRxR3iX2pXTFcZq4PpUkOGgr3Y4XVlg");
var ajax_load = "<div class='loading_ajax'><img src='img/load.gif' alt='loading...' /><br/><br/>Loading...Please Wait</div>";
var loadUrl = "ajax/load.php";
var current_page = "";
var current_main = "";
var current_trans = "";
var current_url = window.location.href;
var ajax_requests1 = [];
var ajax_requests2 = [];
var translate_requests = [];
var current_search = "";

var lang_set = {};
lang_set.af = "Afrikaans";
lang_set.sq = "Albanian";
lang_set.ar = "Arabic";
lang_set.be = "Belarusian";
lang_set.bg = "Bulgarian";
lang_set.ca = "Catalan";
lang_set.zh = "Chinese";
lang_set.hr = "Croatian";
lang_set.cs = "Czech";
lang_set.da = "Danish";
lang_set.nl = "Dutch";
lang_set.en = "English";
lang_set.et = "Estonian";
lang_set.tl = "Filipino";
lang_set.fi = "Finnish";
lang_set.fr = "French";
lang_set.gl = "Galician";
lang_set.de = "German";
lang_set.el = "Greek";
lang_set.ht = "Haitian Creole";
lang_set.he = "Hebrew";
lang_set.hi = "Hindi";
lang_set.hu = "Hungarian";
lang_set.is = "Icelandic";
lang_set.id = "Indonesian";
lang_set.ga = "Irish";
lang_set.it = "Italian";
lang_set.ja = "Japanese";
lang_set.ko = "Korean";
lang_set.lv = "Latvian";
lang_set.lt = "Lithuanian";
lang_set.mk = "Macedonian";
lang_set.ms = "Malay";
lang_set.mt = "Maltese";
lang_set.no = "Norwegian";
lang_set.fa = "Persian";
lang_set.pl = "Polish";
lang_set.pt = "Portuguese";
lang_set.ro = "Romanian";
lang_set.ru = "Russian";
lang_set.sr = "Serbian";
lang_set.sk = "Slovak";
lang_set.sl = "Slovenian";
lang_set.es = "Spanish";
lang_set.sw = "Swahili";
lang_set.sv = "Swedish";
lang_set.tl = "Tagalog";
lang_set.th = "Thai";
lang_set.tr = "Turkish";
lang_set.uk = "Ukrainian";
lang_set.vi = "Vietnamese";
lang_set.cy = "Welsh";
lang_set.yi = "Yiddish";

function replaceHtml(el, html) {
    var oldEl = typeof el === "string" ? document.getElementById(el) : el;
    /*@cc_on // Pure innerHTML is slightly faster in IE
        oldEl.innerHTML = html;
        return oldEl;
    @*/
    var newEl = oldEl.cloneNode(false);
    newEl.innerHTML = html
    oldEl.parentNode.replaceChild(newEl, oldEl);
    /* Since we just removed the old element from the DOM, return a reference
    to the new element, which can be used to restore variable references. */
    return newEl;
}

function embed() {
    var msg = "<p><b>Copy and paste</b> this HTML code snippet to <b>embed Manypedia" +
              "</b> on your website.</p><p><textarea readonly='readonly'>" +
              "<iframe height=600 width=800 src='"+current_url+"'></iframe></textarea>";
    $.facebox(msg);
}

function help() {
    var states = window.location.hash.split("|");
    var msg = "";
    if ( $.browser.msie ) {
        msg += "<p style='font-size:20px;'><b>Warning! You're visiting Manypedia using the browser \"Internet explorer\". Manypedia is much faster and better if you use <a href=\"www.getfirefox.net/\">Mozilla Firefox</a> or <a href=\"http://www.google.com/chrome\">Google Chrome</a>. Please download <a href=\"www.getfirefox.net/\">Firefox</a> or <a href=\"http://www.google.com/chrome\">Chrome</a>, if Manypedia is slow (which is likely).</b></p>";
    }
    msg += "<p>Welcome to <b>Manypedia</b>! On <b>Manypedia</b>, you can compare the same page on <b>2 language Wikipedias</b>, both <b>translated</b> in your language!</p>"+
          "<p style='padding: 20px; text-align:center;'> <img src='img/manypedia_window_001.png' /></p>";
    if (states.length == 4) {
        msg += "For example, below you see page <b>"+states[2].replace(/_/g, " ")+"</b> from <i>"+lang_set[states[1]]+" <img src='img/flags/"+states[1]+".png' /> Wikipedia</i> (left) compared"+
                " with same page from <i>"+lang_set[states[3]]+"<img src='img/flags/"+states[3]+".png' /> Wikipedia</i> translated into "+lang_set[states[1]]+" (right).</p>";
        msg += "<p style='text-align:center;font-size:10px;'>[click out of this window to dismiss this message]</p>";
    }
    else {
        msg += "<p>You can search an article using this menu. Then you can compare it with the same article from another language Wikipedia!</p>";
    }
    $.facebox(msg);
}

function share_link(type) {
    if (type=="embed") {
        embed();
        return false;
    }

    var defaults = {
        version:    '2.0.1',
        login:      'sonetfbk',
        apiKey:     'R_5d1118463acdf1f012b6b78b7eccf9d7',
        history:    '0',
        longUrl:    current_url
    };

    // Build the URL to query
    var daurl = "http://api.bit.ly/shorten?"+
                "version="+defaults.version+
                "&longUrl="+escape(defaults.longUrl)+
                "&login="+defaults.login+
                "&apiKey="+defaults.apiKey+
                "&history="+defaults.history+
                "&format=json&callback=?";

    // Utilize the bit.ly API
    $.getJSON(daurl, function(data){
        var url = data.results[defaults.longUrl].shortUrl;
        var host =  window.location.hostname;
        var title = $('title').text();
        title = escape(title); //clean up unusual characters
        var share = {};
        share.twit = 'http://twitter.com/home?status='+title+'%20'+url+'%20%23manypedia';
        share.facebook = 'http://www.facebook.com/sharer.php?u='+url+'&t='+title;
        share.digg = 'http://digg.com/submit?phase=2&url='+url+'&amp;title='+title;
        share.stumbleupon = 'http://stumbleupon.com/submit?url='+url+'&amp;title='+title;
        share.buzz = 'http://www.google.com/reader/link?url='+url+'&amp;title='+title+'&amp;srcURL='+host;
        share.delicious = 'http://del.icio.us/post?url='+url+'&amp;title='+title;
        window.location.href = share[type];
    });
}


function string2title(s) {
    s = s.replace(/^\w/g, function($0) { return $0.toUpperCase(); });
    s = s.replace(/\s+/g, "_");
    s = s.replace("%20", " ");
    return s;
}

function stop_requests(page1, page2, trans) {
    if (ajax_requests1 && page1) {
        $.each(ajax_requests1, function (k, v) {
            v.abort();
        });
    }
    if (ajax_requests2 && page2) {
        $.each(ajax_requests2, function (k, v) {
            v.abort();
        });
    }
    if (translate_requests && trans) {
        $.each(translate_requests, function (k, v) {
            v.stop();
            v.stopped = true;
        });
    }
    ajax_requests1 = [];
    ajax_requests2 = [];
    translate_requests = [];
}

function clear_page2() {
    $("#page2_title").html("");
    $("#tag_cloud2").text("");
    $("#tag_cloud2").css("background-color", "#FFFFFF");
    $("#stats2").text("");
    $("#img2").html("");
    document.title = "Manypedia";
    $("#source2").html("");
    stop_requests(false, true, true);
}

function clear_page() {
    $("#page1").html("");
    $("#page2").html("");
    $("#stats1").text("");
    $("#lang_select").html("");
    $("#page1_title").html("");
    $("#img1").html("");
    $("#tag_cloud1").text("");
    $("#source1").html("");
    $("#lang_select").html("<option value=''>Choose language for translation...</option>");
    stop_requests(true, false, false);
    current_trans = "";
    clear_page2();
}

function main_lang() {
    return $("#main_select").val();
}

function attachWikiAutoComplete(expression) {
    $(expression).unautocomplete();
    $(expression).autocomplete("http://"+main_lang()+".wikipedia.org/w/api.php",  {
      dataType: "jsonp",
      parse: function(data) {
        var rows = [];
        var matches = data[1];
        for( var i = 0; i < matches.length; i++){
          rows[i] = { data:matches[i], value:matches[i], result:matches[i] };
        }
        return rows;
      },
      formatItem: function(row) { return row; },
      extraParams: {
        action: "opensearch",
        format: "json",
        search: function () { return $(expression).val(); } },
      max: 10
    });
    $(expression).bind("change", function(event, ui) {
    });
    $(expression).result(function() { $("#go").click(); });
}

function correct_links_page1(internal) {
    var current_lang = "";
    var states = window.location.hash.split("|");
    if (states.length === 4) {
        if (states[states.length-1] !== "") {
            current_lang = "|" + states[states.length-1];
        }
    }
    $("#page1 a").each(function() {
        var current = $(this);
        if (internal) {
            var b = current.attr("href").split("|");
            if (b[0][0] === "#") {
                var new_link = b[0]+"|"+states.slice(1).join("|");
                current.attr("href", encodeURI(new_link));
                b[0] = b[0].replace(/\./g, "\\.");
                if ($(b[0])) {
                    $(b[0]).attr("id", new_link.slice(1));
                }
            }
        }
        var l = current.attr("href");
        var res = l.split("|");
        if ((res.length === 1) && (l.search(/wikipedia.org\/wiki\//) !== -1)) {
            current.attr("href", "#|"+main_lang()+"|" + l.split("/wiki/").pop().split("#")[0] + current_lang);
        }
        else if (res.length >= 3) {
            if (res[0].length > 1 && !internal) {
                var a = document.getElementById(l.slice(1));
                if (a) {
                    var newid = res[0].substr(1, res[0].length)+"|"+res[1]+"|"+res[2]+current_lang;
                    a.id = newid;
                }
            }
            current.attr("href", res[0] + "|" + res[1] + "|" + res[2] + current_lang);
        }
    });
}

function live_link_correct() {
    var current = $(this);
    var current_lang = window.location.hash.split("|")[3];
    if (!(current.is("a"))) {
        return false;
    }
    var old_name = current.attr("href").slice(1).split("|")[0];
    var new_name = "";
    $.getJSON('http://' + current_lang + '.wikipedia.org/w/api.php?format=json&action=query&prop=langlinks&lllimit=500&titles=' + old_name + '&redirects=&callback=?',
    function(data) {
        $.each(data.query.pages, function(i, page) {
            $.each(page.langlinks, function(k, lang) {
                if (lang.lang === main_lang()) {
                    new_name = lang["*"];
                    return false;
                }
            });
        });
        if (new_name) {
            $.History.go("|"+main_lang()+"|" + new_name.replace(/\s/g, "_") + "|" + current_lang);
        }
        else {
            $.facebox("<h3>We're sorry...</h3><p>The page you requested is not available in "+lang_set[window.location.hash.split("|")[1]]+"!</p>");
        }
    });
}

function correct_links_page2() {
    var states = window.location.hash.split("|");
    $("#page2 a").each(function() {
        var current = $(this);
        var l = current.attr("href");
        if (l.search(/wikipedia.org\/wiki\//) !== -1) {
            current.attr("href", "#"+l.split("/wiki/").pop().split("#")[0]+"|"+states.slice(1).join("|"));
            current.click(live_link_correct);
        }
        else {
            l = $(this).attr("href").split("|");
            if (l.length !== 0 && l[0][0] === "#") {
                var new_link = l[0]+"|"+states.slice(1).join("|");
                current.attr("href", new_link);
                l[0] = l[0].replace(/\./g, "\\.");
                if ($(l[0])) {
                    $(l[0]).attr("id", new_link.substr(1, new_link.length));
                }
            }
        }
    });
}

function fix_internal_links(expression) {
    var states = window.location.hash.split("|");
    $(expression+" a").each(function() {
        var l = $(this).attr("href").split("|");
        var current = $(this);
        if (l[0][0] === "#") {
            var new_link = l[0]+"|"+states.slice(1).join("|");
            current.attr("href", new_link);
            l[0] = l[0].replace(/\./g, "\\.");
            if ($(l[0])) {
                $(l[0]).attr("id", new_link.substr(1, new_link.length));
            }
        }
    });
}

function add_images(from_div, to_div) {
    var imgs = [];
    $(from_div+" img").each(function() {
        var current = $(this);
        if (current.height() > 70) {
            var a = "<img src='"+current.attr("src")+"' style='height:50px;' rel='"+current.attr("src")+"' class=toptips />";
            imgs.push(a);
        }
    });
    $(to_div).html(imgs.join(""));
    toptips();
}

function get_about() {
    $.ajax({
        url: "about.html",
        success: function(data) {
            $('#facebox').css({ left: ($(window).width() - 800) / 2 });
            $("#facebox .content").html("<div class='user_data'>"+data+"</div>");
            $("#facebox .content").translateTextNodes("en", main_lang(), {
                complete: function() {
                    $("#about_toc").tableOfContents(
                        $("#about_content"),      // Scoped to div#wrapper
                        {
                            startLevel: 2,    // H2 and up
                            depth:      3    // H2 through H4,
                            //topLinks:   true, // Add "Top" Links to Each Header
                            //topBodyId: "what-is-manypedia-about"
                        }
                    );
                }
            });
        }
    });

}

function get_user_stats(user, lang_id) {
    //$("#facebox .content").html("<div class='user_data'>"+ajax_load+"</div>");
    var url = escape("http://toolserver.org/~soxred93/pcount/index.php?wiki=wikipedia&lang="+lang_id+"&name="+encodeURI(user)+"&uselang="+main_lang());
    $.ajax({
        url: loadUrl + "?url=" + url,
        success: function(data) {
            $('#facebox').css({ left: ($(window).width() - 800) / 2 });
            $("#facebox .content").html("<div class='user_data'>"+$("#content", data).html()+"</div>");
        }
    });
}

function get_stats(lang_id, page_name, expression) {
    var url = "http://toolserver.org/~sonet/api.php?lang="+lang_id+"&wiki=wikipedia&article="+encodeURI(page_name)+"&editors&max_editors=5&callback=?";
    $.getJSON(url, function(data) {
        var first = new Date(data.first_edit.timestamp*1000);
        var last = new Date(data.last_edit*1000);
        var res = "<hr/>Total revisions: <b>"+data.count+"</b> - <i>Created on "+
                  first.getDay()+"/"+first.getMonth()+"/"+first.getFullYear()+" by "+"<a href='#loading' onclick='get_user_stats(\""+encodeURI(data.first_edit.user)+"\",\""+lang_id+"\");' rel='facebox'>"+data.first_edit.user+"</a>"+
                  "</i> - <i>Last edit: "+
                  last.getDay()+"/"+last.getMonth()+"/"+last.getFullYear()+"</i><br />"+
                  "Number of editors: <b>"+data.editor_count+
                  "</b> - Top 5 editors: ";
        $.each(data.editors, function(i, ed) {
            res += "<a href='#loading' onclick='get_user_stats(\""+encodeURI(i)+"\",\""+lang_id+"\");' rel='facebox'>"+i+"</a>"+
                   " ("+ed.all+")  ";
        });
        res += "<hr/>";
        $(expression).html(res);
        $('a[rel*=facebox]').facebox();
    });
}

function process_search(search_request) {
    clear_page();
    current_url = window.location.href;
    $("#search").val(search_request.replace(/_/g, " "));
    search_request = string2title(search_request);
    var url = escape("http://"+main_lang()+".wikipedia.org/w/index.php?title=" + encodeURI(search_request) + "&action=render");
    document.title = 'Manypedia - "'+search_request.replace(/_/g, " ")+'" from the '+lang_set[main_lang()]+" Wikipedia";
    $("#page1_title").html('<span style="font-size:150%;">"'+search_request.replace(/_/g, " ")+'"</span> from the <span style="font-size:150%;">'+lang_set[main_lang()]+"</span> <img src='img/flags/"+main_lang()+".png' /> Wikipedia");
    $("#page1").html(ajax_load);
    var req = $.ajax({
        type: "GET",
        url: loadUrl + "?url=" + url,
        success: function(data) {
            var content = $("#page1")[0];
            content = replaceHtml(content, data);
            //fix_internal_links("#page1");
            if (!$.browser.msie ) {
                correct_links_page1(true);
                $.dynaCloud.stopwords = originalStopwords.slice(0);
                $.merge($.dynaCloud.stopwords, search_request.split("_"));
                $.dynaCloud.stopwords = new RegExp("\\s((" + jQuery.dynaCloud.stopwords.join("|") + ")\\s)+", "gi");
                $('#page1').dynaCloud('#tag_cloud1');
                add_images("#page1", "#img1");
            }
            $("#source1").html('<p>Source: <a target="_blank" href="http://'+main_lang()+'.wikipedia.org/wiki/'+search_request+'">"'+search_request.replace(/_/g, " ")+'" from the '+lang_set[main_lang()]+' Wikipedia  - http://'+main_lang()+'.wikipedia.org/wiki/'+search_request+' (open in new window)</a> released under Creative Commons Attribution-ShareAlike License.</p>');
        }
    });
    ajax_requests1.push(req);

    // get langs
    $.getJSON('http://'+main_lang()+'.wikipedia.org/w/api.php?format=json&action=query&prop=langlinks&lllimit=500&titles=' + search_request + '&redirects=&callback=?',
    function(data) {
        $.each(data.query.pages, function(i,page) {
            $.each(page.langlinks, function(k, lang) {
                var lang_name = lang_set[lang.lang];
                if (lang_name) {
                    $("<option/>", {value: lang.lang + "|" + lang["*"], text: lang_name + " Wikipedia"}).appendTo("#lang_select");
                }
            });
        });
    });
    get_stats(main_lang(), search_request, "#stats1");

}

function process_translation(lang_id, page_name) {
    var states = window.location.hash.split("|");
    correct_links_page1(false);
    clear_page2();
    current_url = window.location.href;
    document.title = 'Manypedia - Comparing page "'+states[2].replace(/_/g, " ")+'" from the '+lang_set[main_lang()]+" and the "+lang_set[lang_id]+" Wikipedia";
    $("#page2_title").html('<span style="font-size:150%;">"'+page_name+'"</span>'+" from the <span style='font-size:150%;'>"+lang_set[lang_id]+"</span> <img src='img/flags/"+lang_id+".png' /> Wikipedia (translated into "+lang_set[main_lang()]+")");

    var url = escape("http://" + lang_id + ".wikipedia.org/w/index.php?title=" + encodeURI(page_name) + "&action=render");

    $("#page2").html(ajax_load);
    var req = $.ajax({
        type: "GET",
        url: loadUrl + "?url=" + url,
        success: function(data) {
            setTimeout(function() {
            var content = $("#page2")[0];
            content = replaceHtml(content, data);
            $("#tag_cloud2").html("<p style='font-size:20px;'>Translation from "+lang_set[lang_id]+" to "+lang_set[main_lang()]+" in progress...</p>");
            /*fix_internal_links("#page2");*/
            if (!$.browser.msie ) {
                add_images("#page2", "#img2");
                correct_links_page2();
            }
            lang_id = ('he' == lang_id) ? 'iw' : lang_id;
            var lang_main = main_lang();
            lang_main = ('he' == lang_main) ? 'iw' : lang_main;
            $("#source2").html('<p>Source: <a target="_blank" href="http://'+lang_id+'.wikipedia.org/wiki/'+page_name+'">"'+page_name.replace(/_/g, " ")+'" from the '+lang_set[lang_id]+' Wikipedia  - http://'+lang_id+'.wikipedia.org/wiki/'+page_name+' (open in new window)</a> released under Creative Commons Attribution-ShareAlike License.</p>'); 
            var tran_req = $("#page2").translateTextNodes(lang_id, lang_main, {
                complete: function() {
                    $("#tag_cloud2").text("Translation complete!");
                    if (!$.browser.msie ) {
                        $('#page2').dynaCloud('#tag_cloud2');
                    }
                },
                error: function() {
                    $("#tag_cloud2").text("There seems to be problems translating the page :(");
                    //$("#tag_cloud2").animate({backgroundColor: "#EFB3B5"}, 1000);
                    $("#tag_cloud2").css("background-color", "#EFB3B5");
                }
            });
            translate_requests.push(tran_req);
            }, 3000);
        }
    });
    ajax_requests2.push(req);
    get_stats(lang_id, page_name, "#stats2");
    $("#lang_select").val(lang_id+"|"+page_name);
}


$(document).ready(function () {
    $('a[rel*=facebox]').facebox();

    attachWikiAutoComplete("#search");

    $('#search').clickOnEnter("#go");

    if ($.browser.msie) {
        $("#warnIE").show(0);
    }

    // History support
    $.History.bind(function(state){
        var states = state.split("|");
        var changed_main = false;

        if (states.length>=2) {
            $("#main_select").val(states[1]);
        }
        if (states.length >= 3) {
            if (string2title(states[2]) !== string2title(current_page) || main_lang() !== current_main || $('#lang_select option').size() <= 1) {
                process_search(states[2]);
                current_page = states[2];
                current_main = states[1];
                changed_main = true;
            }
        }
        if ((states.length === 4) && ((current_trans != states[3]) || changed_main)) {
            current_trans = states[3];
            // get langs
            $.getJSON('http://'+main_lang()+'.wikipedia.org/w/api.php?format=json&action=query&prop=langlinks&lllimit=500&titles=' + encodeURI(string2title(states[2])) + '&redirects=&callback=?',
            function(data) {
                var done = false;
                $.each(data.query.pages, function(i,page) {
                    $.each(page.langlinks, function(k, lang) {
                        if (lang.lang == states[3]) {
                            process_translation(lang.lang, lang["*"]);
                            done = true;
                            return false;
                        }
                    });
                    if (done === false) {
                        $("#page2").html("Sorry! This page is not available in the requested language.");
                    }
                    else if (states[1] && states[2] && states[3]){
                        // log
                        $.ajax({
                            type: "GET",
                            url: "log.php",
                            data: {p: states[2].replace(/\s/g, "_"),
                                   fl: states[3],
                                   tl: states[1]}
                        });
                    }
                });
            });
            if ($.cookie("visited") !== "true") {
                $.cookie("visited", "true", {expires: 60*60*24});
                help();
            }
        }
    });

    if (!window.location.hash) {
        if (!$.browser.msie) {
            $.ajax({
                type: "GET",
                url: "get_featured.php",
                success: function(data) {
                    $.History.go(data);
                }
            });
        }
        else {
            $.History.go("|en|User:Phauly/Land_Manypedia|it");
        }
    }

    $("#go").click(function() {
        $.History.go("|"+main_lang()+"|" + $("#search").val().replace(/\s/g, "_"));
    });

    $('#main_select').change(function() {
        $('#lang_select').val("");
        $('#lang_select').html("<option value=''>Choose language for translation...</option>");
        attachWikiAutoComplete("#search");
        if ($("#search").val()) {
            $("#go").click();
        }
    });

    $('#lang_select').change(function() {
        var lang_id = $("#lang_select").val().split("|")[0];
        var states = window.location.hash.split("|");
        if (lang_id !== "") {
            $.History.go("|"+main_lang()+"|" + states[2].replace(/\s/g, "_") + "|" + lang_id);
        }
    });

    var tbar = '<div id="socializethis"><span>Share<br /><a href="#min" id="minimize" title="Minimize"> <img src="img/minimize.png" /> </a></span><div id="sicons">';
    tbar += '<a href="javascript:void(0)" onclick="share_link(\'twit\');" id="twit" title="Share on twitter"><img src="img/twitter.png"  alt="Share on Twitter" width="32" height="32" /></a>';
    tbar += '<a href="javascript:void(0)" onclick="share_link(\'facebook\');" id="facebook" title="Share on Facebook"><img src="img/facebook.png"  alt="Share on facebook" width="32" height="32" /></a>';
    tbar += '<a href="javascript:void(0)" onclick="share_link(\'digg\');" id="digg" title="Share on Digg"><img src="img/digg.png"  alt="Share on Digg" width="32" height="32" /></a>';
    tbar += '<a href="javascript:void(0)" onclick="share_link(\'stumbleupon\');" id="stumbleupon" title="Share on Stumbleupon"><img src="img/stumbleupon.png"  alt="Share on Stumbleupon" width="32" height="32" /></a>';
    tbar += '<a href="javascript:void(0)" onclick="share_link(\'delicious\')" id="delicious" title="Share on Del.icio.us"><img src="img/delicious.png"  alt="Share on Delicious" width="32" height="32" /></a>';
    tbar += '<a href="javascript:void(0)" onclick="share_link(\'buzz\')" id="buzz" title="Share on Buzz"><img src="img/google-buzz.png"  alt="Share on Buzz" width="32" height="32" /></a>';
    tbar += '<a href="javascript:void(0)" onclick="share_link(\'embed\')" id="embed" title="Embed this query!"><img src="img/embed.png"  alt="Emded this query" width="32" height="32" /></a>';
    tbar += '</div></div>';

    // Add the share tool bar.
    $('body').append(tbar);
    $('#socializethis').css({opacity: .7});
    // hover.
    $('#socializethis').bind('mouseenter',function(){
      $(this).animate({height:'35px', width:'300px', opacity: 1}, 300);
      $('#socializethis img').css('display', 'inline');
    });
    //leave
    $('#socializethis').bind('mouseleave',function(){
      $(this).animate({ opacity: .7}, 300);
    });
    // Click minimize
    $('#socializethis #minimize').click( function() {
      minshare();
    });

    function minshare(){
      $('#socializethis').animate({height:'15px', width: '40px', opacity: .7}, 300);
      $('#socializethis img').css('display', 'none');
      return false;
    }

    var timeout = null;
    var initialMargin = 0;
    if ( $.browser.msie ) {
        initialMargin = -100;
    }
    else {
        initialMargin = parseInt($("#magnifier").height()) - parseInt($("#header").height()) + 20; //parseInt($("#header").css("margin-top"));
    }
    $("#header").hover(
        function() {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            $(this).animate({ marginTop: 0 }, 'fast');
        },
        function() {
            if ($(".ac_results").length === 0 || $(".ac_results").css("display") == "none") {
                var menubar = $(this);
                timeout = setTimeout(function() {
                    timeout = null;
                    menubar.animate({ marginTop: initialMargin }, 'slow');
                }, 1000);
            }
        }
    );
});
