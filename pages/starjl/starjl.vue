<template>
	<view>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide">
			<view class="guideicon">
				
			</view>
			<view class="">
				星愿奖励
			</view>
			
		</view>
		<view class="jllist">
			<view class="jlitem">
				<view class="xyicon">
					<image src="/static/xing.png" mode=""></image>
				</view>
				<view class="xybox">
					<view class="xyname">
						常州恐龙园1日游
					</view>
					<view class="xystar">
						<view>需要</view>
						<view>15 </view>
						<image src="/static/menustar.png" mode=""></image> 
					</view>
				</view>
				<view class="shixian isshixian">
					实现
				</view>
			</view>
			<view class="jlitem">
					<view class="xyicon">
						<image src="/static/xing.png" mode=""></image>
					</view>
					<view class="xybox">
						<view class="xyname">
							常州恐龙园1日游
						</view>
						<view class="xystar">
							<view>需要</view>
							<view>15 </view>
							<image src="/static/menustar.png" mode=""></image> 
						</view>
					</view>
					<view class="shixian shixianend">
						实现
					</view>
				</view>
			
		</view>
		<view class="addxy">
			<view class="addxyBtn">
				
			</view>
			<view class="addxyBtn1">
				
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
.menuguide{
	@include userguide;
}
.jllist{
	@include colflex;
	width:750upx;
	justify-content: flex-start;
}
.jlitem{
	@include warpwidth;
	@include warppadding;
	@include rowflex;
	justify-content: flex-start;
	@include borderbottom;
}
.xyicon{
	width:80upx;
	height: 80upx;
	border-radius: 50upx;
	background: $color-m;
	@include rowflex;
	justify-content: center;
}
.xyicon image{
	width:66upx;
	height:66upx;
}
.xybox{
	width: 430upx;
	margin-left: 20upx;
}
.xyname{
	font-size: $fontsize-32;
	color: $color-a5;
	margin-bottom:15upx
}
.xystar{
	font-size: $fontsize-28;
	color: $color-a5;
	@include rowflex;
	justify-content: flex-start;
}
.xystar image{
	width: 28upx;
	height:28upx;
	margin-left: 10upx;
}
.shixian{
	width: 150upx;
	height: 58upx;
	line-height: 58upx;
	text-align: center;
	font-size: $fontsize-30;
}
.isshixian{
	background: $color-m;
}
.shixianend{
	background-color: #bebebe;
}
.addxy{
	width: 120upx;
	height:120upx;
	background: $color-m;
	border-radius: 100upx;
	position: fixed;
	bottom:60upx;
	left:315upx;
	z-index: 2;
}
.addxyBtn{
	width:10upx;
	height:80upx;
	background:#ffffff;
	position:absolute;
	top:20upx;
	left:55upx;
	z-index: 3;
}
.addxyBtn1{
	width:80upx;
	height:10upx;
	background:#ffffff;
	position:absolute;
	left:20upx;
	top:55upx;
	z-index: 3;
}
</style>
