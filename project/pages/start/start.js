// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHieght:340,
    isselected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
    wx.checkIsSupportSoterAuthentication({
      success:res=>{
        console.log(res)
      }
    })
  },

  /**
   * 获取是否录入生物验证信息
   */
  isStoareAuthen:function(){
    wx.checkIsSoterEnrolledInDevice({
      checkAuthMode:'fingerPrint',
      success:res=>{
        console.log(res)
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