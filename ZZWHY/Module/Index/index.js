// 总分管切换
$(".venue_bot").on('click','li',function () {
    $(this).addClass('active').siblings('li').removeClass('active')
    var indexNum = $(this).index()
    var lenLi = $(".venue_top li").length
    if(indexNum > lenLi){
        indexNum -= lenLi
    }
    indexNum -= 1
    $('.venue_top').find('li').eq(indexNum).addClass('active').siblings('li').removeClass('active')
})