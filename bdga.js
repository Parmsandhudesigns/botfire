
chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
   if (window.location.href == "https://shop.bdgastore.com/cart") {
            $(function() {
                window.setTimeout(function() {
                    ('input.button[name=checkout]')[0].click();
                }, 100);
            });
           
        }
		var size = response.shoesSize;
				$(function(){
				if ($('.swatch.clearfix ').length){					
     window.location = 'javascript:' + "$('#swatches span:contains("+size+")').first().parent().click(); $('#add').click(); setTimeout(function() { window.location = 'http://shop.bdgastore.com/cart';}, 1000);"

	}});
	}
});
             











