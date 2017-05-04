let utils=require('./utils/util.js')
App({
    onLaunch:function(){
        let logs=wx.getStorageSync('logs')||[]
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
    },
    getUserinfo(){
        return new utils.Promise((resolve,reject)=>{
            if(this.globalData.userInfo){
                resolve(this.globalData.userInfo)
            }
            return utils.getUserInfo().then(res=>{
                resolve(this.globalData.userInfo=res.userInfo);
            })
        })
    },
    globalData: {
    userInfo: null
  },
  cacheSubscibe: [],
  utils
})