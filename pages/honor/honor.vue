<template>
	<view class="honorList">
		<view class="honorTitle">
			称号列表
		</view>
		<view class="honorBox">
			<image src="/static/hz_qingtong1.jpg" mode="" class="honorImg"></image>
			<view class="honorTxt">
				青铜学渣
			</view>
		</view>
		<view class="honorBox">
			<image src="/static/hz_baiyin2.jpg" mode="" class="honorImg"></image>
			<view class="honorTxt">
				白银学民
			</view>
		</view>
		<view class="honorBox">
			<image src="/static/hz_huangjin3.jpg" mode="" class="honorImg"></image>
			<view class="honorTxt">
				黄金学霸
			</view>
		</view>
		<view class="honorBox">
			<image src="/static/hz_bojin4.jpg" mode="" class="honorImg"></image>
			<view class="honorTxt">
				铂金学帝
			</view>
		</view>
		<view class="honorBox">
			<image src="/static/hz_zuanshi5.jpg" mode="" class="honorImg"></image>
			<view class="honorTxt">
				钻石学仙
			</view>
		</view>
		<view class="honorBox">
			<image src="/static/hz_xueshen6.jpg" mode="" class="honorImg"></image>
			<view class="honorTxt">
				学神
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.honorTitle{
	width:100%;
	height:80upx;
	line-height: 80upx;
	text-align: center;
	background: #363636;
	color: #ffce00;
	font-size: $fontsize-36
}
.honorList{
	@include colflex;
	justify-content: center;
}
.honorBox{
	width:600upx;
	height:220upx;
	@include rowflex;
	justify-content: center;
	border-bottom: 2upx solid #ededed;
}
.honorImg{
	width:182upx;
	height:130upx;
	margin-right: 50upx;
}
.honorTxt{
	font-size: 32upx;
}
.arrow{
	width:124upx;
	height: 156upx;
}
</style>
