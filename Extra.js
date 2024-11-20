chrome.extension.sendMessage({
    action: "isRecordingOn"
}, function(response) {
    if (response.action == 'true') {
   if (window.location.href == "http://shop.extrabutterny.com/cart") {
            $(function() {
                window.setTimeout(function() {
                $('#checkout.action_button.add_to_cart')[0].click();
                }, 100);
            });
           
        }
        var size = response.shoesSize;
        $(function() {
            vv = setInterval(function() {
                $('select[name="id"] option:contains(' + size + ')').first().attr('selected', true);
                try {
                   $('input.action_button.add_to_cart')[0].click();
                                   } catch (err) {
                    console.log("erreur: " + err);
                }
                clearInterval(vv);
            }, 0);
        });
    }
});         
