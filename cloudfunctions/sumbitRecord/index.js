// 云函数入口文件
const cloud = require('wx-server-sdk')


function getThenNineNum(num) {
  return num > 9 ? num : `0${num}`;
}
cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const wxContext = cloud.getWXContext(),
  date = new Date();
  await cloud.database().collection('t_records').add({
    data:{
      openid: wxContext.OPENID,
      time:event.time,
      type:event.type,
      icon:event.icon,
      money:event.money,
      curTime:`${getThenNineNum(date.getHours())}:${getThenNineNum(date.getMinutes())}`
    }
  })
}