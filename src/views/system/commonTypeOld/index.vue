<template>
  <div class="app-container">
    <el-row>
      <!--左树-->
      <el-col :span="4" :xs="24">
        <TreeEx :queryParams="treeSet.queryParams" @clickMethod="getDetail"></TreeEx>
      </el-col>
      <!--右详情-->
      <el-col :span="20" :xs="24">
        <div class="pTable">
          <table class="lookTable">
            <tbody>
            <tr class="lbg">
              <th style="width: 20%">类型编码:</th>
              <td class="lt" style="width: 80%">
                <span id="id">{{ detail.code }}</span>
              </td>
            </tr>
            <tr>
              <th>类型名称:</th>
              <td class="lt">
                <span id="name">{{ detail.typename }}</span>
              </td>
            </tr>
            <tr>
              <th>类型类别:</th>
              <td class="lt">
                <span id="levelCode">{{ detail.typeidName }}</span>
              </td>
            </tr>
            <tr>
              <th>排序号:</th>
              <td class="lt">
                <span id="aliasName">{{ detail.sortedOrder }}</span>
              </td>
            </tr>
            <tr class="lbg">
              <th>备注:</th>
              <td class="lt">
                <span id="resTypeCode">{{ detail.remark }}</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import { getCommonTypeData } from '@/api/system/commonType'
  import TreeEx from '@/components/common/TreeEx/index'

  export default {
    name: 'CommonType',
    components: { TreeEx },
    data() {
      return {
        // 遮罩层
        loading: false,
        treeSet: {
          queryParams: {
            dicttypeid: this.$route.query.id
          }
        },
        detail: {
          code: undefined,
          typename: undefined,
          typeidName: undefined,
          sortedOrder: undefined,
          remark: undefined
        }

      }
    },
    watch: {},
    created() {

    },
    methods: {

      /** 查询详细 */
      getDetail(id) {
        getCommonTypeData(id).then((res) => {
          this.detail = res.data
        })
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" >
  .pTable {
    margin: 20px 20px 0;
  }

  .lookTable {
    width: 100%;
    border: 1px solid #e5e5e5;
    border-collapse: collapse;
  }

  .lookTable tr {
    height: 50px;
    padding: 5px 0;
  }

  .lookTable th {
    width: 20%;
    text-align: right;
    padding-right: 5px;
    color: #000;
    line-height: 36px;
    font-weight: bold;
  }

  .lookTable th,
  .lookTable td {
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    border-right: 1px solid #e5e5e5;
  }
  .lookTable th {
    background: #f6f6f6;
  }

  .lt {
    padding: 0 10px;
    color: #444;
  }
  .download {
    text-align: center;
    > a {
      background-color: #4381e6;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
    }
    margin-top: 20px;
  }
  div#rMenu {
    position: absolute;
    top: 0;
    text-align: left;
    border: 1px solid #d3d3d3;
    background-color: #fff;
    visibility: hidden;
    ul {
      margin: 0;
      padding: 0;
    }
  }
  div#rMenu ul li {
    padding: 0 5px;
    cursor: pointer;
    list-style: none outside none;
    padding: 6px 44px 6px 15px;
    &:hover {
      background-color: #e2e2e2;
    }
    color: #999;
    * {
      vertical-align: middle;
    }
  }
  .nodetable {
    width: 100%;
    th,
    td {
      padding: 5px 10px;
    }
    tr {
      th:first-child,
      td:first-child,
      th:nth-child(3),
      td:nth-child(3) {
        text-align: right;
      }
      th:last-child,
      td:last-child,
      th:nth-child(2),
      td:nth-child(2) {
        text-align: left;
      }
    }
  }
  .file_ico_docu {
    margin-right: 2px;
    background: url(../../../assets/image/ycTreeFile.png) no-repeat scroll center center transparent;
    background-size: 100% 100%;
    vertical-align: top;
    *vertical-align: middle;
    width: 16px !important;
    height: 32px !important;
    display: inline-block !important;
  }
  .ico_docu {
    margin-right: 2px;
    background: url(../../../assets/image/ycTreeFile.png) no-repeat scroll center center transparent;
    background-size: 100% 100%;
    vertical-align: top;
    *vertical-align: middle;
    width: 16px !important;
    height: 32px !important;
    display: inline-block !important;
  }

  .button.roots_close {
    background: url(../../../assets/image/ycTreeFolder.png) no-repeat scroll center center transparent;
    background-size: 100% 100%;
    vertical-align: top;
    *vertical-align: middle;
    width: 16px !important;
    height: 32px !important;
    &:before {
      content: "" !important;
      display: none !important;
    }
  }
  .button.roots_open {
    background: url(../../../assets/image/ycTreeFolderOpen.png) no-repeat scroll center center
    transparent;
    background-size: 100% 100%;
    vertical-align: top;
    *vertical-align: middle;
    width: 16px !important;
    height: 32px !important;
    &:before {
      content: "" !important;
      display: none !important;
    }
  }
  .button.center_close {
    background: url(../../../assets/image/ycTreeFolder.png) no-repeat scroll center center transparent;
    background-size: 100% 100%;
    vertical-align: top;
    *vertical-align: middle;
    width: 16px !important;
    height: 32px !important;
    &:before {
      content: "" !important;
      display: none !important;
    }
  }
  .button.center_open {
    background: url(../../../assets/image/ycTreeFolderOpen.png) no-repeat scroll center center
    transparent;
    background-size: 100% 100%;
    vertical-align: top;
    *vertical-align: middle;
    width: 16px !important;
    height: 32px !important;
    &:before {
      content: "" !important;
      display: none !important;
    }
  }
  .button.bottom_open {
    background: url(../../../assets/image/ycTreeFolderOpen.png) no-repeat scroll center center
    transparent;
    background-size: 100% 100%;
    vertical-align: top;
    *vertical-align: middle;
    width: 16px !important;
    height: 32px !important;
    &:before {
      content: "" !important;
      display: none !important;
    }
  }
  .button.bottom_close {
    background: url(../../../assets/image/ycTreeFolder.png) no-repeat scroll center center transparent;
    background-size: 100% 100%;
    vertical-align: top;
    *vertical-align: middle;
    width: 16px !important;
    height: 32px !important;
    &:before {
      content: "" !important;
      display: none !important;
    }
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      height: calc(100vh - 84px);
      .app-container {
        height: 100%;
        padding: 0 20px;
        > .el-row {
          height: 100%;
          > div {
            height: 100%;
          }
          > div.el-col-4 {
            border-right: 10px solid #eee;
            padding: 20px;
          }
        }
      }
    }
  }
  body {
    overflow: hidden;
  }
  .el-scrollbar__wrap {
    overflow: auto;
    margin: 0 !important;
  }
  body .el-dialog__body {
    padding: 10px 20px 30px 20px;
  }
</style>
