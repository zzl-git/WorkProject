$(document).ready(function(){
	$('#nav .navPc a').on('click', function() {
	  var position = $(this)
	    .parent().position();
	  var width = $(this)
	    .parent().width();
	  $('#nav .slide1').css({ opacity: 1, left: +position.left, width: width });
	});
	$('#nav .navPc a').on('mouseover', function() {
	  var position = $(this)
	    .parent().position();
	  var width = $(this)
	    .parent().width();
	  $('#nav .slide2').css({ 
	    opacity: 1, left: +position.left, width: width })
	    .addClass('squeeze');
	});
	$('#nav .navPc a').on('mouseout', function() {
	  $('#nav .slide2').css({ opacity: 0 }).removeClass('squeeze');
	});
	var currentWidth = $('#nav .navPc')
	  .find('.active')
	  .parent('li')
	  .width();
	var current = $('#nav .active').position();
	$('#nav .slide1').css({ left: +current.left, width: currentWidth });
	var oHeight = $(window).height();
	var oWidth = $(window).width();
	$('#content .text').height(oHeight*0.51);
	$('#app .row .mobile_menu .up').click(function(){
		$('#app .row .mobile_menu ul li').show(1000);
		$('#app .row .mobile_menu .up').hide(1000)
		$('#app .row .mobile_menu .down').show(1000)
	})
	$('#app .row .mobile_menu .down').click(function(){
		$('#app .row .mobile_menu ul li').hide(1000)
		$('#app .row .mobile_menu .down').hide(1000)
		$('#app .row .mobile_menu .up').show(1000)
	})
})