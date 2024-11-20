chrome.extension.sendMessage({
    action: "isRecordingOn"
}, function(response) {
    if (response.action == 'true') {
        if (window.location.href == "http://packershoes.com/cart") {
            $(function() {
                window.setTimeout(function() {
                $('#terms')[0].click();
                    $('input.button[name=checkout]')[0].click();
                }, 100);
            });
           
        }
         var size = response.shoesSize;
        $(function() {
            vv = setInterval(function() {
                $('select[name="id"] option:contains(' + size + ')').first().attr('selected', true);
                try {
                    $('input.add[name=button]')[0].click();
                    window.setTimeout(function() {
                        window.location.href = 'http://packershoes.com/cart';
                    }, 1000);
                } catch (err) {
                    console.log("erreur: " + err);
                }
                clearInterval(vv);
            }, 0);
        });
    }
});