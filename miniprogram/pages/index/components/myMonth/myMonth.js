// components/myMonth/myMonth.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curYear: {
      type: Number,
      value: new Date().getFullYear()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    endMonth: []
  },

  attached() {
    this.createMonth();
    console.log(this);
  },


  /**
   * 组件的方法列表
   */
  methods: {
    createMonth() {
      let one = 1,
        curMonth = new Date().getMonth() + one,
        endMonth = [];
      for (let i = 0; i < curMonth; i++) {
        endMonth.push(i + one);
      }
      this.setData({
        endMonth
      })
    },

    onClick(item) {
      let {
        index
      } = item.currentTarget.dataset;
      this.triggerEvent("selectEvent", {
        index
      });
    },
  }
})