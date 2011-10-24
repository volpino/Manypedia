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
var translation_disabled = false;
var lang_id2;
var page_name2;
var comparison_data;

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
    $("#page2_title").empty();
    $("#tag_cloud2").empty();
    $("#tag_cloud2").css("background-color", "#FFFFFF");
    $("#stats2").empty();
    $("#img2").empty();
    document.title = "Manypedia";
    $("#source2").empty();
    $("#comparison_index").empty();
    comparison_data = undefined;
    stop_requests(false, true, true);
}

function clear_page() {
    $("#page1").empty();
    $("#page2").empty();
    $("#stats1").empty();
    $("#lang_select").empty();
    $("#page1_title").empty();
    $("#img1").empty();
    $("#tag_cloud1").empty();
    $("#source1").empty();
    $("#lang_select").html("<option value=''>Choose language Wikipedia to be compared</option>");
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
                  first.getDay()+"/"+(first.getMonth()+1)+"/"+first.getFullYear()+" by "+"<a href='#loading' onclick='get_user_stats(\""+encodeURI(data.first_edit.user)+"\",\""+lang_id+"\");' rel='facebox'>"+data.first_edit.user+"</a>"+
                  "</i> - <i>Last edit: "+
                  last.getDay()+"/"+(last.getMonth()+1)+"/"+last.getFullYear()+"</i> - "+
                  "<a href='http://sonetlab.fbk.eu/wikitrip/#|"+lang_id+"|"+page_name+"' target='_blank'>See gender and world location of editors</a><br />"+
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

function enable_translation() {
    translation_disabled = false;
    process_translation(lang_id2, page_name2);
}

function disable_translation() {
    translation_disabled = true;
    process_translation(lang_id2, page_name2);
}

function show_comparison_data() {
    if (!comparison_data) {
        return;
    }
    var states = window.location.hash.split("|");
    var a1 = comparison_data.a1.replace(/_/g, " ");
    var a2 = comparison_data.a2.replace(/_/g, " ");
    var l1 = lang_set[comparison_data.l1];
    var l2 = lang_set[comparison_data.l2];
    var r = (isNaN(comparison_data.result) ?
             comparison_data.result : Math.round(comparison_data.result*100)+"%");
    var links1 = comparison_data.matching.length + comparison_data.nonmatching1.length;
    var links2 = comparison_data.matching.length + comparison_data.nonmatching2.length;
    var d = comparison_data.matching;
    var msg = "<div class='user_data'><p id='comparison_top' style='text-align:center;font-weight:bold;'>The concepts similarity between</p>" +
              '<table style="width:100%;text-align:center;"><tr><td style="width:45%;font-size:1.2em;"><b>"'+a1+
              '"</b></td><td> and </td><td style="width:45%;font-size:1.2em;"><b>"'+a2+
              '"</b></td></tr><tr><td>from the '+l1+' Wikipedia</td><td></td><td>from the '+l2+' Wikipedia</td></tr></table>'+
              '<p style="text-align:center;font-weight:bold;font-size:1.4em">is '+r+'<br/><br/></p>'+
              '<table style="width:100%"><tr><td style="width:45%;text-align:left;">Links to Wikipedia pages = '+links1+
              '</td><td style="width:45%;text-align:right;">Links to Wikipedia pages = '+links2+'</td></tr></table>'+
              '<p style="text-align:center;">Links to equivalent pages = '+
              d.length+'</p>'+
              '<p style="text-align:center;">Concept similarity = '+d.length+
              '/'+Math.min(links1, links2)+' = '+r+'</p>' +
              "<p style='text-align:center;'><br/><a href='#comparison_help'>How is this index calculated?</a></p>";
    msg += "<br/><br/><h2>Links to equivalent pages = "+d.length+"</h2><table style='width:100%;'>";
    for (i in d) {
        msg += "<tr><td style='width:40%'>"+d[i][0].replace(/_/g, " ") +
               "</td><td style='width:20%;text-align:center;'> = </td><td style='width:40%;'>"+
               d[i][1].replace(/_/g, " ")+"</td></tr>";
    }
    msg += "</table>";

    d = comparison_data.nonmatching1;
    msg += "<br/><hr/><br/><table style='width:100%;'><td style='width:50%;font-weight:bold;'>Links present only in \""+
           a1+"\" = "+d.length+"</td><td style='width:50%'></td>";
    for (i in d) {
        msg += "<tr><td style='width:50%'>"+d[i].replace(/_/g, " ")+
               "</td><td style='width:50%'></td></tr>";
    }
    msg += "</table>";

    d = comparison_data.nonmatching2;
    msg += "<br/><hr/><br/><table style='width:100%;'><td style='width:50%'></td><td style='width:50%;font-weight:bold;'>Links present only in \""+
           a2+"\" = "+d.length+"</td>";
    for (i in d) {
        msg += "<tr><td style='width:50%'></td><td style='width:50%'>"+
               d[i].replace(/_/g, " ")+"</td></tr>";
    }
    msg += "</table><br/><br/><br/><h2 id='comparison_help'>How is this index calculated? <a href='#comparison_top'>Top</a></h2>"+
           '<p>The "Concept similarity" is computed based on outlinks, or links in one Wikipedia article pointing to another article.'+
           'The percentage is basically related to "sub-concept diversity" ad introduced in a <a href="http://www.brenthecht.com/papers/bhecht_chi2010_towerofbabel.pdf">great paper</a> by Brent Hecht and Darren Gergle.'+
           'As Brent and Darren explain, if two articles on the same concept (e.g. "Sarah Palin") in two languages define the concept in a nearly identical fashion, they should link to articles on nearly all the same concepts (e.g. "John McCain", "Fox News", etc.). If,  on  the  other  hand,  there  is great  sub-concept diversity, these articles would link to very few articles about the same concepts.'+
           '<br />So, Manypedia'+
           '<ol>'+
           '<li>extracts at runtime the list of outlinks for the two compared pages,</li>'+
           '<li>removes links to Wikipedia pages whose first character is a number (this is an imperfect but computable-at-runtime heuristics for removing dates and time-related links, which, as pointed out by Brent and Darren, form a substantial percentage of outlinks on many pages but different Wikipedias exhibit very different policies about linking to these concepts),</li>'+
           '<li>gets the shortest list of links, since the number of matching links cannot be more than the minimum number of links on the two compared pages. Let\'s assume this is the page in the Italian Wikipedia and the page with more links is the one from English Wikipedia.</li>'+
           '<li>for each link of the shortest list of links (e.g. of the Italian Wikipedia page), asks the Wikipedia API what is the interwiki linked page in the other Wikipedia (English), if present. For example, the page "Roma" from Italian Wikipedia interwiki links to the page "Rome" from English Wikipedia. If the Italian page is a redirect (for example, "Città di Roma" is a redirect to "Roma"), interwiki links are requested about the redirect-to page.</li>'+
           '<li>for each link of the longer list of links (e.g. English Wikipedia page), if the page is a redirect, replaces the page with the redirect-to page. This "normalization" process is required since the two compared pages might refer to the same concept but linking to different redirect pages.</li>'+
           '<li>loops over the shortest list of links (e.g. of the Italian Wikipedia page), considering the title of the pages in the other language (e.g. English) and find matching links in the longer list of links (e.g. English). If in the shorter list of links, there was a link with no interwiki link associated, of course this will be a non-matching link and this is correct since it refers to a concept that is used in the description in one language but not used in the description in the other language.</li>'+
           '<li>lastly, the percentage is computed as number of matching links divided by number of links present in the shortest list multiplied by 100.</li>'+
           '</ol>The formula is the following one:'+
           '<img src="img/concepts_similarity_formula.png" alt="formula" />'+
           'You can read the great paper by Brent Hecht and Darren Gergle <a href="http://www.brenthecht.com/papers/bhecht_chi2010_towerofbabel.pdf">The Tower of Babel Meets Web 2.0: User-Generated Content and Its Applications in a Multilingual Context</a> for a better explanation of the idea behind the concept similarity computation, sub-concept diversity.'+
           'If you want to dig on the details of how the algorithm works, you can also <a href="https://github.com/volpino/Manypedia">read the code powering Manypedia</a>, which we have released as open source Free Software under the Affero GPL licence.</p>'+
           "</div>";
    $.facebox(msg);
}

function process_translation(lang_id, page_name) {
    var states = window.location.hash.split("|");
    correct_links_page1(false);
    clear_page2();
    $("#comparison_index").text("Computing concepts similarity... (may take a while)");
    current_url = window.location.href;
    document.title = 'Manypedia - Comparing page "'+states[2].replace(/_/g, " ")+'" from the '+lang_set[main_lang()]+" and the "+lang_set[lang_id]+" Wikipedia";
    var msg = '<span style="font-size:150%;">"'+page_name+'"</span>'+" from the <span style='font-size:150%;'>"+lang_set[lang_id]+"</span> <img src='img/flags/"+lang_id+".png' /> Wikipedia";
    if (translation_disabled) {
        msg += " (<a href='javascript:enable_translation()'>enable translation into "+lang_set[main_lang()]+"</a>)";
    }
    else {
        msg += " (translated into "+lang_set[main_lang()]+
               " <a href='javascript:disable_translation()'>disable translation</a>)";
    }
    $("#page2_title").html(msg);

    $.getJSON('http://toolserver.org/~sonet/api_comparison.php?l1='+main_lang()+'&a1='+encodeURI(string2title(states[2]))+'&l2='+lang_id+'&a2='+page_name+'&callback=?',
        function(data) {
            if (states[2].replace(/_/g, " ") === data.a1.replace(/_/g, " ") &&
                page_name2.replace(/_/g, " ") === data.a2.replace(/_/g, " ")) {
                $("#comparison_index").html(
                    "<a href='javascript:show_comparison_data()'>Concepts similarity: "+
                    (isNaN(data.result) ? data.result : Math.round(data.result*100)+"%")+
                    " (?)</a>"
                );
                $("#comparison_index").css({opacity:0});
                for (var i=0; i<2; i++) {
                    $("#comparison_index").animate({opacity:1}, 800);
                    $("#comparison_index").animate({opacity:0.25}, 800);
                }
                $("#comparison_index").animate({opacity:1}, 800);
                comparison_data = data;
            }
        }
    );

    var url = escape("http://" + lang_id + ".wikipedia.org/w/index.php?title=" + encodeURI(page_name) + "&action=render");

    $("#page2").html(ajax_load);
    var req = $.ajax({
        type: "GET",
        url: loadUrl + "?url=" + url,
        success: function(data) {
            var content = $("#page2")[0];
            content = replaceHtml(content, data);
            /*fix_internal_links("#page2");*/
            if (!$.browser.msie ) {
                add_images("#page2", "#img2");
                correct_links_page2();
            }
            $("#source2").html('<p>Source: <a target="_blank" href="http://'+lang_id+'.wikipedia.org/wiki/'+page_name+'">"'+page_name.replace(/_/g, " ")+'" from the '+lang_set[lang_id]+' Wikipedia  - http://'+lang_id+'.wikipedia.org/wiki/'+page_name+' (open in new window)</a> released under Creative Commons Attribution-ShareAlike License.</p>');
            if (!translation_disabled) {
                $("#tag_cloud2").html("<p style='font-size:20px;'>Translation from "+lang_set[lang_id]+" to "+lang_set[main_lang()]+" in progress...</p>");
                lang_id = ('he' == lang_id) ? 'iw' : lang_id;
                var lang_main = main_lang();
                lang_main = ('he' == lang_main) ? 'iw' : lang_main;
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
            }
            else {
                if (!$.browser.msie ) {
                  $('#page2').dynaCloud('#tag_cloud2');
                }
            }
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
                if (!(states[3]) && current_trans) {
                  states[3] = current_trans;
                  $.History.go(states.join("|"));
                  return;
                }
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
                            lang_id2 = lang.lang;
                            page_name2 = lang["*"].split("#")[0];
                            process_translation(lang_id2, page_name2);
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
