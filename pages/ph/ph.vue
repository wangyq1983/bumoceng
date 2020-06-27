<template>
	<view>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide"><view class="">总排行</view></view>

		<view class="phlist">
			<view class="phitem">
				<view class="phNum">1</view>
				<image src="/static/1.jpg" mode=""></image>
				<view class="phinfo">
					<view class="phname">王玉强</view>
					<view class="phlevel">Lv1</view>
				</view>
				<view class="">2小时</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
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
