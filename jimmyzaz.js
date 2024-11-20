chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
		var size = response.shoesSize;
		var	TIMEOUT_SETTING = response.timeOut;
		var delay1=Number(TIMEOUT_SETTING);
		var delay2=200;
		var delay=delay1+delay2;
		$(function(){
				if ($('.box_wrapper ').length){	
	window.location = 'javascript:' + "$('.box:contains("+size+")').eq(0).click(); $('#add_to_bag_btn').click(); setTimeout(function() { window.location = 'http://www.jimmyjazz.com/cart';}, 1000);$('#btn_check_out_now')[0].click();"
	}});
	}
});