let app = getApp()
const cache = Object.create(null)
Page({
    _isLoading: false,
    data: {
        categories: [],
        currentTab: 0,
        articles: []
    },
    onLoad() {
        this._getHome()
    },
    _getHome() {
        app.utils.get('/home').then(res => {
            let {
                msg,
                result,
                status
            } = res;
            if (status == 200) {
                this.setData({
                    categories: result,
                    articles: result[0].articles || [],
                    currentTab: result[0].id
                });
                wx.setStorageSync('categories', result);
            }
        })
    },
    changeCategory(event) {
        let id = event.target.dataset.id,
            that = this;
        if (this.data.currentTab == id) {
            return false;
        }
        this.data.categories.forEach(function(v, i, arr) {
            if (v.id == id) {
                that.setData({
                    currentTab: id,
                    articles: v.articles
                });
            }
        })
    }
})