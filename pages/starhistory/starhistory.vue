<template>
	<view>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide">
			<view class="left">
				查看历史记录
			</view>
			</view>
		<view class="cu-timeline" v-for="items in historyList" :key="items.createDate">
			<view class="cu-time">
				<timeFormat :timedate = "items.createDate" :type = "1">
					
				</timeFormat>
			</view>
			<view class="cu-item" v-for="item in items.starInfo" :key = "item.id">
				<view class="addicon" v-if="item.adjustCount > 0">
					+
				</view>
				<view class="jianicon" v-if="item.adjustCount < 0">
					-
				</view>
				<view :class="(item.adjustCount > 0) ? 'content addbg' : 'bg-blue content jianbg'">
					<view class="con1">
						
							<timeFormat :timedate = "item.updateDate" :type = "2">
								
							</timeFormat>
						
						<image src="/static/menustar.png" mode=""></image>
						
						<view class="" v-if="item.adjustCount > 0">
							+{{item.adjustCount}}
						</view>
						<view class="" v-if="item.adjustCount < 0">
							{{item.adjustCount}}
						</view>
					</view>
					<view class="con2">
						{{item.reason}}
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
			historyList:[],
			dataStep:50
		};
	},
	onLoad() {
		this.init()
	},
	computed:{
		
	},
	methods: {
		async init(){
			var params = {
				from:1,
				count:this.dataStep
			}
			await this.$api.showLoading(); // 显示loading
			var historylist = await this.$api.getData(this.$api.webapi.starhistory, params);
			
			if (this.$api.reshook(historylist, this.$mp.page.route)) {
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				this.historyList = historylist.data  
			}
		}
	}
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
