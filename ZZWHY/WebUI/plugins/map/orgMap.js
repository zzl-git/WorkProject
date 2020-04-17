var opts = {
    width : 250,     // 信息窗口宽度
    height: 180,     // 信息窗口高度
    enableMessage:true//设置允许信息窗发送短息
};
var viewflag = 0;
if (parseInt($(window).width()) < 768) {
    viewflag = 0;
} else {
    viewflag = 1;
}

var CURRENT_PAGE = 1;
var searchTxt="";
var pageSize ;
$(function () {
    mapInit(116.007535,29.71184,11);
    // serchInit(1);
    /*pc端地图侧边栏显示隐藏*/
    $(".xx-left").click(function(){
        $(".xx-left").css("display","none")
        $(".xx-list").css("display","none")
        $(".xx-right").css("display","block")
    })

    $(".xx-right").click(function(){
        $(".xx-left").css("display","block")
        $(".xx-list").css("display","block")
        $(".xx-right").css("display","none")
    })
    // $(".xx-updown .glyphicon-triangle-bottom").click(function(){
    //     $(".xx-list").slideUp("slow");
    //     $(" .glyphicon-triangle-top").animate({"display":"inline-block"},600,function () {
    //         $(".glyphicon-triangle-top").css("display","inline-block");
    //     })
    // })
    $(".glyphicon-triangle-top").click(function(){
        $(".xx-list").slideDown("slow").delay(1000);
        $(" .glyphicon-triangle-top").css("display","none");
    })

})
    mapInit = function (lng,lat,level) {
        // 百度地图API功能
        var map = new BMap.Map("allmap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(lng,lat), level);  // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("九江市");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(false);     //开启鼠标滚轮缩放
        // 比例尺控件
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });
        map.addControl(navigationControl);
        // 定位控件
        // 添加定位控件
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function(e){
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            console.log("当前定位地址为：" + address);
        });
        geolocationControl.addEventListener("locationError",function(e){
            // 定位失败事件
            console.log(e.message);
        });
        map.addControl(geolocationControl);
        // $.ajax({
        //     url: ROOTBASE + "organization/allorganization",
        //     type: 'GET',
        //     success: function (data, status, xhr) {
        //         var serchHtml ="<ul>";
        //         var markers = [];
        //         var pt = null;
        //         for (var i = 0;i < data.length; i++) {
        //             if(data[i].location==undefined || data[i].location==""){
        //
        //             }else{
        //                 pt = new BMap.Point(data[i].location[0],data[i].location[1]);
        //                 var myIcon = new BMap.Icon("assets/img/zuobiao.png", new BMap.Size(32,32));
        //                 var content = "<h4 style='margin:0 3px 7px 2px;font-size: 16px;'>"+data[i].name+"<button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" style='float:right;' id='"+data[i].id+"' onclick='gotoOrg($(this))'>进入机构</button></h4>" +
        //                     "<img style='float:right;margin:4px' id='imgDemo' src='"+API + data[i].hposter+"' width='250' height='104'/>" +
        //                     "<p style='line-height:1.5;font-size:13px;'>地址:"+data[i].addressInfo+"</p>" +
        //                     "<p style='line-height:1.5;font-size:13px;'>联系方式:"+data[i].contact+"</p>" +
        //                     "</div>";
        //                 var marker = new BMap.Marker(pt,{icon:myIcon});
        //                 addClickHandler(content,marker);
        //                 markers.push(marker);
        //                 var name = data[i].name ;
        //                 var orgId = data[i].id;
        //                 var myCompOverlay = new ComplexCustomOverlay(pt, name,orgId);
        //                 map.addOverlay(myCompOverlay);
        //             }
        //         }
        //         //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
        //         var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});
        //     }
        // })

        function addClickHandler(content,marker){
            marker.addEventListener("click",function(e){
                openInfo(content,e)}
            );
        }
        function openInfo(content,e){
            var p = e.target;
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow,point); //开启信息窗口
        }

        // 复杂的自定义覆盖物
        function ComplexCustomOverlay(point, text, mouseoverText){
            this._point = point;
            this._text = text;
            this._overText = mouseoverText;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(map){
            this._map = map;
            var div = this._div = document.createElement("div");
            div.style.position = "absolute";
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            div.style.backgroundColor = "#47834d";
            div.style.border = "1px solid #47834d";
            div.style.color = "white";
            div.style.height = "25px";
            div.style.padding = "2px";
            div.style.lineHeight = "18px";
            div.style.whiteSpace = "nowrap";
            div.style.MozUserSelect = "none";
            div.style.fontSize = "12px";
            var span = this._span = document.createElement("span");
            div.appendChild(span);
            span.appendChild(document.createTextNode(this._text));
            var that = this;

            var arrow = this._arrow = document.createElement("div");
            arrow.style.background = "url(assets/img/lable.png) -1px -28px no-repeat";
            arrow.style.position = "absolute";
            arrow.style.width = "11px";
            arrow.style.height = "10px";
            arrow.style.top = "22px";
            arrow.style.left = "10px";
            arrow.style.overflow = "hidden";
            div.appendChild(arrow);

            div.onclick = function(){
                window.open("details-organization.html?id="+that._overText);
            }

            div.onmouseout = function(){
                this.style.backgroundColor = "#47834d";
                this.style.borderColor = "#47834d";
                this.getElementsByTagName("span")[0].innerHTML = that._text;
                arrow.style.backgroundPosition = "-1px -28px";
            }

            map.getPanes().labelPane.appendChild(div);

            return div;
        }
        ComplexCustomOverlay.prototype.draw = function(){
            var map = this._map;
            var pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
            this._div.style.top  = pixel.y - 40 + "px";
        }

    }

    // serchInit = function (currentPage,searchTxt) {
    //     if(searchTxt==undefined) {
    //         searchTxt = this.searchTxt;
    //     }
    //     $.ajax({
    //         url: ROOTBASE + "front/origanization/getOrgByPage",
    //         type: 'GET',
    //         async: false,
    //         data : {
    //             "currentPage":currentPage,
    //             "searchTxt" : searchTxt
    //         },
    //         success: function (data, status, xhr) {
    //             var list = data.list;
    //             var length = list.length;
    //             if(length==0){
    //                 layer.msg("没有查到相关机构");
    //             }
    //             var serchHtml = "";
    //             for (var i = 0; i < length; i++) {
    //                 if (list[i].location == undefined || list[i].location == "") {
    //                 } else {
    //                     serchHtml +=" <li id='"+list[i].id+"' rel='"+list[i].location+"' onclick='searchLocation($(this))' class=\"list-group-item btn btn-default \">" +
    //                         "<div class=\"xx-img\"><img style='height: 50px;width:86px;' src='"+API+list[i].hposter+"'></div>" +
    //                         "<div class=\"xx-text\"><div class=\"xx-title\"><h4>"+list[i].name+"</h4></div><div  class=\"xx-details\">" +
    //                         "<p>"+list[i].addressarea+list[i].addressInfo+"</p></div></div></li>";
    //                 }
    //             }
    //             pageSize = data.pageSize;
    //             if(viewflag==1){
    //                 if(length!=0) {
    //                     $("#search").html(serchHtml);
    //                     pageHTML = "<a href='javascript:void(0)' class='item prev' onclick='previouspage()'>&lt;</a>";
    //                     CURRENT_PAGE = parseInt(currentPage);
    //                     pageHTML += fenPage(CURRENT_PAGE, pageSize);
    //                     pageHTML += "<a href='javascript:void(0)' class='item next'  onclick='nextpage()'>&gt;</a>";
    //                     $("#pagenav").html(pageHTML);
    //                 }
    //             }else{
    //                 if(searchTxt!=undefined){
    //                     $("#search").html(serchHtml);
    //                 }else{
    //                     $("#search").append(serchHtml);
    //                 }
    //             }
    //         }
    //     })
    // }

    $("#search").scroll(function () {
        var $this = $(this),
            viewH = $(this).height(),//可见高度
            contentH = $(this).get(0).scrollHeight,//内容高度
            scrollTop = $(this).scrollTop();//滚动高度
        if (scrollTop / (contentH - viewH) >= 0.95) { //到达底部100px时,加载新内容
            if(CURRENT_PAGE>=pageSize){
                layer.msg("没有更多数据了");
                return false;
            }else{
                CURRENT_PAGE +=1;
            }
            serchInit(CURRENT_PAGE);
        }
    });

    searchLocation  = function (obj) {
        var location = obj.attr("rel");
        var array = location.split(",");
        mapInit(array[0],array[1],20);
    }

    goPage = function (obj) {
        CURRENT_PAGE = obj.text();
        serchInit(CURRENT_PAGE);
    }

    gotoOrg = function (obj) {
        var id = obj.attr("id");
        window.open("details-organization.html?id="+id);
    }

    gotoScenic = function (obj) {
        var id = obj.attr("id");
        // window.open("details-organization.html?id="+id);

    }

    getSearchTxt = function () {
        searchTxt = $("#searchTxt").val();
        if(searchTxt=="" || searchTxt==null){
            layer.msg("请输入你要查找的场馆");
        }else{
            serchInit(1,searchTxt);
        }
    }

//上一页
var previouspage = function () {
    CURRENT_PAGE = parseInt(CURRENT_PAGE) - 1;
    if (CURRENT_PAGE < 1) {
        CURRENT_PAGE = 1;
        layer.msg("已经是第一页了", {
            icon: 0,
            time: 2000
        })
    }
    serchInit(CURRENT_PAGE);


}

var nextpage = function () {
    CURRENT_PAGE = parseInt(CURRENT_PAGE) + 1;
    if (CURRENT_PAGE > pageSize) {
        CURRENT_PAGE = pageSize;
        layer.msg("没有更多数据了", {
            icon: 0,
            time: 2000
        })
        return false;
    }
    serchInit(CURRENT_PAGE);
}
