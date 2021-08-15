// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  return await cloud.database().collection('t_records').where({
    openid: wxContext.OPENID,
    time: event.time
  }).get()
}