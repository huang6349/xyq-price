const root = "https://raw.githubusercontent.com/huang6349/xyq-price-data/master";

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
