chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
		var size = response.shoesSize;
		var	TIMEOUT_SETTING = response.timeOut;
		var delay1=Number(TIMEOUT_SETTING);
		var delay2=200;
		var delay=delay1+delay2;
		$(function(){
				if ($('.sizeChoiceContainer.clearfix ').length){					
     window.location = 'javascript:' + "$('.size:contains("+size+")').last().parent().click(); $('.addToCartContainer .enabled').click(); setTimeout(function() { window.location = 'http://store.nba.com/cart/view';}, 1000);"
	}});
	}
});