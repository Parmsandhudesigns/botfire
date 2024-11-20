chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
		var size = response.shoesSize;
		var	TIMEOUT_SETTING = response.timeOut;
		var delay1=Number(TIMEOUT_SETTING);
		var delay2=200;
		var delay=delay1+delay2;
		$(function(){
			vv = setInterval(function(){
				if ($('#buttonAddToCart').length){	
					var m=document.getElementsByClassName("itemsIndicator");
					for(var d=0;d<m.length;d++){
						if(parseInt(m[d].innerHTML.trim())<1){	
							try{
								$("div#sizes div:contains('"+size+"')")[0].innerHTML;
								$("div#sizes div:contains('"+size+"')").first().trigger('click');
							}catch(err){
								try{
									$("div#sizes div:contains('"+Math.ceil(size)+"')")[0].innerHTML;
									$("div#sizes div:contains('"+Math.ceil(size)+"')").first().trigger('click');
								}catch(err){
									try{
										$("div#sizes div:contains('"+Math.floor(size)+"')")[0].innerHTML;
										$("div#sizes div:contains('"+Math.floor(size)+"')").first().trigger('click');
									}catch(err){}					
								}
							}
							try{
								$("#buttonAddToCart")[0].click();
							}catch(err){
								console.log("erreur: "+err);
							}
							clearInterval(vv);
							
							var timeout = window.setTimeout(function() {
								 window.location = 'http://finishline.com/store/checkout/cart.jsp';
							}, delay1);				
						}else{
							clearInterval(vv);
						}
					}	
				}else{
					clearInterval(vv);
				}
			},10);
		});
	}
});