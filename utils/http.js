const root = "https://gitee.com/252683858/xyq-price-data/raw/master";

const GET = (url, cb) => {
  wx.request({
    url: root + url,
    method: 'GET',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data);
    },
    fail: function () {
      return typeof cb == "function" && cb(false);
    }
  });
}

module.exports = {
  GET: GET,
}
