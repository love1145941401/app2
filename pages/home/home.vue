<template>
	<view>
		<swiper autoplay="true">
			<swiper-item v-for="(item, index) in imgList" :key="index"><image :src="item" class="img-item"></image></swiper-item>
		</swiper>
		<view>
			<uni-grid :column="5" :showBorder="false" :square="false" style="margin-top:-20px;">
				<uni-grid-item v-for="(item, index) in cataList" :key="index">
					<image class="grid-img" :src="item.pic"></image>
					<text class="text">{{ item.name }}</text>
				</uni-grid-item>
			</uni-grid>
		</view>

		<view class="menu-wrap" :style="{ top: topHeight }">
			<text v-for="(item, index) in menuList" @tap="menuClick(index)" :class="index == menuIndex ? 'menu-item-active' : 'menu-item'" :key="index">{{ item }}</text>
		</view>
		<goods-list :list="products" style="margin-top: 5px;"></goods-list>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
import GoodsList from '@/components/goods-list.vue';
export default {
	components: {
		uniGrid,
		uniGridItem,
		GoodsList
	},
	computed: { ...mapGetters(['cartNum']) },
	watch: {
		cartNum(newValue, oldValue) {
			this.setBarBadge();
		}
	},
	data() {
		return {
			imgList: ['../../static/pic/1.jpg', '../../static/pic/2.jpg', '../../static/pic/3.jpg', '../../static/pic/4.jpg'],
			cataList: [
				{
					name: '餐饮熟食',
					pic: require('../../static/pic/cata/1.png')
				},
				{
					name: '乳品烘焙',
					pic: require('../../static/pic/cata/2.png')
				},
				{
					name: '美妆百货',
					pic: require('../../static/pic/cata/3.png')
				},
				{
					name: '酒水饮料',
					pic: require('../../static/pic/cata/4.png')
				},
				{
					name: '粮油零食',
					pic: require('../../static/pic/cata/5.png')
				},
				{
					name: '面点冻品',
					pic: require('../../static/pic/cata/6.png')
				},
				{
					name: '海鲜水产',
					pic: require('../../static/pic/cata/7.png')
				},
				{
					name: '肉禽蛋品',
					pic: require('../../static/pic/cata/8.png')
				},
				{
					name: '新鲜蔬菜',
					pic: require('../../static/pic/cata/9.png')
				},
				{
					name: '时令水果',
					pic: require('../../static/pic/cata/10.png')
				}
			],
			menuList: ['全部', '菜谱', '早餐', '休闲', '人气'],
			products: [],
			pageSize: 6,
			totalPage: 1,
			currentPage: 1,
			menuIndex: 0,
			topHeight: '0px'
		};
	},
	methods: {
		menuClick(e) {
			this.menuIndex = e;
			this.currentPage = 1;
			this.products = [];
			this.getProducts();
		},
		getProducts() {
			let param = {
				_limit: this.pageSize,
				_page: this.currentPage
			};
			if (this.menuIndex != 0) param = { ...param, cataId: this.menuIndex };
			uni.request({
				// url: 'http://localhost:3000/products',
				url: this.$appServer + '/products',
				data: param,
				success: res => {
					this.totalPage = Math.ceil(res.data.len / this.pageSize);
					this.products = [...this.products, ...res.data.data];
				}
			});
		},
		setBarBadge() {
			if (this.cartNum != 0) uni.setTabBarBadge({ index: 2, text: `${this.cartNum}` });
		}
	},
	onLoad() {
		this.setBarBadge();
		let h = uni.getSystemInfoSync();
		this.topHeight = `${h.windowTop}px`;

		this.getProducts();
	},
	onReachBottom() {
		//如果到达底部,返回
		if (this.currentPage >= this.totalPage) return;
		this.currentPage++;
		this.getProducts();
	},
	onNavigationBarButtonTap(e) {
		if (e.index == 0)
			uni.navigateTo({
				url: './location'
			});
		if (e.index == 1) {
			uni.scanCode({
				success() {
					console.log(res);
					plus.runtime.openURL(res.result);
				}
			});
		}
	}
};
</script>

<style scoped>
.img-item {
	width: 100%;
	height: 120px;
}
.grid-img {
	width: 36px;
	height: 36px;
	margin-left: 15px;
	margin-bottom: 5px;
}
.text {
	font-size: 16px;
	vertical-align: middle;
	line-height: 32px;
	margin-left: 5px;
}
.menu-wrap {
	position: sticky;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	height: 38px;
	background: #c8c7cc;
}
.menu-item {
	font-size: 16px;
	line-height: 38px;
}
.menu-item-active {
	font-size: 20px;
	line-height: 38px;
	border-bottom: solid;
}
</style>
