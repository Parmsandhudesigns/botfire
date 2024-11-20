chrome.extension.sendMessage({
    action: "isRecordingOn"
}, function(response) {
    if (response.action == 'true') {
      
        var size = response.shoesSize;
        $(function() {
            vv = setInterval(function() {
              //  $('dropdown-menu a:contains(' + size + ')').first().attr('selected', true);
                window.location = 'javascript:' + "$('div#product-detail ul.dropdown-menu a:contains("+size+")').eq(0).click();";
                try {
                  
                   window.setTimeout(function() {
                    $('button.btn.btn-default.buy-now')[0].click();
                        
                    }, 500);
                  
                } catch (err) {
                    console.log("erreur: " + err);
                }
                                     clearInterval(vv);
            }, 0);
        });
    }
});

