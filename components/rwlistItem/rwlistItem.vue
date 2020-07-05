<template>
	<view class="rwItem">
		<view class="TitleBox">
			<view class="rwState ongoing"></view>
			<view class="rwType">{{itemcon.typeName}}</view>
			<view class="rwTitle">{{itemcon.jobDescription}}</view>
			<view class="rwHandle">⋮</view>
		</view>
		<view class="rwInfo">{{itemcon.jobDescription}}</view>
		<view class="rwAction">
			<view class="rwBtn" @tap="beginTask" :data-time = "itemcon.duration"><view class="startBtn">开始任务</view></view>
			<view class="rwTime">预计完成时间： {{itemcon.duration}}分钟</view>
		</view>
		<view class="rwOther">
			<view class="">完成质量</view>
			<view class="">优</view>
			<view class="">良</view>
			<view class="">中</view>
			<view class="">差</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			itemcon: {}
		};
	},
	props: {
		info: Object
	},
	created() {
		
		console.log('组件创建后，但还未挂载');
		this.itemcon = this.info;
		console.log(this.itemcon)
	},
	methods:{
		beginTask(e){
			console.log(this)
			console.log(e.currentTarget.dataset.time)
			this.$emit("on-cdtime",e.currentTarget.dataset.time,this.itemcon.id); 
		}
	}
};
</script>

<style lang="scss">
.rwItem {
	@include warpwidth;
	@include warppadding;
	border-bottom: 10upx solid $color-bor;
}
.TitleBox {
	@include warpwidth;
	height: 78upx;
	@include rowflex;
	justify-content: flex-start;
	position: relative;
}
.rwState {
	width: 50upx;
	height: 50upx;
}
.ongoing {
	background-image: url(/static/tanhao.png);
	background-size: 50upx 50upx;
}
.onend {
	background-image: url(/static/duihao.png);
	background-size: 50upx 50upx;
}
.rwType {
	padding: 10upx;
	color: $color-m;
	font-size: $fontsize-28;
}
.rwTitle {
	font-size: $fontsize-28;
	color: #000000;
}
.rwHandle {
	width: 40upx;
	height: 50upx;
	position: absolute;
	top: 0;
	right: 0;
}
.rwInfo {
	@include warpwidth;
	padding: 15upx;
	box-sizing: border-box;
	background: $color-bor;
	color: $color-00;
	font-size: $fontsize-28;
}
.rwAction {
	@include warpwidth;
	height: 86upx;
	@include rowflex;
	justify-content: space-between;
}
.rwBtn {
	font-size: $fontsize-30;
}
.startBtn {
	background: $color-m;
	padding: 10upx 20upx;
}
.endBtn {
	background: #8861d9;
}
.rwTime {
	font-size: $fontsize-28;
	color: #333;
}
.rwOther {
	@include warpwidth;
	height: 70upx;
	@include rowflex;
	justify-content: flex-start;
	font-size: $fontsize-28;
}
</style>
