export default function () {
  return a.map((item, index) => ({
    colOne: item,
    colTwo: Math.floor(250 * Math.random(1, 10)),
    colThree: Math.floor(200 * Math.random(1, 30)),
    colFour: Math.floor(200 * Math.random(1, 20))
  }))
}
const a = [
  '南昌西管理中心',
  '南昌东管理中心',
  '南昌南管理中心',
  '南昌北管理中心',
  '上饶管理中心',
  '抚州管理中心',
  '赣州管理中心',
  '宜春管理中心',
  '景德镇管理中心',
  '吉安管理中心',
]