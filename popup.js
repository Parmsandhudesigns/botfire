$('#start').live('click', function(){ 
	var handleArray = [];
	$(".selected").each(function(i, val){
		handleArray.push($(this).text());
	});
	
	localStorage['keywords'] = $("#keywords").val().replace(/(.)\s(.)/g, '$1|$2');
	localStorage['twitterHandle'] = JSON.stringify(handleArray);
	localStorage['shoesSize'] = $("#shoesSize").val();
	localStorage['timeOut'] = $("#timeout").val();
	chrome.extension.sendMessage({action: "startListening"}, function(response) {
    	$(".mainContainer").html('<div class="buttonContainer"><a href="#" id="stop" class="stop myButton">Stop</a></div>');
		window.close();
    });
});

$('#stop').live('click', function(){ 
	chrome.extension.sendMessage({action: "stopListening"}, function(response) {
		location.reload();
    });
});

$('.fhButton').live('click', function(){
	if($(this).hasClass('selected')){
		$(this).removeClass('selected');
	}else{
		$(this).addClass('selected');
	}
});


$("#addHandle").live('click', function(){
	shopname = $("#newshop").val();
	if(shopname != ''){
		htmlcode = '<div class="fhButton selected">'+shopname+'</div>';
		$("#fastHandle").append(htmlcode);
	}
});

$("#keywords").click(function(){
	$("#helpKeywords").css("display", "block");
});

$("#keywords").focusout(function(){

	$("#helpKeywords").css("display", "none");

});


$(function(){
	
	if (localStorage.getItem("shoesSize") === null) {
		$("#shoesSize").val(8);
	}else{
		$("#shoesSize").val(localStorage['shoesSize']);
	}

	if (localStorage.getItem("timeOut") === null) {
		$("#timeout").val(1500);
	}else{
		$("#timeout").val(localStorage['timeOut']);
	}
	
	if (localStorage.getItem("keywords") === null) {
		$("#keywords").val(localStorage['keywords'].replace(/|/g, ' '))
	}
	
	if(localStorage['recording'] == 'true'){
		$(".mainContainer").html('<div class="buttonContainer"><a href="#" id="stop" class="stop myButton">Stop</a></div>');
	}
});

({action: "isUserLoged"}, function(response) {
	console.log(response);
	if(response.action == false){
		myButtonBuyHTML = '';
		signInHTML = '<div id="signIn">Activate</div><div id="loginForm" class="hidden"><input type="text" id="login_email" placeholder="Enter your email" name="login_email"><div id="validate">OK</div><div class="clear">Please enter your registered email address</div></div>';
		
		$(".mainContainer").html('<div class="buttonContainer">'+myButtonBuyHTML+signInHTML+'</div>');
		
		$("#signIn").live("click", function(){
			$("#loginForm").removeClass("hidden");
			$("#login_email").focus();
		});
		
		$("#validate").live("click", function(){
			localStorage['userEmail'] = $("#login_email").val();
			$("#loginForm .clear").html('<img src="img/loading.gif" style="height: 20px; -webkit-filter: sepia(100%) hue-rotate(67deg) invert(13%);">');
			chrome.extension.sendMessage({action: "CheckUserRegistered"}, function(response) {
				setTimeout(function(){
					chrome.extension.sendMessage({action: "isUserLoged"}, function(response) {
						if(response.action == true){
							location.reload();
						}else{
							$("#loginForm .clear").html(localStorage['registerStatus']);
						}
					});
				},1500);
			});
		});
		
	}
});