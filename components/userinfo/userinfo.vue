<template>
	<view class="userbox">
		<view class="usericon">
			<image src="/static/1.jpg"></image>
		</view>
		<view class="userinfo">
			<view class="usernameBox">
				<view class="username">
					王玉强
				</view>
				<view class="starBox">
					<image src="/static/star.png" mode=""></image>
					<view class="starCount">
						22
					</view>
				</view>
			</view>
			<view class="levelBox">
				<view class="levelTip">
					Lv1
				</view>
				<view class="levelProgress">
					<view class="progressCount" style="width: 50%;">
						
					</view>
				</view>
			</view>
			<view class="chengjiuBox">
				<image src="/static/cj_icon.png"></image>
				<view class="cjword">
					成就:23
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
.userbox{
	width: 720upx;
	height:150upx;
	padding:20upx 15upx
}
.usericon{
	width:136upx;
	height:136upx;
	float: left;
}
.usericon image{
	width:132upx;
	height:132upx;
	border-radius: 168upx;
	border: 8upx solid #ffffff;
	box-shadow: 0upx 0upx 15upx #C0C0C0;
}
.userinfo{
	width:540upx;
	height: 120upx;
	padding-left: 20upx;
	padding-top: 8upx;
	float: right;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
.usernameBox{
	@include rowflex;
	justify-content: flex-start;
}
.username{
	font-size: $fontsize-28;
	color:$color-36;
	margin-right: 80upx;
	font-weight: bold;
}
.starBox{
	@include rowflex;
	justify-content: flex-start;
}
.starBox image{
	width:28upx;
	height:28upx;
}
.starCount{
	color: $color-star;
	font-size: 28upx;
	padding-left: 10upx;
}
.levelBox{
	@include rowflex;
	justify-content: flex-start;
}
.levelTip{
	width:72upx;
	height:28upx;
	line-height: 28upx;
	background: $color-36;
	color: $color-m;
	text-align: center;
	font-size: $fontsize-22;
	border-radius: 8upx 0 0 8upx;
}
.levelProgress{
	width: 300upx;
	height: 28upx;
	line-height: $fontsize-28;
	background: $color-f7;
	border-radius: 0 8upx 8upx 0;
}
.progressCount{
	height: 28upx;
	background: $color-star;
}
.chengjiuBox{
	@include rowflex;
	justify-content: flex-start;
}
.chengjiuBox image{
	width: 20upx;
	height:22upx;
	margin-right: 12upx;
}
.cjword{
	font-size: $fontsize-24;
	color:$color-36;
}
</style>
