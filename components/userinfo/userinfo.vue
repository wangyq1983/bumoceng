<template>
	<view class="userbox">
		
		<view class="usericon userHonor1" v-if="honor1 == honorqt"><image :src="icon"></image></view>
		<view class="usericon userHonor2" v-if="honor1 == honorby"><image :src="icon"></image></view>
		<view class="usericon userHonor3" v-if="honor1 == honorhj"><image :src="icon"></image></view>
		<view class="usericon userHonor4" v-if="honor1 == honorbj"><image :src="icon"></image></view>
		<view class="usericon userHonor5" v-if="honor1 == honorzs"><image :src="icon"></image></view>
		<view class="usericon userHonor6" v-if="honor1 == honorxs"><image :src="icon"></image></view>
		<view class="userinfo">
			<view class="usernameBox">
				<view class="username">{{ name }}</view>
				<view class="starBox">
					<image src="/static/star.png" mode=""></image>
					<view class="starCount">{{ star1 }}</view>
				</view>
				<view class="chengjiuBox">
					
					<image src="/static/cj_icon.png"></image>
					<view class="cjword">成就：23</view>
				</view>
			</view>
			<view class="levelBox">
				
				<view class="levelTip">Lv{{ level1 }}</view>
				<view class="levelProgress"><view class="progressCount" :style="{ width: levelnum1 + '%' }"></view></view>
				<view class="qingtong1">
					{{honor1}}
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			honorqt:this.$api.honor.qt,
			honorby:this.$api.honor.by,
			honorhj:this.$api.honor.hj,
			honorbj:this.$api.honor.bj,
			honorzs:this.$api.honor.zs,
			honorxs:this.$api.honor.xs,
			icon: uni.getStorageSync('avatarUrl') ? uni.getStorageSync('avatarUrl') : '', //头像
			name: uni.getStorageSync('nickName') ? uni.getStorageSync('nickName') : '', //昵称
			level: this.$store.state.level ? this.$store.state.level : uni.getStorageSync('level'), //等级
			levelnum: this.$store.state.progress ? this.$store.state.progress : uni.getStorageSync('progress'), //经验数量
			star: this.$store.state.starNum? this.$store.state.starNum : uni.getStorageSync('starNum'), // 星数量
			cjnum: '' // 成就数量
		};
	},
	computed:{
		level1:function(){
			return this.$store.state.level ? this.$store.state.level : uni.getStorageSync('level')
		},
		levelnum1:function(){
			return this.$store.state.progress ? this.$store.state.progress : uni.getStorageSync('progress')
		},
		star1:function(){
			return this.$store.state.starNum? this.$store.state.starNum : uni.getStorageSync('starNum')
		},
		honor1:function(){
			return this.$store.state.honor? this.$store.state.honor : uni.getStorageSync('honor')
		}
	},
	methods: {
		//获取用户信息
		getUser: async function() {
			await this.$api.showLoading(); // 显示loading
			var userRes = await this.$api.getData(this.$api.webapi.userInfo);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (this.$api.reshook(userRes)) {
				console.log('userinfo is');
				console.log(userRes);
			}
		}
	},
	
	created() {
		console.log('created');
		console.log('------------------------------------');
		console.log('this.$store is = ')
		console.log(this.$store);
		console.log(this.$store.state)
		console.log(this.$store.state.userInfo);
		// this.getUser()
		this.icon = uni.getStorageSync('avatarUrl') ? uni.getStorageSync('avatarUrl') : '';
		this.name = uni.getStorageSync('nickName') ? uni.getStorageSync('nickName') : '';
		// this.level = uni.getStorageSync('level') ? uni.getStorageSync('level') : 0;

		// this.levelnum = uni.getStorageSync('progress') ? uni.getStorageSync('progress') : 0;
		// this.star = uni.getStorageSync('starNum') ? uni.getStorageSync('starNum') : 0;

		// console.log(this.icon);
		// console.log(this.name);
		// console.log('------------------------------------');
	}
};
</script>

<style lang="scss">
.userbox {
	width: 700upx;
	height: 110upx;
	padding: 20upx 15upx;
}
.usericon {
	width: 72upx;
	height: 72upx;
	float: left;
	padding:19upx 32upx 5upx 32upx;
}
.userHonor1{
	background: url("/static/hz_qingtong1.jpg") no-repeat;
	background-size: 134upx 96upx;
}
.userHonor2{
	background: url("/static/hz_baiyin2.jpg") no-repeat;
	background-size: 134upx 96upx;
}
.userHonor3{
	background: url("/static/hz_huangjin3.jpg") no-repeat;
	background-size: 134upx 96upx;
}
.userHonor4{
	background: url("/static/hz_bojin4.jpg") no-repeat;
	background-size: 134upx 96upx;
}
.userHonor5{
	background: url("/static/hz_zuanshi5.jpg") no-repeat;
	background-size: 134upx 96upx;
}
.userHonor6{
	background: url("/static/hz_xueshen6.jpg") no-repeat;
	background-size: 134upx 96upx;
}
.usericon image {
	width: 72upx;
	height: 72upx;
	border-radius: 168upx;
	// border: 8upx solid #ffffff;
	// box-shadow: 0upx 0upx 15upx #c0c0c0;
}
.userinfo {
	width: 540upx;
	height: 90upx;
	padding-left: 20upx;
	padding-top: 8upx;
	float: right;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
.usernameBox {
	@include rowflex;
	justify-content: flex-start;
}
.username {
	font-size: $fontsize-28;
	color: $color-36;
	margin-right: 80upx;
	font-weight: bold;
}
.starBox {
	@include rowflex;
	justify-content: flex-start;
}
.starBox image {
	width: 28upx;
	height: 28upx;
}
.starCount {
	color: $color-star;
	font-size: 28upx;
	padding-left: 10upx;
}
.levelBox {
	@include rowflex;
	justify-content: flex-start;
}
.levelTip {
	width: 72upx;
	height: 28upx;
	line-height: 28upx;
	background: $color-36;
	color: $color-m;
	text-align: center;
	font-size: $fontsize-22;
	border-radius: 8upx 0 0 8upx;
}
.levelProgress {
	width: 300upx;
	height: 28upx;
	line-height: $fontsize-28;
	background: $color-f7;
	border-radius: 0 8upx 8upx 0;
}
.progressCount {
	height: 28upx;
	background: $color-star;
}
.chengjiuBox {
	@include rowflex;
	justify-content: flex-start;
	margin-left:50upx;
}
.chengjiuBox image {
	width: 20upx;
	height: 22upx;
	margin-right: 12upx;
}
.cjword {
	font-size: $fontsize-24;
	color: $color-36;
}

</style>
