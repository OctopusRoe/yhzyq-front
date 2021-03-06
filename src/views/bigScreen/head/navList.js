/**
 * @description 顶部导航栏的按钮内容
 * @author OctopusRoe
 */
const navList = [
  {
    // label: '资产概览',
    label: '',
    key: '',
    icon: '',
    path: '',
    active: false,
    offset: 'left: -5px'
  },
  {
    // label: '公路技术状况',
    label: '',
    key: '',
    icon: '',
    path: '',
    active: false,
    offset: '-5px'
  },
  {
    // label: '养护辅助决策',
    label: '',
    key: '',
    icon: '',
    path: '',
    active: false,
    offset: '-5px'
  },
  {
    // label: '日常养护管理',
    label: '',
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
    path: '/org',
    icon: require('../assets/images/seting.png'),
    active: false,
    children: false
  },
  {
    label: '系统转跳',
    key: 'jump',
    path: '',
    icon: require('../assets/images/jump.png'),
    active: false,
    children: true
  },
  {
    label: '退出',
    key: 'logout',
    path: '/index',
    icon: require('../assets/images/logout.png'),
    active: false,
    children: false
  }
]

export { navList, setingList }