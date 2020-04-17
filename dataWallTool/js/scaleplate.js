let scaleplate = {
    data() {
        return {
           
        }
    },
    computed: {
        newWidth() {
            let data = +this.width
            let itemData = []
           for (let i = 0; i<=data;i++) {
            if (i%5==0){
                itemData.push(i)
            }
           }
            return itemData
        },
       

    },
    props:['width','weizhi'],
    template:`
        <div>
            <ul>
                <li
                    v-for="item in newWidth"
                    :title = "item" 
                    :style="topOrLeft(item)" 
                    @click="showData(weizhi,item)"
                    :key='item'
                    ></li>
                <li :title = "width"></li>
            </ul>
        </div>
    `,
   
    methods: {
        showData(weizhi,data) {
            layer.open({
                type: 1,
                shade: false,
                title: false, //不显示标题
                content: (weizhi =='left'?'宽：':'高：')+data + 'px', //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                });
        },
        topOrLeft(item) {
            if(this.weizhi == 'left') {
                return {
                    left: item + 'px'
                }
            } else {
                return {
                    top: item + 'px'
                }
            }
        }
    },
}