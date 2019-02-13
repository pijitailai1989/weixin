// pages/logisticgsPage/logisticgsPage.js
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
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    star: 4,
    starMap:null,
    array: [],
    index: 0,
    date: '2016-09-01',
    time: '12:01',
    country:'',
    province:'',
    weight:null,
    list:[],
    baseUrl:'https://backend.spiderparcel.com'
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    myStarChoose(e) {
      console.log(e.target.dataset.star,'e')
      let star = parseInt(e.target.dataset.star) || 0;
      this.setData({
        star: star,
      });
    },
    goPage(e){
      console.log(e,'e')
      // return;
      let data=e.currentTarget.dataset.obj;
      data.weight=this.data.weight;
      wx.navigateTo({
        url:'/pages/logisticgsDetail/logisticgsDetail?obj='+ JSON.stringify( data )
      })
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e)
      let i = parseInt(e.detail.value)
      const that = this;
      this.setData({
        index: i,
        country: that.data.array[i].code,
        province: that.data.array[i].province[0].code
      })

    }, 
    bindKeyInput(e) {
      // console.log(e,'e')
      this.setData({
        weight: e.detail.value
      })
    },
    onLoad: function () {
      
      const that = this;
      wx.request({
        url: 'https://backend.spiderparcel.com/home/last-mile/country',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // console.log(res.data)
          that.setData(
            {
              array: res.data,
              country: res.data[0].code,
              province: res.data[0].province[0].code
            }
          )
        }
      })
    },
    freight(e){
      // console.log(e,'e')
      const that = this;
      let reg = new RegExp(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/);
      // 正数（包括小数）
      let reg1 = new RegExp(/^[+]{0,1}(\d+)$/);
      // 正整数(不包括小数) 
      if (!that.data.weight){
        wx.showToast({
          title: '请输入物品重量!',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if ( !reg.test( that.data.weight ) ){
        wx.showToast({
          title: '请输入有效数字!',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      wx.request({
        url: `https://backend.spiderparcel.com/spider-product/products?country=${that.data.country}&weight=${that.data.weight}&province=${that.data.province}`,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if(res.data.length<=0){
            wx.showToast({
              title: '没有搜索到相关服务!',
              icon: 'none',
              duration: 2000
            });
            return;
          }
          console.log(res.data)
          that.setData(
            {
              list:res.data
            }
          )
        }
      })
      

    }
  }
  
})
