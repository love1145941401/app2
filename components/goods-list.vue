<template>
	<view class="list-wrap">
		<view v-for="item in list" :key="item.id"><goods :product="item" class="item-wrap"></goods></view>
	</view>
</template>

<script>
import Goods from './goods.vue';

export default {
	components: {
		Goods
	},
	props: ['list'],
	data() {
		return {};
	}
};
</script>

<style scoped>
.list-wrap {
	display: flex;
	flex-direction: row;
	flex: 2;
	flex-wrap: wrap;
	justify-content: space-around;
}
.item-wrap{
	margin-bottom: 15px;
}
</style>
