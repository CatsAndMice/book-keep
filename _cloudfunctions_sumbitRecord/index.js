// 云函数入口文件
const cloud = require('wx-server-sdk')
const {
  StrategyFrom,
  MathTool
} = require("@lihai-js/tool");
cloud.init();
const t_records = cloud.database().collection('t_records');
const testFn = function (res) {
  let {
    errMsg,
    result
  } = res, {
    data
  } = result;
  StrategyFrom.addCacheTest(errMsg, {
    description: 'isEqualsValue',
    value: 'callFunction:ok'
  });
  StrategyFrom.addCacheTest(data, {
    description: "islengthNoZero"
  })
  return StrategyFrom.start();
}

const getCurTime = () => {
  let date = new Date();
  return `${MathTool.getUseTwoNumberToString(date.getHours())}:${MathTool.getUseTwoNumberToString(date.getMinutes())}`
}

//更新已有的账目
const updata = async function ({
  data
}, event) {
  let item = data[0];
  item.data.push({
    curTime: getCurTime(),
    type: event.type,
    icon: event.icon,
    money: event.money,
  });
  t_records.doc(item._id).update({
    data: {
      data: item.data
    }
  })
}

const add = async function (event) {
  let wxContext = cloud.getWXContext();
  t_records.add({
    data: {
      openid: wxContext.OPENID,
      time: event.time,
      data: [{
        curTime: getCurTime(),
        type: event.type,
        icon: event.icon,
        money: event.money,
      }]
    }
  })
}

// 云函数入口函数
exports.main = async (event) => {
  cloud.callFunction({
    name: "getCurDayRecord",
    data: {
      time: event.time
    }
  }).then(res => {
    console.log(res);
    testFn(res) ? updata(res.result, event) : add(event);
  })

  // await.add({
  //   data: {
  //     openid: wxContext.OPENID,
  //     time: event.time,
  //     type: event.type,
  //     icon: event.icon,
  //     money: event.money,
  //     curTime: `${MathTool.getUseTwoNumberToString(date.getHours())}:${MathTool.getUseTwoNumberToString(date.getMinutes())}`
  //   }
  // })
}