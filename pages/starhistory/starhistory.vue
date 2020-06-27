<template>
	<view>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide">查看历史记录</view>
		<view class="cu-timeline">
			<view class="cu-time">昨天</view>
			<view class="cu-item">
				<view class="addicon">
					+
				</view>
				<view class="content addbg">
					<view class="con1">
						<text>22:22</text>
						<image src="/static/menustar.png" mode=""></image>
						<view class="">
							增加500
						</view>
					</view>
					<view class="con2">
						saadsfasdasfdfsadsfda
					</view>
					
				</view>
			</view>
			<view class="cu-item">
				<view class="jianicon">
					-
				</view>
				<view class="bg-blue content jianbg">
					<view class="con1">
						<text>22:22</text>
						<image src="/static/menustar.png" mode=""></image>
						<view class="">
							减少500
						</view>
					</view>
					<view class="con2">
						月快件已到达月球，准备发往地球
					</view>
					
				</view>
				<view class="bg-cyan content">
					<text>10:00</text> 【银河系】快件已到达银河系，准备发往月球
				</view>
			</view>
		</view>
		<view class="cu-timeline">
			<view class="cu-time">昨天</view>
			<view class="cu-item">
				
				<view class="content bg-green shadow-blur">
					<text>22:22</text> 【广州市】快件已到达地球
				</view>
			</view>
			<view class="cu-item">
				<view class="content bg-red shadow-blur">
					这是第一次，我家的铲屎官走了这么久。久到足足有三天！！
				</view>
			</view>
			<view class="cu-item">
				<view class="content bg-grey shadow-blur">
					这是第一次，我家的铲屎官走了这么久。
				</view>
			</view>
			<view class="cu-item">
				<view class="bg-blue content">
					<text>20:00</text> 【月球】快件已到达月球，准备发往地球
				</view>
				<view class="bg-cyan content">
					<text>10:00</text> 【银河系】快件已到达银河系，准备发往月球
				</view>
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
.menuguide{
	@include userguide;
	justify-content: space-between;
}
/* ==================
         时间轴
 ==================== */

.cu-timeline {
	display: block;
	background-color: #ffffff;
	font-size: $fontsize-28;
}

.cu-timeline .cu-time {
	width: 120upx;
	text-align: center;
	padding: 20upx 0;
	font-size: 26upx;
	color: #888;
	display: block;
}

.cu-timeline>.cu-item {
	padding: 30upx 30upx 30upx 120upx;
	position: relative;
	display: block;
	z-index: 0;
}

.cu-timeline>.cu-item:not([class*="text-"]) {
	color: #333;
}

.cu-timeline>.cu-item::after {
	content: "";
	display: block;
	position: absolute;
	width: 1upx;
	background-color: #ddd;
	left: 60upx;
	height: 100%;
	top: 0;
	z-index: 8;
}
.cu-timeline>.cu-item .content{
	padding:20upx;
	border-radius: 16upx;
	justify-content: flex-start;
}
.cu-timeline>.cu-item .content image{
	width:30upx;
	height:30upx;
	margin:0 10upx 0 20upx;
}
.con1{
	@include rowflex;
	justify-content: flex-start;
}
.con2{
	padding:10upx;
}
.addbg{
	background: #39b54a;
	color: #fff;
}
.jianbg{
	background: #0081ff;
	color: #fff;
}
.addicon{
	width: 40upx;
	height:40upx;
	line-height: 40upx;
	text-align: center;
	color: #fff;
	background: #39b54a;
	border-radius: 30upx;
	border: 6upx solid #ffffff;
	position: absolute;
	z-index:  999;
	left:34upx;
	top:16upx;
}
.jianicon{
	width: 40upx;
	height:40upx;
	line-height: 40upx;
	text-align: center;
	color: #fff;
	background: #0081ff;
	border-radius: 30upx;
	border: 6upx solid #ffffff;
	position: absolute;
	z-index:  999;
	left:34upx;
	top:16upx;
}

</style>
