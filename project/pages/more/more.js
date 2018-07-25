// pages/more/more.js
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  

  /**
   * 关于我们
   */
  aboutUs:function(){
    wx.showModal({
      title: '此部分功能未完成',
      content: '商务合作请加微信：18620884621.',
      showCancel:false
    })
  },

  /**
   * 删除账号和密码
   */
  clearPassWord:function(){
    let listdata = wx.getStorageSync('listdata')
    let count = listdata.length
    let content = '当前还有 ' + count +' 条账号记录，请做好备份再删除，是否确认删除？'
    wx.showModal({
      title: '删除确认提示',
      content: content,
      success:res=>{
        if(res.confirm){
          wx.removeStorageSync('listdata')
          utils.showsuccess('删除成功')
        }else{
          // 什么也不用做
        }
      }
    })
  },

  /**
   * 退出小程序
   */
  exitMiniProgram:function(){
    wx.redirectTo({
      url: '/pages/start/start',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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