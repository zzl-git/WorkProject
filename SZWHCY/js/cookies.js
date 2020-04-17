$(document).ready(function(){
	var str = window.location.href;
	str = str.substring(str.lastIndexOf("/") + 1);
	if ($.cookie(str)) {
	$("html,body").animate({ scrollTop: $.cookie(str) }, 1000);
	}
	else {
	}
	})
	$(window).scroll(function () {
	var str = window.location.href;
	str = str.substring(str.lastIndexOf("/") + 1);
	var top = $(document).scrollTop();
	$.cookie(str, top, { path: '/' });
	return $.cookie(str);
})