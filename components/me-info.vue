<template>
	<view class="user-info">
		<view class="userWrap">
			<view class="user-img">
				<image class="head-img" :src="(userInfo==null)?defaultHead:userInfo.avatarUrl" @tap="loginClick"></image>
				<view class="user-detail">
					<view class="userName-wrap">
						<text v-text="(userInfo==null)?'未登录' : userInfo.nickName"></text>
					</view>
					<view>
						<text v-text="(userInfo==null)?'点击头像登录或注册':userInfo.city"></text>
					</view>
				</view>
			</view>
			<view v-show="(userInfo!=null)" class="iconfont icon-logout logout-text" @tap="logout">注销</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex"
	export default {
		data() {
			return {
				defaultHead: "/static/pic/head/default.jpg"
			};
		},
		computed: {
			...mapState(['userInfo'])
	
		},
		methods: {
	
			...mapActions(['logout']),
			loginClick() {
				// console.log("ss"+userInfo)
				if (this.userInfo != null) return;
				uni.navigateTo({
					animationType: 'slide-in-left',
					animationDuration: 300,
					url: "../home/login"
				})
			}
		}
	}
</script>

<style scoped>
	.user-info {
		width: 100%;
		position: fixed;
		top: 15%;
		z-index: 90;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-color: white;
	}

	.userWrap {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.user-img{
		display: flex;
		flex-direction: row;		
	}

	.head-img {
		position: relative;
		width: 72px;
		height: 72px;
		border-radius: 50%;
		border-color: white;
		border-width: 10px;
		border-style: solid;
		left: 20px;
		top: -20px;
	}

	.userName-wrap {
		font-size: 24px;
		line-height: 24px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.user-detail {
		margin-left: 20px;
	}
	
	.logout-text{
		font-size: 20px;
		line-height: 48px;
		margin-right: 20px;
	}
</style>
