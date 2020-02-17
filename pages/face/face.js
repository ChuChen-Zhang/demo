// pages/face/face.js
//获取应用实例
const app = getApp();
Page({
  data: {
    imgsrc: "../../image/idcard.jpg",
    name: "",
    idcard: "",
    phone: "",
    addrLevel_1: "北京市大兴区",
    addrLevel_2: "",
    addrLevel_3: "",
    addrLevel_1_focus: false,
    addrLevel_2_focus: false,
    addrLevel_3_focus: false,
    name_focus: false,
    idcard_focus: false,
    phone_focus: false,
    text_focus: false,
    currentNoteLen: "",
    desc: "",
    pic: "",
    nickName: '',
    position: '',
    orderNumber: "",
    picInfoId:"",
    headPic: "", 
    localtionView: true,
    localtionPicker: false,
    localtionInput: false,
    currentView: true,
    currentPicker: false,
    currentInput: false,
    autoFocus: false, 
    currentautoFocus: false,
    addr1_array: [],
    addr2_array: [],
    localtionIndex: 0,
    currentInex : 0
  },
  //所在区
  bindlocaltionPicker: function (e) {
    var that = this;
    if (e !=1){
      const _index = e.detail.value;
      that.setData({
        localtionIndex: _index,
        addrLevel_1: that.data.addr1_array[_index]
      })
    }else{
      wx.showToast({
        title: '点击选择所在区',
        icon: 'none',
        duration: 1000
      });
    }
    
  },
  
  bindlocaltionView: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '请选择输入方式',
      confirmText: '列表选择',
      cancelText: '手动输入',
      success(res) {
        if (res.confirm) {
          that.setData({
            localtionView: false,
            localtionInput: false,
            localtionPicker: true
          })
          that.bindlocaltionPicker(1);
        } else if (res.cancel) {
          that.setData({
            localtionView: false,
            localtionPicker: false,
            localtionInput: true,
            autoFocus: true
          })
        }
      }
    })
    
  },
  //当前位置
  bindcurrentPicker: function (e) {
    var that = this;
    if (e != 1) {
      const _index = e.detail.value;
      that.setData({
        currentInex: _index,
        addrLevel_2: that.data.addr2_array[_index]
      })
    } else {
      wx.showToast({
        title: '点击选择当前位置',
        icon: 'none',
        duration: 1000
      });
    }

  },

  bindcurrentView: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '请选择输入方式',
      confirmText: '列表选择',
      cancelText: '手动输入',
      success(res) {
        if (res.confirm) {
          
          that.setData({
            currentView: false,
            currentInput: false,
            currentPicker: true
          })
          that.bindcurrentPicker(1);
        } else if (res.cancel) {
          
          that.setData({
            currentView: false,
            currentPicker: false,
            currentInput: true,
            currentautoFocus: true
          })
        }
      }
    })

  },
  idcardTarget: function(){
    var that = this;
    const _phone = that.data.phone;
    const _mark = that.data.desc;
    const _addrLevel_1 = that.data.addrLevel_1;
    const _addrLevel_2 = that.data.addrLevel_2;
    const _addrLevel_3 = that.data.addrLevel_3;
    app.globalData.addrLevel_1 = that.data.addrLevel_1;
    app.globalData.addrLevel_2 = that.data.addrLevel_2;
    app.globalData.addrLevel_3 = that.data.addrLevel_3;
    app.globalData.phone = that.data.phone;
    app.globalData.mark = that.data.desc;
    wx.navigateTo({
      url: '../../pages/idcard/idcard?phone=' + _phone + '&&mark=' + _mark + '&&addrLevel_1=' + _addrLevel_1 + '&&addrLevel_2=' + _addrLevel_2 + '&&addrLevel_3=' + _addrLevel_3
    })
  },
  //addrLevel_1
  addrLevel_oneinput: function (e) {
    var that = this;
    that.setData({
      addrLevel_1: e.detail.value,
      addrLevel_1_focus: false
    })
  },
  //addrLevel_2
  addrLevel_twoinput: function (e) {
    var that = this;
    that.setData({
      addrLevel_2: e.detail.value,
      addrLevel_2_focus: false
    })
  },
  //addrLevel_3
  addrLevel_threeinput: function (e) {
    var that = this;
    that.setData({
      addrLevel_3: e.detail.value,
      addrLevel_3_focus: false
    })
  },
  //姓名
  blurnameinput: function (e) {
    var that = this;
    that.setData({
      name: e.detail.value,
      name_focus: false
    })
    
  },
  //证件号
  bluridcardinput: function (e) {
    var that = this;
    that.setData({
      idcard: e.detail.value,
      idcard_focus: false
    })
    
  },
  //联系电话
  blurphoneinput: function (e) {
    var that = this;
    that.setData({
      phone: e.detail.value
      ,
      phone_focus: false
    })
  },
  //文本域内容
  bindWordLimit: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    this.setData({
      currentNoteLen: len
    })
    var that = this;
    console.log(that.data.desc);
    if (e.detail.value.desc != '') {
      that.setData({
        desc: e.detail.value
        // ,
        // text_focus:false
      })
    } else {
      // that.setData({
      //   text_focus: true
      // })
    }
    if (that.data.currentNoteLen > 150) {
      wx.showToast({
        title: '最多输入150个字',
        icon: 'none',
        duration: 1500
      });
    }
  },
  chooseImg: function () {
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
              imgsrc: _savedFilePath
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
                      pic: res.data
                    })
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
        console.log(that.data.imgsrc);
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
  formSubmit: function (e) {
    var that = this;
    var CARD = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
    // var PHONE = /^1[3|4|5|8][0-9]\d{8}$/;
    var PHONE = /^1\d{10}$/;
    if (e.detail.value.addrLevel_1 == '') {
      that.setData({
        addrLevel_1_focus: true
      })
      wx.showToast({
        title: '请输入所在区',
        icon: 'none',
        duration: 2000
      });
    } else if (e.detail.value.addrLevel_2 == '') {
      that.setData({
        addrLevel_2_focus: true
      })
      wx.showToast({
        title: '请输入当前位置',
        icon: 'none',
        duration: 2000
      });
    } else if (e.detail.value.name == ''){
      that.setData({
        name_focus: true
      })
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      });
    } else if (e.detail.value.idcard == '') {
      that.setData({
        idcard_focus: true
      })
      wx.showToast({
        title: '请输入证件号',
        icon: 'none',
        duration: 2000
      });
    } else if (!CARD.test(e.detail.value.idcard)) {
      that.setData({
        idcard_focus: true
      })
      wx.showToast({
        title: '证件号有误',
        icon: 'none',
        duration: 2000
      });
    }
    //  else if (e.detail.value.phone == '') {
    //   that.setData({
    //     phone_focus: true
    //   })
    //   wx.showToast({
    //     title: '请输入联系电话',
    //     icon: 'none',
    //     duration: 2000
    //   });
    // }
    else if (e.detail.value.phone != '' && !PHONE.test(e.detail.value.phone)) {
      that.setData({
        phone_focus: true
      })
      wx.showToast({
        title: '联系电话有误',
        icon: 'none',
        duration: 2000
      });
    }
    //  else if (that.data.imgsrc == "../../image/idcard.jpg") {
    //   wx.showToast({
    //     title: '请选择照片',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    //  else if (e.detail.value.desc == '') {
    //   wx.showToast({
    //     title: '请输入备注说明',
    //     icon: 'none',
    //     duration: 2000
    //   });
    // }
    else{
      wx.showLoading({
        title: '上传中',
      })
      console.log(that.data.desc)
      console.log(e.detail.value.desc);
      wx.request({
        url: app.globalData.url.check, //接口地址
        data: {
          managerId: app.globalData.managerId,
          // managerId: '1',
          addrLevel_1: that.data.addrLevel_1,
          addrLevel_2: that.data.addrLevel_2,
          addrLevel_3: that.data.addrLevel_3,
          name: that.data.name,
          idcard: that.data.idcard,
          phone: that.data.phone,
          mark: that.data.desc,
          // pic: that.data.pic,
          nickName: that.data.nickName,
          position: that.data.position
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
          const _idcard = that.data.idcard;
          const _phone = that.data.phone;
          const _mark = that.data.desc;
          const _addrLevel_1 = that.data.addrLevel_1;
          const _addrLevel_2 = that.data.addrLevel_2;
          const _addrLevel_3 = that.data.addrLevel_3;
          if (res.statusCode == 200) {
            wx.showToast({
              title: '上传成功',
              icon: 'none',
              duration: 2000
            })
            if (res.data.data == 0) {
               
              wx.reLaunch({
                url: '../success/success?' + 'name=' + _name + '&&idcard=' + _idcard + '&&phone=' + _phone + '&&mark=' + _mark + '&&addrLevel_1=' + _addrLevel_1 + '&&addrLevel_2=' + _addrLevel_2 + '&&addrLevel_3=' + _addrLevel_3
              })
            }
            else if (res.data.data == 1 || res.data.data == 2) {
              wx.reLaunch({
                url: '../lastFail/lastFail?' + 'name=' + _name + '&&idcard=' + _idcard + '&&phone=' + _phone + '&&mark=' + _mark + '&&addrLevel_1=' + _addrLevel_1 + '&&addrLevel_2=' + _addrLevel_2 + '&&addrLevel_3=' + _addrLevel_3
              })
            } else if (res.data.data == 3) {
              wx.reLaunch({
                url: '../invalid/invalid?' + 'name=' + _name + '&&idcard=' + _idcard + '&&phone=' + _phone + '&&mark=' + _mark + '&&addrLevel_1=' + _addrLevel_1 + '&&addrLevel_2=' + _addrLevel_2 + '&&addrLevel_3=' + _addrLevel_3
              })
            }
          } else {
            wx.showToast({
              title: '服务器出现错误',
              icon: 'none',
              duration: 2000
            })
            wx.reLaunch({
              url: '../firstFail/firstFail?' + 'name=' + _name + '&&idcard=' + _idcard + '&&phone=' + _phone + '&&mark=' + _mark + '&&addrLevel_1=' + _addrLevel_1 + '&&addrLevel_2=' + _addrLevel_2 + '&&addrLevel_3=' + _addrLevel_3
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
          that.setData({
            imgsrc: "../../image/idcard.jpg"
          });
        }
      })
    }
  },
  //事件处理函数
  onLoad: function (options) {
    console.log(options)
    var that = this;
    if (options.addrLevel_1){
      that.setData({
        name: options.name,
        idcard: options.idcard,
        phone: options.phone,
        desc: options.mark,
        addrLevel_1: options.addrLevel_1,
        addrLevel_2: options.addrLevel_2,
        addrLevel_3: options.addrLevel_3,
        currentNoteLen: options.mark.length
      })
    }
    if (options.type == 3) {
      that.setData({
        phone: app.globalData.phone,
        desc: app.globalData.mark,
        addrLevel_1: app.globalData.addrLevel_1,
        addrLevel_2: app.globalData.addrLevel_2,
        addrLevel_3: app.globalData.addrLevel_3,
        name: options.name,
        idcard: options.idcard
      })
    }
    wx.request({
      url: app.globalData.url.addr, //接口地址
      data: {
        // id: 1,
        id: app.globalData.managerId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        console.log(res.data.data);
        const _data = res.data.data;
        if (res.data.code == 200) {
          if (options.type == 1 || options.type == 3) {
            that.setData({
              addrLevel_1: _data.addr1,
              addrLevel_2: _data.addr2,
              addr1_array: _data.addrList1,
              addr2_array: _data.addrList2
            })
          } else if (options.type == 2) {
            that.setData({
              addr1_array: _data.addrList1,
              addr2_array: _data.addrList2
            })
          }
          
        } else {
          wx.showToast({
            title: '服务器出现错误',
            icon: 'none',
            duration: 2000
          })

        }
      }
    })
    
    
    // that.setData({
    //   managerId: options.managerId
    // })
    console.log(app.globalData.managerId)
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // console.log(res.longitude)
        // console.log(res.latitude)
        const _position = res.longitude + ',' + res.latitude;
        that.setData({
          position: _position
        })
      }
    })
    //已经授权，可以直接调用 getUserInfo 获取头像昵称
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        // console.log(res.rawData)
        const rawData = JSON.parse(res.rawData);
        that.setData({
          nickName: rawData.nickName
        })
      }
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
    // this.setData({
    //   imgsrc: "../../image/user.jpg"
    // })
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
