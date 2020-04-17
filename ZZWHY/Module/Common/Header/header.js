$("#header_com").on('mouseenter',".header_nav li",function () {
    $(this).find("dl").css('display','block').stop().animate({'top':"57px"})
})
$("#header_com").on('mouseleave',".header_nav li",function () {
    $(this).find("dl").css('display','none').stop().animate({'top':"80px"})
})
$("#header_com").on('click',".header_nav li",function () {
    $(this).addClass("active").siblings("li").removeClass('active')
})
$(".login .trigger").click(function () {
    $(".city_box").show()
})
$(".search_btn").click(function () {
    $(".search").css('display','block').stop().animate({'margin-top':"0",'opacity':'1'})
})
$(".search_newBtn").click(function () {
    $(".search").css('display','none').stop().animate({'margin-top':"-60px",'opacity':'0'})
})
$(".city_box dl dd").click(function () {
    $(this).addClass('active').siblings("dd").removeClass('active')
})
// 街道选择
$("body").click(function (e) {
    var target = $(e.target);
     if(target.is(".city_box>.city_bot>a")){
        $(".city_box").hide()
    }else if (target.is(".city_box a")){
        $(".city_box").show()
    }else if (target.is(".city_box")){
         $(".city_box").show()
     }
    else if(target.is(".city_box *")){
       $(".city_box").show()
    } else if (target.is(".trigger")) {
        $(".city_box").show()
    }else {
        $(".city_box").hide()
    }
})
