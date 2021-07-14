// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

function getThenNineNum(num) {
  return num > 9 ? num : `0${num}`;
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = await cloud.getWXContext();
  const time = new Date();
  console.log(wxContext);
  return await cloud.openapi.subscribeMessage.send({
    touser: wxContext.OPENID,
    templateId: 'uw69JepR3iKqD5qIsR12pZWAEDlMnojXluYvnpRrykU',
    data: {
      "time1": {
        "value": `${time.getFullYear()}年${getThenNineNum(time.getMonth()+1)}月${getThenNineNum(time.getDate())}日`
      },
      "thing3": {
        "value": '记得记账哦'
      },
      "thing4": {
        "value": '晚上好，今日是否还有收支未记录？'
      }

    },
    page: 'pages/index/index',
    miniprogramState: "developer"
  })
}