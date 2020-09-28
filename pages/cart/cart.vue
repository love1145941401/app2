<template>
	<view>
		<view>
			<view class="cart" v-for="(item,index) in cart" :key="index">
				<van-checkbox :value="item.selected" change="oneCheckHandler(item)"></van-checkbox>
				<van-card :price="item.price" :title="item.name" :thumb="item.pic">
				</van-card>
				<van-stepper size="32" :value="item.num" min="1" max="10" @plus="inc(item)" @minus="dec(item)" />
			</view>
		</view>
		<van-submit-bar class="van-submit-bar" :price="cartTotal*100" button-text="提交订单">
			<van-checkbox @click="checkAllHandler" v-model="checked">全选</van-checkbox>
		</van-submit-bar>
	    </view>
</template>
<script>
import {mapState, mapGetters, mapActions } from 'vuex';
export default {
	data(){
		return{
			checked:true
		}
	},
	computed: {
		...mapState(['cart']),
		...mapGetters(['cartTotal']),
		...mapGetters(['cartNum'])
	},
	watch: {
		cartNum() {
			this.setBarBadge();
		}
	},
	methods: {
		...mapActions(['inc', 'dec', 'checkAll', 'checkOne','emptyCart']),
		setBarBadge() {
			if (this.cartNum > 0)
				uni.setTabBarBadge({
					index: 2,
					text: `${this.cartNum}`
				});
			else
				uni.removeTabBarBadge({
					index: 2
				});
		},
		checkAllHandler() {
			this.checked = !this.checked;
			this.checkAll(this.checked)
		},
		oneCheckHandler(item) {
			this.checkOne(item);
		}
	},
	
	onNavigationBarButtonTap(e) {
		let _self = this;
		if (e.index == 0) {
			if (this.cartNum > 0)
				uni.showModal({
					content: '确定要清空购物车吗?',
					success: function(res) {
						if (res.confirm) {
							_self.emptyCart();
						}
					}
				});
		}
		if(e.index==1){
			uni.switchTab({
				"url":"../home/home"
			});
			return;
		}
	}
};
</script>

<style scoped>
	.cart {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}
	.van-submit-bar {
	    position: relative !important;
		z-index: 999;
	}
	
</style>
