const methods: any = {
  func: async function () {
    await new Promise((resolve, reject) => {
      reject('抛出错误');
    });
  },
};
