//app.js
App({
  onLaunch: function () {
    
    
  },
  onShow: function () {

    console.log("app.onShow");
  },
  globalData: {
    url:{
      login:'https://ydwxmp.cnsafeid.cn/login',
      check:'https://ydwxmp.cnsafeid.cn/check',
      ocr: 'https://ydwxmp.cnsafeid.cn/ocr',
      addr: 'https://ydwxmp.cnsafeid.cn/addr'
    },
    addrLevel_1: "北京市大兴区",
    addrLevel_2: "",
    addrLevel_3: "",
    phone: "",
    mark: "",
    managerId:'',
    root:'https://pinchacha.eidsp.cn',
    // root: 'https://pcc.eidsp.cn',
    userInfo: null,
    scence:1,
    manual_entry:0,
    userId: "",
    entId: "",
    token:"a4e4ba324c01b7df",
    openId:"",
    miniSerialNumber:"",
    credit: 1
  }
})