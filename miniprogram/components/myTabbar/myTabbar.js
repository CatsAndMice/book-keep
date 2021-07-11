// components/myTabBar/myTabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    pages: ["pages/index/index", "pages/records/records", "pages/me/me"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toPage(index) {
      let self = this;
      wx.switchTab({
        url: `/${this.data.pages[index]}`,
      })
    },
    onChange(event) {
      this.toPage(event.detail);
    }
  }
})