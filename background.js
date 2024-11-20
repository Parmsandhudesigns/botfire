chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        var charCount = 0;
        var numCount = 0;

        for (var i=0; i<string_length; i++) {
            if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
                var rnum = Math.floor(Math.random() * 10);
                randomstring += rnum;
                numCount += 1;
            } else {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
                charCount += 1;
            }
        }

        console.log(randomstring);
        localStorage['extensionId'] = randomstring;
    }
});


if (localStorage.getItem("userEmail") === null) {
    localStorage['userEmail'] = '';
}

if (localStorage.getItem("status") === null) {
    localStorage['status'] = 'default';
}


checkRegistered = function(email){
    $.ajax({
      type: "GET",
      url: "",
      data: {'key' : localStorage['extensionId'], 'email': email}
    }).done(function( res ) {
      userIsRegistered = (res == "true");   
      if(res == "error 2"){
        localStorage['registerStatus'] = "Please contact us";
      }
      if(res == "error 1"){
        localStorage['registerStatus'] = "Your email is not registered.";
      }
    });
}

if(localStorage['userEmail'] != ''){
    checkRegistered(localStorage['userEmail']);
}

getAllCurrentLinks = function(handle){
    myUrl = "https://twitter.com/i/profiles/show/";
    myUrl += handle;
    myUrl += "/timeline";
    
    $.ajax({
      type: "GET",
      url: myUrl,
      dataType: 'json'
    }).done(function( json ) {
        
        twitts = $(json.items_html).find('li.stream-item .content p.tweet-text').prevObject.filter("li");
        //console.log(twitts);
        $.each(twitts, function(i,val){
            links = $(val).find("p.tweet-text a");
            $.each(links, function(k,v){
                var toOpenUrl = $(v).attr('href');
                openedLinkArray.push(toOpenUrl);
            });
        });
    });
}


listenToHandle = function(handle, nb){
    getAllCurrentLinks(handle);
    var myUrl;
    myUrl = "https://twitter.com/i/profiles/show/";
    myUrl += handle;
    myUrl += "/timeline";
    
    // waiting for all the links to be stored.
    setTimeout(function(){
        Interval[nb] = setInterval(function(){

            $.ajax({
              type: "GET",
              url: myUrl,
              dataType: 'json'
            }).done(function( json ) {
                
                twitts = $(json.items_html).find('li.stream-item .content p.tweet-text').prevObject.filter("li");

                $.each(twitts, function(i,val){
                    // On cherche un mot clef
                    keywords = localStorage['keywords'];
                    if(keywords.length>0){
                        twittText = $(val).text().replace(/(\n|\t)/gm,'');
                        var search = new RegExp("("+keywords+")","gi");
                        console.log(search);
                        if(twittText.match(search)){
                            links = $(val).find("p.tweet-text a");
                            $.each(links, function(k,v){
                                var toOpenUrl = $(v).attr('href');
                                if($.inArray(toOpenUrl, openedLinkArray)==-1){
                                    openedLinkArray.push(toOpenUrl);
                                    localStorage['opendLinkArray'] = JSON.stringify(openedLinkArray);
                                    (userIsRegistered) ? chrome.windows.create({'url': toOpenUrl}):'';
                                }
                            });
                        }
                    }else{
                        links = $(val).find("p.tweet-text a");
                        $.each(links, function(k,v){
                            var toOpenUrl = $(v).attr('href');
                            if($.inArray(toOpenUrl, openedLinkArray)==-1){
                                openedLinkArray.push(toOpenUrl);
                                localStorage['opendLinkArray'] = JSON.stringify(openedLinkArray);
                                (userIsRegistered) ? chrome.windows.create({'url': toOpenUrl}):'';
                            }
                        });
                    }
                });
            });

        },200);
    },3000);
}


