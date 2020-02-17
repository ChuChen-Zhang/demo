//idcard.js
//获取应用实例
const app = getApp();
Page({
  data: {
    frontimgsrc:"../../image/front.jpg",
    backimgsrc: "../../image/back.jpg",
    disabled: true,
    frontReady: false,
    backReady: false,
    picone: '',
    pictwo: '',
    addrLevel_1: "",
    addrLevel_2: "",
    addrLevel_3: "",
    name:'',
    idCard: '',
    phone: "",
    desc: "",
    webUrl: app.globalData.url.login,
    validitydate: ''
  },
  choosefrontImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: function (res) {
        var temp = res.tempFilePaths;
        wx.getFileSystemManager().saveFile({
          tempFilePath: temp[0],
          filePath: '',
          success(res) {
            const _savedFilePath = res.savedFilePath;
            console.log('保存成功' + _savedFilePath);
            that.setData({
              frontimgsrc: _savedFilePath
            })
            
            
            wx.compressImage({
              src: _savedFilePath, // 图片路径
              quality: 0, // 压缩质量
              success: function (res) {
                console.log(res);
                // that.setData({
                //   frontimgsrc: res.tempFilePath
                // })
                const compress = res.tempFilePath;
                wx.getFileInfo({
                  filePath: res.tempFilePath,
                  success(res) {
                    console.log(res.size)
                    console.log(res.digest)
                  }
                })
                wx.getFileSystemManager().readFile({
                  filePath: res.tempFilePath,
                  encoding: 'base64',
                  success: function (res) {
                    console.log(res.data.length);
                    that.setData({
                      frontReady: true,
                      disabled: false,
                      picone: res.data
                    })
                  
                    // wx.request({
                    //   url: app.globalData.url.ocr, //接口地址
                    //   data: {
                    //     type: '2',
                    //     idCardFront: res.data
                    //   },
                    //   method: 'POST',
                    //   header: {
                    //     'content-type': 'application/json'
                    //   },
                    //   success: function (res) {
                    //     console.log(res)
                    //     console.log(res.data.data.name)
                    //     console.log(res.data.data.idCard)
                    //     if (res.statusCode == 200) {
                    //       that.setData({
                    //         frontReady: true,
                    //         disabled: false,
                    //         name: res.data.data.name,
                    //         idCard: res.data.data.idCard
                    //       })
                    //       if (that.data.backReady) {
                    //         that.setData({
                    //           disabled: false
                    //         })
                    //       }
                    //     } 
                    //   },
                    //   fail: function (res) {
                    //     console.log('出错了');
                    //     wx.showToast({
                    //       title: '网络异常',
                    //       icon: 'none',
                    //       duration: 3000
                    //     });
                    //   }
                    // })
                      
                    
                  },
                  fail: function (res) {
                    console.log('base64出错了');
                  }
                });

              },
              fail: function (res) {
                console.log('图片压缩出错了');
                wx.showToast({
                  title: '请重新选择照片',
                  icon: 'none',
                  duration: 3000
                });
              }
            })
          },
          fail: function (res) {
            console.log('保存图片出错了');
            wx.showToast({
              title: '请重新选择照片',
              icon: 'none',
              duration: 3000
            });
          }
        })



        console.log(res);
        console.log(that.data.frontimgsrc);
      },
      fail: function (res) {
        console.log('选择图片出错了');
        wx.showToast({
          title: '请重新选择照片',
          icon: 'none',
          duration: 3000
        });
      },
      complete: function (res) { },
    })
  },
  choosebackImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: function (res) {
        var temp = res.tempFilePaths;
        wx.saveFile({
          tempFilePath: temp[0],
          success(res) {
            const _savedFilePath = res.savedFilePath;
            console.log(_savedFilePath);
            that.setData({
              backimgsrc: _savedFilePath
            })
            wx.compressImage({
              src: _savedFilePath, // 图片路径
              quality: 0, // 压缩质量
              success: function (res) {
                console.log(res);
                wx.getFileInfo({
                  filePath: res.tempFilePath,
                  success(res) {
                    console.log(res.size)
                    console.log(res.digest)
                  }
                })
                wx.getFileSystemManager().readFile({
                  filePath: res.tempFilePath,
                  encoding: 'base64',
                  success: function (res) {
                    console.log(res.data.length);

                    that.setData({
                      pictwo: res.data,
                      backReady: true
                    })
                    if (that.data.frontReady){
                      that.setData({
                        disabled: false
                      })
                    }
                  },
                  fail: function (res) {
                    console.log('base64出错了');
                  }
                });

              },
              fail: function (res) {
                console.log('图片压缩出错了');
                wx.showToast({
                  title: '请重新选择照片',
                  icon: 'none',
                  duration: 3000
                });
              }
            })
          },
          fail: function (res) {
            console.log('保存图片出错了');
            wx.showToast({
              title: '请重新选择照片',
              icon: 'none',
              duration: 3000
            });
          }
        })



        console.log(res);
        console.log(that.data.backimgsrc);
      },
      fail: function (res) {
        console.log('选择图片出错了');
        wx.showToast({
          title: '请重新选择照片',
          icon: 'none',
          duration: 3000
        });
      },
      complete: function (res) { },
    })
  },
  backuploadImg:function(){
    var that = this;
    const _frontimgsrc = that.data.frontimgsrc;
    const _backimgsrc = that.data.backimgsrc;
    if (_frontimgsrc != "../../image/front.jpg"){
      wx.showLoading({
        title: '识别中',
      })
      wx.request({
        url: app.globalData.url.ocr, //接口地址
        data: {
          type: '3',
          idCardBack: that.data.pictwo
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          console.log(res.data.code)
          wx.hideLoading();
          const _name = that.data.name;
          const _idcard = that.data.idCard;
          const empty = "";
          if (res.statusCode == 200) {
            wx.showToast({
              title: '上传成功',
              icon: 'none',
              duration: 2000
            })
            if (_name !=''){
              const _addrLevel_1 = that.data.addrLevel_1;
              const _addrLevel_2 = that.data.addrLevel_2;
              const _addrLevel_3 = that.data.addrLevel_3;
              const _phone = that.data.phone;
              const _mark = that.data.desc;
              wx.reLaunch({
                url: '../face/face?' + 'name=' + _name + '&&idcard=' + _idcard + '&&phone=' + _phone + '&&mark=' + _mark + '&&addrLevel_1=' + _addrLevel_1 + '&&addrLevel_2=' + _addrLevel_2 + '&&addrLevel_3=' + _addrLevel_3
              })
            }else{
              wx.showToast({
                title: '请重新提交',
                icon: 'none',
                duration: 2000
              })
            }
            
          } else {
            wx.showToast({
              title: '服务器出现错误',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function (res) {
          console.log('出错了');
          wx.showToast({
            title: '网络异常',
            icon: 'none',
            duration: 3000
          });
        }
      })
    }
  },
  //提交
  submit: function () {
    var that = this;
    that.setData({
      disabled: true
    })
    wx.showLoading({
      title: '上传中...',
    })
    
    wx.getSavedFileList({
      success(res) {
        if (res.fileList.length > 0) {
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            complete(res) {
              console.log(res)
              console.log('图片删除成功');
            },
            success: function (res) {
            console.log(res);
            console.log('图片删除成功');
          },
          fail: function (res) {
            console.log('删除出错了');
          }
          })
        }
      }
    })
    wx.request({
      url: app.globalData.url.ocr, //接口地址
      data: {
        type: '2',
        idCardFront: that.data.picone
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data.name)
        console.log(res.data.data.idCard)
        if (res.statusCode == 200) {
          wx.hideLoading();
          const _name = res.data.data.name;
          const _idcard = res.data.data.idCard;
          const _addrLevel_1 = that.data.addrLevel_1;
          const _addrLevel_2 = that.data.addrLevel_2;
          const _addrLevel_3 = that.data.addrLevel_3;
          const _phone = that.data.phone;
          const _mark = that.data.desc;
          const _type = 2;
          wx.reLaunch({
            url: '../face/face?' + 'type=' + _type + '&&name=' + _name + '&&idcard=' + _idcard + '&&phone=' + _phone + '&&mark=' + _mark + '&&addrLevel_1=' + _addrLevel_1 + '&&addrLevel_2=' + _addrLevel_2 + '&&addrLevel_3=' + _addrLevel_3
          })
        }
      },
      fail: function (res) {
        console.log('出错了');
        wx.hideLoading();
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        });
        that.setData({
          disabled: false
        })
      }
    })
  },
  onLaunch: function () {
    
  },
  //事件处理函数
  onLoad: function (options) {
    var that = this;
    // if (options.addrLevel_1) {
    //   that.setData({
    //     phone: options.phone,
    //     desc: options.mark,
    //     addrLevel_1: options.addrLevel_1,
    //     addrLevel_2: options.addrLevel_2,
    //     addrLevel_3: options.addrLevel_3
    //   })
    // }
    
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
