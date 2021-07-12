// miniprogram/pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMessageSettng();
  },

  getMessageSettng: async function () {
    let {
      subscriptionsSetting
    } = await wx.getSetting({
      withSubscriptions: true
    })
    console.log(subscriptionsSetting);
    this.setData({
      checked: subscriptionsSetting.mainSwitch
    })
  },
  onChange: async function (event) { wx.requestSubscribeMessage({
      tmplIds: ["uw69JepR3iKqD5qIsR12pZWAEDlMnojXluYvnpRrykU"],
      success(res) {
        console.log(res);
        this.setData({
          // checked:
        })
      }
    })
  },



})