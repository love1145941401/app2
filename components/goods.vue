<template>
<view :style="{width:imgWidth}">
      <img style="width: 100%;" :src="product.pic" @tap="productHandler(product)"></img>
      <view>{{product.name}}</view>
      <view  class="gray_text">{{product.desc}}</view>
      <view class="cart-wrap">
            <view>
	     <text  style="color:red">¥{{product.price}}</text>
	     <text class="gray_text">/{{product.unit}}</text>
            </view >
            <view @click="addCart(product)"
			class="iconfont icon-cart_light cart-icon"></view>
      </view>
      <hr>
</view>
</template> 

<script>
	import {mapActions} from "vuex"
	export default {
	props:['product'],
	data() {
		return {   imgWidth:''};
	},
	methods:{
		...mapActions(['addCart']),
		productHandler(e){
			uni.navigateTo({
				url:"/pages/home/product?item="+encodeURIComponent(JSON.stringify(e))
			})
		}
	},
	created() {
		let res = uni.getSystemInfoSync();
		this.imgWidth=`${res.screenWidth/2-20}px`;
		console.log(this.imgWidth)
	}

	}
</script>

<style scoped>
	.goods-wrap{   width: 350rpx; }
	.cart-wrap{   display: flex;
		         flex-direction: row;
		         justify-content: space-between;
	}
	.gray_text{   color:#cccccc; }
	.cart-icon{    color: red;
		         font-size: 24px;
		         line-height: 24px;
	}


</style>
