<template>
	<view>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide"><view class="left">总排行</view></view>
		<view class="phlist">
			<view class="phitem" v-for="(items, index) in phlist" :key = "items.avatarUrl">
				<view class="phbox">
					<view class="phNum">{{ index + 1 }}</view>
					<image :src="items.avatarUrl" mode=""></image>
					<view class="phinfo">
						<view class="phname">{{ items.nickName }}</view>
						<view class="phlevel">Lv{{ items.userLevelInfo.level }}</view>
					</view>
				</view>

				<view class="timebox">{{ items.realDurationSumZh }}</view>
			</view>
		</view>
		<view class="curUser">
			<view class="phbox">
				<image :src="curIcon" mode=""></image>
				<view class="phcon">
					<view class="curph">
						<view class="">
							{{curNickname}}
						</view>
						<view class="">
							level{{curLevel}}
						</view>
						<view class="">
							{{curhonor}}
						</view>
					</view>
					<view class="curpm">
						<view class="">
							排名 3 暂无排名
						</view>
					</view>
				</view>
				<view class="timebox"></view>
			</view>
			<view class="">
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataStep: 50,
			phlist: [],
			phlistWeek: [],
			curIcon: uni.getStorageSync('avatarUrl'),
			curNickname:uni.getStorageSync('nickName'),
			curLevel:uni.getStorageSync('level'),
			curhonor:uni.getStorageSync('honor')
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		async init() {
			//  rankType
			//  summaryRank 总排行
			//  weekRank  周排行
			var params = {
				from: 1,
				count: this.dataStep,
				rankType: 'summaryRank'
			};
			await this.$api.showLoading(); // 显示loading
			var ranklist = await this.$api.getData(this.$api.webapi.ranklist, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (this.$api.reshook(ranklist, this.$mp.page.route)) {
				console.log(ranklist);
				this.phlist = ranklist.data;
			}
		}
	}
};
</script>

<style lang="scss">
.menuguide {
	@include userguide;
	justify-content: space-between;
}
.phlist {
	@include colflex;
	justify-content: flex-start;
	align-items: flex-start;
}
.phitem {
	@include rowflex;
	justify-content: space-between;
	padding: 20upx 0;
	border-bottom: 5upx solid $color-bor;
	width:750upx;
}
.phbox {
	@include rowflex;
	justify-content: flex-start;
}
.phitem image {
	width: 72upx;
	height: 72upx;
	border-radius: 50upx;
	margin: 0 20upx;
	border: 6upx solid #fff;
	box-shadow: 0upx 0upx 6upx #999;
}
.phNum {
	width: 64upx;
	text-align: center;
	font-weight: bold;
	color: #363636;
}
.phinfo {
	@include rowflex;
	.phlevel {
		background: $color-36;
		color: $color-m;
		font-size: $fontsize-22;
		margin-left: 20upx;
		padding: 0 10upx;
		border-radius: 6upx;
	}
}
.timebox {
	font-size: $fontsize-30;
	color: $color-36;
	padding-left: 50upx;
	background: url('/static/shijian.png') no-repeat;
	background-size: 40upx 40upx;
	margin-right: 30upx;
}
.curUser{
	width:750upx;
	height:128upx;
	position: fixed;
	left:0;
	bottom:0;
	z-index: 9;
	background: $color-36;
	color:$color-m;
	@include rowflex;
	justify-content: space-between;
	
	image{
		width: 72upx;
		height: 72upx;
		border-radius: 50upx;
		margin: 0 20upx;
		border: 6upx solid #fff;
		box-shadow: 0upx 0upx 6upx #999;
	}
	// background-image: linear-gradient(#3c8ceb,#5ebbf8) ;
	.phcon{
		@include colflex;
		justify-content: flex-start;
		align-items: flex-start;
		.curph{
			@include rowflex;
			justify-content: flex-start;
			color:#fff;
			view{
				margin-right:20upx;
			}
		}
		.curpm{
			color:$color-m
		}
	}
	
}
</style>
