// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async () => {
  const wxContext = cloud.getWXContext();
  return await cloud.openapi.subscribeMessage.send({
    touser: wxContext.OPENID,
    templateId: 'uw69JepR3iKqD5qIsR12pZWAEDlMnojXluYvnpRrykU',
    data: {
      "date01": {
        "value": '2015年01月05日'
      },
      "site01": {
        "value": 'TIT创意园'
      },
      "site02": {
        "value": '广州市新港中路397号'
      }
    },
    page: 'pages/index/index',
    miniprogramState: "developer"
  })

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}