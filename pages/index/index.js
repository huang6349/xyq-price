//index.js
//获取应用实例
const app = getApp();
const { extend, Tab, Toast } = require('../../zanui/2.4.4/dist/index');
const { GET } = require('../../utils/http.js');

Page(extend({}, Tab, Toast, {
  data: {
    mainHeight: '100%',
    loadmore: {},
    tab1: {
      list: [],
      selectedId: '1',
      scroll: true,
      height: 45,
    },
    prices: [
      {
        "name": "60武器",
        "price": 150000,
      },
      {
        "name": "60装备",
        "price": 115000,
      },
    ],
  },
  onLoad: function () { // 页面渲染后 执行
    GET('/index.json', (res) => {
      if (res) {
        console.log(res);
        let index = res[0];
        GET(index.uri, (res2) => {
          if (res2) {
            this.showZanToast(`获得${res2['date']}的数据`);
            console.log(res2['list'][0]['id']);
            this.setData({
              tab1: {
                list: res2['list'],
                selectedId: res2['list'][0]['id'],
              },
            });
          } else {
            this.showZanToast(`请求${index.uri}失败`);
          }
        });
      } else {
        this.showZanToast('请求index.json失败');
      }
    });
    this.nomoreShow();
  },
  onShow: function () {

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
  },
}));
