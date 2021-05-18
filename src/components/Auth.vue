<template>
  <div class="login-container">
    <!-- 扫码登录 -->
    <div class="login_box">
      <router-link to="/login">
        <div class="login_close"></div>
      </router-link>
      <div class="login_panel">
        <div class="login_title">
          <img src="../assets/大白菜猫.jpeg" alt="图片消失啦">
        </div>
        <div class="qrcode">
          <img class="img" src="https://img-blog.csdnimg.cn/20210519023606624.png" alt="登录码"/>
          <div>
            <p class="sub_title">请使用手机口令扫码登录</p>
            <p class="sub_desc">扫码登录，更易、更快、更安全</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Auth',
  data () {
    return {
      state: 0, // 场景：0无登录码，1有登陆码，2正在登录，3登录码过期
      count: 30, // 登录码有效倒计时（S）
      tip: '正在获取登录码，请稍等', // 提示
      imgURL: '', // 登录码路径
      authToken: '', // 验证口令
      userId: '', // 扫码登录的用户ID
      userAvatar: '', // 扫码登录的用户头像
      userName: '', // 扫码登录的用户名
      tokenApi: '', // 获取口令
      tokenImgApi: '', // 获取口令对应的登录码
      tokenInfoApi: '', // 获取口令信息
      userInfoApi: '' // 获取用户信息
    }
  },
  created () {
    // do nothing
  },
  methods: {
    // nothing
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/background.jpg");
  background-size: 100% 100%;
  position: fixed;
}
/*登录框*/
.login_box {
  z-index: 99;
  position: absolute;
  width: 380px;
  height: 540px;
  top: 50%;
  left: 50%;
  margin-left: -190px;
  margin-top: -270px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 10px #999;
}
.login_close {
  position: absolute;
  top: 0;
  right: 0;
  width: 64px;
  height: 64px;
  background: url(../assets/qrcode-change.png) no-repeat right top;
  background-size: 100% 100%;
  border-top-right-radius: 5px;
  cursor: pointer;
  z-index: 99;
}
/*二维码*/
.qrcode {
  position: relative;
  text-align: center;
}
/* 二维码获取 */
.qrcode .img {
  display: block;
  width: 240px;
  height: 240px;
  margin: 25px;
}
.qrcode .sub_title {
  text-align: center;
  font-size: 20px;
  color: #353535;
  margin-bottom: 23px;
}
.qrcode .sub_desc {
  text-align: center;
  color: #a3a3a3;
  font-size: 14px;
  padding: 0 40px;
  line-height: 1.8;
}
/* 二维码为空 */
.qrcode .empty {
  display: block;
  width: 240px;
  height: 240px;
  margin: 70px auto 25px;
  background: #d7e8fc;
}
/* 二维码刷新 */
.qrcode .refresh {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 240px;
}
.qrcode .refresh .refresh_mask {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -120px;
  margin-top: -120px;
  width: 240px;
  height: 240px;
  background: #ffffffe0;
}
.qrcode .refresh .refresh_icon {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -48px;
  margin-top: -48px;
  height: 96px;
  width: 96px;
  cursor: pointer;
  background: url(../assets/background.jpg) no-repeat;
}
.qrcode .refresh .refresh_icon:hover {
  animation: refresh 1s linear infinite;
}
@keyframes refresh {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* 二维码结果 */
.qrcode .result {
  display: block;
  width: 240px;
  height: 240px;
  margin: 70px auto 25px;
}
.qrcode .result .u_avatar {
  height: 150px;
  width: 150px;
  margin-top: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 10px #999;
  -moz-box-shadow: #999 0 2px 10px;
  -webkit-box-shadow: #999 0 2px 10px;
}
.qrcode .result .u_name {
  text-align: center;
  font-size: 19px;
  color: #353535;
  margin-top: 20px;
}
.login_panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 540px;
  padding: 0 55px;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  overflow: hidden;
}
.login_panel .login_title {
  text-align: center;
}
.login_panel .login_title img {
  margin-top: 30px;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  padding: 10px;
  border: 3px solid #d7e8fc;
}
.login_panel .login_title p {
  margin-top: 15px;
  color: #999999;
  font-size: 15px;
}
</style>
