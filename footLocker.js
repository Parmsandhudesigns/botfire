chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
		var old_size = response.shoesSize;
		var	TIMEOUT_SETTING = response.timeOut;
		var delay1=Number(TIMEOUT_SETTING);
		var delay2=200;
		var delay=delay1+delay2;
		switch(old_size){
				case "3": size="03.0";
			break;
		case "3.5": size="03.5";
			break;
		case "4": size="04.0";
			break;
		case "4.5": size="04.5";
			break;
			case "5": size="05.0";
			break;
			case "5.5": size="05.5";
			break;
			case "6": size="06.0";
			break;
			case "6.5": size="06.5";
			break;
			case "7": size="07.0";
			break;
			case "7.5": size="07.5";
			break;
			case "8": size="08.0";
			break;
			case "8.5": size="08.5";
			break;
			case "9": size="09.0";
			break;
			case "9.5": size="09.5";
			break;
			case "10": size="10.0";
			break;
			case "10.5": size="10.5";
			break;
			case "11": size="11.0";
			break;
			case "11.5": size="11.5";
			break;
			case "12": size="12.0";
			break;
			case "12.5": size="12.5";
			break;
			case "13": size="13.0";
			break;
			case "13.5": size="13.5";
			break;
			case "14": size="14.0";
			break;
			case "14.5": size="14.5";
			break;
			case "15": size="15.0";
			break;
			case "15.5": size="15.5";
			break;
			case "16": size="16.0";
			break;
				case "17": size="17.0";
			break;
				case "18": size="18.0";
			break;
		}
		$(function(){		
			vv = setInterval(function(){				
				document.getElementById("pdp_size_select_container").value=size;					
				var p=document.getElementsByClassName("cta_button button pdp_transition disabled"); 
				for(var k=0;k<p.length;k++){
					var q=p[k].getElementsByTagName("input");
					for(var j=0;j<q.length;j++){
						q[j].click();
						break;
					}
				}
				var timeout = window.setTimeout(function() {
					var xy=document.getElementById("miniAddToCart_header");
					var	yz=xy.getElementsByClassName("error");
					if(yz.length){
					}else{
						clearInterval(vv);
					}					
				}, TIMEOUT_SETTING);						
			},delay);
		});
	}
});

