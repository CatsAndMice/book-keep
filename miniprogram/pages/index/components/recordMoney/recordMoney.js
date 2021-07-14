// components/recordMoney/recordMoney.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    startRecords() {

    },

    openSeting() {
      wx.openSetting({
        withSubscriptions: true,
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(err);
        }
      })
    },

    setModel() {
      let self = this;
      wx.showModal({
        content: '是否修改接收消息',
        success(res) {
          if (res.confirm) {
            self.openSeting();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    sendMessageCallFuction() {
      let self = this;
      wx.cloud.callFunction({
        name: "sendMessage",
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(err);
          // errCode == '-404011' ? self.setModel() : null;
        }
      })
    },

    setMessage(mainSwitch = false) {
      if (mainSwitch) {
        this.sendMessageCallFuction();
        return
      };
      let self = this;
      wx.requestSubscribeMessage({
        tmplIds: ["uw69JepR3iKqD5qIsR12pZWAEDlMnojXluYvnpRrykU"],
        success({
          uw69JepR3iKqD5qIsR12pZWAEDlMnojXluYvnpRrykU
        }) {
          if (uw69JepR3iKqD5qIsR12pZWAEDlMnojXluYvnpRrykU == "reject") return;
          self.sendMessageCallFuction();
        },
        fail(err) {
          console.warn(err);
        },
        complete() {
          self.startRecords();
        }
      })
    },

    sendMessage() {
      let self = this;
      wx.getSetting({
        withSubscriptions: true,
        success({
          subscriptionsSetting
        }) {
          console.log(subscriptionsSetting.mainSwitch);
          self.setMessage(subscriptionsSetting.mainSwitch);
        },
        fail() {
          self.setMessage();
        }
      })
    }
  }
})