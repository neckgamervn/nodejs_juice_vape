module.exports = {
  ERROR: {
    data: [],
    message: "Lỗi xảy ra",
    code: 500
  },
  onSuccess(data) {
    return {
      data: data,
      message: "Thành công",
      code: 200
    };
  }
};
