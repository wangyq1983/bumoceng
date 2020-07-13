<template>
	<view class="userbox">
		<view class="usericon"><image :src="icon"></image></view>
		<view class="userinfo">
			<view class="usernameBox">
				<view class="username">{{ name }}</view>
				<view class="starBox">
					<image src="/static/star.png" mode=""></image>
					<view class="starCount">{{ star }}</view>
				</view>
			</view>
			<view class="levelBox">
				<view class="levelTip">Lv{{ level }}</view>
				<view class="levelProgress"><view class="progressCount" :style="{ width: levelnum + '%' }"></view></view>
			</view>
			<view class="chengjiuBox">
				<image src="/static/cj_icon.png"></image>
				<view class="cjword">成就:23</view>
			</view>
		</view>
		<!-- <view class="actionTest">
			<view class="" @tap="storetap">
				store test
			</view>
			<view class="" @tap="storagetap">
				storagetest
			</view>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			icon: uni.getStorageSync('avatarUrl') ? uni.getStorageSync('avatarUrl') : '', //头像
			name: uni.getStorageSync('nickName') ? uni.getStorageSync('nickName') : '', //昵称
			level: 0, //等级
			levelnum: '', //经验数量
			star: '', // 星数量
			cjnum: '' // 成就数量
		};
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
		},
		storetap() {
			console.log('storetap');
			this.$store.commit('addLevel', 1);
			// this.$emit('close');
		},
		storagetap() {
			console.log('storagetap');
			uni.setStorage({
				key: 'level',
				data: uni.getStorageSync('level') + 1
			});
			// this.$emit('click');
		}
	},
	created() {
		console.log('created');
		console.log('------------------------------------');
		console.log(this.$store);
		console.log(this.$store.state.userInfo);
		console.log(this.$store.state.userInfo.avatar);
		// this.getUser()
		this.icon = uni.getStorageSync('avatarUrl') ? uni.getStorageSync('avatarUrl') : '';
		this.name = uni.getStorageSync('nickName') ? uni.getStorageSync('nickName') : '';
		this.level = uni.getStorageSync('level') ? uni.getStorageSync('level') : 0;

		this.levelnum = uni.getStorageSync('progress') ? uni.getStorageSync('progress') : 0;
		this.star = uni.getStorageSync('starNum') ? uni.getStorageSync('starNum') : 0;

		console.log(this.icon);
		console.log(this.name);
		console.log('------------------------------------');
	}
};
</script>

<style lang="scss">
.userbox {
	width: 700upx;
	height: 150upx;
	padding: 20upx 15upx;
}
.usericon {
	width: 136upx;
	height: 136upx;
	float: left;
}
.usericon image {
	width: 132upx;
	height: 132upx;
	border-radius: 168upx;
	border: 8upx solid #ffffff;
	box-shadow: 0upx 0upx 15upx #c0c0c0;
}
.userinfo {
	width: 540upx;
	height: 120upx;
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
.actionTest {
	position: fixed;
	right: 0;
	top: 30upx;
	z-index: 999;
}
.actionTest view {
	margin: 10upx;
	background: #333;
	color: #fff;
	padding: 10upx;
}
</style>
