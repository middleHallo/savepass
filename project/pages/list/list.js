// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:623,
    listdata:[]
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

    let scrollHeight = wx.getSystemInfoSync().windowHeight
    let listdata = wx.getStorageSync('listdata')
    
    this.setData({
      scrollHeight: scrollHeight,
      listdata: listdata
    })
  },

  /**
   * 跳转修改页面
   */
  updateData:function(event){
    wx.setStorageSync('isupdate', true)
    wx.setStorageSync('idx', event.currentTarget.dataset.idx)
    wx.switchTab({
      url: '/pages/addpass/addpass'
    })
  },

  deleterow:function(event){
    let that = this
    let idx = event.currentTarget.dataset.idx
    let listdata = wx.getStorageSync('listdata')
    let currentRow = listdata[idx]
    let content = '账户类型：' + currentRow['accountType'] + ";账号：" + currentRow['account']
    wx.showModal({
      title: '确认删除',
      content: content,
      success:res=>{
        if(res.confirm){
          listdata.splice(idx,1)
          that.setData({
            listdata: listdata
          })
          wx.setStorageSync('listdata', listdata)

        }else{
          // 什么也不用做
        }
      }
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