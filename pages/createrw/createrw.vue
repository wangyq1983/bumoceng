<template>
	<view>
		<view class="typetip">请选择类别,长按类型标签出现删除按钮</view>
		<view class="typeCon">
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox">语文</view>
			<view class="typeBox noedit">
				+新建类别
			</view>
		</view>
		<view class="wordBox"><textarea value="" placeholder="请输入作业内容" /></view>
		<view class="selectTime">
			<image src="/static/shijian.png" mode="" class="Imgicon"></image>
			<view class="">请设置时长</view>
			<input type="text" value="" />
			<view class="">分钟</view>
		</view>
		<view class="selectStar">
			<image src="/static/star.png" mode="" class="Imgicon"></image>
			<view class="">设置奖励星</view>
			<input type="text" value="" />
			<view class="">颗</view>
		</view>
		<view class="zhiliangSwitch">
			<view class="">
				完成质量检查
			</view>
			<view class="">
				<switch  color="#FFCE00" @change="switch2Change" />
			</view>
		</view>
		<view class="saveBox"><view class="saveBtn">保存</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		switch1Change: function (e) {
			console.log('switch1 发生 change 事件，携带值为', e.detail.value)
		},
		switch2Change: function (e) {
			console.log('switch2 发生 change 事件，携带值为', e.detail.value)
		}
	}
};
</script>

<style lang="scss">
.typetip {
	@include warpwidth;
	@include warppadding;
	font-size: $fontsize-22;
	color: $color-bb;
	text-align: center;
}
.typeCon {
	@include rowflex;
	flex-wrap: wrap;
	border-bottom: 10upx solid $color-bor;
}
.typeBox {
	padding: 5upx 20upx;
	font-size: $fontsize-28;
	color: $color-36;
	background: #ffffff;
	border: 1upx solid $color-mbg;
	margin: 15upx 20upx;
}
.typeBox.cur {
	background: $color-mbg;
	color: #ffffff;
}
.wordBox {
	@include warpwidth;
	@include warppadding;
	@include borderbottom;
}
.wordBox textarea {
	@include warpwidth;
	border: 2upx solid $color-m;
	box-sizing: border-box;
	padding: 20upx;
	height: 256upx;
	color: $color-36;
}
.selectTime,
.selectStar {
	@include warpwidth;
	@include warppadding;
	@include rowflex;
	@include borderbottom;
	font-size: $fontsize-32;
}
.selectTime view,
.selectStar view {
	padding: 0 15upx;
}
.selectTime input,
.selectStar input {
	width: 180upx;
	border: 2upx solid $color-m;
}
.selectStar {
}
.zhiliangSwitch {
	@include warpwidth;
	@include warppadding;
	@include rowflex;
	justify-content: flex-start;
	font-size: $fontsize-32;
}
.zhiliangSwitch view{
	padding: 0 10upx;
}
.Imgicon {
	width: 50upx;
	height: 50upx;
}

</style>
