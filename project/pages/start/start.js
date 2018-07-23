// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHieght:340,
    isselected:false,
    /**
     * 认证方式
     * 枚举：finger 指纹验证(默认)。pass 密码验证
     */
    authWay:'finger',
    /**
     * 用于记录是否支持指纹验证以及记录是否录入指纹
     */
    isContainFinger:false,
    isStoareFinger:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // 1111
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      let height = wx.getSystemInfoSync().screenHeight
      let scrollHieght = height - 60 
      this.setData({
        scrollHieght: scrollHieght
      })
  },

  /**
   * 
   */

  /**
   * 进入小程序
   */
  goto:function(){
    let isselected = this.data.isselected

    if (!isselected){

      wx.showModal({
        title: '尚未同意使用协议',
        content: '请认真阅读并同意该协议。',
        showCancel:false
      })
      return 0
    } 

    /**
     * 跳转小程序
     */

    wx.navigateTo({
      url: '../list/list',
    })
  },

  /**
   * 更改验证方式
   */
  radioChange:function(event){
    
    this.setData({
      authWay:event.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAuthens()
    this.isStoareAuthen()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 获取支持的生物验证信息
   */
  getAuthens:function(){
    let that = this
    let idx = 0
    wx.checkIsSupportSoterAuthentication({
      success:res=>{
        let modes = res.supportMode
        let isSupport = false
        idx = modes.indexOf('fingerPrint')
        if(idx != -1){
          isSupport = true
        }
        // 记录下
        that.setData({
          isContainFinger: isSupport
        })
      },
      fail:function(){
        // 记录下
        that.setData({
          isContainFinger: false
        })
      }
    })
  },

  /**
   * 获取是否录入生物验证信息
   */
  isStoareAuthen:function(){
    let that = this
    let isEnrolled = false
    wx.checkIsSoterEnrolledInDevice({
      checkAuthMode:'fingerPrint',
      success:res=>{
        if(res.isEnrolled == 1){
          isEnrolled = true
        }

        that.setData({
          isStoareFinger: isEnrolled
        })
      },
      fail:function(){
        that.setData({
          isStoareFinger: false
        })
      }
    })
  },

  /**
   * 指纹验证
   */

  checkfingtap:function(){
      wx.startSoterAuthentication({
        requestAuthModes: ['fingerPrint'],
        challenge: '123457688',
        authContent:'请验证身份',
        success:res=>{
          console.log(res)
        }
      })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})