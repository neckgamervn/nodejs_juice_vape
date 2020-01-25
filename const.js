const User = require("./models/User");
const sha256 = require("sha256");
module.exports = {
  onError(message, code) {
    return {
      message: message ? message : "Đã có lỗi xảy ra",
      code: code ? code : 500
    };
  },
  onSuccess(data) {
    if (data && data.length != 0)
      return {
        data: data,
        message: "Thành công",
        code: 200
      };
    return {
      data: [],
      message: "Rỗng",
      code: 204
    };
  },
  async checkAuth(req, res, callback) {
    const auth = await User.find({
      token: req.headers.token
    });
    if (auth.length == 0) res.json(this.onError("Token không tồn tại", 403));
    else callback();
  },
  getToken(req) {
    return sha256(req.body.username + Date.now() + req.body.password);
  }
};
