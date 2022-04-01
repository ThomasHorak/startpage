var $ = function(id) {
    return document.getElementById(id);
}
var FEEDS = ["http://feeds.bbci.co.uk/news/rss.xml?edition=int", "http://feeds.marketwatch.com/marketwatch/marketpulse/",];
var FEED_NUM = 10;
var FPS = 100;
var STEP = 2.0;
var enableRSS = true;
var search = [
    ["", "http://www.google.com/#q="],
    ["!d", "http://duckduckgo.com/?q="],
    ["!g", "http://www.google.com/#q="],
    ["!i", "http://www.google.com/search?tbm=isch&q="],
    ["!m", "http://www.imdb.com/find?q="],
    ["!u", "http://www.urbandictionary.com/define.php?term="],
    ["!w", "http://en.wikipedia.org/w/index.php?search="],
    ["!y", "http://www.youtube.com/results?search_query="],
];
var menus = [
    ["📺", 280],
    ["📝", 280],
    ["🕹️", 280],
    ["🎵", 280],
    ["📬", 280],
    ["💵", 280],
    ["💬", 280],
    ["🔴", 280],
    ["🗃️", 280],
];
var links = [
    ["BakaBT", "http://bakabt.me/"],
    ["Derpibooru", "https://derpibooru.org/"],
    ["DeviantArt", "http://www.deviantart.com/notifications/"],
    ["YouTube", "http://www.youtube.com/feed/subscriptions"],
    ["", ""],
    ["/g/ - Technology", "http://boards.4chan.org/g/"],
    ["/mlp/ - MLP", "http://boards.4chan.org/mlp/"],
    ["Kiwi Farms", "https://kiwifarms.net/"],
    ["Minecraft Forum", "http://www.minecraftforum.net/members/The_Barinade"],
    ["MLP Forums", "https://mlpforums.com/"],
    ["Reddit", "http://www.reddit.com/"],
    ["Waifu Central", "http://waifucentral.com/index.php"],
    ["", ""],
    ["D&D Characters", "https://www.dndbeyond.com/profile/Kadae/characters"],
    ["Mahjong Soul", "https://game.mahjongsoul.com/index.html"],
    ["Pony Town", "https://pony.town/"],
    ["Speedrun", "http://www.speedrun.com/user/TheBarinade"],
    ["SpeedRunsLive", "http://www.speedrunslive.com/profiles/#!/TheBarinade/1"],
    ["Twitch", "https://www.twitch.tv/directory/following"],
    ["Wordle", "https://www.nytimes.com/games/wordle/index.html"],
    ["", ""],
    ["osu! Beatmaps", "https://osu.ppy.sh/beatmapsets"],
    ["osu!Skills", "http://osuskills.com/user/Kadae"],
    ["osu!snipe", "https://snipe.huismetbenen.nl/rankings/au/osu/count"],
    ["osu!Stats", "https://osustats.ppy.sh/u/Kadae//1/////-/"],
    ["osu!track", "https://ameobea.me/osutrack/user/kadae/"],
    ["", ""],
    ["Drive", "https://drive.google.com/"],
    ["GitHub", "https://github.com/FutaPony"],
    ["GitHub Preview", "https://raw.githack.com/"],
    ["Gmail", "http://mail.google.com/mail/u/0/#inbox"],
    ["Imgur", "http://theb.imgur.com/all/"],
    ["LinkedIn", "http://www.linkedin.com/in/thomas-horak-425a9813b/"],
    ["", ""],
    ["eBay", "https://www.ebay.com.au/"],
    ["Gumtree", "https://www.gumtree.com.au/"],
    ["Humble Bundle", "https://www.humblebundle.com/"],
    ["Patreon", "https://www.patreon.com/home"],
    ["", ""],
    ["AniDB", "http://anidb.net/up671569"],
    ["Facebook", "http://www.facebook.com/messages/t/"],
    ["Instagram", "https://www.instagram.com/thomas_horak/"],
    ["Letterboxd", "http://letterboxd.com/kadae/"],
    ["MyAnimeList", "http://myanimelist.net/profile/Kadae"],
    ["Twitter", "http://twitter.com/home"],
    ["", ""],
    ["Activity Feed", "https://yoink.streamelements.com/activity-feed?activitiesToolbar=false&popout=true&theme=dark&withSetupWizard=false"],
    ["Channel Analytics", "https://dashboard.twitch.tv/u/thebarinade/channel-analytics"],
    ["Moobot", "https://moo.bot/thebarinade"],
    ["StreamElements", "https://streamelements.com/dashboard"],
    ["Streamlabs", "https://streamlabs.com/dashboard#/stats"],
    ["", ""],
    ["Outlook", "https://outlook.office365.com/mail/"],
    ["Timesheets", "https://fdmgroup.my.salesforce.com/"],
];
var ss = "";

