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
                <vxe-table-column field="name" title="变量名" :edit-render="{name: 'ElInput'}"></vxe-table-column>
                <vxe-table-column field="type" title="类型" :edit-render="{name: 'ElSelect',options: typeList}"></vxe-table-column>
                <vxe-table-column field="scope" title="范围" :edit-render="{name: 'ElSelect',options: scopeList}"></vxe-table-column>
                <vxe-table-column field="defaultValue" title="默认值" :edit-render="{name: 'ElInput'}"></vxe-table-column>
                <vxe-table-column field="remark" title="说明" :edit-render="{name: 'ElInput'}"></vxe-table-column>
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
                    value: 'boolean',
                    label: 'boolean'
                }
            ],
            scopeList: [
                {
                    value: 'request',
                    label: 'request'
                },
                {
                    value: 'session',
                    label: 'session'
                },
                {
                    value: 'application',
                    label: 'application'
                }
            ],
            validRules: {
                name: [
                    {
                        required: true,
                        message: '变量名必须填写'
                    }
                ],
                type: [
                    {
                        required: true,
                        message: '类型必须填写'
                    }
                ],
                scope: [
                    {
                        required: true,
                        message: '范围必须填写'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['processVariable'])
    },
    watch: {
        processVariable: {
            handler(val, oldVal) {
                //console.log("流程变量被更新", val)
                this.loadVariable();
            },
            deep: true
        }
    },
    methods: {
        ...mapActions(['saveProcessVariable', 'delProcessVariable', 'updateProcessVariable']),
        loadVariable() {
            let process = this.$store.state.process;
            let variables = process.variables;
            //console.log("加载流程变量", process, variables);
            let tableData = [];
            for (var i = 0; i < variables.getSize(); i++) {
                var variable = variables.get(i);
                let record = {
                    id: variable.id,
                    name: variable.name,
                    type: variable.type,
                    scope: variable.scope,
                    defaultValue: variable.defaultValue,
                    remark: variable.remark
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
                scope: '',
                defaultValue: '',
                remark: ''
            }
            this.$refs.xTable.insert(record).then(({ row }) => this.$refs.xTable.setActiveRow(row))
        },
        saveEvent() {
            this.$refs.xTable.fullValidate((valid, errMap) => {
                if (valid) {
                    let { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getAllRecords()
                    insertRecords.forEach(rowData => {
                        //console.log("新增row", rowData)
                        this.saveProcessVariable(rowData);
                    });
                    removeRecords.forEach(rowData => {
                        //console.log("删除row", rowData)
                        let id = rowData.id;
                        this.delProcessVariable(id);
                    });
                    updateRecords.forEach(rowData => {
                        //console.log("修改row", rowData)
                        this.updateProcessVariable(rowData);
                    });
                    Message.success("保存成功！");
                } else {
                    let msgList = []
                    Object.values(errMap).forEach(errList => {
                        errList.forEach(params => {
                            let { rowIndex, column, rules } = params
                            rules.forEach(rule => {
                                msgList.push(`第 ${rowIndex} 行 ${column.title} 校验错误：${rule.message}`)
                            })
                        })
                    })
                    let error = Message.render(msgList);
                    Message.error(error);
                }
            })
        },
        removeRowEvent(row) {
            this.$refs.xTable.remove(row);
        }
    },
    mounted() {
        this.loadVariable()
    },
    activated() {

    }
}
</script>
