chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
	       if (window.location.href == "http://beatniconline.com/cart") {
            $(function() {
                window.setTimeout(function() {
                  $('input[name=checkout]')[0].click();
                }, 100);
            });
             }
		var size = response.shoesSize;
		$(function(){
			vv = setInterval(function(){			
				$('select[name="id"] option:contains(' + size + ')').first().attr('selected', true);		
				try{
					$('#add-to-cart.btn')[0].click();
					 				}catch(err){
					console.log("erreur: "+err);
				}
				clearInterval(vv);
			},1000);
		});
	}
});