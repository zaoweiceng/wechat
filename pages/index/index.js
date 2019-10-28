// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region : ['北京市', '北京市', '东城区'],
    now : ''

  },

  changeRegion : function(e){
    this.setData({
      region : e.detail.value
    })
    this.getWeather();
  },
  getWeather : function(){
    var that = this;
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data:{
        location : that.data.region[1],
        key : '1b7eabd944184cd9beeec2856d86899e'
      },
      success:function(res){
        // console.log(res.data);
        that.setData({now:res.data.HeWeather6[0].now})
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress();
    this.getWeather();
      
  },

  getAddress : function(){
    let it = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude;
        var longtitude = res.longitude;
        console.log(latitude + " " + longtitude );

        var qqMapw = "http://apis.map.qq.com/ws/geocoder/v1/?location=" + latitude + "," + longtitude + "&key=LLSBZ-4GP6U-AP7VX-2KAVK-J6IR7-DWFUY";
        console.log(qqMapw);
        it.sendRequest(qqMapw);
      },
    })
  },

  sendRequest : function(qqMap){
    let it = this;

    wx.request({
      url:qqMap,
      data: {},
      method:'GMT',
      success:(res) => {
        // Console.log(res)
        // if (res.statusCode == 200 && res.data.status == 0){
          it.setData({ province: res.data.result.address_component.province });
          it.setData({ city: res.data.result.address_component.city });
          it.setData({ district: res.data.result.address_component.district });
          this.region[0] = province;
          this.region[1] = city;
          this.region[2] = district;
          console.log(province + " " + city + " " + district + " " + region[0]);
        // }
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

  }
})