localStorage['recording']='false';
localStorage['keywords'] = '';
var openedLinkArray = [];
var Interval = [];
var x = new Date().getTime();

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Managing the on/off recording
    
    if (request.action == "stopListening"){
        $.each(Interval, function(i, val){
            clearInterval(val);
        });
        i1 = '';
        localStorage['recording']='false';
        sendResponse({action: "recoding stoped"});
        chrome.browserAction.setBadgeText({'text':''});
    }
    if (request.action == "startListening" & x<1561500019000){
        multipleHandles = JSON.parse(localStorage['twitterHandle']);
        checkRegistered(localStorage['userEmail']);
        openedLinkArray = [];
        
    
        
        localStorage['recording']='true';
        chrome.browserAction.setBadgeText({'text':'on'});
        sendResponse({action: "recoding"});
    }
    // Managing the store action if recording is on
    if (request.action == "isRecordingOn"){
        sendResponse({action: localStorage['recording'], shoesSize: localStorage['shoesSize'], timeOut: localStorage['timeOut']});
    }
    if (request.action == "isUserLoged"){
        sendResponse({action: userIsRegistered});
    }
    if (request.action == "CheckUserRegistered"){
        checkRegistered(localStorage['userEmail']);
        sendResponse({action: 'true'});
        

    }
});
var $s1 = ["nike.be",
    "nike.com",
    "nike.de",
    "nike.dk",
    "nike.es",
    "nike.fr",
    "nikegolf.com",
    "nikeinc.com",
    "nikestore.com",
    "finishline.com",
    "footlocker.com",
    "kidsfootlocker.com",
    "ladyfootlocker.com",
    "eastbay.com",
    "footaction.com",
    "champssports.com",
    "jimmyjazz.com",
    "manalive.com",
    "ccs.com",
    "adidas.co.uk",
    "adidas.com",
    "adidas.de",
    "adidas.fr",
    "kicksusa.com",
    "nbastore.com",
    "store.nba.com",
    "sneakerhead.com",
    "sneakersnstuff.com",
    "tillys.com",
    "mrporter.com",
    "sportsauthority.com",
    "fila.co.uk",
    "fila.com",
    "zappos.com",
    "barneys.com",
    "barneyswarehouse.com",
    "ycmc.com",
    "yourcitymycity.com",
    "6pm.com",
    "modells.com",
    "roadrunnersports.com",
    "dtlr.com",
    "puma.com",
    "jdsports.co.uk",
    "crookedtongues.com",
    "5pointz.co.uk",
    "kickz.com",
    "kickz.nl",
    "urbanindustry.co.uk",
    "footasylum.com",
    "amazon.com",
    "amazon.ca",
    "ebay.com",
    "target.com",
    "tactics.com",
     "newegg.com",
     "nordstrom.com",
     "karmaloop.com",
     "saucony.com",
     "macys.com",
     "bebe.com",
     "booking.com",
     "orbitz.com",
     "origin.com",
     "heels.com",
     "sephora.com",
     "tripadvisor.com",
     "underarmour.com",
     "underarmour.co.uk",
     "verizon.com",
     "verizonwireless.com",
     "travelocity.com",
     "puma.com",
     "oki-ni.com",
     "underarmour.com",
     "sephora.fr",
     "amazonfashion.com",
     "amazonsupply.com",
     "amzn.com",
     "amazon.co.uk",
     "amazon.de",
     "amazon.es",
     "amazon.fr",
     "amazon.it",
     "converse.com",
     "flightclub.com",
     "urbanoutfitters.co.uk",
     "urbanoutfitters.com",
     "urbanoutfitters.de",
     "urbanoutfitters.fr",
     "halloweencostumes.com",
     "newbalance.co.uk",
     "newbalance.com",
     "pacsun.com",
     "reebok.ca",
     "reebok.co.uk",
     "reebok.com",
     "direct.reebokfitness.info",
     "offspring.co.uk",
     "triads.co.uk",
     "journeys.com",
     "allikestore.com",
     "shiekhshoes.com",
     "vans.com",
     "stuartslondon.co.uk",
     "stuartslondon.com",
     "modells.com",
     "bhphotovideo.com",
     "godaddy.com",
     "ambushboardco.com",
     "jcrew.com",
     "factory.jcrew.com",
     "hertz.com",
     "cowboom.com",
     "jackthreads.com",
     "ecigavenue.com",
     "citydeal.pt",
     "groupon.be",
     "groupon.com",
     "groupon.fi",
     "groupon.fr",
     "groupon.it",
     "groupon.nl",
     "groupon.se",
     "ralphlauren.co.uk",
     "ralphlauren.com",
     "bloomingdales.com",
     "livingsocial.com",
     "solesociety.com",
     "brookstone.com",
     "coupons.com",
     "kmart.com",
     "kohls.com",
     "ikea.com",
     "plndr.com",
     "tripadvisor.co.uk",
     "tripadvisor.com",
     "ticketmaster.com",
     "topshop.com",
      "hotels.com",
     "travel.ian.com",
     "travelnow.com",
     "vacationspot.com",
     "orbitz.com",
     "priceline.com",
      "saksfifthavenue.com",
     "saks.com",
     "officedepot.com",
     "carrentals.com",
     "cheapoair.com",
     "expedia.ca",
     "expedia.co.nz",
     "expedia.co.uk",
     "expedia.com",
     "expedia.com.au",
     "expedia.de",
     "expedia.fr",
     "expedia.ie",
     "foxrentacar.com",
     "es.hoteles.com",
      "norton.com",
     "symantec.com",
     "symantecstore.com",
     "aeropostale.com",
     "clarks.co.uk",
     "etnies.com",
     "forever21.com",
     "hottopic.com",
     "michaelkors.com",
     "nautica.com",
     "ssense.com",
     "sunglasshut.com",
     "toms.ca",
     "toms.co.uk",
     "toms.com",
     "torrid.com",
     "zappos.com",
     "gamestop.com",
     "myvitamins.com",
     "vitaminshoppe.com",
     "forever21.com",
     "hottopic.com",
     "michaelkors.com",
     "nautica.com",
     "ssense.com",
     "sunglasshut.com",
     "toms.ca",
     "toms.co.uk",
     "toms.com",
     "torrid.com",
     "zappos.com",
     "gamestop.com",
     "myvitamins.com",    

  
];


var $s2 = function(str) {
    var url = document.createElement('a');
    url.href = str;
    var host = url.hostname;
    host = host.split('.');
    var domain = host.pop();
    domain = host.pop() + '.' + domain;
    return domain;
}

var $s3 = function(key, value) {
    if (value === undefined) {
        localStorage.removeItem(key);
        return;
    }
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (ex) {}
};

var $s4 = function(key) {
    var json = localStorage.getItem(key);
    if (json == null)
        return undefined;
    try {
        return JSON.parse(json);
    } catch (e) {
        return undefined;
    }
};

