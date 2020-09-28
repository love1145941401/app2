<template>
	<transition >
		<view class="share-wrap">
			<view class="share-icon-wrap">
				<image src="/static/pic/share/Wx.png" @tap="wxshareHandler"></image>
				<image src="/static/pic/share/WxFriend.png" @tap="wxFriendshareHandler"></image>
				<image src="/static/pic/share/QQ.png"></image>
				<image src="/static/pic/share/Weibo.png"></image>
			</view>
			<button class="cancel-btn" @tap="closeShare">取消</button>
		</view>
	</transition>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			closeShare() {
				this.$emit('close-share');
			},
			wxshareHandler(){
				this.$emit('wx-share');
			},
			wxFriendshareHandler(){
				this.$emit('wxfriend-share')
			}
		},
		created() {			
			//获取分享提供商
			uni.getProvider({
				service:'share',
				success:function(res){
					console.log(res.provider);
				}
			});			
		}
	}
</script>

<style scoped>
	.share-wrap {
		position: fixed;
		bottom: 0;
		border-radius: 15px;
		background: #CCCCCC;
		width: 100%;
		height: 150px;
	}
	image{
		width: 32px;
		height: 32px;
	}
	.share-icon-wrap {
		margin-top: 50px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.v-enter {
		height: 0;
		opacity: 0;
	}
	.v-enter-to {
		opacity: 1;
		height: 150px;
		transition: all 1.5s;
	}
	.v-leave-to{
		height: 0;
		opacity: 0;
		transition: all 1.5s;
	}
	.cancel-btn {
		position: fixed;
		width: 100%;
		bottom: 0;
		background: #dddddd;
		opacity: 1;
	}
</style>
