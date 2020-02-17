// pages/lastFail/lastFail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    idcard: "",
    phone: "",
    addrLevel_1: "",
    addrLevel_2: "",
    addrLevel_3: "",
    desc: ""
  },
  target: function (options) {
    var that = this;
    const _name = that.data.name;
    const _idcard = that.data.idcard;
    const _phone = that.data.phone;
    const _mark = that.data.desc;
    const _addrLevel_1 = that.data.addrLevel_1;
    const _addrLevel_2 = that.data.addrLevel_2;
    const _addrLevel_3 = that.data.addrLevel_3;
    const _type = 2;
    wx.reLaunch({
      url: '../../pages/face/face?' + 'type=' + _type + '&&name=' + _name + '&&idcard=' + _idcard + '&&phone=' + _phone + '&&mark=' + _mark + '&&addrLevel_1=' + _addrLevel_1 + '&&addrLevel_2=' + _addrLevel_2 + '&&addrLevel_3=' + _addrLevel_3
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      name: options.name,
      idcard: options.idcard,
      phone: options.phone,
      addrLevel_1: options.addrLevel_1,
      addrLevel_2: options.addrLevel_2,
      addrLevel_3: options.addrLevel_3,
      desc: options.mark
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '',
      path: "/pages/confirm/confirm",
      success: function (res) {
        // 转发成功
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
      }

    }
  }
})