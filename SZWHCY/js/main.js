$(document).ready(function(){
	// GetMaxHeight & GetMaxWidth
	var oHeight = $(document.body).height();
	var oWidth = $(document.body).width();
	var oViewidth = $('#viewmore .content .tab_box .row li').width()*4;
	var oVieheight = $('#viewmore .content .tab_box .row li').height();
	// nav
	$(window).scroll(function(){
		if($(window).scrollTop()>=200){
			$('#nav').animate({'height':'5.5rem'},300);
			$('#nav').css({
				'background-color':'#161616',
				'border-bottom':'none',
			});
			$('#nav .content').css('line-height','5.5rem')
		}else{
			$('#nav').animate({'height':'7.5rem'},300);
			$('#nav').stop(true,true).css({
				'background-color':'',
				'border-bottom':'1px solid #354350',
			});
			$('#nav .content').css('line-height','7.5rem');
		}
	});
	//anchor
	$('#banner .down').click(function(){
		$('html,body').animate({scrollTop:$('#scrollbottom').offset().top},1000);
	})
	//scroll
	var tag = false,ox = 0,left = 0,bgleft = 0;
	$('#viewmore .content .tab_box .progress_btn').mousedown(function(e) {
		ox = e.pageX - left;
		tag = true;
	});
	$(document).mouseup(function() {
		tag = false;
	});
	$('#viewmore .content .tab_box .progress').mousemove(function(e) {//鼠标移动
		if (tag) {
			left = e.pageX - ox;
			if (left <= 0) {
				left = 0;
			}else if (left > 300) {
				left = 300;
			}
			$('#viewmore .content .tab_box .progress_btn').css('left', left);
			$('#viewmore .content .tab_box .progress_bar').width(left);
			$('#viewmore .content .tab_box .progress .text').html(parseInt((left/300)*100) + '%');
		}
	});
	$('#viewmore .content .tab_box .progress_bg').click(function(e) {//鼠标点击
		if (!tag) {
			bgleft = $('#viewmore .content .tab_box .progress_bg').offset().left;
			left = e.pageX - bgleft;
			if (left <= 0) {
				left = 0;
			}else if (left > 300) {
				left = 300;
			}
			$('#viewmore .content .tab_box .progress_btn').css('left', left);
			$('#viewmore .content .tab_box .progress_bar').animate({width:left},300);
			$('#viewmore .content .tab_box .progress .text').html(parseInt((left/300)*100) + '%');
		}
	});
	//Join team
	$('#join_team .content .join .row li').hover(function(){
		$('#join_team .content .join .row li div').eq($(this).index()).css({
			'height':'400px',
		});
		$('#join_team .content .join .row li div img').eq($(this).index()).show(500);
	},function(){
		$('#join_team .content .join .row li div').css({
			'height':'200px',
			'margintop':'6.875rem'
		});
		$('#join_team .content .join .row li div img').eq($(this).index()).hide(0);
	});
	//FOR A SHORT TIME OF BANNER
	$('#banner').css({'height':oHeight});
	var resizeTimer = null;
	$(window).bind('resize', function (){
		if (resizeTimer) clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){
			$('#banner').css({'height':oHeight})
		} , 100);
	});
});