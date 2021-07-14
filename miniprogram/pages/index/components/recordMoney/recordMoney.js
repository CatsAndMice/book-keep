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
    show: false,
    height: '80%',
    isCloseIconShow: true,
    templateName: 'selectMoneyType',
    selectMoney: {
      btns: ['支出', '收入'],
      active: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickTime() {

    },


    tapEvent({
      target
    }) {
      let {
        dataset
      } = target;
      this.setData({
        'selectMoney.active': dataset.index
      })
    },

    onClose() {
      this.setData({
        show: false
      })
    },

    startRecords() {
      this.setData({
        show: true
      })
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


    sendMessageCallFuction() {
      let self = this;
      wx.cloud.callFunction({
        name: "sendMessage",
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(err);
        }
      })
    },

    setMessage(itemSettings) {
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
      // let self = this;
      // wx.getSetting({
      //   withSubscriptions: true,
      //   success({
      //     subscriptionsSetting
      //   }) {
      //     // self.setMessage(subscriptionsSetting.itemSettings);
      //   },
      //   fail() {
      //     // self.setMessage();
      //   }
      // })
    }
  }
})