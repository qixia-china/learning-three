<template>
  <div class="login_root">
    <div class="header">
      <div class="header-center fl">
        <div class="header-title">登录界面{{ user.name }}</div>
        <div class="header-img"></div>
      </div>
      <div class="header-bottom fl"></div>
    </div>
    <div class="content">
      <div class="content-left"></div>
      <div class="content-right">
        <div class="right-infp">
          <div class="right-infp-name">
            <input
              type="text"
              name="username"
              placeholder="请输入用户名"
              maxlength="12"
              v-model.trim="user.name"
              autocomplete="off"
            />
          </div>
          <div class="right-infp-name">
            <input
              type="text"
              name="name"
              placeholder="请输入用户名"
              autocomplete="off"
              v-model.trim="user.password"
            />
          </div>
          <div class="right-infp-btn">
            <button class="btn" @click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      user: {
        name: '18438603552',
        password: '123456',
      },
    }
  },
  methods: {
    login() {
      const user = this.user
      const phone_reg = /^1[0-9]{10}$/
      if (!phone_reg.test(user.name)) {
        ElMessage({
          message: '请输入用户名称',
          type: 'warning',
        })
        console.log('请输入用户名称')
        return
      }
      const psw_reg = /^[0-9a-zA-Z]{6,}$/
      if (!psw_reg.test(user.password)) {
        ElMessage({
          message: '请输入用户密码',
          type: 'warning',
        })
        return
      }

      localStorage.setItem('userInfo', JSON.stringify({ user }))
      localStorage.setItem('token', '1234567890888')
      this.$router.push('/home')
    },
  },
  mounted() {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const { name, password } = JSON.parse(userInfo)?.user ?? {}
      this.user.name = name
      this.user.password = password
    }
  },
}
</script>
<style scoped lang="scss">
.login_root {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
  background: url('@/assets/images/login/images/bj.jpg') no-repeat;
  background-size: 100% 100%;
  font-size: 11.3px;
  color: #ffffff;
  position: relative;

  /*头部*/
  .header {
    width: 100%;
    height: 105px;

    .header-center {
      width: 50%;
      height: 84px;
      position: relative;
      margin: 0 auto;

      .header-title {
        text-align: center;
        color: #ffffff;
        font-size: 28px;
        text-shadow: 0 0 21px #00d8ff;
        line-height: 73.5px;
      }
    }

    .header-img {
      background: url('@/assets/images/login/images/head.gif') no-repeat center center;
      background-size: 100%;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 56px;
    }
  }

  .content {
    width: 840px;
    height: 490px;
    margin: 70px auto 0 auto;
  }

  .content .content-left {
    width: 434px;
    height: 406px;
    /*border: 1px solid red;*/
    background: url('@/assets/images/login/images/d.png') no-repeat;
    background-size: 100% 100%;
    padding: 28px 0;
    box-sizing: border-box;
    margin-right: 2%;
    float: left;
  }

  @keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .content .content-left {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    animation: rotation 15s linear infinite;
    -moz-animation: rotation 15s linear infinite;
    -webkit-animation: rotation 15s linear infinite;
    -o-animation: rotation 15s linear infinite;
  }

  .content .content-right {
    width: 378px;
    height: 406px;
    background: url('@/assets/images/login/images/e.png') no-repeat;
    background-size: 100% 100%;
    float: right;
    position: relative;
  }

  .right-infp {
    width: 280px;
    height: 210px;
    margin: auto auto;
    /* border: 1px solid red;*/
    vertical-align: center;
    position: absolute;
    top: 112px;
    left: 63px;
  }

  .right-infp-name {
    background: url('@/assets/images/login/images/b.png') no-repeat;
    width: 100%;
    height: 35px;
    background-size: 100% 100%;
    line-height: 31.5px;
    margin-bottom: 28px;
    position: relative;
  }

  .right-infp-name input {
    width: 85%;
    border: none;
    box-sizing: border-box;
    height: 35px;
    margin-left: 35px;
    line-height: 28px;
    background: none !important;
    color: #00eaff;
    padding-left: 10.5px;
    /*box-shadow: 0 0 1px #00eaff;*/
    outline: none;
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
    // position: absolute;
  }

  input::-webkit-input-placeholder {
    color: #ccc;
  }

  .right-infp-btn {
    background: url('@/assets/images/login/images/a.png') no-repeat;
    width: 100%;
    height: 35px;
    background-size: 100% 100%;
    line-height: 35px;
    margin-bottom: 28px;
    position: relative;
  }

  .right-infp-btn .btn {
    width: 95%;
    border: none;
    box-sizing: border-box;
    height: 31.5px;
    margin-left: 7px;
    font-size: 15.4px;
    cursor: pointer;
    background: none;
    outline: none;
    color: #fff;
    // position: absolute;
  }
}
</style>
