//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiper: [], //轮播图片
    goods_index: [], //首页商品列表
    pet_expert:[],//养宠达人列表
    special_topic:[],//专题
    goods_recommend:[],//活动

  },
  onLoad() {
    //请求
    this.getSwiper();
    this.getGoodsIndex();
    this.getPetExpert();
    this.getSpecialTopic();
    this.getGoodsRecommend();
	this.loginApp();
  },

  //请求轮播图
  getSwiper() {
    let that = this;
    wx.request({
      url: 'https://wechatapi.vipcsg.com/index/slider/index',
      data: {},
      success(res) {
        that.setData({
          swiper: res.data.data
        })
        // console.log(that.data.swiper)
      },
    })
  },

  //请求商品列表
  getGoodsIndex(){
    let that = this;
    wx.request({
      url: 'https://wechatapi.vipcsg.com/index/goods/index',
      data: {},
      success(res) {
        that.setData({
          goods_index: res.data.data
        })
        console.log(that.data.goods_index)
      },
    })
  },

  //养宠达人
  getPetExpert(){
    let that = this;
    wx.request({
      url: 'https://wechatapi.vipcsg.com/index/friend/index',
      data: {},
      success(res) {
        that.setData({
          pet_expert: res.data.data
        })
        // console.log(that.data.pet_expert)
      },
    })
  },

  //专题
  getSpecialTopic(){
    let that = this;
    wx.request({
      url: 'https://wechatapi.vipcsg.com/index/project/index',
      data: {},
      success(res) {
        that.setData({
          special_topic: res.data.data
        })
        // console.log(that.data.special_topic)
      },
    })
  },

  //活动
  getGoodsRecommend(){
    let that = this;
    wx.request({
      url: 'https://wechatapi.vipcsg.com/index/events/index',
      data: {},
      success(res) {
        that.setData({
          goods_recommend: res.data.data
        })
        // console.log(that.data.goods_recommend)
      },
    })
  },
  
  //用户登录
  loginApp(){
	  wx.login({
		  success: function (res) {
			if (res.code) {
			  var code = res.code;
			  wx.getUserInfo({//getUserInfo流程
				success: function (res2) {//获取userinfo成功
				  console.log(res2);
				  var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
				  var iv = res2.iv;
				  //发起网络请求
				  wx.request({
            url: 'https://wechatapi.vipcsg.com/index/member/login',
            method: 'POST',
            data: {
              code: res.code,
              encryptedData: encryptedData,
              iv: iv
            },success(resUser) {
              app.globalData.userInfo = resUser
              debugger;
              console.log(resUser);
              //app.globalData.userId = resUser.data.data.user_id
              wx.setStorageSync('LoginSessionKey', resUser.data.data.user_id)  //保存在session中
              /*
              that.setData({
                goods_recommend: resUser.data.data
              })*/
              // console.log(that.data.goods_recommend)
              },
				  })
				}
			  })
			} else {
			  console.log('登录失败！' + res.errMsg)
			}
		  }
		})
  }
})