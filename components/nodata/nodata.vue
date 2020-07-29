<template>
	<view class='nodata'>
	    <view style='margin-top:60rpx; margin-botto:50rpx;'>
	        <image src='/static/nodata.jpg' class='nodataImg'></image>
	    </view>
	    <view class='nodataTxt'>{{wordinfo}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			wordinfo: String,
			type:Number
		}
	}
</script>

<style>

	.nodata{
	    display: flex;
	    flex-direction: column;
	    justify-content: flex-start;
	    align-items: center
	}
	.nodataImg{
	    width:282upx;
	    height:156upx;
	}
	.nodataTxt{
	    font-size: 30rpx;
	    text-align: center;
	    color:#363636;
		font-weight: bold;
	}
</style>
