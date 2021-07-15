// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env: "mysql-2322873900"
})
// 云函数入口函数
exports.main = async () => {

  let result = await db.collection('t_icons').get();
  return result
}