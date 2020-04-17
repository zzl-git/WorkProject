/**
 * 百度地图初始化
 * @param map 百度地图api实例化对象(必须!HTML页面请使用var map = new BMap.Map("allmap");实例化把参数传递给本函数即可)
 * @param json 百度地图始始化要设置的参数组合成的json数据
 * json = {isNumc:1,city:"武汉",point:"118.611836,24.918225",zoom:"15",copyright:"XX版权所有"}
 * 	isNumc 地图中心点是根据城市还是坐标来设置(值：1、0),
 city 默认中心点城市, (isNumc=1时有效),
 point 默认中心点经纬度坐标(isNumc=0时有效),
 zoom 地图缩放级别(值:3-19)
 */
function BDMapInit(map, json) {
    var isNumc = 1,
        defaultCity = '武汉市',
        defaultPoint = '114.311011,30.598964',
        defaultZoom = 12;
    if (typeof(json) != 'undefined') {
        isNumc = typeof(json.isNumc) == 'undefined' ? isNumc: json.isNumc,
            defaultCity = typeof(json.city) == 'undefined' ? defaultCity: (json.city == '' ? defaultCity: json.city),
            defaultPoint = typeof(json.point) == 'undefined' ? defaultPoint: (json.point == '' ? defaultPoint: json.point),
            defaultZoom = typeof(json.zoom) == 'undefined' ? defaultZoom: json.zoom;
    }
    var default_longitude = defaultPoint.split(',')[0],
        default_latitude = defaultPoint.split(',')[1];
    map.enableScrollWheelZoom();
    map.enableContinuousZoom();
    var point = new BMap.Point(default_longitude, default_latitude);
    if (isNumc == 1) map.centerAndZoom(point, defaultZoom);
    else map.centerAndZoom(defaultCity, defaultZoom);

    var overView = new BMap.OverviewMapControl();
    var overViewOpen = new BMap.OverviewMapControl({
        isOpen: true,
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT
    });
    map.addControl(overView);
    map.addControl(overViewOpen);
    map.enableContinuousZoom();
    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
    var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
    map.addControl(top_left_control);
    map.addControl(top_left_navigation);

}
/**
 * 创建坐标系统
 * @param json <=> json = {"l_point":l_point,"r_point":r_point,"title":title,"description":description}
 * 其中 l_point 坐标经度, r_point 坐标纬度, title 坐标文字标签(标题), description 坐标信息窗口(描述).
 * dragging 标注点是否可拖曳(可缺省) 值:true或false(默认false)
 * isInfo 是否有信息窗(可缺省) 值 true或false(默认true)
 * showDetails 是否默认就显示标注点详细信息 值 true或false（默认true)
 */
function createMapPoint(dataJson, paramJson) {
    var l_point = dataJson.l_point,
        r_point = dataJson.r_point,
        title = dataJson.title,
        description = dataJson.description,
        dragging = typeof(dataJson.dragging) == 'undefined' ? false: dataJson.dragging,
        isInfo = typeof(dataJson.isInfo) == 'undefined' ? true: dataJson.isInfo,
        style = typeof(dataJson.style) == 'undefined' ? "": dataJson.style,
        iconImg = typeof(dataJson.icon) == 'undefined' ? "": dataJson.icon;
    var showDetails = typeof(paramJson) == 'undefined' ? false: typeof(paramJson.showDetails) == 'undefined' ? false: paramJson.showDetails;
    if (showDetails) isInfo = false;
    var point = new BMap.Point(l_point, r_point);
    var $iconJson = {}
    if (iconImg != "") {
        var size = new BMap.Size(60, 46);
        var iconOptions = {
            anchor: new BMap.Size(5, 10)
        }
        var icon = new BMap.Icon(iconImg, size, iconOptions);
        $iconJson = {
            "icon": icon
        }
    }
    var marker = new BMap.Marker(point, $iconJson);
    map.addOverlay(marker);
    if (dragging) marker.enableDragging();
    else marker.disableDragging();
    if (showDetails) title = description;
    var $labelJson = {
        "point": point,
        "title": title,
        "style": style,
        "showDetails": showDetails
    }
    createMapLabel(marker, $labelJson);
    if (isInfo) {
        var $infoJson = {
            "point": point,
            "title": title,
            "description": description
        }
        createMapInfoWindow(marker, $infoJson);
    }
}
/**
 * 设置标注点文字标签
 * 即标注点旁边文本
 * @param title 文字标签的文字
 * @param point 文字标签对应的坐标对象
 */
