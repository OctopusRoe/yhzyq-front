
<template>
    <div>
         <el-row  type="flex" justify="left">
             <el-col>
                execl转html,复杂表格demo
             </el-col>
         </el-row>
         <el-row  type="flex" justify="left">
             <el-col>
                监理单位:江西省公路工程监理有限公司
             </el-col>
             <el-col>
                合同段:R1
             </el-col>
         </el-row>
         <el-row  type="flex" justify="left">
             <el-col>
                服务期限:2021年1月-2021年-2月
             </el-col>
             <el-col>
                期数:第1期
             </el-col>
         </el-row>            
        <el-row type="flex" >
            <el-col>
                <div style="text-align: center;">
                    <table width="774.00" border="0" cellpadding="0" cellspacing="0" style='width:464.40pt;border-collapse:collapse;table-layout:fixed;'>
            <col width="132" class="xl65" style='mso-width-source:userset;mso-width-alt:3861;'/>
            <col width="206" class="xl65" style='mso-width-source:userset;mso-width-alt:6026;'/>
            <col width="165" class="xl65" style='mso-width-source:userset;mso-width-alt:4827;'/>
            <col width="127" class="xl65" style='mso-width-source:userset;mso-width-alt:3715;'/>
            <col width="144.00" class="xl65" style='mso-width-source:userset;mso-width-alt:4212;'/>
            <col width="81" span="16379" class="xl65" style='mso-width-source:userset;mso-width-alt:2369;'/>
            <tr height="36.67" style='height:22.00pt;mso-height-source:userset;mso-height-alt:440;'>
                <td class="xl66" height="36.67" width="503" colspan="3" style='height:22.00pt;width:301.80pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>合同金额</td>
                <td class="xl66" width="271.00" colspan="2" style='width:162.60pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:num>123</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl66" height="312.00" rowspan="13" style='height:187.20pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>付款项目</td>
                <td class="xl66" x:str>项目名称</td>
                <td class="xl66" x:str>上期累计支付</td>
                <td class="xl66" x:str>本期支付</td>
                <td class="xl66" x:str>累计支付</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl66" x:str>施工期服务费</td>
                <td class="xl66" x:num>1</td>
                <td class="xl66" x:num>22</td>
                <td class="xl66" x:num>
					<!-- <input type="text" name="" value='1' size=5 /> -->
					<input type="text" name="test1"  v-model="formData.count" size=5 @change="change"  placeholder="请输入账号" />
				</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl66" x:str>施工期设施费</td>
                <td class="xl66" x:num>1</td>
                <td class="xl66" x:num>2</td>
                <td class="xl66" x:num>{{formData.count1}}</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl67" x:str>品质工程技术咨询服务</td>
                <td class="xl66" x:num>1</td>
                <td class="xl66" x:num>2</td>
                <td class="xl66" x:num>2</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl67" x:str>0号变更审查费</td>
                <td class="xl66" x:num>11</td>
                <td class="xl66" x:num>3</td>
                <td class="xl66" x:num>3</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl67" x:str>缺陷期服务费</td>
                <td class="xl66" x:num>12</td>
                <td class="xl66" x:num>4</td>
                <td class="xl66" x:num>4</td>
            </tr>
            <tr height="24" style='height:15.40pt;'>
                <td class="xl67" x:str>缺陷期设施费</td>
                <td class="xl66" x:num>
                   <input type="text" name="" value='123' />
                </td>
                <td class="xl66" x:num>5</td>
                <td class="xl66" x:num>5</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl67" x:str>小计</td>
                <td class="xl66" x:num>14</td>
                <td class="xl66" x:num>6</td>
                <td class="xl66" x:num>
            	<!-- <input type="text" name="" value='12' size=5/>  -->
                <input type="text" name="test2"  disabled v-model="formData.total" size=5  placeholder="请输入账号">
				</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl67" x:str>利润</td>
                <td class="xl66" x:num>15</td>
                <td class="xl66" x:num>7</td>
                <td class="xl66" x:num>30</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl67" x:str>暂列金额</td>
                <td class="xl66" x:num>16</td>
                <td class="xl66" x:num>8</td>
                <td class="xl66" x:num>31</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl67" x:str>管理目标风险金</td>
                <td class="xl66" x:num>17</td>
                <td class="xl66" x:num>9</td>
                <td class="xl66" x:num>32</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl67" x:str>开工预付款</td>
                <td class="xl66" x:num>18</td>
                <td class="xl66" x:num>10</td>
                <td class="xl66" x:num>33</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl67" x:str>其它付款项</td>
                <td class="xl66" x:num>19</td>
                <td class="xl66" x:num>11</td>
                <td class="xl66" x:num>34</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl66" height="96" rowspan="4" style='height:57.60pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>扣款项目</td>
                <td class="xl66" x:str>项目名称</td>
                <td class="xl66" x:num>20</td>
                <td class="xl66" x:num>12</td>
                <td class="xl66" x:num>35</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl66" x:str>扣开预付款</td>
                <td class="xl66" x:num>21</td>
                <td class="xl66" x:num>13</td>
                <td class="xl66" x:num>36</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl66" x:str>其它扣款项</td>
                <td class="xl66" x:num>22</td>
                <td class="xl66" x:num>14</td>
                <td class="xl66" x:num>37</td>
            </tr>
            <tr height="24" style='height:14.40pt;'>
                <td class="xl66" x:str>玖仟玖佰玖拾玖</td>
                <td class="xl66" x:num>23</td>
                <td class="xl66" x:num>15</td>
                <td class="xl66" x:num>38</td>
            </tr>
            <tr height="45" style='height:27.00pt;mso-height-source:userset;mso-height-alt:540;'>
                <td class="xl66" height="45" style='height:27.00pt;' x:str>本期实付</td>
                <td class="xl66" x:str>壹仟</td>
                <td class="xl66" x:num>100</td>
                <td class="xl66" x:num>100</td>
                <td class="xl66" x:fmla="=SUM(E3:E18)" x:num>488</td>
            </tr>
            <tr height="50" style='height:30.00pt;mso-height-source:userset;mso-height-alt:600;'>
                <td class="xl66" height="50" style='height:30.00pt;' x:str>累计支付</td>
                <td class="xl66" x:str>壹仟</td>
                <td class="xl66" x:num>100</td>
                <td class="xl66" x:num>100</td>
                <td class="xl66" x:num>100</td>
            </tr>
                    </table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'helloWorld',
        props: {
            msg: String
        },
        data() {
            return {
               formData:{
                   name:'aaaaaaaa',
                   test:'sssss',
                   count:100,
				   count1:1,
				   total:115,
               },
            }
        },
		watch: {
            'formData.count':function(v,oldv){
				this.formData.total=14+parseFloat(this.formData.count)+parseFloat(this.formData.count1) ;
				//alert(`监听属性事件:新的值===v${v},旧的值====${oldv}`);
			}    
		},
        mounted() {
            
        },
        methods:{
            init(){
            },
            change(){
                
				//alert(`输入值改变事件,实时计算===${this.formData.count}`);
            },
        }
    }
