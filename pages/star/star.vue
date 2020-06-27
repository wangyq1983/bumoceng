<template>
	<view>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide">
			
			<view class="">
				星管理
			</view>
			<view class="" @tap="showhistory">
				查看历史记录
			</view>
		</view>

		<view class="starWarp">
			<view class="starAction">
				<view class="actionBtn current">
					+增加
				</view>
				<view class="actionBtn">
					-减少
				</view>
			</view>
			<view class="starChange">
				<view class="">
					请输入
				</view>
				<image src="/static/menustar.png" mode=""></image>
				<view class="">
					数量
				</view>
				<input type="text" value="" />
			</view>
			<view class="starliyou">
				<textarea value="" placeholder="请输入理由(选填)" />
			</view>
			
		</view>
		<view class="saveBox"><view class="saveBtn">保存</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			showhistory:function(){
				uni.navigateTo({
					url:"/pages/starhistory/starhistory"
				})
			}
		}
	}
</script>

<style lang="scss">
.menuguide{
	@include userguide;
	justify-content: space-between;
}
.starWarp{
	@include warpwidth;
	@include warppadding;
}
.starAction{
	@include rowflex;
	justify-content: flex-start;
	padding:20upx 0;
}
.actionBtn{
	width: 100upx;
	height:50upx;
	line-height: 50upx;
	text-align: center;
	font-size: $fontsize-28;
	background: $color-f7;
	margin-right:20upx;
	padding:3upx 15upx;
}
.current{
	background: $color-m;
}
.starChange{
	@include rowflex;
	justify-content: flex-start;
	font-size: $fontsize-30;
	padding:20upx 0;
}
.starChange image{
	width: 26upx;
	height:26upx;
	margin:0 8upx;
}
.starChange input{
	border: 2upx solid $color-m;
	margin-left: 10upx;
	width:120upx;
}
.starliyou{
	
}
.starliyou textarea{
	width:660upx;
	padding:10upx;
	border: 2upx solid $color-m;
}
</style>
