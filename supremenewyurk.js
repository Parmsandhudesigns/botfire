chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
		var size = response.shoesSize;
		$(function(){
			vv = setInterval(function(){			
				$('select[name="size"] option:contains('+size+')').first().attr('selected', true);				
				try{
					$('input.button')[0].click();
				}catch(err){
					console.log("erreur: "+err);
				}
				clearInterval(vv);
			},0);
		});
	}
});