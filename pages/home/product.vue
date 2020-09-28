<template>
	<view>
		<view class="name-wrap">{{ product.name }}</view>
		<image mode="aspectFit" :src="product.pic"></image>
		<view class="price-class">
			<text class="hb-wrap">¥</text>
			{{ product.price }}
			<text class="unit-wrap">/{{ product.unit }}</text>
		</view>
		<view class="desc-class">{{ product.desc }}</view>
		<view>关联产品介绍</view>
		<view>产品烹调技巧介绍</view>
		<view class="btn-wrap"><button type="primary" @click="addCart(product)">加入购物车</button></view>
		<my-share v-show="show" @close-share="closeShare" @wx-share="wxShareHandler" 
		@wx-friend-share="wxFriendHandler"></my-share>
	</view>
</template>

<script>
import MyShare from '@/components/my-share.vue';
import { mapActions } from 'vuex';

export default {
	components: {
		MyShare
	},
	data() {
		return {
			show: false,
			url: '',
			product: {}
		};
	},
	methods: {
		...mapActions(['addCart']),
		closeShare() {
			this.show = false;
		},
		wxShareHandler() {
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 0,
				href: this.url,
				title: `${this.product.name}分享`,
				summary: `¥${this.product.price}/${this.product.uniit}\${this.product.desc}`,
				imageUrl: this.product.pic,
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
		wxFriendHandler() {
			uni.share({
				provider: 'weixin',
				scene: 'WXsenceTimeline',
				type: 0,
				href: this.url,
				title: `${this.product.name}分享`,
				summary: `¥${this.product.price}/${this.product.uniit}\${this.product.desc}`,
				imageUrl: this.product.pic,
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		}
	},
	onLoad(e) {
		this.product = JSON.parse(decodeURIComponent(e.item));
		this.url = this.$appServer + '/#/pages/home/product?item=';
		//this.url = 'http://localhost:3000/#/pages/home/product?item=';
		this.url += encodeURIComponent(JSON.stringify(this.product));
	},
	onNavigationBarButtonTap(e) {
		this.show = true;
	}
};
</script>

<style scoped>
.price-class {
	margin-left: 15px;
	font-size: 24px;
	line-height: 24px;
	color: red;
}
.hb-wrap {
	margin: 15px;
	font-size: 18px;
	line-height: 24px;
	color: red;
}
.unit-wrap {
	font-size: 18px;
	line-height: 24px;
	color: #cccccc;
}
.name-wrap {
	margin: 5px;
	font-size: 24px;
	line-height: 24px;
	text-align: center;
}
.desc-class {
	margin: 10px;
}
.btn-wrap {
	position: fixed;
	bottom: 0;
	width: 100%;
}
</style>
