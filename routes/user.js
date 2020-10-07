const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const User = require("../models/User");
const { onError, onSuccess, getToken } = require("../const");
router.post("/Login", async (req, res) => {
  try {
    const loginData = {
      username: req.body.username.trim().toLowerCase(),
      password: sha256(req.body.password),
    };
    const token = getToken(req);
    const checkLogin = await User.findOneAndUpdate(loginData, { token: token });
    if (checkLogin) {
      loginData.token = token;
      loginData.role = checkLogin.role;
      delete loginData.password;
      res.json(onSuccess(loginData));
    } else res.json(onError("Sai tên đăng nhập hoặc mật khẩu"));
  } catch (error) {
    res.json(onError("Đăng nhập thất bại"));
  }
});
router.post("/Register", async (req, res) => {
  try {
    const check = await User.find({ username: req.body.username.trim() });
    const userData = {
      username: req.body.username.trim(),
      token: getToken(req),
      password: sha256(req.body.password),
      role: req.body.role,
    };
    if (check.length == 0)
      new User(userData).save().then(() => {
        delete userData.password;
        res.json(onSuccess(userData));
      });
    else {
      res.json(onError("Tài khoản đã tồn tại", 409));
    }
  } catch (error) {
    res.json(onError());
  }
});

router.post("/Logout", async (req, res) => {
  try {
    res.json(onSuccess());
  } catch (error) {
    res.json(onError());
  }
});

router.get("/UserInfo", async (req, res) => {
  try {
    const { username, role } = await User.findOne({ token: req.headers.token });
    res.json(
      onSuccess({
        username,
        role,
      })
    );
  } catch (error) {
    console.log(error);
    res.json(onError("Tài khoản của bạn đã bị đăng nhập ở nơi khác"));
  }
});

router.patch("/UpdateUserInfo", async (req, res) => {
  try {
    const update = await User.findOneAndUpdate(req.body._id, {
      $set: {
        title: req.body.title,
      },
    });
    res.json(onSuccess(update));
  } catch (error) {
    res.json(onError());
  }
});
module.exports = router;
