<template>
	<view>
		<view class="logintop"><image src="/static/icon.png" mode=""></image></view>
		<view class="logincon">
			<!-- #ifdef MP-WEIXIN || H5 -->
			<button class="wxloginbtn" type="primary" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="login">微信授权登录</button>
			<!-- #endif -->

			<!--#ifdef APP-PLUS-->
			<view>微信登录</view>

			<view>手机登录</view>

			<view>QQ登录</view>
			<!--#endif-->

			<!--#ifdef MP-QQ-->
			<view>QQ登录</view>
			<!--#endif-->

			<!--#ifdef MP-QQ-->
			<view>QQ登录</view>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			origin: '',
			SessionKey: '',
			OpenId: '',
			nickName: null,
			avatarUrl: null,
			userinfo: {},
			code: '',
			isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
		};
	},
	onLoad: function(options) {
		this.origin = '/' + decodeURIComponent(options.url);
		console.log(this.origin);
	},
	methods: {
		//第一授权获取用户信息===》按钮触发
		wxGetUserInfo() {
			let _this = this;
			uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					console.log(infoRes);
					let nickName = infoRes.userInfo.nickName; //昵称
					let avatarUrl = infoRes.userInfo.avatarUrl; //头像
					try {
						uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
						_this.updateUserInfo();
					} catch (e) {}
				},
				fail(res) {}
			});
		},
		// 默认微信小程序登录
		login() {
			let _this = this;
			uni.showLoading({
				title: '登录中...'
			});
			// 1.wx获取登录用户code
			uni.login({
				provider: 'weixin',
				success: async function(loginRes) {
					console.log(loginRes);

					var code = {
						code: loginRes.code
					};
					uni.getUserInfo({
						provider: 'weixin',
						success: async function(infoRes) {
							// console.log(infoRes); //获取用户信息后向调用信息更新方法
							let nickName = infoRes.userInfo.nickName; //昵称
							let avatarUrl = infoRes.userInfo.avatarUrl; //头像
							//_this.updateUserInfo(); //调用更新信息方法
							_this.userinfo = infoRes.userInfo;
							var otherinfo = {
								rawData: infoRes.rawData,
								signature: infoRes.signature,
								encryptedData: infoRes.encryptedData,
								iv: infoRes.iv
							};
							Object.assign(_this.userinfo, code, otherinfo);

							var params = _this.userinfo;
							console.log(params);
							await _this.$api.showLoading(); // 显示loading
							let loginres = await _this.$api.postData(_this.$api.webapi.uniLogin, params);
							await _this.$api.hideLoading();

							if (_this.$api.reshook(loginres, '/pages/login/login')) {
								_this.loginSuccess(loginres, 'weixin');
							}
						}
					});
				}
			});
		},

		async loginSuccess(res, platform) {
			console.log(this.origin);
			console.log('loginsuccess');
			console.log(res.data);
			// this.$store.commit('login',res.data);
			var storgeName = ['avatarUrl', 'nickName', 'isLogin', 'userId'];
			var storgeVal = [res.data.weiChatAuthUser.avatarUrl, res.data.weiChatAuthUser.nickName, true, res.data.userId];
			var that = this;
			for (var i = 0; i < storgeName.length; i++) {
				uni.setStorage({
					key: storgeName[i],
					data: storgeVal[i]
				});
			}
			uni.setStorage({
				key: 'token',
				data: res.data.token,
				success: async function() {
					console.log('set token is = ');
					console.log(uni.getStorageSync('token'));
					var userinfo = await that.$api.getUserinfo();

					if (userinfo) {
						uni.reLaunch({
							url: that.origin
						});
					} else {
						uni.showToast({
							title: '获取用户信息失败',
							icon: 'none',
							duration: 2000
						});
					}
				}
			});
			// if((this.origin.indexOf('pages/rwlist/rwlist') != -1) ||(this.origin.indexOf('pages/my/my') != -1)){
			// 	uni.switchTab({
			// 		url:this.origin
			// 	})
			// }else{
			// 	uni.redirectTo({
			// 		url:this.origin
			// 	})
			// }
		},
		//向后台更新信息
		updateUserInfo() {
			let _this = this;
			uni.request({
				url: 'url', //服务器端地址
				data: {
					appKey: this.$store.state.appKey,
					customerId: _this.customerId,
					nickName: _this.nickName,
					headUrl: _this.avatarUrl
				},
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					if (res.data.state == 'success') {
						uni.reLaunch({
							//信息更新成功后跳转到小程序首页
							url: '/pages/index/index'
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.logintop {
	width: 750upx;
	height: 350upx;
	@include rowflex;
	justify-content: center;
	background: $color-u-cj;
}
.logintop image {
	width: 200upx;
	height: 200upx;
	border-radius: 120upx;
	border: 18upx solid #fff;
	box-shadow: 0upx 0upx 12upx #333;
}
.logincon {
	width: 750upx;
	height: 380upx;
	@include rowflex;
	justify-content: center;
}
.wxloginbtn {
	width: 300upx;
	height: 100upx;
	background: $color-m;
	color: $color-36;
	font-size: $fontsize-36;
	border-radius: 6upx;
	text-align: center;
	line-height: 100upx;
}
</style>