</script>

<style>
 @page
	{margin:0.75in 0.70in 0.75in 0.70in;
	mso-header-margin:0.30in;
	mso-footer-margin:0.30in;}
tr
	{mso-height-source:auto;
	mso-ruby-visibility:none;}
col
	{mso-width-source:auto;
	mso-ruby-visibility:none;}
br
	{mso-data-placement:same-cell;}
.font0
	{color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:134;}
.font1
	{color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font2
	{color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font3
	{color:#1F497D;
	font-size:15.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:134;}
.font4
	{color:#3F3F76;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font5
	{color:#9C0006;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font6
	{color:#1F497D;
	font-size:13.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:134;}
.font7
	{color:#0000FF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:underline;
	text-underline-style:single;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font8
	{color:#800080;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:underline;
	text-underline-style:single;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font9
	{color:#1F497D;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:134;}
.font10
	{color:#3F3F3F;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font11
	{color:#FF0000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font12
	{color:#1F497D;
	font-size:18.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:134;}
.font13
	{color:#7F7F7F;
	font-size:11.0pt;
	font-weight:400;
	font-style:italic;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font14
	{color:#000000;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font15
	{color:#FA7D00;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font16
	{color:#9C6500;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font17
	{color:#FFFFFF;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font18
	{color:#FA7D00;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.font19
	{color:#006100;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"宋体";
	mso-generic-font-family:auto;
	mso-font-charset:0;}
.style0
	{mso-number-format:"General";
	text-align:general;
	vertical-align:middle;
	white-space:nowrap;
	mso-rotate:0;
	mso-pattern:auto;
	mso-background-source:auto;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:134;
	border:none;
	mso-protection:locked visible;
	mso-style-name:"常规";
	mso-style-id:0;}
.style16
	{mso-number-format:"_ \0022\00A5\0022* \#\,\#\#0_ \;_ \0022\00A5\0022* \\-\#\,\#\#0_ \;_ \0022\00A5\0022* \0022-\0022_ \;_ \@_ ";
	mso-style-name:"货币[0]";
	mso-style-id:7;}
.style17
	{mso-pattern:auto none;
	background:#EBF1DE;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"20% - 强调文字颜色 3";}
.style18
	{mso-pattern:auto none;
	background:#FFCC99;
	color:#3F3F76;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	border:.5pt solid #7F7F7F;
	mso-style-name:"输入";}
.style19
	{mso-number-format:"_ \0022\00A5\0022* \#\,\#\#0\.00_ \;_ \0022\00A5\0022* \\-\#\,\#\#0\.00_ \;_ \0022\00A5\0022* \0022-\0022??_ \;_ \@_ ";
	mso-style-name:"货币";
	mso-style-id:4;}
.style20
	{mso-number-format:"_ * \#\,\#\#0_ \;_ * \\-\#\,\#\#0_ \;_ * \0022-\0022_ \;_ \@_ ";
	mso-style-name:"千位分隔[0]";
	mso-style-id:6;}
.style21
	{mso-pattern:auto none;
	background:#D8E4BC;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"40% - 强调文字颜色 3";}
.style22
	{mso-pattern:auto none;
	background:#FFC7CE;
	color:#9C0006;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"差";}
.style23
	{mso-number-format:"_ * \#\,\#\#0\.00_ \;_ * \\-\#\,\#\#0\.00_ \;_ * \0022-\0022??_ \;_ \@_ ";
	mso-style-name:"千位分隔";
	mso-style-id:3;}
.style24
	{mso-pattern:auto none;
	background:#C4D79B;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"60% - 强调文字颜色 3";}
.style25
	{color:#0000FF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:underline;
	text-underline-style:single;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"超链接";
	mso-style-id:8;}
.style26
	{mso-number-format:"0%";
	mso-style-name:"百分比";
	mso-style-id:5;}
.style27
	{color:#800080;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:underline;
	text-underline-style:single;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"已访问的超链接";
	mso-style-id:9;}
.style28
	{mso-pattern:auto none;
	background:#FFFFCC;
	border:.5pt solid #B2B2B2;
	mso-style-name:"注释";}
.style29
	{mso-pattern:auto none;
	background:#DA9694;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"60% - 强调文字颜色 2";}
.style30
	{color:#1F497D;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:134;
	mso-style-name:"标题 4";}
.style31
	{color:#FF0000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"警告文本";}
.style32
	{color:#1F497D;
	font-size:18.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:134;
	mso-style-name:"标题";}
.style33
	{color:#7F7F7F;
	font-size:11.0pt;
	font-weight:400;
	font-style:italic;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"解释性文本";}
.style34
	{color:#1F497D;
	font-size:15.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:134;
	border-left:none;
	border-top:none;
	border-right:none;
	border-bottom:1.0pt solid #4F81BD;
	mso-style-name:"标题 1";}
.style35
	{color:#1F497D;
	font-size:13.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:134;
	border-left:none;
	border-top:none;
	border-right:none;
	border-bottom:1.0pt solid #4F81BD;
	mso-style-name:"标题 2";}
.style36
	{mso-pattern:auto none;
	background:#95B3D7;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"60% - 强调文字颜色 1";}
.style37
	{color:#1F497D;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:134;
	border-left:none;
	border-top:none;
	border-right:none;
	border-bottom:1.0pt solid #A7BFDE;
	mso-style-name:"标题 3";}
.style38
	{mso-pattern:auto none;
	background:#B1A0C7;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"60% - 强调文字颜色 4";}
.style39
	{mso-pattern:auto none;
	background:#F2F2F2;
	color:#3F3F3F;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	border:.5pt solid #3F3F3F;
	mso-style-name:"输出";}
.style40
	{mso-pattern:auto none;
	background:#F2F2F2;
	color:#FA7D00;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	border:.5pt solid #7F7F7F;
	mso-style-name:"计算";}
.style41
	{mso-pattern:auto none;
	background:#A5A5A5;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	border:2.0pt double #3F3F3F;
	mso-style-name:"检查单元格";}
.style42
	{mso-pattern:auto none;
	background:#FDE9D9;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"20% - 强调文字颜色 6";}
.style43
	{mso-pattern:auto none;
	background:#C0504D;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"强调文字颜色 2";}
.style44
	{color:#FA7D00;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	border-left:none;
	border-top:none;
	border-right:none;
	border-bottom:2.0pt double #FF8001;
	mso-style-name:"链接单元格";}
.style45
	{color:#000000;
	font-size:11.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	border-left:none;
	border-top:.5pt solid #4F81BD;
	border-right:none;
	border-bottom:2.0pt double #4F81BD;
	mso-style-name:"汇总";}
.style46
	{mso-pattern:auto none;
	background:#C6EFCE;
	color:#006100;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"好";}
.style47
	{mso-pattern:auto none;
	background:#FFEB9C;
	color:#9C6500;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"适中";}
.style48
	{mso-pattern:auto none;
	background:#DAEEF3;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"20% - 强调文字颜色 5";}
.style49
	{mso-pattern:auto none;
	background:#4F81BD;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"强调文字颜色 1";}
.style50
	{mso-pattern:auto none;
	background:#DCE6F1;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"20% - 强调文字颜色 1";}
.style51
	{mso-pattern:auto none;
	background:#B8CCE4;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"40% - 强调文字颜色 1";}
.style52
	{mso-pattern:auto none;
	background:#F2DCDB;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"20% - 强调文字颜色 2";}
.style53
	{mso-pattern:auto none;
	background:#E6B8B7;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"40% - 强调文字颜色 2";}
.style54
	{mso-pattern:auto none;
	background:#9BBB59;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"强调文字颜色 3";}
.style55
	{mso-pattern:auto none;
	background:#8064A2;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"强调文字颜色 4";}
.style56
	{mso-pattern:auto none;
	background:#E4DFEC;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"20% - 强调文字颜色 4";}
.style57
	{mso-pattern:auto none;
	background:#CCC0DA;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"40% - 强调文字颜色 4";}
.style58
	{mso-pattern:auto none;
	background:#4BACC6;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"强调文字颜色 5";}
.style59
	{mso-pattern:auto none;
	background:#B7DEE8;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"40% - 强调文字颜色 5";}
.style60
	{mso-pattern:auto none;
	background:#92CDDC;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"60% - 强调文字颜色 5";}
.style61
	{mso-pattern:auto none;
	background:#F79646;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"强调文字颜色 6";}
.style62
	{mso-pattern:auto none;
	background:#FCD5B4;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"40% - 强调文字颜色 6";}
.style63
	{mso-pattern:auto none;
	background:#FABF8F;
	color:#FFFFFF;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:0;
	mso-style-name:"60% - 强调文字颜色 6";}
td
	{mso-style-parent:style0;
	padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	mso-number-format:"General";
	text-align:general;
	vertical-align:middle;
	white-space:nowrap;
	mso-rotate:0;
	mso-pattern:auto;
	mso-background-source:auto;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体;
	mso-generic-font-family:auto;
	mso-font-charset:134;
	border:none;
	mso-protection:locked visible;}
.xl65
	{mso-style-parent:style0;
	text-align:center;
	mso-font-charset:134;}
.xl66
	{mso-style-parent:style0;
	text-align:center;
	mso-font-charset:134;
	border:.5pt solid windowtext;}
.xl67
	{mso-style-parent:style0;
	mso-font-charset:134;
	border:.5pt solid windowtext;}
 
  </style>
