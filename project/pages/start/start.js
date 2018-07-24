// pages/start/start.js
const utils = require('../../utils/util.js')
const sha1 = require('../../utils/sha1.js')
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
    isStoareFinger:false,
    /**
     * 用于记录是否已经注册了
     */
    isLogin: false,
    /**
     * 记录密码及再次输入的密码
     */
    pass:'',
    againpass:'',
    inputLoginPass:''
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
   * 输入密码
   */
  inputpass:function(event){
    this.setData({
      pass:event.detail.value
    })
  },

  /**
   * 再次输入密码
   */
  againinputpass:function(event){
    this.setData({
      againpass: event.detail.value
    })
  },

  /**
   * 进入小程序
   */
  goto:function(){
    /**
     * 判断当前是指纹验证还是密码认证，如果是密码认证，则验证2个密码是否一致
     */

    let authWay = this.data.authWay

    let pass = this.data.pass
    let againpass = this.data.againpass
    let userid = ''

    if(authWay == 'pass'){
      if ((utils.isempty(pass) == 0) || (utils.isempty(againpass) == 0)) {
        utils.gkShowModel('验证失败','密码不能为空')
        return 0;
      }

      if (pass != againpass){
        utils.gkShowModel('验证失败', '两次输入的密码不一致！')
        return 0;
      }

      /**
       * 进行数据加密
       */
      let sha1pass = sha1.hex_sha1(pass)
      wx.setStorageSync('pass', sha1pass)
      wx.setStorageSync('isLogin', true)
      wx.setStorageSync('authWay', authWay)

      utils.showsuccess('验证成功!')
      setTimeout(function () {
        /**
         * 跳转小程序
         */
        wx.redirectTo({
          url: '../list/list',
        })
      }, 1000)

    }else{

      let isContainFinger = this.data.isContainFinger
      let isStoareFinger = this.data.isStoareFinger
      if(isContainFinger == false){
        utils.gkShowModel('验证失败', '小程序暂未支持当前手机类型的指纹验证，请更换成密码验证！')
        return 0;
      }

      if (isStoareFinger == false) {
        utils.gkShowModel('验证失败', '检测到您的手机未录入相关指纹，请更换成密码验证！')
        return 0;
      }


      this.checkfingtap()
    }
    
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
    // 判断是否已经注册登录过了
    this.checkLogin()
    // 判断之前验证的登录方式
    this.checkAuthWay()
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
   * 用于记录是否已经注册了
   */
  checkLogin:function(){
    let islogin = wx.getStorageSync('isLogin')
    if (islogin == ''){
      islogin = false
    }

    this.setData({
      isLogin:islogin
    })
  },
  /**
   * 用于记录之前的注册登录方式
   */
  checkAuthWay:function(){
    let authWay = wx.getStorageSync('authWay')
    if(authWay == ''){
      authWay = 'finger'
    }
    this.setData({
      authWay:authWay
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
          if(res.errCode == 0){

            wx.setStorageSync('isLogin', true)
            wx.setStorageSync('authWay', 'finger')
            utils.showsuccess('验证成功!')
            setTimeout(function(){
              /**
               * 跳转小程序
               */
              wx.redirectTo({
                url: '../list/list',
              })
            },1000)
          }
        }
      })
  },

  // 指纹登录
  fingerLogin:function(){
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123457688',
      authContent: '请验证身份',
      success: res => {
        if (res.errCode == 0) {
          utils.showsuccess('验证成功!')
          setTimeout(function () {
            /**
             * 跳转小程序
             */
            wx.redirectTo({
              url: '../list/list',
            })
          }, 1000)
        }
      }
    })
  },

  inputLogin:function(){
    let sha1pass = wx.getStorageSync('pass')
    let authPass = this.data.inputLoginPass

    let sha1AuthPass = sha1.hex_sha1(authPass)

    if (sha1pass == sha1AuthPass){
      utils.showsuccess('验证成功!')
      setTimeout(function () {
        /**
         * 跳转小程序
         */
        wx.redirectTo({
          url: '../list/list',
        })
      }, 1000)
    }else{
      utils.gkShowModel('登录失败','请检查密码！')
    }

  },
  inputLoginText:function(event){
    this.setData({
      inputLoginPass:event.detail.value
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