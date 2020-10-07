const express = require("express");
const router = express.Router();
const Categorize = require("../models/Categorize");
const { onError, onSuccessArray, getToken } = require("../const");
router.get("/", async (req, res) => {
  try {
    var data = await Categorize.find();
    if (data) {
      console.log(data);
      data = data.map(({ questions, cate }) => ({ questions, cate }));
      res.json(onSuccessArray(data));
    } else res.json(onError("error"));
  } catch (error) {
    console.log(error);
    res.json(onError("error"));
  }
});
router.post("/", async (req, res) => {
  try {
    var data = await new Categorize({
      cate: "Báo cáo tồn kho",
      questions: [
        {
          text: "Tổng hợp số liệu tôm dự kiến nhập cho ngày hôm sau",
          option: ["Cà Mau", "Hậu Giang", "Cả hai"],
        },
        {
          text: "Tổng hợp số lượng tôm đã nhập tại nhà máy tại thời điểm hỏi",
          option: ["Cà Mau", "Hậu Giang", "Cả hai"],
        },
        {
          text: "Tổng hợp lượng tôm theo size nhập vào của ngày báo cáo",
          option: [],
        },
        {
          text:
            "Tổng hợp lượng tôm nguyên liệu theo size nhập vào theo khoảng thời gian trong tháng",
          option: ["Cà Mau", "Hậu Giang", "Cả hai"],
        },
        {
          text: "Tổng hợp số liệu tôm dự kiến nhập cho ngày hôm sau",
          option: [],
        },
      ],
    }).save();
    if (data) {
      // data = data.map((elem) => ({
      //   option: elem.option,
      //   cate: elem.cate,
      //   question: elem.question,
      // }));
      res.json(onSuccessArray(data));
    } else res.json(onError("error"));
  } catch (error) {
    console.log(error);
    res.json(onError("error"));
  }
});
module.exports = router;
