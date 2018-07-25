// pages/addpass/addpass.js
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 兼容修改的部分代码
    isupdate:false,
    idx:0,
    /**
     * 动态修改按钮的文字
     */
    btnaction: '添加',
    /**
     * 分别是类型、账户、密码、备注等信息
     */
    accountType:'',
    account:'',
    password:'',
    accountBz:''
    
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
    let isupdate = wx.getStorageSync('isupdate')
    // 如果是更新状态
    if ((isupdate != '') && (isupdate == true)) {
      let idx = wx.getStorageSync('idx')
      let listdata = wx.getStorageSync('listdata')

      let currentData = listdata[idx]

      this.setData({
        accountType: currentData.accountType,
        account: currentData.account,
        password: currentData.password,
        accountBz: currentData.accountBz,
        btnaction: '修改'
      })
    }else{
      this.setData({
        btnaction: '添加'
      })
    }
  },

  /**
   * 添加信息
   */
  add:function(){

    let accountType = this.data.accountType
    let account = this.data.account
    let password = this.data.password
    let accountBz = this.data.accountBz

    // 如果全为空，则直接返回错误提示并跳过后面的代码执行
    if ((utils.isempty(accountType) == 0) && (utils.isempty(account) == 0) && (utils.isempty(password) == 0) && (utils.isempty(accountBz) == 0)){
      utils.gkShowModel('添加信息失败','不能全为空！')
      return 0
    }

    let currentRow = {
      'accountType': accountType,
      'account': account,
      'password': password,
      'accountBz': accountBz
    }

    let listData = wx.getStorageSync('listdata')

    let isupdate = wx.getStorageSync('isupdate')
    if ((isupdate != '') && (isupdate==true)){

      // 修改
      let idx = wx.getStorageSync('idx')
      listData[idx] = currentRow

      wx.setStorageSync('listdata', listData)

      utils.showsuccess('修改成功!')

      setTimeout(function () {
        

        wx.switchTab({
          url: '/pages/list/list',
        })
      }, 1000)

    }else{

      // 新增
      if (listData == '') {
        listData = []
      }
      listData.push(currentRow)

      wx.setStorageSync('listdata', listData)

      utils.showsuccess('添加成功!')

      setTimeout(function () {
        wx.switchTab({
          url: '/pages/list/list',
        })
      }, 1000)
    }
  },

  /**
   * 账号类型
   */
  accountTypeInput:function(event){
    this.setData({
      accountType:event.detail.value
    })
  },

  /**
   * 账号
   */
  accountInput: function (event){
    this.setData({
      account: event.detail.value
    })
  },

  /**
   * 密码
   */
  passwordInput: function (event){
    this.setData({
      password: event.detail.value
    })
  },

  /**
   * 备注
   */
  bzInput:function(event){
    
    this.setData({
      accountBz: event.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   * 将所有的变量置空
   */
  onHide: function () {

    wx.setStorageSync('isupdate', '')
    wx.setStorageSync('idx', '')

    this.setData({
      accountType: '',
      account: '',
      password: '',
      accountBz: ''
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