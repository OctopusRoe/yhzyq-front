
<template>
    <div class="hello">
        <div
                id="luckysheet"
                style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 50px;"
        ></div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                celldata:[{
                            "r": 0,
                            "c": 0,
                            "v": {
                                ct: {fa: "General", t: "g"},
                                m:"value1",
                                v:"value1"
                            }
                        }, {
                            "r": 0,
                            "c": 1,
                            "v": {
                                ct: {fa: "General", t: "g"},
                                m:"value2",
                                v:"value2"
                            }
                        }],
              sheetData:[
                            [{
                                ct: {fa: "General", t: "g"},
                                m:"value1",
                                v:"value1"
                            }, {
                                ct: {fa: "General", t: "g"},
                                m:"value2",
                                v:"value2"
                            }],
                            [{
                                ct: {fa: "General", t: "g"},
                                m:"value3",
                                v:"value3"
                            }, {
                                ct: {fa: "General", t: "g"},
                                m:"value4",
                                v:"value4"
                            }]
                        ],
            }
        },
        mounted() {
            this.init()
        },
        methods:{
            init(){
                const  options =  {
                    container: 'luckysheet', // 设定DOM容器的id
                    title: 'Luckysheet Demo', // 设定表格名称
                    lang: 'zh' // 设定表格语言
                    // 更多其他设置...
                }
                luckysheet.create(options)
            }
        }
    }
</script>


