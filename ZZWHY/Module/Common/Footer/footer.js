// 底部js
$("#footer_com").on("click",".foot_top li",function () {
    $(this).find("dl").css("display","block").parents("li").siblings('li').find("dl").css("display","none")
})
$("#footer_com").on("click",".foot_top li dd",function (e) {
    e.stopPropagation()
    $(this).parents("dl").css("display","none")
})
$("#footer_com").click(function (e) {
    var target = $(e.target);
    if(target.is(".input")||target.is(".input span")||target.is(".input em")){
        target.siblings("dl").show()
        var h =target.siblings("dl").height()
        setTimeout(function () {
            if(target.siblings("dl").height()>190){
                target.siblings("dl").css({"top":"-"+(h+3)+"px"})
            }else {
                target.siblings("dl").css({"top":"33px"})
            }
        },0)
    }else {
        $(this).find("dl").hide()
    }
})