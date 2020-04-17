// // 文化馆预定切换
// $("#whg_left").on("click","ul li",function () {
//     $(this).addClass("active").siblings("li").removeClass("active")
//     $("#whg_right li").eq($(this).index()).addClass("active").siblings("li").removeClass("active")
// })
// var liLen=$("#whg_left ul li").length
// var newNum = 0
// $("#whg_left a").click(function () {
//     if (liLen<=5){
//         return;
//     }
//     if (newNum===liLen-5){
//         newNum=0
//         $("#whg_left ul").stop().animate({"margin-top":"-"+110*newNum+"px"})
//         return;
//     }else {
//         newNum++
//         $("#whg_left ul").stop().animate({"margin-top":"-"+110*newNum+"px"})
//     }
//
// })
//
// // org的显示和隐藏
// $(".org>p").click(function () {
//     if($(".org_cont").css("display")=="none") {
//         $(".org_cont").fadeIn()
//     }else {
//         $(".org_cont").fadeOut()
//     }
// })
//
