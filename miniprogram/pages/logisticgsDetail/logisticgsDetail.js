// pages/logisticgsDetail/logisticgsDetail.js
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
     serviceArr:[
       { icon: 'icon-yixiaoshida', text: '一小时收件', color:'#2F9AC0',size:'2rem' },
       { icon: 'icon-lingdanciriyun', text: '次日送达', color: '#EB914D', size: '2rem' },
       { icon: 'icon-naozhong', text: '1-3天送达', color: '#EDC647', size: '2rem' },
       { icon: 'icon-wenjian', text: '派送文件', color: '#61B8BF', size: '2rem' },
       { icon: 'icon-baoguo', text: '超大件', color: '#DD7777', size: '2rem' },
       { icon: 'icon-qianbao', text: '货到付款', color: '#FDA26F', size: '2rem'}
     ],
    serviceHide:false,
    detailData:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchTab(e){
      let star = e.target.dataset.star;
      switch (star){
        case 'about':
              this.setData({ serviceHide:true })
              break;
        case 'service':
              this.setData({ serviceHide: false })
              break;
      }
    },
    onLoad: function (options) {
      this.setData({
        detailData: JSON.parse(options.obj)
      })
    }
  }
})
