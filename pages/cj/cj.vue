<template>
	<view>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide">
			<view class="left">成就列表</view>
			<view class="right" style="background: transparent;">
				<text style="color: #363636;">{{cjcurCount}}</text>/<text style="color: #999;">{{cjallCount}}</text>
			</view>
		</view>
		<view class="cjlist">
			<view :class="items.flag  == 1 ? 'cjitem':'cjitem gray'" v-for="items in cjlist" :key = "items.achievementCode">
				<view class="cjleft">
					<view class="cjicon">
						{{items.icon}}
					</view>
					<view class="cjInfo">
						<view class="cjinfoTitle">
							{{items.title}}
						</view>
						<view class="cjinfoCon">
							{{items.description}}
						</view>
					</view>
				</view>
				<view class="cjright">
					<view class="">
						{{items.cumulativeThreshold?(items.cumulativeThreshold>items.threshold?items.threshold:items.cumulativeThreshold):0}}/{{items.threshold}}
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
			cjlist: []
		};
	},
	methods: {
		async init() {
			var that = this;
			await this.$api.showLoading(); // 显示loading
			var cjlist = await this.$api.getData(this.$api.webapi.cjList);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			console.log('成就列表是');
			console.log(cjlist);
			if (this.$api.reshook(cjlist, this.$mp.page.route)) {
				
				if (cjlist.resultCode == 0) {
					
					cjlist.data.forEach(function(item,index,arr){
						var cjicon = {
							icon:that.$api.honorTitle[index]
						}
						Object.assign(item,cjicon);

					})
					console.log(cjlist.data)
					this.cjlist = cjlist.data
				}
			}
			
		}
	},
	computed: {
		cjallCount(){
			return this.cjlist.length
		},
		cjcurCount(){
			var curcount = 0;
			this.cjlist.forEach(function(item,index,arr){
				if(item.flag == 1){
					curcount++
				}
			})
			return curcount
		}
	},
	onLoad() {
		this.init();
	}
};
</script>

<style lang="scss">
.cjlist {
	width: 750upx;
	@include colflex;
	justify-content: flex-start;
}
.cjitem {
	width: 750upx;
	height: 160upx;
	margin-bottom: 10upx;
	@include rowflex;
	justify-content: space-between;
	background-image: linear-gradient(to bottom,#ffd10f,#fff8dd,#ffd10f);
	.cjleft{
		@include rowflex;
		justify-content: flex-start;
	}
	.cjright{
		color: #363636;
		font-size: $fontsize-28;
		margin-right:30upx;
		font-weight: bold;
	}
	.cjicon {
		width: 90upx;
		height: 90upx;
		line-height: 90upx;
		border-radius: 30upx;
		border: 10upx solid #c09d29;
		text-align: center;
		background-image: linear-gradient(#f9ee84,#eed138,#f9ee84);
		font-size: 60upx;
		color: #8c6d01;
		font-weight: bold;
		box-shadow: 0 0 20upx #fff;
		margin-left: 30upx;
	}
	.cjInfo{
		@include colflex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-left: 40upx;
		.cjinfoTitle{
			height: 50upx;
			font-size: 60upx;
			color: #8c6d01;
			font-weight: bold;
			font-size: 36upx;
		}
		.cjinfoCon{
			height:50upx;
			font-size: 28upx;
			color:#8c6d01
		}
	}
}
.gray{
	filter: grayscale(100%);
	filter: gray;
}
</style>
