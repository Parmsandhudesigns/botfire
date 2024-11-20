            
 chrome.extension.sendMessage({
    action: "isRecordingOn"
}, function(response) {
    if (response.action == 'true') {
        if (window.location.href == "https://www.adidas.com/on/demandware.store/Sites-adidas-US-Site/en_US/Cart-Show") {
            $(function() {
                window.setTimeout(function() {
                   $('button[value=Checkout]')[0].click();
                }, 1000);
            });
           
        }
        var size = response.shoesSize;
        $(function() {
            vv = setInterval(function() {
                $('select[name=pid] option:contains(' + size + ')').click().first().attr('selected', true);
                try {
                    $('button.add-to-cart')[0].click();
                    window.setTimeout(function() {
                     $('a.co-btn_primary')[0].click();
                    }, 1000);
                } catch (err) {
                    console.log("erreur: " + err);
                }
                clearInterval(vv);
            }, 0);
        });
    }
});