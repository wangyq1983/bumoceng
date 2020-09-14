<template>
	<view class="phonewarp">
		<image src="/static/icon.jpg" mode="" class="logo"></image>

		<view class="inputBox"><input type="text" value="" v-model="phone" placeholder="请输入手机号" /></view>

		<view class="inputBox">
			<input type="text" value="" v-model="yzm" placeholder="请输入验证码" />
			<view class="getcode">
				<view v-if="codesended" class="sended">重发({{ count }})秒</view>
				<view v-else @tap="getyzm" class="send">获取验证码</view>
			</view>
		</view>

		<view class="btn" @tap="phoneLogin">确定</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone: '',
			yzm: '',
			codesended: false,
			count:60
		};
	},

	methods: {
		checkPhone:function(){
			
			    if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
			        //alert("手机号码有误，请重填");  
			        return false; 
			    }else{
					return true;
				}
		},
		djs:function() {
			var _this = this;
			_this.count = 60
			var timers = setInterval(()=> {
				
				if(_this.count > 0){
					_this.count = _this.count - 1;
					return _this.count
				}else{
					clearInterval(timers);
					_this.codesended = false;
					
				}
			}, 1000);
			
		},
		getyzm: async function() {
			
			if(this.checkPhone()){
				var params = {
					phone: this.phone
				};
				await this.$api.showLoading(); // 显示loading
				let verRes = await this.$api.postData(this.$api.webapi.getVerCode, params);
				await this.$api.hideLoading();
				this.codesended = true;
				this.djs()
			}else{
				uni.showToast({
					title:"手机号码有误请重填",
					icon:"none"
				})
			}
		},
		phoneLogin: async function() {
			console.log(this.phone)
			console.log(this.phone.length)
			if(this.phone.length == 11 && this.yzm.length > 0){
				var params = {
					phone: this.phone,
					code: this.yzm
				};
				await this.$api.showLoading(); // 显示loading
				let phoneRes = await this.$api.postData(this.$api.webapi.phoneLogin, params);
				await this.$api.hideLoading();
				if(phoneRes.resultCode == 0){
					console.log(phoneRes);
					var that = this;
					uni.setStorage({
						key: 'userId',
						data: phoneRes.data.userId
					})
					uni.setStorage({
						key: 'nickName',
						data: phoneRes.data.name
					})
					uni.setStorage({
						key: 'userType',
						data:"正式"
					});
					uni.setStorage({
						key: 'token',
						data: phoneRes.data.token,
						success: async function() {
							console.log('set token is = ');
							console.log(uni.getStorageSync('token'));
							var userinfo = await that.$api.getUserinfo();
							if (userinfo) {
								console.log(that.origin)
								uni.reLaunch({
									url: (that.origin !== undefined)?that.origin:'/pages/rwlist/rwlist'
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
				}
				
			}else{
				uni.showToast({
					title:'手机号验证码都不能少哦',
					icon:'none'
				})
			}
			
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f5f5f5;
}
.phonewarp {
	@include colflex;
	justify-content: center;
	input {
		padding-left: 50upx;
	}
	.inputBox {
		width: 500upx;
		height: 90upx;
		background: #fff;
		border-radius: 50upx;
		@include rowflex;
		justify-content: flex-start;
		margin: 50upx 0;
		position: relative;
	}
	.btn {
		width: 220upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		// border: 2upx solid #333;
		padding: 2upx 10upx;
		margin-top: 20upx;
		margin-bottom: 30upx;
		background: #363636;
		border-radius: 20upx;
		color: #ffce00;
	}
	.logo {
		width: 120upx;
		height: 120upx;
		border-radius: 80upx;
		margin-top: 30upx;
	}
	.getcode {
		width: 200upx;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		border-radius: 0 50upx 50upx 0;
		font-size: $fontsize-28;
		.sended {
			width: 200upx;
			height: 90upx;
			border-radius: 0 50upx 50upx 0;
			background: #ccc;
		}
		.send {
			width: 200upx;
			height: 90upx;
			border-radius: 0 50upx 50upx 0;
			background: #ffce00;
		}
	}
}
</style>
