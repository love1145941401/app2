<template>
	<view class="content">
		<view class="iconfont icon-guanbi close-btn" @tap="closeClick"></view>
		<view class="login-top"><text>登录获得更多服务</text></view>
		<view class="mm-input"><input type="number" placeholder="请输入手机号码" confirm-type="done" maxlength="11" class="text-input" @input="mobileInput" /></view>
		<view v-if="tabflag == 0">
			<button :disabled="!vcode_active" class="vcode-wrap" type="primary">获取验证码</button>
			<view class="msg-login">
				<text>未注册手机验证后自动注册</text>
				<text class="mmtab" @tap="tabChange">密码登录</text>
			</view>
		</view>
		<view style="margin: 20px;" v-else>
			<input type="text" style="width: 85%;" placeholder="请输入登录密码" confirm-type="done" maxlength="16" class="text-input" @input="passInput" />
			<button :disabled="!login_active" class="login-wrap" type="primary">登录</button>
			<view class="msg-login">
				<text class="mmtab">忘记密码</text>
				<text class="mmtab" @tap="tabChange">验证码登录</text>
			</view>
		</view>
		<view class="ysxy">
			<view v-show="!showMoreLogin" class="more-login" @tap="showMoreLogin = true">更多登录方式</view>
			<third-login class="more-login" v-show="showMoreLogin"></third-login>
			<view class="xynr">
				<text>登录即同意</text>
				<text class="b-link">用户协议</text>
				<text>和</text>
				<text class="b-link">隐私政策</text>
			</view>
		</view>
	</view>
</template>

<script>
import ThirdLogin from '@/components/third-login.vue';
export default {
	components: {
		ThirdLogin
	},
	data() {
		return {
			mobile: '',
			passwd: '',
			vcode_active: false,
			login_active: false,
			tabflag: 0,
			showMoreLogin: false
		};
	},
	methods: {
		closeClick() {
			uni.navigateBack({
				animationType: 'slide-out-left',
				animationDuration: 300
			});
		},
		mobileInput(e) {
			this.mobile = e.detail.value;
			this.vcode_active = this.mobile.length == 11;
		},
		passInput(e) {
			this.passwd = e.detail.value;
			this.login_active = this.mobile.length == 11 && this.passwd.length > 5;
		},
		tabChange() {
			this.tabflag = this.tabflag == 0 ? 1 : 0;
		}
	}
};
</script>

<style scoped>
.content {
	width: 100%;
	height: 100%;
}

.close-btn {
	font-size: 16px;
	margin-left: 20px;
	margin-top: 50px;
}

.login-top {
	text-align: center;
	font-size: 32px;
	line-height: 32px;
	font-weight: bold;
}

.mm-input {
	margin-left: 20px;
	margin-top: 100px;
}

.text-input {
	width: 80%;
	margin-left: 25px;
	font-size: 24px;
	line-height: 24px;
	padding-bottom: 10px;
	border-bottom: #007aff solid 1px;
}

.vcode-wrap {
	vertical-align: middle;
	width: 80%;
	margin-top: 20px;
}

.login-wrap {
	vertical-align: middle;
	width: 90%;
	margin-top: 20px;
}

.msg-login {
	margin-left: 5px;
	margin-top: 20px;
	display: flex;
	font-size: 14px;
	flex-direction: row;
	justify-content: space-around;
}

.mmtab {
	font-size: 16px;
}

.ysxy {
	width: 100%;
	position: fixed;
	bottom: 30px;
}

.more-login {
	font-size: 16px;
	text-align: center;
	margin-bottom: 20px;
}

.xynr {
	text-align: center;
	font-size: 14px;
	margin-top: 20px;
}

.b-link {
	border-bottom: solid 1px;
}
</style>
