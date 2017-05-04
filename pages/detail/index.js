let app = getApp();
const WxParse = require('../../utils/wxParse/wxParse.js');
Page({
    data: {
        article: null
    },
    onShow() {},
    onReady() {},
    onLoad: function(options) {
        let id = options.id,
            that = this;
        wx.getStorage({
            key: 'categories',
            success: function(res) {
                let cates = res.data;
                cates.forEach(function(value, index, array) {
                    value.articles.forEach(function(vv, ii, arr) {
                        if (vv.id == id) {
                            that.setData({
                                article: vv
                            });
                            WxParse.wxParse('content', 'html', vv.content, that, 5);
                        }
                    })
                })
            }
        })
    }
})