const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 将数字转换为数组
function convertToStarsArray(stars) {
  var num = stars / 2;
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      if ((i - num) === 0.5) {
        array.push(0.5)
      }
      else {
        array.push(0);
      }
    }
  }
  return array;
}

// 判断字符串是否为空，用于在POST请求前对输入框输入的内容就行检查
function isempty(str) {
  var newstr = str.replace("/(^\s*)|(\s*$)/g", "")

  return newstr.length
}
function showsuccess(str) {
  wx.showToast({
    title: str,
    icon: 'success',
    duration:1000
  })
}

// 请求数据,需传入完整的url
function getData(url, dosomething) {
  wx.request({
    url: url,
    data: [],
    success: function (res) {
      dosomething(res)
    }
  })
}

/**
 * POST请求，用于获取数据或提交数据
 */
// application/json默认值
function post(posturl, params, dosomething, complete) {

  wx.request({
    url: posturl,
    data: params,
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      dosomething(res)
    },
    fail: function (err) {
      myshowmodel('请求失败', err.errMsg)
      return 0
    },
    complete: function () {
      complete()
    }
  })
}

// 加载提示
function setloading() {
  wx.showLoading({
    title: '玩命加载中...',
  })
}

// 隐藏加载提示
function hidemyloading() {
  wx.hideLoading()
}

// 提示框
function gkShowModel(title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
  })
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  getData: getData,
  gkShowModel: gkShowModel,
  isempty: isempty,
  post: post,
  setloading: setloading,
  hidemyloading: hidemyloading,
  showsuccess: showsuccess
}