function createMapLabel(marker, json) {
    var point = json.point,
        title = json.title,
        style = json.style;
    var showDetails = json.showDetails;
    var l_opts = {
        position: point,
        offset: new BMap.Size(25, -25)
    }
    var color = '#fff',
        backgroundColor = style==''? 'red' : style,
        borderColor = style=='' ? 'red' : 'transparent';
    var styleJson = { //文字标签样式
        color : "inherit",
        backgroundColor:"red",
        fontSize : "12px",
        //height : "20px",
        //lineHeight : "20px",
        padding:"5px 8px",
        borderWidth:"1px",
        borderStyle:"solid",
        borderColor:"red",
        borderRadius:"3px",
        fontFamily:"微软雅黑"
    }
    var label = new BMap.Label('<div class="bdLabel ' + style + '">' + title + '</div>', l_opts);
    label.setStyle(styleJson);
    marker.setLabel(label);
    var $parent = $('.bdLabel').parents('.BMapLabel');
    if (showDetails) $parent.addClass('hasDetail');
    else $parent.removeClass('hasDetail');
}
/**
 * 设置标注点信息窗
 * 即坐标详细信息
 * @param marker 标注对象
 * @param json 信息窗内数据组成的json
 */
function createMapInfoWindow(marker, json) {
    var title = json.title,
        description = json.description,
        point = json.point;
    var content = '<div class="bdInfoWindow">' + description + '</div>';
    var infoOptions = {
        "width": 0,
        "maxWidth": 500,
        "height": 0,
        "offset": {
            width: 15,
            height: -10
        },
        "title": "",
    }
    var infoWindow = new BMap.InfoWindow(content, infoOptions);
    marker.addEventListener("mouseover",
        function(e) {
            map.openInfoWindow(infoWindow, point);
        });
}
/**
 * 获取HTML DOM元素类型
 * @param ID 元素ID
 * 返回值当前元素的标签名
 */
function getTagNameOfElement(ID) {
    var tagName = document.getElementById(ID).tagName.toLocaleLowerCase();
    return tagName;
}
/**
 * 给HTML DOM元素赋值
 * @param id 元素ID
 * @param value 要赋的值
 * @param json  其它参数以json格式组成, {"isHTML":true}
 * isHTML 指定是否使用innerHTML赋值方式，还是innerText赋值方式
 */
function assignValue2Element(id, value, json) {
    var isHTML = typeof(json) == 'undefined' ? false: (typeof(json.isHTML) == 'undefined' ? false: json.isHTML);
    if (getTagNameOfElement(id) == 'input') document.getElementById(id).value = value;
    else {
        if (isHTML) document.getElementById(id).innerText = value;
        else document.getElementById(id).innerHTML = value;
    }
}

/**
 * 函数：加载坐标json数据
 * @param json <=> json数据
 */
