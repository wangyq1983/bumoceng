<template>
	<view>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide"><view class="left">总排行</view></view>

		<view class="phlist">
			<view class="phitem" v-for="(items,index) in phlist">
				<view class="phNum">1</view>
				<image :src="items.avatarUrl" mode=""></image>
				<view class="phinfo">
					<view class="phname">王玉强</view>
					<view class="phlevel">Lv{{items.userLevelInfo.level}}</view>
				</view>
				<view class="">{{items.realDurationSumZh}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataStep:50,
			phlist:[
				
			],
			phlistWeek:[
				
			]
		};
	},
	onLoad() {
		this.init()
	},
	methods: {
		async init(){
			//  rankType  
			//  summaryRank 总排行
			//  weekRank  周排行
			var params = {
				from: 1,
				count: this.dataStep,
				rankType:'summaryRank'
			};
			await this.$api.showLoading(); // 显示loading
			var ranklist = await this.$api.getData(this.$api.webapi.ranklist, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (this.$api.reshook(ranklist, this.$mp.page.route)) {
				console.log(ranklist)
				this.phlist = ranklist.data
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
	justify-content: flex-start;
}
.phitem image {
	width: 72upx;
	height: 72upx;
	border-radius: 36upx;
	margin: 0 20upx;
}
.phNum{
	width: 64upx;
	text-align: center;
}
.phinfo{
	@include rowflex;
	width: 400upx;
}
</style>
