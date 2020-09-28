export default{
	//购物车
	//cart:localStorage["cart"]?JSON.parse(localStorage["cart"]): [] 	
	cart:uni.getStorageSync('cart')?
		JSON.parse(uni.getStorageSync('cart')): [],

	userInfo:uni.getStorageSync('userInfo')?
	JSON.parse(uni.getStorageSync('userInfo')):null
}