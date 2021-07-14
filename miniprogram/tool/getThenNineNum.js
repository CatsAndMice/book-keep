class ThenNine {
  getThenNineNum(num) {
    return num > 9 ? num : `0${num}`;
  }
}
module.exports = new ThenNine();