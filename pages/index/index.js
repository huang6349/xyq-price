//index.js
//获取应用实例
const app = getApp();
const { extend, Tab, Toast } = require('../../zanui/2.4.4/dist/index');
const { GET } = require('../../utils/http.js');

Page(extend({}, Tab, Toast, {
  data: {
    loadmore: {
      loading: true,
    },
    tab1: {
      list: [
        {
          id: 0,
          title: '无',
        }
      ],
      selectedId: 0,
      scroll: true,
      height: 45,
    },
    prices: [],
  },
  onLoad: function () { // 页面渲染后 执行
    GET('/index.json', (res) => {
      if (!res) {
        this.nodataShow();
        this.showZanToast('请求服务器列表失败');
        return;
      }
      let index = res[0];
      if (!index) {
        this.nodataShow();
        this.showZanToast('请求服务器列表失败');
        return;
      }
      GET(index.uri, (res2) => {
        if (!res2) {
          this.nodataShow();
          this.showZanToast(`请求商品分类失败`);
          return;
        }
        if (!res2['list'] || res2['list'].length === 0) {
          this.nodataShow();
          this.showZanToast(`请求商品分类失败`);
          return;
        }
        this.showZanToast(`获得[${index['name']}][${res2['date']}]的数据`);
        let selectedId = res2['list'][0]['id'];
        this.setData({
          tab1: {
            list: res2['list'],
            selectedId: res2['list'][0]['id'],
          },
        });
        this.loaPrice(selectedId);
      });
    });
  },
  loaPrice: function (selectedId) {
    if (!this.data || !this.data.tab1 || !this.data.tab1.list) {
      this.nodataShow();
      this.showZanToast(`请求商品分类无效`);
      return;
    }
    this.loadingShow();
    let uri;
    this.data.tab1.list.forEach((item, index) => {
      if (selectedId === item['id']) {
        uri = item['uri'];
        return;
      }
    });
    GET(uri, (res) => {
      this.loadmoreHide();
      if (!res) {
        this.nodataShow();
        this.showZanToast(`请求商品价格失败`);
        return;
      }
      if (res.length === 0) {
        this.nodataShow();
      }
      this.setData({
        prices: res,
      });
    });
  },
  loadingShow: function () {
    this.setData({
      loadmore: {
        loading: true,
      },
    });
  },
  nodataShow: function () {
    this.setData({
      loadmore: {
        nodata: true,
      },
    });
  },
  nomoreShow: function () {
    this.setData({
      loadmore: {
        nomore: true,
      },
    });
  },
  loadmoreHide: function () {
    this.setData({
      loadmore: {
      },
    });
  },
  handleZanTabChange: function ({ componentId, selectedId }) {
    this.setData({
      [`${componentId}.selectedId`]: selectedId,
    });
    this.loaPrice(selectedId);
  },
}));
