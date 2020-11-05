<template>
	<view class="shareWarp">
		 <view class="shareBox">
		 	<view class="box1">
		 		
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

<style lang="less">
	.shareWarp{
		position: absolute;
		z-index: 1;
		top:0upx;
		right:0upx;
		bottom:0upx;
		left:0upx;
		background-image: linear-gradient(#ffce00, #3d8ceb);
	}
	.shareBox{
		position: absolute;
		z-index: 2;
		top:50upx;
		right:50upx;
		bottom:50upx;
		left:50upx;
		background: #fff;
		.box1{
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
		.box2{
			
		}
		.box3{
			
		}
		.box4{
			
		}
	}
	
</style>
