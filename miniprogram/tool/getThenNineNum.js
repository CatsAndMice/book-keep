const lihia = require('@lihai-js/tool')
class ThenNine {
  getThenNineNum(num) {
    console.log(lihia);
    return num > 9 ? num : `0${num}`;
  }
}
module.exports = new ThenNine();