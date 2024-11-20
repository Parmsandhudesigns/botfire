
chrome.extension.sendMessage({
    action: "isRecordingOn"
}, function(response) {
    if (response.action == 'true') {
         if (window.location.href == "http://www.footpatrol.co.uk/basket") {
            $(function() {
                window.setTimeout(function() {
                    $('input.proceed')[0].click();
                }, 100);
            });
           
        }
       var size = response.shoesSize;
        $(function() {
            vv = setInterval(function() {
          $('select[name="attributes[2]"] option:contains(' + size + ')').first().attr('selected', true);
                try {
                  $('#add-to-basket')[0].click();
                          } catch (err) {
                    console.log("erreur: " + err);
                }
                clearInterval(vv);
            }, 0);
        });
    }
})