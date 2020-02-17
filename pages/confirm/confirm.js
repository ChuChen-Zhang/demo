// pages/confirm/confirm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '../../pages/index/index',
    sn:"",
    code:"",
    csn:"",
    isconfirm:false,
    isSubaccount:false,
    scene:"",
    noauthor:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //已经授权
          
          wx.reLaunch({
            url: that.data.url
          });
        }else{
          that.setData({
            noauthor: true
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    // 可以通过 wx.getSetting 先查询一下用户是否授权
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //已经授权
          wx.showToast({
            title: '授权成功',
            icon: 'none',
            duration: 3000
          });

          wx.reLaunch({
            url: that.data.url
          });
          
        } else {
          wx.showToast({
            title: '请点击授权',
            icon: 'none',
            duration: 3000
          });
        }

      }
    });
  },
  js_cancel: function () {
    wx.reLaunch({
      url: '../../pages/notfound/notfound'
    })
  },
  js_confirm: function () {
    wx.showLoading({
      title: '登录中',
    })
    var that = this;
    wx.getSetting({
      
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //已经授权
          wx.login({
            success: res => {
              if (res.code) {
                console.log('登录成功！' + res.code)
                //发起网络请求
                // 发送 res.code 到后台换取 openId
                wx.request({
                  url: app.globalData.root + '/qr/openid', //接口地址
                  data: {
                    sn: that.data.sn,
                    code: res.code
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res)
                    var openid = res.data.data.openid;
                    //已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                      withCredentials: true,
                      success: function (res) {
                        console.log(res)
                        wx.request({
                          url: app.globalData.root + '/wx/xcx2/userInfo',
                          data: {
                            openid: openid,
                            rawData: res.rawData,
                            signature: res.signature,
                            userInfo: res.userInfo,
                            encryptedData: res.encryptedData,
                            iv: res.iv
                          },
                          method: 'POST',
                          header: {
                            'content-type': 'application/json'
                          },
                          success: function (res) {
                            wx.hideLoading();
                            console.log(res)
                            if (res.data.result == "0000000") {
                              wx.reLaunch({
                                url: '../../pages/success/success'
                              })
                            } else {
                              wx.showToast({
                                title: '登录失败',
                                icon: 'none',
                                duration: 3000
                              });
                            }

                          }
                        })
                      }
                    })
                  }
                })
              }
            }
          })

        } else {
          wx.showToast({
            title: '请点击授权',
            icon: 'none',
            duration: 3000
          });
        }

      }
    });
    
  },
  js_backhome: function () {
    wx.reLaunch({
      url: '../../pages/index/index'
    })
  },
  js_accountcancel: function () {
    wx.reLaunch({
      url: '../../pages/subnotfound/subnotfound'
    })
  },
  js_accountconfirm: function () {
    wx.showLoading({
      title: '认领中',
    })
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //已经授权
          wx.login({
            success: res => {
              if (res.code) {
                console.log('登录成功！' + res.code)
                //发起网络请求
                // 发送 res.code 到后台换取 openId
                wx.request({
                  url: app.globalData.root + '/child/apply_account', //接口地址
                  data: {
                    csn: that.data.csn,
                    code: res.code
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res)
                    if (res.data.result == "0000000") {
                      var openid = res.data.data.openid;
                      //已经授权，可以直接调用 getUserInfo 获取头像昵称
                      wx.getUserInfo({
                        withCredentials: true,
                        success: function (res) {
                          console.log(res)
                          wx.request({
                            url: app.globalData.root + '/wx/xcx2/userInfo',
                            data: {
                              openid: openid,
                              rawData: res.rawData,
                              signature: res.signature,
                              userInfo: res.userInfo,
                              encryptedData: res.encryptedData,
                              iv: res.iv
                            },
                            method: 'POST',
                            header: {
                              'content-type': 'application/json'
                            },
                            success: function (res) {
                              wx.hideLoading();
                              console.log(res)
                              if (res.data.result == "0000000") {
                                wx.reLaunch({
                                  url: '../../pages/subsuccess/subsuccess'
                                })
                              } else {
                                wx.showToast({
                                  title: '认领失败',
                                  icon: 'none',
                                  duration: 3000
                                });
                              }

                            }
                          })
                        }
                      })
                    } else {
                      wx.hideLoading();
                      wx.showToast({
                        title: res.data.resultDetail,
                        icon: 'none',
                        duration: 3000
                      });
                      wx.reLaunch({
                        url: '../../pages/invalid/invalid'
                      })
                    }  
                  }
                })
              }
            }
          })

        } else {
          wx.hideLoading();
          wx.showToast({
            title: '请点击授权',
            icon: 'none',
            duration: 3000
          });
        }

      }
    });
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