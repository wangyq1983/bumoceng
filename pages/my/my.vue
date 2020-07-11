<template>
	<view>
		<userinfo></userinfo>
		<view class="rwtable" @tap="testlink">
			
		</view>
		<view class="scenelist">
			<view class="titlebox">
				功能列表
			</view>
			<!-- 星愿奖励 -->
			<view class="proItem" @tap="gotoItem" data-type='jl'>
				<view class="iconbg iconjl">
					<view class="iconjl1">
						<image src="/static/jl1.png" mode=""></image>
					</view>
				</view>
				<view class="menuinfo">
					<view class="menutitle">
						星愿奖励
					</view>
					<view class="menuword">
						给自己设置一个奖励，使用获得的奖励星来兑换自己心仪的奖励
					</view>
				</view>
			</view>
			
			<!-- 星管理 -->
			<view class="proItem" @tap="gotoItem" data-type='star'>
				<view class="iconbg iconstar">
					<view class="iconstar1">
						<image src="/static/star1.png" mode=""></image>
					</view>
				</view>
				<view class="menuinfo">
					<view class="menutitle">
						星管理
					</view>
					<view class="menuword">
						根据具体情况增加减少“星”的数量
					</view>
				</view>
			</view>
			
			<!-- 成就 -->
			<view class="proItem" @tap="gotoItem" data-type='cj'>
				<view class="iconbg iconcj">
					<view class="iconcj1">
						<image src="/static/cj1.png" mode=""></image>
					</view>
				</view>
				<view class="menuinfo">
					<view class="menutitle">
						成就列表
					</view>
					<view class="menuword">
						珍惜时间，提高效率，解锁成就！
					</view>
				</view>
			</view>
			
			<!-- 排行 -->
			<view class="proItem" @tap="gotoItem" data-type='ph'>
				<view class="iconbg iconph">
					<view class="iconph1">
						<image src="/static/ph1.png" mode=""></image>
					</view>
				</view>
				<view class="menuinfo">
					<view class="menutitle">
						排行榜
					</view>
					<view class="menuword">
						不磨蹭拖拉，高效利用时间，自律排行榜
					</view>
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
		},
		methods: {
			gotoItem:function(e){
				let menutype = e.currentTarget.dataset.type;
				console.log(menutype)
				if(menutype == 'jl'){
					uni.navigateTo({
						url:'/pages/starjl/starjl'
					})
				}
				if(menutype == 'star'){
					uni.navigateTo({
						url:'/pages/star/star'
					})
				}
				if(menutype == 'cj'){
					uni.navigateTo({
						url:'/pages/cj/cj'
					})
				}
				if(menutype == 'ph'){
					uni.navigateTo({
						url:'/pages/ph/ph'
					})
				}
			},
			testlink:function(){
				this.$api.test(123)
			}
		}
	}
</script>

<style lang="scss">
	.rwtable{
		width: 750upx;
		height:300upx;
		@include borderbottom;
		background: url("/static/table.png") no-repeat;
		background-size: 750upx 300upx;
		@include userbor;
	}
	.rwtable image{
		width: 750upx;
		height: 300upx;
	}
	.scenelist{
		width: 750upx;
	}
	.scenelist .titlebox{
		width:660upx;
		height:72upx;
		line-height: 72upx;
		padding:0 45upx;
		font-size: $fontsize-32;
	}
	.proItem{
		@include warpwidth;
		@include warppadding;
		@include rowflex;
		justify-content: flex-start;
		font-size: $fontsize-30;
		border-bottom: 2upx solid #cacaca;
		padding-top: 40upx;
		padding-bottom: 40upx;
	}
	.iconbg{
		width:120upx;
		height:120upx;
		border-radius: 66upx;
		
	}
	.iconjl{
		background: $color-u-jl;
		@include rowflex;
		justify-content: center;
	}
	.iconjl1{
		width: 64upx;
		height:64upx;
		border-radius: 64upx;
		background: $color-u-jl1;
		@include rowflex;
		justify-content: center;
	}
	.iconjl1 image,.iconstar1 image,.iconcj1 image,.iconph1 image{
		width: 40upx;
		height:40upx;
	}
	.iconstar{
		background: $color-u-star;
		@include rowflex;
		justify-content: center;
	}
	.iconstar1{
		@extend .iconjl1;
		background: url(/static/menustar.png);
		background-size: 64upx 64upx;
		position: relative;
	}
	.iconstar1 image{
		position: absolute;
		right:0;
		bottom:0;
		z-index: 9;
	}
	.iconcj{
		background: $color-u-cj;
		@include rowflex;
		justify-content: center;
	}
	.iconcj1{
		@extend .iconjl1;
		background: url(../../static/bajiao.png) no-repeat;
		background-size: 64upx 64upx;
	}
	.iconph{
		background: $color-u-ph;
		@include rowflex;
		justify-content: center;
	}
	.iconph1{
		@extend .iconjl1;
		background: $color-u-ph1;
	}
	.menuinfo{
		@include colflex;
		justify-content: flex-start;
		align-items: flex-start;
		width: 450upx;
		margin-left: 32upx;
	}
	.menutitle{
		font-size: $fontsize-32;
		color: $color-36;
	}
	.menuword{
		color: $color-a5;
		font-size: $fontsize-24;
	}
</style>
