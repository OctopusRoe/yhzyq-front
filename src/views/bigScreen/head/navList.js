/**
 * @description 顶部导航栏的按钮内容
 * @author OctopusRoe
 */
const navList = [
  {
    label: '资产概览',
    key: '',
    icon: '',
    path: '',
    active: false,
    offset: 'left: -5px'
  },
  {
    label: '公路技术状况',
    key: '',
    icon: '',
    path: '',
    active: false,
    offset: '-5px'
  },
  {
    label: '养护辅助决策',
    key: '',
    icon: '',
    path: '',
    active: false,
    offset: '-5px'
  },
  {
    label: '日常养护管理',
    key: '',
    icon: '',
    path: '',
    active: false,
    offset: '-5px'
  },
  {
    label: '养护智慧作业区',
    key: '',
    icon: '',
    path: '',
    active: false,
    offset: '-15px'
  }
]

const setingList = [
  {
    label: '后台管理',
    key: 'seting',
    path: '/deviceManage/index',
    icon: require('../assets/images/seting.png'),
    active: false
  },
  {
    label: '系统转跳',
    key: 'jump',
    path: '',
    icon: require('../assets/images/jump.png'),
    active: false,
    children: [

    ]
  },
  {
    label: '退出',
    key: 'logout',
    path: '/index',
    icon: require('../assets/images/logout.png'),
    active: false
  }
]

export { navList, setingList }