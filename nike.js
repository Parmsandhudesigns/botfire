chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
		var size = response.shoesSize;
		$(function(){
			vv = setInterval(function(){			
				$('select[name="skuAndSize"] option:contains('+size+')').first().attr('selected', true);				
				try{
					$('button.add-to-cart')[0].click();
								}catch(err){
					console.log("erreur: "+err);
				}
				clearInterval(vv);
			},0);
		});
	}
});