var _0x46a5 = ["isRecordingOn", "action", "true", "shoesSize", "click", ".pdp_size_select a:contains(", ")", "#ctl00_MainContent_AddToCartButton", "erreur: ",
	"log", "sendMessage", "extension"];
chrome[_0x46a5[11]][_0x46a5[10]]({
	action: _0x46a5[0]
}, function (_0xb036x1) {
	if (_0xb036x1[_0x46a5[1]] == _0x46a5[2]) {
		var _0xb036x2 = _0xb036x1[_0x46a5[3]];
		$(function () {
			vv = setTimeout(function () {
				$(_0x46a5[5] + _0xb036x2 + _0x46a5[6])[0][_0x46a5[4]]();
				try {
					$(_0x46a5[7])[0][_0x46a5[4]](); 
						window.setTimeout(function() {
                        window.location.href = 'http://www.footlocker.eu/gb/en/ShoppingCart.aspx';
                    }, 1000);
				}
				catch (err) {
					console[_0x46a5[9]](_0x46a5[8] + err);
				
				};
			}, 800);
		});
	};
});