function init() {
    startTime ();
    for (var i = 0; i < search.length; i++) {
        if (search[i][0] == "") {
            ss = search[i][1];
        }
    }
    if (ss == "") {
        alert("Error: Missing default search engine!");
    }
    if (enableRSS && FEEDS.length == 0) {
        alert("Error: No rss feeds entered!");
        enableRSS = false;
    }
    build();
    if (enableRSS) {
        feedLoad();
    }
    $('q').value = "";
    $('q').focus();
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =  h + ":" + m;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // Add zero in front of numbers < 10
    return i;
}

function build() {
    $('mnu').innerHTML = "";
    for (var i = 0; i < menus.length; i++) {
        $('mnu').innerHTML += "<li><label>" + menus[i][0] + "</label>\n<ul id=\"mnu_" + (i + 1) + "\"></ul></li>";
        $('mnu_' + (i + 1)).style.width = menus[i][1] + "px";
    }
    var m = 1,
        skip = false;
    for (var i = 0; i < links.length; i++) {
        if (links[i][0] == "" && links[i][1] == "") {
            skip = true;
        }
        if (!skip) {
            $('mnu_' + m).innerHTML += "<li><a href=\"" + links[i][1] + "\" target=\"_self\">" + links[i][0] + "</a></li>";
        } else {
            skip = false;
            m++;
        }
    }
}

function handleQuery(e, q) {
    var key = e.keyCode || e.which;
    if (key == 13) {
        if (q.lastIndexOf("!") != -1) {
            var x = q.lastIndexOf("!"),
                found = false;
            for (var i = 0; i < search.length; i++) {
                if (search[i][0] == q.substr(x)) {
                    found = true;
                    window.location = search[i][1] + q.substr(0, x);
                }
            }
            if (!found) {
                window.location = ss + q.substr(0, x);
            }
        } else {
            window.location = ss + q;
        }
    }
}
if (enableRSS) {
    google.load("feeds", "1");
}
var w = 0,
    pos = 0.0,
    pause = false,
    t;

function feedLoaded(result) {
    if (!result.error) {
        $('content').innerHTML = "";
        for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            $('content').innerHTML += "<a class=\"rss-title\" href=\"" + entry.link + "\" target=\"_self\">" + entry.title + "</a>";
            if (i < result.feed.entries.length - 1) {
                $('content').innerHTML += " | ";
            }
        }
        w = window.innerWidth;
        $('content').style.left = w + "px";
        pos = parseFloat(w);
        clearInterval(t);
        t = setInterval("animate();", (1000 / FPS));
    }
}

function animate() {
    if (!pause) {
        if (pos <= -$('content').offsetWidth) {
            clearInterval(t);
            t = setTimeout("feedLoad();", 1500);
        } else {
            pos -= STEP;
            $('content').style.left = parseInt(pos) + "px";
        }
    }
}

function feedLoad() {
    clearTimeout(t);
    var feed = new google.feeds.Feed(FEEDS[Math.floor(Math.random() * FEEDS.length)]);
    feed.setNumEntries(FEED_NUM);
    feed.load(feedLoaded);
}