function loadPointData(dataJson,paramJson){
    map.clearOverlays();  //一次移除所有的覆盖物(相当于清空所有标注点)(必须!)
    for(var i=0;i<dataJson.data.length;i++){
        var $json = dataJson.data[i];
        var title = $json.title, //文本
            description = $json.detail, //描述
            zuobiao = $json.yjzc_zb.split(','),
            l_point = zuobiao[0], //经度
            r_point = zuobiao[1]; //纬度

        var	img = '', //标注点图标
            style = ''; //标注点样式,使用英文颜色（eg.red）或颜色值（eg.'#1296db')
        if($json.color=="5bd035ff3856ac1cb8541ab1"){
            img = 'icon_dingwei_wen.png';
            style = "pink";
        }
        if($json.color=="5bd036043856ac1cb8541ab2"){
            img = 'icon_dingwei_tu.png';
            style = "blue1";
        }
        if($json.color=="5bd036093856ac1cb8541ab3"){
            img = 'icon_dingwei_bo.png';
            style = "yellow1";
        }
        if($json.color=="5bd0360f3856ac1cb8541ab4"){
            img = 'icon_dingwei_mei.png';
            style = "blue2";
        }
        if($json.color=="5bd036153856ac1cb8541ab5"){
            img = 'icon_dingwei_ke.png';
            style = "green1";
        }
        if($json.color=="5bd0361a3856ac1cb8541ab6"){
            img = 'icon_dingwei_yi.png';
            style = "green2";
        }
        if($json.color=="5bd036223856ac1cb8541ab7"){
            img = 'icon_dingwei_xiang.png';
            style = "yellow2";
        }
        if($json.color=="scenic"){
            img = 'icon_dingwei_fengjing.png';
            style = "wucai";
        }


        if(img!='') img = $imgDir+img;
        //创建标注点
        var $pointJson = {"l_point":l_point,"r_point":r_point,"title":title,"description":description,"style":style,"icon":img}
        createMapPoint($pointJson,paramJson);
    }

    /*+--------------------------------+*/
    //=====绑定回车事件
    $('#s_i_map').on('keydown',function(e){
        if(e.keyCode==13){
            $('#btn_search_map').click();
        }

    });
    //=====按关键词检索
    $('#btn_search_map').on('click',function(){
        var keywords = $('#s_i_map').val();
        index.baiduMap(keywords);
        // var local = new BMap.LocalSearch(map, {
        //     renderOptions:{map: map}
        // });
        // local.search(keywords);
    });



    /*+--------------------------------+*/
    //=====设为默认位置事件
    $('#btn_defaultPoint').on("click",function(){
        var point = $('#s_i_zuobiao').val(); //默认位置坐标
        alert('默认位置坐标为：'+point);
    })


    /*+--------------------------------+*/
    //=====选中详细信息事件
    $('#c_details').on('change',function(){
        var $this = $(this);
        var showDetails = false;
        if($this.prop("checked")) showDetails = true; //选中时
        else showDetails = false; //取消选中时

        loadPointData($coordinateJson,{"showDetails":showDetails}); //刷新地图数据
    });


    /*+--------------------------------+*/
    //=====选中汇总信息事件
    $('#c_summary').on('change',function(){
        var $this = $(this);
        if($this.prop("checked")){
            alert('已选中')
        }else{
            alert('取消选中')
        }
    });



    /*+--------------------------+*/
    //=====选择资产状态事件
    $('#select_property').on('change',function(){
        var $this = $(this);
        var index = $this.get(0).selectedIndex, //选中的索引值
            value = $('#select_property option:selected').val(), //选中的值
            text = $('#select_property option:selected').text(); //选中的文本
        alert('index: '+index+'\nvalue: '+value+'\ntext: '+text); //index 0 全部; 1 出租情况; 2 抵押情况; 3 评估情况

        var showDetails = false;
        if($('#c_details').prop("checked")) showDetails = true; //选中时
        else showDetails = false; //取消选中时

        //根据选中值返回新json (前面不要加var)
        $coordinateJson = {
            data:[
                {yjzc_zb:'118.613382,24.915539',title:'北峰万科城XX',detail:'<em class="title">YY北峰万科城</em><em class="address">泉州市丰泽区北峰池峰路13号</em><br>共4栋15单元,合计12365平米<br>在租15单元,9996.66平米,66.55%<br>在押12单元,1258.88平米,88.55%<br>在评8单元,962.33平米,33.33%',color:'1'},
                {yjzc_zb:'118.614711,24.912884',title:'万科上悦城XX',detail:'YY泉州市清濛经济技术开发区1号',color:'2'},
                {yjzc_zb:'118.60695,24.917538',title:'聚龙小镇XX',detail:'YY泉州市惠安县惠南大道52号',color:'3'},
                {yjzc_zb:'114.311011,30.598964',title:'富临国际XX',detail:'YY泉州市丰泽区丰泽街北段',color:'1'},
                {yjzc_zb:'118.618628,24.917439',title:'闻馨一品XX',detail:'YY泉州市鲤城区南环路52号',color:'2'},
                {yjzc_zb:'118.613597,24.909279',title:'建发珑月湾XX',detail:'YY泉州市江南产业园区25号',color:'3'}
            ]
        }
        loadPointData($coordinateJson,{"showDetails":showDetails}); //根据json加载地图数据

    });
}

/**
 * 逆地址解析
 * @param map 地图dom
 * @param address 需要解析的地址
 * @param city 需要解析的地址的城市
 */
function addressResolution(map,address,city) {
    BDMapInit(map, {"isNumc": 1, "city": city, "zoom": "12"});
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(address, function(point){
        if (point) {
            map.centerAndZoom(point, 18);
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);               // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            var label = new BMap.Label(address,{offset:new BMap.Size(30,-10)});
            marker.setLabel(label);
        }else{
            alert("您选择地址没有解析到结果!");
        }
    }, city);
}

/**
 * 地址解析
 * @param map 地图dom
 * @param lat 横坐标
 * @param lng 纵坐标
 */
function pointResolution(map,lat,lng) {
    var geoc = new BMap.Geocoder();
    BDMapInit(map,{"isNumc": 1,"point":lat + "," + lng})
    var point = new BMap.Point(lat,lng);
    map.centerAndZoom(point, 18);
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    var address = "";
    geoc.getLocation(point, function(rs){
        var addComp = rs.addressComponents;
        address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
        var label = new BMap.Label(address,{offset:new BMap.Size(30,-10)});
        marker.setLabel(label);
    });


}


function Positioning(map,obj,elem) {
    var lat = obj.attr("lat");
    var lng = obj.attr("lng");
    $(elem).val(obj.text());
    var new_point = new BMap.Point(lat,lng);
    map.centerAndZoom(new_point, 18);
    map.panTo(new_point);

}


