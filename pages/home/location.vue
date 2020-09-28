<template>
	<view>
		<van-search
			id="searchId"
			show-action
			v-model="address"
			left-icon="location-o"
			placeholder="请输入收货地址"
			shape="round"
			@search="onSearch"
			@cancel="onCancel"
			@change="onChange"
			@focus="focusHandler"
		/>
		<view v-show="!showMap">
			<view class="sendto">
				<text>送至:</text>
				<text>{{ address }}</text>
			</view>
			<view class="nearby"><text style="margin-left: 15px;">附近地址</text></view>
			<view style="margin-left: 15px;" v-for="(item, index) in addressNear" :key="index">
				<text @tap="setAddr(item)">{{ item }}</text>
				<view></view>
			</view>
			<view class="nearby" @tap="showMapHandler"><text style="margin-left: 15px;">更多地址...</text></view>
			<view class="showSearch" :style="{ height: addrHeight }" v-show="showSearch" @tap="searchEnd">
				<view style="margin-left: 15px;" v-for="(item, index) in addressNear" :key="index">
					<text @tap="setAddr(item)">{{ item }}</text>
					<view></view>
				</view>
			</view>
		</view>
		<view v-show="showMap">
			<map id="mapId" ref="map1" :style="{ width: '100%', height: addrHeight }" :latitude="latitude" :longitude="longitude" :markers="covers" @markertap="getMyAddr"></map>
			<scroll-view scroll-y="true" style="height: 200px;">
				<view style="margin-left: 15px;" v-for="(item, index) in addressNear" :key="index">
					<text @tap="setAddr(item)">{{ item }}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
var map, pt, searchObj;
export default {
	data() {
		return {
			showSearch: false,
			showMap: false,
			addrHeight: '',
			address: '', //记录到vuex中
			activeName: 0,
			addressNear: [],
			latitude: null, //纬度
			longitude: null, //经度
			covers: [
				{
					id: 1,
					latitude: null,
					longitude: null,
					iconPath: '../../static/location/location.png'
				}
			]
		};
	},
	methods: {
		onChange(val) {
			// var pt = new plus.maps.Point(this.latitude, this.longitude);
			searchObj.poiSearchNearBy(val.detail, pt, 1000);
		},
		onSearch(val) {
			searchObj.poiSearchNearBy(val.detail, pt, 1000);
		},
		onCancel() {
			this.showSearch = false;
		},
		focusHandler() {
			this.showSearch = true;
		},
		searchEnd() {
			this.showSearch = false;
		},
		getMyAddr(e) {
			console.log(this.covers);
		},
		setAddr(e) {
			this.address = e;
			this.showMap = false;
		},
		showMapHandler() {
			this.showMap = true;
		}
	},
	mounted() {
		const res = uni.getSystemInfoSync();
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#searchId')
			.boundingClientRect(data => {
				this.addrHeight = `${res.windowHeight - data.height - 200}px`;
				this.addrTop = `${data.height}px`;
				console.log(data);
			})
			.exec();

		let self = this;
		uni.getLocation({
			type: 'gcj02',
			geocode: true,
			success: function(res) {
				self.latitude = res.latitude;
				self.longitude = res.longitude;
				self.covers[0].latitude = res.latitude;
				self.covers[0].longitude = res.longitude;
				self.address = res.address.poiName;
				console.log(self.address);

				let appMap = uni.createMapContext('mapId', self);
				let map = appMap.$getAppMap();

				searchObj = new plus.maps.Search(map);
				searchObj.onPoiSearchComplete = function(state, result) {
					if (state == 0) {
						self.addressNear = [];
						result.poiList.forEach(e => self.addressNear.push(e.name));
					}
				};
				pt = new plus.maps.Point(self.latitude, self.longitude);
				searchObj.poiSearchNearBy('', pt, 100);
				console.log(self.addressNear);
			}
		});
	}
};
</script>

<style scoped>
.showSearch {
	z-index: 90;
	width: 100%;
	background: #cccccc;
	opacity: 0.5;
}

.sendto {
	width: 100%;
	margin-left: 15px;
	font-size: 16px;
	color: skyblue;
}

.nearby {
	width: 100%;
	margin-top: 15px;
	font-size: 16px;
	line-height: 32px;
	background: #ccdddd;
}
</style>
