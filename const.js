module.exports = {
  ERROR: {
    data: [],
    message: "Lỗi xảy ra",
    code: 500
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
  }
};
