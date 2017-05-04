const Promise = require('./Promise')
const REGX_HTML_DECODE = /&\w{1,};|&#\d{1,};/g;
const HTML_DECODE = {
        "&lt;"  : "<", 
        "&gt;"  : ">", 
        "&amp;" : "&", 
        "&nbsp;": " ", 
        "&quot;": "\"", 
        "&copy;": "©"
   };
function login(){
  return new Promise((resolve,reject) => wx.login({
    success:resolve,
    fail:reject
  }))
}

function getUserInfo(){
  return login().then(res => new Promise((resolve,reject) => 
    wx.getUserInfo({
      success:resolve,
      fail:reject
    })
  ))
}

function decodeHtml(str){
  return (typeof str != "string") ? str :
    str.replace(REGX_HTML_DECODE,function($0){
      var c  = HTML_DECODE[$0]
      if(c === undefined){
          var m = $0.match(/\d{1,}/);
          if(m){
              var cc = m[0];
              cc = (cc === 0xA0) ? 0x20 : cc;
              c = String.fromCharCode(cc);
          }else{
              c = $0;
          }
      }
      return c;
    }) 
}

function makeArray(num,val){
  var arr = []
  for(var i = 0; i < num ; i++){
    arr.push(typeof val !== 'undefined' ? val : i)
  }
  return arr
}
function requstGet(url,t,data){
  return requst(url,'GET',data,t)
}
function requstPost(url,t,data){
  return requst(url,'POST',data,t)
}
const DOMAIN = 'http://www.csi0n.com/api/blog'
// 小程序上线需要https，这里使用服务器端脚本转发请求为https
function requst(url,method,data = {},t=1){
  wx.showNavigationBarLoading()
  return new Promise((resove,reject) => {
    wx.request({
      url: DOMAIN + url,
      data: data,
      header: {},
      method: method.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        wx.hideNavigationBarLoading()
        resove(res.data)
      },
      fail: function(msg) {
        console.log('reqest error',msg)
        wx.hideNavigationBarLoading()
        reject('fail')
      }
    })
  })
}
module.exports = {
  makeArray,getUserInfo,Promise,
  get:requstGet,post:requstPost,requst,decodeHtml
}
