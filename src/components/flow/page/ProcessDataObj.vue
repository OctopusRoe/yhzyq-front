<template>
    <el-row>
        <el-col :span="24">
            <vxe-toolbar setting>
                <template v-slot:buttons>
                    <el-button @click="insertEvent">新增</el-button>
                    <el-button @click="saveEvent">保存</el-button>
                </template>
            </vxe-toolbar>
            <vxe-table ref="xTable" class="vxe-table-element" border auto-resize show-overflow :data.sync="tableData" :edit-rules="validRules" :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
                <vxe-table-column field="name" title="名称" :edit-render="{name: 'ElInput'}"></vxe-table-column>
                <vxe-table-column field="type" title="类型" :edit-render="{name: 'ElSelect',options: typeList}"></vxe-table-column>
                <vxe-table-column field="value" title="值" :edit-render="{name: 'ElInput'}"></vxe-table-column>
                <vxe-table-column title="操作">
                    <template v-slot="{ row }">
                        <vxe-button @click="removeRowEvent(row)">删除</vxe-button>
                    </template>
                </vxe-table-column>
            </vxe-table>
        </el-col>
    </el-row>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Message from '../common/Message'
export default {
    data() {
        return {
            tableData: [],
            typeList: [
                {
                    value: 'string',
                    label: 'string'
                },
                {
                    value: 'double',
                    label: 'double'
                },
                {
                    value: 'long',
                    label: 'long'
                },
                {
                    value: 'int',
                    label: 'int'
                },
                {
                    value: 'datatime',
                    label: 'datatime'
                }
            ],
            validRules: {
                name: [
                    {
                        required: true,
                        message: '名称必须填写'
                    }
                ],
                type: [
                    {
                        required: true,
                        message: '类型必须填写'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['processDataObj'])
    },
    watch: {
        processDataObj: {
            handler(val, oldVal) {
                //console.log("流程数据对象被更新", val)
                this.loadDataObj();
            },
            deep: true
        }
    },
    methods: {
        ...mapActions(['saveProcessDataObj', 'delProcessDataObj', 'updateProcessDataObj']),
        loadDataObj() {
            let process = this.$store.state.process;
            let dataObjs = process.dataObjects;
            //console.log("加载流程数据对象", process, dataObj);
            let tableData = [];
            for (var i = 0; i < dataObjs.getSize(); i++) {
                var dataObj = dataObjs.get(i);
                let record = {
                    id: dataObj.id,
                    name: dataObj.name,
                    type: dataObj.type,
                    value: dataObj.value
                }
                tableData.push(record);
            }
            this.tableData = tableData;
        },
        editRowEvent(row) {
            this.$refs.xTable.setActiveRow(row)
        },
        saveRowEvent(row) {
            //this.$XMsg.alert('success')
            this.cancelRowEvent()
        },
        cancelRowEvent(row) {
            this.$refs.xTable.clearActived()
        },
        insertEvent() {
            let record = {
                name: '',
                type: '',
                value: ''
            }
            this.$refs.xTable.insert(record).then(({ row }) => this.$refs.xTable.setActiveRow(row))
            console.log(this.tableData)
        },
        saveEvent() {
            let { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getAllRecords()
            insertRecords.forEach(rowData => {
                console.log("新增row", rowData)
                this.saveProcessDataObj(rowData);
            });
            removeRecords.forEach(rowData => {
                console.log("删除row", rowData)
                let id = rowData.id;
                this.delProcessDataObj(id);
            });
            updateRecords.forEach(rowData => {
                console.log("修改row", rowData)
                this.updateProcessDataObj(rowData);
            });
            Message.success("保存成功！");
        },
        removeRowEvent(row) {
            this.$refs.xTable.remove(row);
        }
    },
    mounted() {
        this.loadDataObj()
    }
}
</script>
