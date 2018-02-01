//index.js
//获取应用实例
const app = getApp();
const { extend, Tab } = require('../../zanui/2.4.4/dist/index');

Page(extend({}, Tab, {
  data: {
    mainHeight: '100%',
    loadmore: {},
    tab1: {
      list: [
        {
          id: '1',
          title: '最新商品1'
        },
        {
          id: '2',
          title: '最新商品2'
        },
        {
          id: '3',
          title: '最新商品3'
        },
        {
          id: '4',
          title: '最新商品4'
        },
        {
          id: '5',
          title: '最新商品5'
        },
        {
          id: '6',
          title: '最新商品6'
        }
      ],
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
