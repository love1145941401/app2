<template>
	<view class="content">
		<view v-for="(item, index) in providerList" :key="index">
			<image class="img-wrap" :src="item.icon" @tap="thirdLogin(item.provider)"></image>
			<view class="text">{{ item.loginName }}</view>
		</view>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			providerList: []
		};
	},
	methods: {
		...mapActions(['login']),
		thirdLogin(provider) {
			uni.login({
				provider,
				success: res => {
					//console.log(res);
					uni.getUserInfo({
						provider: provider,
						success: (resInfo) => {
							console.log(resInfo);
							uni.request({
								url: this.$appServer + '/wxlogin',
								method: 'POST',
								data:resInfo.userInfo,
								success: retRes => {
									this.login(retRes.data);//vuex action
									//this.login(retRes.data); //vuex action
									uni.navigateBack(); //自动登录后返回
								},
								fail: err => {
									console.log(err);
								}
							});
						}
					});
				}
			});
		}
	},
	mounted() {
		uni.getProvider({
			service: 'oauth',
			success: res => {
				res.provider.forEach(item => {
					let loginName = '';
					let icon = '';
					switch (item) {
						case 'weixin':
							loginName = '微信登录';
							icon = '/static/pic/share/Wx.png';
							break;
						case 'qq':
							loginName = 'QQ登录';
							icon = '/static/pic/share/QQ.png';
							break;
						case 'sinaweibo':
							loginName = '微博登录';
							icon = '/static/pic/share/Weibo.png';
							break;
					}
					this.providerList.push({
						provider: item,
						loginName,
						icon
					});
				});
			}
		});
	}
};
</script>

<style>
.content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}

.weixin-btn {
	background: transparent;
	border: none;
}
.img-wrap {
	width: 48px;
	height: 48px;
}

.text {
	font-size: 14px;
}
</style>
