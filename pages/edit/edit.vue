<template>
	<view class="editName">
		<view class="inputTitle">
			请输入新的名称
		</view>
		<input type="text" v-model="username" value="" class="inputStyle" />
		<view class="saveBtn" @tap = "editName">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				username:''
			}
		},
		onLoad(options) {
			console.log(options);
			this.id = uni.getStorageSync('userId');
			this.username = options.user;
		},
		methods: {
			checkName:function(name){
				if(name.length >12){
					return false;
				}else{
					return true;
				}
			},
			editName:async function(){
				if(this.checkName(this.username)){
					var that = this;
						var params = {
							id:this.id,
							name:this.username
						}
						await this.$api.showLoading(); // 显示loading
						var editRes = await this.$api.postData(this.$api.webapi.editName, params);
						await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
						if (this.$api.reshook(editRes, this.$mp.page.route)) {
							if(editRes.resultCode == 0){
								this.$store.commit('changName', that.username);
								uni.setStorage({
									key: 'nickName',
									data: that.username,
									success: function() {
										uni.showToast({
											title:'昵称已经修改成功',
											icon:'none'
										})
									}
								});
							}
						}
					
				}else{
					uni.showToast({
						title:'名字长度过长',
						icon:'none',
						duration:1500
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.editName{
	@include colflex;
	justify-content: center;
}
.inputTitle{
	font-size: $fontsize-32;
	margin-bottom: 30upx;
	margin-top:100upx;
}
.inputStyle{
	width:300upx;
	height: 64upx;
	line-height: 64upx;
	border: 2upx solid #ffce00;
	margin-bottom: 100upx;
	margin-top: 20upx;
	padding:0 10upx;
}
</style>
