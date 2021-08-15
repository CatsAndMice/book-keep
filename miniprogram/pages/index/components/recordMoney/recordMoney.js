// components/recordMoney/recordMoney.js
const ThenNine = require('../../../../tool/getThenNineNum'); 
const date = new Date(),
  rangeTime = 7 * 1000 * 60 * 60 * 24;
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
    maxDate: date.getTime(),
    minDate: date.getTime() - rangeTime,
    calendarShow: false,
    money: '',
    icon:'',//类型图标
    type:'pay',
    defaultDate: date.getTime(),
    selectMoney: {
      btns: [{text:'支出',type:'pay'}, {text:'收入',type:''}],
      active: 0,
      time: '',
      icons: [],
      activeIcon:0
    }
  },
  attached() {
    this.getIcons();
    this.setData({
      'selectMoney.time': `${ThenNine.getThenNineNum( date.getMonth()+1)}月${ThenNine.getThenNineNum( date.getDate())}日`
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    callSumbitRecord(){
      wx.cloud.callFunction({
        name:"sumbitRecord",
        data:{
          money:this.data.money,
          time:this.data.selectMoney.time,
          type:this.data.type,
          icon:this.data.icon
        },
        success(res){
          console.log(res);
        }
      })
    },

    onSubmit(){
      if(this.data.money){
        this.callSumbitRecord();
        return;
      }
      wx.showToast({
        title: '请填写消费记录',
        icon:"error",
      })
      setTimeout(()=>{
        wx.hideToast();
      },2000)
      
    },

    onClickIcon({currentTarget}){
      let {index,icon} = currentTarget.dataset;
      this.setData({
        icon:icon,
        'selectMoney.activeIcon':index
      })
    },


    getIcons: async function () {
      let self = this;
      wx.cloud.callFunction({
        name: "getIcons",
        success({result}) {
          result.errMsg === "collection.get:ok" ? self.setData({
            'selectMoney.icons': result.data[0].icons
          }) : null;
          self.data.icon = result.data[0].icons[0];
        }
      })
    },

    onChange({
      detail
    }) {
      console.log(this.data);
    },

    onConfirm({detail}) {
      this.setData({
        'selectMoney.time': `${ThenNine.getThenNineNum( detail.getMonth()+1)}月${ThenNine.getThenNineNum( detail.getDate())}日`,
        calendarShow: false
      })
    },

    onCalendarClose() {
      this.setData({
        calendarShow: false
      })
    },

    onClickTime() {
      this.setData({
        calendarShow: true
      })
    },


    tapEvent({target}) {
      let {dataset} = target;
      this.setData({
        'selectMoney.type':dataset.type,
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

    // openSeting() {
    //   wx.openSetting({
    //     withSubscriptions: true,
    //     success(res) {
    //       console.log(res);
    //     },
    //     fail(err) {
    //       console.log(err);
    //     }
    //   })
    // },


    // sendMessageCallFuction() {
    //   let self = this;
    //   wx.cloud.callFunction({
    //     name: "sendMessage",
    //     success(res) {
    //       console.log(res);
    //     },
    //     fail(err) {
    //       console.log(err);
    //     }
    //   })
    // },

    // setMessage(itemSettings) {
    //   let self = this;
    //   wx.requestSubscribeMessage({
    //     tmplIds: ["uw69JepR3iKqD5qIsR12pZWAEDlMnojXluYvnpRrykU"],
    //     success({
    //       uw69JepR3iKqD5qIsR12pZWAEDlMnojXluYvnpRrykU
    //     }) {
    //       if (uw69JepR3iKqD5qIsR12pZWAEDlMnojXluYvnpRrykU == "reject") return;
    //       self.sendMessageCallFuction();
    //     },
    //     fail(err) {
    //       console.warn(err);
    //     },
    //     complete() {
    //       self.startRecords();
    //     }
    //   })
    // },

    // sendMessage() {
    //   // let self = this;
    //   // wx.getSetting({
    //   //   withSubscriptions: true,
    //   //   success({
    //   //     subscriptionsSetting
    //   //   }) {
    //   //     // self.setMessage(subscriptionsSetting.itemSettings);
    //   //   },
    //   //   fail() {
    //   //     // self.setMessage();
    //   //   }
    //   // })
    // }
  }
})