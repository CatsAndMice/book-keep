// miniprogram/pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    curYear: 0,
    curMonth: 0,
    show: false,
    curMonthSave: 0
  },

  onSelectEvent(event) {
    let {
      index
    } = event.detail;
    console.log(event);
    this.data.curMonthSave = index;
    this.setData({
      show: false,
    })
  },

  leave() {
    console.log(this.data);
    this.setData({
      curMonth: this.data.curMonthSave
    })
  },

  onClick() {
    this.setData({
      show: true
    })
  },

  onClose() {
    this.setData({
      show: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time = new Date(),
      one = 1;
    this.setData({
      curYear: time.getFullYear(),
      curMonth: time.getMonth() + one
    })
  },
})