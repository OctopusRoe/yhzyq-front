<template >
  <div class="app-container">
    <div class="layout">
      <template>
        <el-row>
          <el-col>
            <el-radio
              v-model="radio"
              label="1"
              @change="getOrgTree"
              style="padding-left: 10px"
              >组织机构</el-radio
            >
            <el-radio v-model="radio" label="2" @change="getUserGroupTree"
              >用户组</el-radio
            >
          </el-col>
          <el-col style="padding-top: 10px">
            <el-radio
              v-model="radio"
              label="3"
              @change="getPositionTree"
              style="padding-left: 10px"
              >岗位</el-radio
            >
            <el-radio
              v-model="radio"
              label="4"
              @change="getRoleTree"
              style="padding-left: 28px"
              >角色</el-radio
            >
          </el-col>
        </el-row>
      </template>
      <el-scrollbar
          :style="{ height: siderHeigth, overflow: 'auto' }"
        >
      <div class="tree-box" v-show="isShow">
        
        <el-tree
          :props="defaultProps"
          :data="data"
          @node-click="handleNodeClick"
          default-expand-all
        />
        
      </div>
      
      <div class="tree-box" v-show="izShow">
        
        <!-- <TreeEx
          :queryParams="treeSet.queryParams"
          :serviceMethods="treeSet.serviceMethods"
          :extraParams="treeSet.extraParams"
          :menuTitle="treeSet.menuTitle"
          @clickMethod="refreshTab"
        ></TreeEx> -->
        <orgTree @orgTreeClick="refreshTab"></orgTree>
           
      </div>

      <div class="tree-box" v-show="ipShow">
        <el-tree
          :props="defaultProps"
          :data="dataPosition"
          @node-click="handleClick"
          default-expand-all
        />
      </div>
      <div class="tree-box" v-show="itShow">
        <el-tree
          :props="defaultProps"
          :data="dataRole"
          @node-click="handleRoleClick"
          default-expand-all
        />
      </div>
      </el-scrollbar>
    </div>
    <div class="layout-r">
      <el-form
        :model="queryParams"
        ref="queryForm"
        v-show="showSearch"
        :inline="true"
      >
        <el-row>
          <el-col :span="22">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入姓名"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="登录账号" prop="loginName">
              <el-input
                v-model="queryParams.loginName"
                placeholder="请输入登录账号"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="手机号码" prop="mobileNum">
              <el-input
                v-model="queryParams.mobileNum"
                placeholder="请输入手机号码"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="query"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" size="mini" @click="reset"
                >重置</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="2" style="padding-top: 7px; padding-left: 40px">
            <el-button
              icon="el-icon-plus"
              size="mini"
              v-show="isbutton"
              type="primary"
              @click="add"
              >添加</el-button
            >
          </el-col>

          <!-- <el-button icon="el-icon-s-unfold" size="mini" type="success"
          >导出</el-button
        >
        <el-button
          icon="el-icon-s-fold"
          size="mini"
          type="success"
          @click="importDialogFlag = true"
          >导入</el-button
        > -->
        </el-row>
      </el-form>

      <vxe-table
        v-loading="loading"
        :data="userList"
        border
        height="60%"
        width="100%"
        align="center"
      >
        <vxe-table-column
          title="排序"
          field="sortedNum"
          width="50px"
        ></vxe-table-column>
        <vxe-table-column
          title="id"
          field="id"
          v-if="showId"
        ></vxe-table-column>
        <vxe-table-column
          title="姓名"
          field="name"
          width="140px"
        ></vxe-table-column>
        <vxe-table-column
          title="登录账号"
          field="loginName"
          width="140px"
        ></vxe-table-column>
        <vxe-table-column
          title="手机号码"
          field="mobileNum"
          width="140px"
        ></vxe-table-column>
        <vxe-table-column
          title="工作邮箱"
          field="email"
          width="200px"
        ></vxe-table-column>
        <vxe-table-column
          title="身份证"
          field="cardNum"
          width="200px"
        ></vxe-table-column>
        <vxe-table-column
          title="工作地址"
          field="workAddress"
          width="130px"
        ></vxe-table-column>
        <vxe-table-column title="状态" field="userState" width="200px">
          <template slot-scope="scope">
            <vxe-switch
              v-model="scope.row.userState"
              open-label="启用"
              open-value="USERSTATE_NORMAL"
              close-label="禁止"
              close-value="USERSTATE_PROHIBIT"
              @change="stateUser(scope.row)"
            ></vxe-switch>
            <vxe-switch
              v-model="scope.row.locking"
              open-label="锁定"
              open-value="locking"
              close-label="解锁"
              close-value="Unlocking"
              @change="locking(scope.row)"
            ></vxe-switch>
            <!-- <vxe-switch  v-model="scope.row.userState" open-label="打开" :open-value="USERSTATE_NORMAL" close-label="关闭" :close-value="0" @change="stateUser(scope.row)"></vxe-switch> -->
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" width="150px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <vxe-button
              type="text"
              status="primary"
              @click="updateUser(scope.$index, scope.row)"
              >修改</vxe-button
            >

            <el-dropdown>
              <el-button type="text"
                >更多<i class="el-icon-arrow-down el-icon--right"></i
              ></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <vxe-button
                    type="text"
                    status="primary"
                    @click="deleteUser(scope.$index, scope.row)"
                    >删除</vxe-button
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <vxe-button
                    type="text"
                    status="primary"
                    @click="updatePass(scope.$index, scope.row)"
                    >重置密码</vxe-button
                  >
                </el-dropdown-item>

                <el-dropdown-item>
                  <vxe-tooltip
                    effect="dark"
                    content="分配角色"
                    placement="top-start"
                    :enterable="false"
                  >
                    <vxe-button
                      type="text"
                      status="primary"
                      @click="resources(scope.$index, scope.row)"
                      >资源授权</vxe-button
                    >
                  </vxe-tooltip>
                </el-dropdown-item>
                <el-dropdown-item>
                  <vxe-button
                    type="text"
                    status="primary"
                    @click="forbidRes(scope.$index, scope.row)"
                    >资源禁止</vxe-button
                  >
                </el-dropdown-item>
                <!-- <el-dropdown-item>
                  <vxe-button
                    type="text"
                    status="primary"
                    @click="stateUser(scope.$index, scope.row)"
                    >{{ state }}</vxe-button
                  >
                </el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </vxe-table-column>
      </vxe-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNumber"
        :limit.sync="queryParams.pageSize"
        @pagination="getPagination"
        style="float: right; padding-right: 450px"
      />

      <el-dialog
        title="新增用户"
        width="55%"
        class="dialog-common"
        v-dialogDrag
        :visible="addUserDialogFlag"
        @close="addUserDialogFlag = false"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
      >
        <el-form
          ref="addFormRef"
          :rules="addFormRules"
          :model="addParams"
          label-width="100px"
          :inline="true"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              placeholder="请输入姓名"
              size="medium"
              v-model="addParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录名" prop="loginName">
            <el-input
              placeholder="请输入登录名"
              size="medium"
              v-model="addParams.loginName"
            ></el-input>
          </el-form-item>

          <el-form-item label="来源系统" prop="systemId">
            <el-select
              placeholder="请选择"
              size="medium"
              width="80%"
              v-model="addParams.systemId"
            >
              <el-option
                v-for="item in sourceSystem"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="工号" prop="jobNum">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="addParams.jobNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="addParams.nickName"
            ></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="dutyId">
            <el-select
              placeholder="请选择"
              size="medium"
              width="80%"
              v-model="addParams.dutyId"
            >
              <el-option
                v-for="item in queryAllDuty"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobileNum">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="addParams.mobileNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作邮箱" prop="email">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="addParams.email"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio
              label="SEX_MAN"
              v-model="addParams.sex"
              style="margin-top: 10px"
              >男</el-radio
            >
            <el-radio label="SEX_WUMAN" v-model="addParams.sex">女</el-radio>
          </el-form-item>
          <el-form-item label="姓名拼音" prop="pingyinName">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="addParams.pingyinName"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="cardNum">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="addParams.cardNum"
            ></el-input>
          </el-form-item>

          <el-form-item label="民族" prop="national">
            <el-select
              placeholder="请选择"
              size="medium"
              width="85%"
              v-model="addParams.national"
            >
              <el-option
                v-for="item in national"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="办公室电话" prop="officeTelNum">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="addParams.officeTelNum"
            ></el-input>
          </el-form-item>

          <el-form-item label="工作地址" prop="workAddress">
            <el-input
              v-model="addParams.workAddress"
              size="medium"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="所在地区" prop="regionid">
            <el-input
              v-model="addParams.regionid"
              size="medium"
              placeholder="请输入内容"
              style="width: 70%"
            ></el-input>
            <el-button
              type="primary"
              style="margin-left: 5px"
              @click="areaDialogFlag = true"
              >选择</el-button
            >
          </el-form-item>
          <el-form-item label="籍贯" prop="nativePlace">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="addParams.nativePlace"
            ></el-input>
          </el-form-item>
          <el-form-item label="qq" prop="qq">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="addParams.qq"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              style="width: 85%"
              v-model="addParams.birthday"
            >
            </el-date-picker> </el-form-item
          ><br />
          <el-form-item label="登录密码" prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              size="medium"
              v-model="addParams.password"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sortedNum">
            <el-input-number
              size="medium"
              :mini="1"
              :step="1"
              controls-position="right"
              v-model="addParams.sortedNum"
              :step-strictly="true"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="头像" prop="headIcon">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              list-type="picture"
              v-model="addParams.headIcon"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="签名图片" prop="signPic">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              v-model="addParams.signPic"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-form :model="addParams" label-width="100px">
          <el-form-item label="个人介绍" prop="descriptions">
            <el-input
              type="textarea"
              style="width: 70%; padding-top: 10px"
              placeholder="请输入内容"
              v-model="addParams.descriptions"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center; padding-top: 10px">
          <el-button type="primary" size="medium" @click="addUserConfirm"
            >提交</el-button
          >
          <el-button size="medium" @click="addUserDialogFlags">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="修改用户"
        width="55%"
        class="dialog-common"
        :visible="updateUserDialogFlag"
        @close="updateUserDialogFlag = false"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
      >
        <el-form
          ref="addFormRef"
          :model="updateParams"
          label-width="100px"
          inline="true"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              placeholder="请输入姓名"
              size="medium"
              v-model="updateParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录名" prop="loginName" >
            <el-input
              placeholder="请输入登录名"
              size="medium"
              v-model="updateParams.loginName"
              disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="来源系统" prop="systemId">
            <el-select
              placeholder="请选择"
              size="medium"
              width="80%"
              v-model="updateParams.systemId"
            >
              <el-option
                v-for="item in sourceSystem"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工号" prop="jobNum">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="updateParams.jobNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="updateParams.nickName"
            ></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="dutyName">
            <el-select
              placeholder="请选择"
              size="medium"
              width="80%"
              v-model="updateParams.dutyName"
            >
              <el-option
                v-for="item in queryAllDuty"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobileNum">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="updateParams.mobileNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作邮箱" prop="email">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="updateParams.email"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio
              label="SEX_MAN"
              v-model="updateParams.sex"
              style="margin-top: 10px"
              >男</el-radio
            >
            <el-radio label="SEX_WUMAN" v-model="updateParams.sex">女</el-radio>
          </el-form-item>
          <el-form-item label="姓名拼音" prop="pingyinName">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="updateParams.pingyinName"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="cardNum">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="updateParams.cardNum"
            ></el-input>
          </el-form-item>

          <el-form-item label="民族" prop="national">
            <el-select
              placeholder="请选择"
              size="medium"
              width="85%"
              v-model="updateParams.national"
            >
              <el-option
                v-for="item in national"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="办公室电话" prop="officeTelNum">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="updateParams.officeTelNum"
            ></el-input>
          </el-form-item>

          <el-form-item label="工作地址" prop="workAddress">
            <el-input
              v-model="updateParams.workAddress"
              size="medium"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="所在地区" prop="regionid">
            <el-input
              v-model="updateParams.regionid"
              size="medium"
              placeholder="请输入内容"
              style="width: 70%"
            ></el-input>
            <el-button
              type="primary"
              style="margin-left: 5px"
              @click="areaDialogFlag = true"
              >选择</el-button
            >
          </el-form-item>
          <el-form-item label="籍贯" prop="nativePlace">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="updateParams.nativePlace"
            ></el-input>
          </el-form-item>
          <el-form-item label="qq" prop="qq">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="updateParams.qq"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              style="width: 85%"
              v-model="updateParams.birthday"
            >
            </el-date-picker> </el-form-item
          ><br />
          <el-form-item label="排序" prop="sortedNum">
            <el-input-number
              size="medium"
              controls-position="right"
              v-model="updateParams.sortedNum"
              :min="1"
              step-strictly
            ></el-input-number>
          </el-form-item>
          <el-form-item label="头像" prop="headIcon">
            <el-upload
              class="upload-demo"
              action="http://localhost:8020/api/system/user/editUser"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-change="handleChange"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              v-model="updateParams.headIcon"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="签名图片" prop="signPic">
            <el-upload
              class="upload-demo"
              action="http://localhost:8020/api/system/user/editUser"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              v-model="updateParams.signPic"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-form :model="updateParams" label-width="100px">
          <el-form-item label="个人介绍" prop="descriptions">
            <el-input
              type="textarea"
              style="width: 70%"
              placeholder="请输入内容"
              v-model="updateParams.descriptions"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center; padding-top: 10px">
          <el-button type="primary" size="medium" @click="updateUserConfirm"
            >提交</el-button
          >
          <el-button size="medium" @click="updateUserDialogFlag = false"
            >取消</el-button
          >
        </div>
      </el-dialog>

      <el-dialog
        title="选择"
        width="40%"
        :visible="areaDialogFlag"
        :modal-append-to-body="false"
        @close="areaDialogFlag = false"
      >
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-tabs v-model="areatab" @tab-click="areaTabChange">
              <el-tab-pane label="中国大陆" name="first"
                ><VueMagicTree
                  :setting="countryTreeSetting"
                  :nodes="countryNodes"
              /></el-tab-pane>
              <el-tab-pane label="港澳台" name="second"
                ><VueMagicTree
                  :setting="countryTreeSetting"
                  :nodes="countryNodes"
              /></el-tab-pane>
              <el-tab-pane label="东南亚" name="third"
                ><VueMagicTree
                  :setting="countryTreeSetting"
                  :nodes="countryNodes"
              /></el-tab-pane>
              <el-tab-pane label="其它" name="fourth"
                ><VueMagicTree
                  :setting="countryTreeSetting"
                  :nodes="countryNodes"
              /></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="11">
            <div class="areatreeWrap">
              <VueMagicTree :setting="setting" :nodes="areatree" />
            </div>
          </el-col>
        </el-row>
        <div style="text-align: center">
          <el-button type="primary" @click="areaConfirm">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="用户导入"
        width="26%"
        :visible="importDialogFlag"
        @close="importDialogFlag = false"
      >
        <div style="text-align: center">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </div>
        <div style="text-align: center">
          <el-button type="primary">下载模板</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="查看"
        width="66%"
        :visible="seeDialogFlag"
        @close="seeDialogFlag = false"
      >
        <div class="seeWrap">
          <el-row>
            <el-col :span="3">工号</el-col>
            <el-col :span="9">{{ viewParam.jobNum }}</el-col>
            <el-col :span="3">姓名</el-col>
            <el-col :span="9">{{ viewParam.name }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">登录名</el-col>
            <el-col :span="9">{{ viewParam.loginName }}</el-col>
            <el-col :span="3">性别</el-col>
            <el-col :span="9">{{ viewParam.sex }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">姓名拼音</el-col>
            <el-col :span="9">{{ viewParam.pingyinName }}</el-col>
            <el-col :span="3">工作邮箱</el-col>
            <el-col :span="9">{{ viewParam.email }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">昵称</el-col>
            <el-col :span="9">{{ viewParam.nickName }}</el-col>
            <el-col :span="3">手机号码</el-col>
            <el-col :span="9">{{ viewParam.mobileNum }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">身份证号码</el-col>
            <el-col :span="9">{{ viewParam.cardNum }}</el-col>
            <el-col :span="3">籍贯</el-col>
            <el-col :span="9">{{ viewParam.nativePlace }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">办公室电话</el-col>
            <el-col :span="9">{{ viewParam.officeTelNum }}</el-col>
            <el-col :span="3">所在地区</el-col>
            <el-col :span="9">{{ viewParam.regionid }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">工作地址</el-col>
            <el-col :span="9">{{ viewParam.workAddress }}</el-col>
            <el-col :span="3">所属机构</el-col>
            <el-col :span="9">{{ viewParam.orgId }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">民族</el-col>
            <el-col :span="9">{{ viewParam.national }}</el-col>
            <el-col :span="3">所属职位</el-col>
            <el-col :span="9">{{ viewParam.userDuty }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">出生日期</el-col>
            <el-col :span="9">{{ viewParam.birthday }}</el-col>
            <el-col :span="3">qq</el-col>
            <el-col :span="9">{{ viewParam.qq }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">微信</el-col>
            <el-col :span="21">{{ viewParam.weixin }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">身份证号码</el-col>
            <el-col :span="21">{{ viewParam.descriptions }}</el-col>
          </el-row>
        </div>
        <div style="text-align: center; padding-top: 15px">
          <el-button type="info" @click="seeDialogFlag = false">关闭</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="修改密码"
        width="35%"
        :visible="updatePassDialog"
        :append-to-body="true"
        @close="updatePassDialog = false"
      >
        <el-form
          ref="addFormRef"
          :model="updatePasswordParams"
          :rules="addFormRules"
          label-width="100px"
          inline="true"
        >
          <el-form-item label="新密码" prop="newPwds">
            <el-input
              type="password"
              size="medium"
              placeholder="请输入新密码"
              clearable
              style="width: 450px"
              v-model="updatePasswordParams.newPwds"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pNewPwds">
            <el-input
              type="password"
              size="medium"
              placeholder="请确认密码"
              clearable
              style="width: 450px"
              v-model="updatePasswordParams.pNewPwds"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button type="primary" @click="updatePasswordConfirm"
            >提交</el-button
          >
          <el-button
            @click="
              () => {
                this.$refs['addFormRef'].resetFields();
                this.updatePassDialog = false;
              }
            "
            >取消</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="禁止资源管理"
        width="17%"
        :visible="prohibitedDialog"
        @close="prohibitedDialog = false"
      >
        <div class="pTreeWrap">
          <VueMagicTree
            ref="prohibitedTree"
            :setting="prohibitedSetting"
            :nodes="prohibitedNodes"
          />
        </div>
        <div style="text-align: center; margin-top: 20px">
          <el-button type="primary" @click="checkConfirm">保存</el-button>
          <el-button type="info" @click="prohibitedDialog = false"
            >取消</el-button
          >
        </div>
      </el-dialog>
    </div>
    <authorize ref="authorize"></authorize>
    <forbidRes ref="forbidRes"></forbidRes>
  </div>
</template>

<script>
import {
  getSourceSystem,
  listUser,
  getAreaTree,
  getAreaName,
  getRcTreeData,
  getYyRourceTree,
  getJzRourceTree,
  getUserByIds,
  addUserService,
  deleteUserById,
  deleteUserByIdService,
  updateUserService,
  getDetailById,
  updatePassService,
  checkedSaveService,
  getUserGroupTree,
  queryUserGroupId,
  getPositionTree,
  queryPositionId,
  queryOrgId,
  queryAllDuty,
  stateUserNormal,
  queryNation,
  locking,
  getRoleTree,
  queryRoleId,
} from "@/api/system/user/user";
import "@/utils/directives.js";
import orgTree from "@/components/common/orgTree/index";
import VueMagicTree from "vue-magic-tree";
import authorize from "./authorize";
import forbidRes from "./forbidRes";
import TreeEx from "@/components/TreeEx/index";

export default {
  name: "User",
  components: { VueMagicTree, authorize, TreeEx, orgTree, forbidRes },
  data() {
    return {
      showId: false,
      isShow: true,
      izShow: false,
      ipShow: false,
      isLeaf: false,
      isbutton: true,
      itShow: false,
      radio: "1",
      loading: false,
      area: "",
      state: "变更状态",
      siderHeigth: "calc(89%)",
      drawer: false,
      userStated: {
        ids: "",
        stateUser: "",
        loginName: "",
        locking: "",
      },
      prohibitedDialog: false,
      updatePassDialog: false,
      seeDialogFlag: false,
      areatab: "first",
      msgtabList: [],
      importDialogFlag: false,
      areaDialogFlag: false,
      rourceDialog: false,
      roleOpen: false,
      currentId: undefined,
      treeSet: {
        serviceMethods: {
          queryMethod: "/orgDutyAction-getTreeData.do",
          nameKey: "text",
        },
        queryParams: {
          type: this.$route.query.type,
        },
        menuTitle: {
          topNodeTitle: "新增一级机构",
          addNodeTitle: "新增子机构",
          updNodeTitle: "编辑当前机构",
          delNodeTitle: "删除当前机构",
        },
        extraParams: {
          multiOrgType: this.$route.query.type,
        },
      },
      userStastes: [
        { label: "正常", value: "USERSTATE_NORMAL" },
        { label: "正常", value: "正常" },
      ],
      national: [],
      rourceTreeSetting: {
        data: {
          key: {
            name: "text",
          },
          simpleData: {
            enable: true,
          },
        },
        view: {
          showLine: true,
          showIcon: false,
        },
      },
      userGroupid: "",
      positionId: "",
      positionlId: "",
      dutyId: "",
      // name: {},
      data: [
        {
          label: "用户组",
          value: "0",
          children: [],
        },
      ],
      dataPosition: [
        {
          label: "岗位",
          value: "0",
          children: [],
        },
      ],
      dataRole: [
        {
          label: "角色",
          value: "0",
          children: [],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },

      rourceTreeNodes: [],
      pRourceTreeNodes: [],
      prohibitedSetting: {
        callback: {
          onClick: this.prohibitedTreeClick,
        },
        data: {
          key: {
            name: "text",
            checked: "checked",
          },
          simpleData: {
            enable: true,
          },
        },
        check: {
          enable: true,
          chkStyle: "checkbox",
          chkboxType: { Y: "p", N: "s" },
          nocheckInherit: true,
        },
        view: {
          showLine: true,
          showIcon: false,
        },
      },
      prohibitedNodes: [],
      countryTreeSetting: {
        callback: {
          onClick: this.countryTreeClick,
        },
        data: {
          key: {
            name: "text",
          },
          simpleData: {
            enable: true,
          },
        },
        view: {
          showLine: true,
          showIcon: false,
        },
      },
      setting: {
        callback: {
          onClick: this.zTreeOnClick,
        },
        data: {
          key: {
            name: "text",
          },
          simpleData: {
            enable: true,
          },
        },
        view: {
          showLine: true,
          showIcon: false,
        },
      },
      areatree: [],
      countryNodes: [{ code: "86", id: "37", text: "中国" }],
      fileList: [],

      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        orgId: "",
        userGroupid: "",
        positionlId: "",
        name: "",
        loginName: "",
        mobileNum: "",
        roleId: "",
        ocuth: "data_all",
      },
      total: 10,
      userList: [],
      showSearch: true,
      sourceSystem: [],
      queryAllDuty: [],
      addUserDialogFlag: false,
      updateUserDialogFlag: false,
      areaId: "",
      addParams: {
        sortedNum: 1,
      },
      viewParam: {},
      updateParams: {},
      updatePasswordParams: {},
      checkConfirmParams: {},
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        loginName: [
          { required: true, message: "请输入登录名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            required: true,
            pattern:
              /^(?!([a-zA-Z]+|[a-z\d]+|[a-z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[A-Z\d]+|[A-Z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+)$)[a-zA-Z\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+$/,
            message: "密码包含大小写字母、特殊符号、数字中的任意三项   8-20位!",
            trigger: "change",
          },
        ],
        mobileNum: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            required: true,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "手机号码输入有误!",
            trigger: "change",
          },
        ],
        email: [
          {
            required: true,
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确邮箱格式",
            trigger: "change",
          },
        ],
        cardNum: [
          {
            required: true,
            pattern:
              /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "输入身份证格式有误",
            trigger: "change",
          },
        ],
        newPwds: [
          { required: true, message: "密码不能为空", trigger: "change" },
          {
            required: true,
            pattern:
              /^(?!([a-zA-Z]+|[a-z\d]+|[a-z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[A-Z\d]+|[A-Z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+)$)[a-zA-Z\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+$/,
            message: "密码包含大小写字母、特殊符号、数字中的任意三项   8-20位!",
            trigger: "change",
          },
          {
            required: true,
            pattern: /^[^\u4e00-\u9fa5]{0,}$/,
            message: "输入有误!不能输入中文",
            trigger: "change",
          },
        ],
        pNewPwds: [
          { required: true, message: "密码不能为空", trigger: "change" },
          {
            required: true,
            pattern:
              /^(?!([a-zA-Z]+|[a-z\d]+|[a-z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[A-Z\d]+|[A-Z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+)$)[a-zA-Z\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+$/,
            message: "密码包含大小写字母、特殊符号、数字中的任意三项   8-20位!",
            trigger: "change",
          },
          {
            required: true,
            pattern: /^[^\u4e00-\u9fa5]{0,}$/,
            message: "输入有误!不能输入中文",
            trigger: "change",
          },
        ],
        oldPwds: [
          { required: true, message: "原始密码不能为空", trigger: "change" },
          {
            required: true,
            pattern: /^[^\u4e00-\u9fa5]{0,}$/,
            message: "输入有误!不能输入中文",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    // this.getUserGroupTree();
    // this.getListUser();
    this.getOrgTree();
    // this.getOrgTrees();
  },
  methods: {
    // getListUser() {
    //   this.loading = true;
    //   this.queryParams.pageNumber = this.page;
    //   this.queryParams.pageSize = this.size;
    //   listUser(this.queryParams).then((response) => {
    //     console.log("1123", response.total);
    //     this.userList = response.rows;
    //     this.loading = false;
    //     this.total = response.total;
    //   });
    //   // }
    //   this.loading = false;
    // },
    getSourceSystem() {
      getSourceSystem().then((response) => {
        console.log("111", response);
        this.sourceSystem = response.data;
      });
    },
    queryNations() {
      queryNation().then((response) => {
        this.national = response.rows;
      });
    },
    queryAllDutys() {
      console.log("222");
      queryAllDuty().then((response) => {
        eval(response);
        console.log("111", response);
        this.queryAllDuty = response.data;
        // this.dutyId=response.data;
        console.log("223", this.queryAllDuty);
      });
    },
    query() {
      this.loading = true;

      console.log("22", this.radio);
      if (this.radio == "1") {
        this.getOrgTrees();
      } else if (this.radio == "2") {
        this.findList();
      } else if (this.radio == "3") {
        this.findPositionIdList();
      } else {
        this.findRoleIdList();
      }

      this.loading = false;
    },
    reset() {
      this.queryParams.loginName = "";
      this.queryParams.mobileNum = "";
      this.queryParams.systemId = "";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList,"fileList");
    },
    handlePreview(file) {
      debugger
      console.log(file,"file");
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 上传文件改变时的状态，详见 change
    handleChange(file, fileList) {
      if (file.status == "success") {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.loadfileData();
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    add() {
      this.queryAllDutys();
      this.getSourceSystem();
      this.queryNations();
      // this.$nextTick(()=>{

      // })
      if (this.radio == "1" && this.queryParams.orgId === "") {
        this.$message("请先选择左侧组织机构根节点添加");
      } else if (this.isLeaf) {
        this.$message({
          message: "请先选择组织机构树叶子节点",
          type: "warning",
        });
        return false;
      } else if (
        (this.radio == "2" && this.queryParams.serGroupid === "") ||
        this.isLeaf ||
        this.queryParams.orgId === ""
      ) {
        this.$message({
          message: "请先选择组织机构树叶子节点",
          type: "warning",
        });
        return false;
      } else if (
        (this.radio == "3" && this.queryParams.positionId === "") ||
        this.isLeaf ||
        this.queryParams.orgId === ""
      ) {
        this.$message({
          message: "请先选择组织机构树叶子节点",
          type: "warning",
        });
        return false;
      } else {
        this.addUserDialogFlag = true;
        this.addParams.sortedNum = 1;
        console.log("1111", this.queryParams.userGroupid);
        this.addParams = {
          orgId: this.queryParams.orgId,
          userGroupId: this.queryParams.userGroupid,
          positionId: this.queryParams.positionlId,
          dutyId: this.queryParams.dutyId,
        };
      }
    },
    areaTabChange(t) {},
    countryTreeClick(evt, treeId, treeNode) {
      getAreaTree({ id: treeNode.code }).then((response) => {
        console.log(response);
        this.areatree = response;
      });
    },
    zTreeOnClick(evt, treeid, treeNode) {
      console.log(treeNode);
      this.areaId = treeNode.id;
    },
    areaConfirm() {
      this.areaDialogFlag = false;
      getAreaName({ regId: this.areaId }).then((response) => {
        this.addParams.regionid = response.data;
        this.updateParams.regionid = response.data;
      });
    },
    updateUser(i, row) {
      this.updateUserDialogFlag = true;
      this.queryAllDutys();
      this.getSourceSystem();
      let ids = row.id;
      getUserByIds(ids).then((response) => {
        this.updateParams = response.data[0];
      });
    },
    addUserConfirm() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
          addUserService(this.addParams).then((response) => {
          if (response.success) {
            this.$message("提交成功");
            if (this.radio == "1") {
              this.getOrgTrees();
            } else if (this.radio == "2") {
              this.findList();
            } else if (this.radio == "3") {
              this.findPositionIdList();
            } else {
              this.findRoleIdList();
            }
            this.addUserDialogFlag = false;
            this.$refs.addFormRef.resetFields(); // 重置表单项
          } else {
            this.$message("提交失败");
          }
        });
      });
    },
    updateUserConfirm() {
      delete this.updateParams.paramMap;
      delete this.updateParams.tempMap;
      updateUserService(this.updateParams).then((response) => {
        console.log(this.updateParams);
        if (response.success) {
          this.$message("修改成功");
          this.updateUserDialogFlag = false;
          if (this.radio == "1") {
            this.getOrgTrees();
          } else if (this.radio == "2") {
            this.findList();
          } else if (this.radio == "3") {
            this.findPositionIdList();
          } else {
            this.findRoleIdList();
          }
        } else {
          this.$message("修改失败");
        }
      });
    },
    deleteUser(i, row) {
      this.$confirm("确定删除这条记录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUserById(row.id).then((response) => {
            if (response.success) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              if (this.radio == "1") {
                this.getOrgTrees();
              } else if (this.radio == "2") {
                this.findList();
              } else if (this.radio == "3") {
                this.findPositionIdList();
              } else {
                this.findRoleIdList();
              }
            } else {
              this.$message("删除失败");
            }
          });
        })
        .catch(() => {});
    },
    seeUser(i, row) {
      this.seeDialogFlag = true;
      getDetailById(row.id).then((response) => {
        this.viewParam = response.data;
      });
    },
    updatePass(i, row) {
      this.updatePassDialog = true;

      this.updatePasswordParams.id = row.id;
      console.log(this.updatePasswordParams + "opp");
    },
    prohibited(i, r) {
      this.checkConfirmParams.roleid = r.id;
      getRcTreeData({ userId: r.id }).then((response) => {
        this.prohibitedDialog = true;
        this.prohibitedNodes = response;
      });
    },
    resources(i, r) {
      let userId = r.id;
      let loginName = r.loginName;
      this.$refs.authorize.showModal(userId, loginName);
    },
    stateUser(r) {
      this.userStated.Ids = r.id;
      this.userStated.stateUser = r.userState;
      stateUserNormal(this.userStated).then((response) => {
        if (response.success) {
          if (this.radio == "1") {
            this.getOrgTrees();
          } else if (this.radio == "2") {
            this.findList();
          } else if (this.radio == "3") {
            this.findPositionIdList();
          } else {
            this.findRoleIdList();
          }
          this.$message({
            type: "success",
            message: "状态修改成功!",
          });
        } else {
          this.$message("状态修改失败！");
        }
      });
    },
    locking(r) {
      this.userStated.Ids = r.id;
      this.userStated.loginName = r.loginName;
      this.userStated.locking = r.locking;
      locking(this.userStated).then((response) => {
        if (response.success) {
          if (this.radio == "1") {
            this.getOrgTrees();
          } else if (this.radio == "2") {
            this.findList();
          } else if (this.radio == "3") {
            this.findPositionIdList();
          } else {
            this.findRoleIdList();
          }
          this.$message({
            type: "success",
            message: "状态修改成功!",
          });
        } else {
          this.$message("状态修改失败！");
        }
      });
    },
    addUserDialogFlags() {
      this.addUserDialogFlag = false;
      this.$refs["addFormRef"].resetFields();
      //  this.$refs.addFormRef.resetFields(); // 重置表单项
    },
    forbidRes(i, r) {
      let userId = r.id;
      this.$refs.forbidRes.showModal(userId);
    },
    updatePasswordConfirm() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        updatePassService(this.updatePasswordParams).then((response) => {
          if (response.success) {
            this.$message({
              type: "success",
              message: response.msg,
            });
            this.$refs["addFormRef"].resetFields();
            this.updatePassDialog = false;
          } else {
            this.$message("两次密码输入不一致,请重新输入！");
          }
        });
      });
    },
    checkConfirm() {
      const checkedList =
        this.$refs.prohibitedTree.ztreeObj.getCheckedNodes(true);

      this.checkConfirmParams.arr1 = "";
      for (let i = 0; i < checkedList.length; i++) {
        if (i == checkedList.length - 1)
          this.checkConfirmParams.arr1 += checkedList[i].id;
        else this.checkConfirmParams.arr1 += checkedList[i].id + ",";
      }
      checkedSaveService(this.checkConfirmParams).then((response) => {
        if (response.success) {
          this.$message("保存成功");
        } else {
          this.$message("保存失败");
        }
      });
    },
    handleRole(row) {
      this.title = "选择角色";
      this.currentId = row.id;
      this.roleOpen = true;
    },
    //获取用户组资源树
    getUserGroupTree() {
      this.isShow = true;
      this.izShow = false;
      this.ipShow = false;
      this.itShow = false;
      this.isbutton = false;
      getUserGroupTree().then((response) => {
        console.log("0010", this.data);
        this.data[0].children = [];
        response.data.forEach((element) => {
          this.data[0].children.push({
            value: element.id,
            data: element,
            label: element.name,
          });
        });
      });
      this.findList();
    },
    //获取岗位树
    getPositionTree() {
      this.isShow = false;
      this.ipShow = true;
      this.izShow = false;
      this.isbutton = false;
      this.itShow = false;
      getPositionTree().then((responresse) => {
        console.log("000", this.data);
        this.dataPosition[0].children = [];
        responresse.data.forEach((element) => {
          console.log("100", element.code);
          this.dataPosition[0].children.push({
            value: element.id,
            dataPosition: element.code,
            label: element.descrption,
          });
        });
      });
      this.findPositionIdList();
    },
    //获取角色树
    getRoleTree() {
      this.isShow = false;
      this.ipShow = false;
      this.izShow = false;
      this.isbutton = false;
      this.itShow = true;
      getRoleTree().then((res) => {
        this.dataRole[0].children = [];
        res.data.forEach((element) => {
          this.dataRole[0].children.push({
            value: element.id,
            dataRole: element.id,
            label: element.name,
          });
        });
      });
      this.findRoleIdList();
    },
    getOrgTree() {
      this.isShow = false;
      this.ipShow = false;
      this.izShow = true;
      this.isbutton = true;
      this.itShow = false;
    },

    refreshTab(data) {
      console.log("data", data);
      if (data.children === null || data.children.length === 0) {
        this.isLeaf = false;
      } else {
        this.isLeaf = true;
      }
      this.queryParams.orgId = data.id;
      this.getOrgTrees();
    },
    // 选中资源树
    handleNodeClick(data) {
      this.queryParams.userGroupid = data.value;
      console.log("0001", this.groupid);
      this.findList();
    },
    handleClick(data) {
      this.queryParams.positionlId = data.value;
      this.findPositionIdList();
    },
    handleRoleClick(data) {
      this.queryParams.roleId = data.value;
      this.findRoleIdList();
    },
    findList() {
      console.log("0909", this.queryParams);
      queryUserGroupId(this.queryParams).then((response) => {
        console.log(response);
        this.userList = response.rows;
        this.total = response.total;
      });
    },
    getPagination() {
      if (
        !this.queryParams.name == "" ||
        !this.queryParams.loginName == "" ||
        !this.queryParams.mobileNum == ""
      ) {
        this.getListUser();
      } else if (this.radio === "1") {
        this.getOrgTrees();
      } else if (this.radio === "2") {
        this.findList();
      } else {
        this.findPositionIdList();
      }
    },
    getOrgTrees() {
      queryOrgId(this.queryParams).then((response) => {
        console.log(response);
        this.userList = response.rows;
        this.total = response.total;
      });
    },
    findPositionIdList() {
      console.log("0909", this.positionlId, this.page, this.size);
      queryPositionId(this.queryParams).then((response) => {
        console.log("response", response.rows.positionlId);
        this.userList = response.rows;
        this.total = response.total;
        console.log("response", this.userList);
      });
    },
    findPositionIdList() {
      console.log("0909", this.positionlId, this.page, this.size);
      queryPositionId(this.queryParams).then((response) => {
        console.log("response", response.rows.positionlId);
        this.userList = response.rows;
        this.total = response.total;
        console.log("response", this.userList);
      });
    },
    findRoleIdList() {
      queryRoleId(this.queryParams).then((response) => {
        this.userList = response.rows;
        this.total = response.total;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-col-3 {
  text-align: right;
}
.el-row {
  margin: 10px 0;
}
.file_ico_docu {
  margin-right: 2px;
  background: url(../../../assets/image/ycTreeFile.png) no-repeat scroll center
    center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  display: inline-block !important;
}
.ico_docu {
  margin-right: 2px;
  background: url(../../../assets/image/ycTreeFile.png) no-repeat scroll center
    center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  display: inline-block !important;
}

.button.roots_close {
  background: url(../../../assets/image/ycTreeFolder.png) no-repeat scroll
    center center transparent;
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
  background: url(../../../assets/image/ycTreeFolderOpen.png) no-repeat scroll
    center center transparent;
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
  background: url(../../../assets/image/ycTreeFolder.png) no-repeat scroll
    center center transparent;
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
  background: url(../../../assets/image/ycTreeFolderOpen.png) no-repeat scroll
    center center transparent;
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
.button.root_close {
  background: url(../../../assets/image/ycTreeFolder.png) no-repeat scroll
    center center transparent;
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
.button.root_open {
  background: url(../../../assets/image/ycTreeFolderOpen.png) no-repeat scroll
    center center transparent;
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
  background: url(../../../assets/image/ycTreeFolderOpen.png) no-repeat scroll
    center center transparent;
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
  background: url(../../../assets/image/ycTreeFolder.png) no-repeat scroll
    center center transparent;
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

::-webkit-scrollbar {
  width: 8px;
  height: 16px;
  background-color: #3788fd;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #3788fd;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #3788fd;
}
.areatreeWrap {
  height: 390px;
  overflow-y: auto;
}
.el-tabs__content .ztree span.button {
  display: none;
}
.el-col-11 {
  border: 1px solid #eee;
  padding: 3px 10px;
}
.el-dialog__body {
  padding: 10px 20px 30px 20px;
}
.seeWrap {
  border-top: 1px solid #ccc;
  border-left: 1px solid #e5e5e5;

  .el-col-3 {
    background-color: #f6f6f6;
    font-weight: bold;
  }
  .el-row {
    margin: 0 !important;
    border-bottom: 1px solid #ccc;
    .el-col {
      padding: 15px 10px;
      border-right: 1px solid #e5e5e5;
    }
  }
}
.pTreeWrap {
  height: 300px;
  overflow-y: auto;
  padding-left: 15%;
}
.rTitle {
  height: 42px;
  line-height: 42px;
  background: #008fe1;
  text-indent: 15px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px 5px 0 0;
}
.rouceWrap .el-col-11 {
  padding: 0;
}
.rTreeWrap {
  padding: 10px;
  max-height: 360px;
  min-height: 200px;
  overflow-y: auto;
}
.app-container {
  display: flex;
  height: 100%;
}
.layout {
  display: block !important;
  float: left;
  padding-left: -50px;
  padding-top: 20px;
  width: 18%;
  height: 100%;
  border-right: 1px solid #ececec;
  background: #fff;
  position: absolute;
}
.layout-r {
  padding-top: 10px;
  padding-left: 100px;
  width: 85%;
  height: 100%;
  margin-left: 13%;
}
.tree-box {
  // position: absolute;
  padding-top: 20px;

  width: 300px;
}
</style>
