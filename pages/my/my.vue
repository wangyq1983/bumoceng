<template>
	<view>
		<userinfo></userinfo>
		<view class="menuTabs">
			<view @tap="menutap" :class="menutab == 1 ? 'cur' : ''" data-val="1">任务完成情况</view>
			<view @tap="menutap" :class="menutab == 2 ? 'cur' : ''" data-val="2">任务时间</view>
		</view>
		<view class="charTime">
			<view class="qiun-columns" v-if="menutab == 1">
				<view class="qiun-charts"><canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas></view>
			</view>
			<view class="timelist" v-if="menutab == 2">
				<view class="qiun-charts"><canvas canvas-id="canvasColumn1" id="canvasColumn1" class="charts" @touchstart="touchColumn"></canvas></view>
			</view>
		</view>

		<view class="scenelist">
			<!-- <view class="titlebox">功能列表</view> -->
			<!-- 星愿奖励 -->
			<view class="proItem" @tap="gotoItem" data-type="jl">
				<view class="iconbg iconjl">
					<view class="iconjl1"><image src="/static/jl1.png" mode=""></image></view>
				</view>
				<view class="menuinfo">
					<view class="menutitle">星愿奖励</view>
					<view class="menuword">给自己设置一个奖励，使用获得的奖励星来兑换自己心仪的奖励</view>
				</view>
			</view>

			<!-- 星管理 -->
			<view class="proItem" @tap="gotoItem" data-type="star">
				<view class="iconbg iconstar">
					<view class="iconstar1"><image src="/static/star1.png" mode=""></image></view>
				</view>
				<view class="menuinfo">
					<view class="menutitle">星管理</view>
					<view class="menuword">根据具体情况增加减少“星”的数量</view>
				</view>
			</view>

			<!-- 成就 -->
			<view class="proItem" @tap="gotoItem" data-type="cj">
				<view class="iconbg iconcj">
					<view class="iconcj1"><image src="/static/cj1.png" mode=""></image></view>
				</view>
				<view class="menuinfo">
					<view class="menutitle">成就列表</view>
					<view class="menuword">珍惜时间，提高效率，解锁成就！</view>
				</view>
			</view>

			<!-- 排行 -->
			<view class="proItem" @tap="gotoItem" data-type="ph">
				<view class="iconbg iconph">
					<view class="iconph1"><image src="/static/ph1.png" mode=""></image></view>
				</view>
				<view class="menuinfo">
					<view class="menutitle">排行榜</view>
					<view class="menuword">不磨蹭拖拉，高效利用时间，自律排行榜</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.js';
var _self, _this;
var canvaColumn = null;
var canvaColumn1 = null;
var canvasObj = {};
let Column = { categories: [], series: [] };
let Column1 = { categories:[], durationList: [] };
export default {
	data() {
		return {
			menutab: 1,
			cWidth: '',
			cHeight: 120,
			pixelRatio: 1,
			serverData: {
				categories: ['7-1', '7-2', '7-3', '7-5', '7-9', '7-11', '7-15'],
				series: [
					{
						name: '任务计划完成',
						data: [6, 6, 7, 8, 5, 7, 3],
						color: '#3c8ceb'
					},
					{
						name: '任务实际完成',
						data: [2, 3, 5, 6, 3, 1, 3],
						color: '#ffce00'
					}
				],
				durationList: [
					{
						name: '计划完成时间(分钟)',
						data: []
					},
					{
						name: '实际完成时间(分钟)',
						data: [],
						color: '#ffce00'					}
				]
			}
		};
	},
	onLoad() {
		_self = this;
		_this = this;
		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: function(res) {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//_self.pixelRatio =res.pixelRatio;
					_self.pixelRatio = 2;
					_this.pixelRatio = 2;
				}
			}
		});
		//#endif
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getServerData();
	},
	methods: {
		secToMin:function(sec){
			let minute = parseInt(sec/60);
			return minute;
		},
		menutap: function(e) {
			console.log(e.currentTarget.dataset.val);
			this.menutab = e.currentTarget.dataset.val;
			if (this.menutab == 1) {
				this.initChart(this.serverData.categories,this.serverData.series);
			} else {
				this.initChart1(this.serverData.durationList[0],this.serverData.durationList[1]);
			}
		},
		initChart: function(c,s) {
			Column.categories = c;
			Column.series = s;
			Column.series[0].color = '#3c8ceb';
			Column.series[1].color = '#ffce00';
			this.showColumn('canvasColumn', Column);
		},
		initChart1: function(c) {

			Column1.categories = c;
			this.showColumn1('canvasColumn1', Column1);
		},
		getServerData: async function() {
			var that = this;
			await this.$api.showLoading(); // 显示loading
			var chartRes = await this.$api.getData(this.$api.webapi.charts);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (chartRes.resultCode == 0) {
				console.log(chartRes);
			}
			this.serverData.categories = chartRes.data.categories;
			this.serverData.series = chartRes.data.series;
			this.serverData.durationList[0].data = chartRes.data.durationList;  //计划时间

			chartRes.data.realDurationList.forEach(function(item,index,arr){
				arr[index] = that.secToMin(item)
			});

			this.serverData.durationList[1].data = chartRes.data.realDurationList;   //实际时间
			
			this.initChart(this.serverData.categories,this.serverData.series);
			this.initChart1(this.serverData.categories);
		},
		gotoItem: function(e) {
			let menutype = e.currentTarget.dataset.type;
			console.log(menutype);
			if (menutype == 'jl') {
				uni.navigateTo({
					url: '/pages/starjl/starjl'
				});
			}
			if (menutype == 'star') {
				uni.navigateTo({
					url: '/pages/star/star'
				});
			}
			if (menutype == 'cj') {
				uni.navigateTo({
					url: '/pages/cj/cj'
				});
			}
			if (menutype == 'ph') {
				uni.navigateTo({
					url: '/pages/ph/ph'
				});
			}
		},
		showColumn1(canvasId, chartData) {
			var that = this;
			console.log(chartData);
			canvaColumn1 = new uCharts({
				$this: _this,
				canvasId: canvasId,
				type: 'column',
				legend: { 
					show: true,
					itemGap:40
					},
				fontSize: 12,
				background: '#FFFFFF',
				pixelRatio: _this.pixelRatio,
				animation: false,
				categories: that.serverData.categories,
				series: that.serverData.durationList,
				xAxis: {
					disableGrid:true

				},
				yAxis: {
					disabled: true,
					min: 0
				},
				
				dataLabel: true,
				width: _this.cWidth * _this.pixelRatio,
				height: _this.cHeight * _this.pixelRatio * 0.65,
				extra: {
					column: {
						type: 'group',
						width: ((_this.cWidth * _this.pixelRatio * 0.3) / chartData.durationList.length*1.2) 
					}
				}
			});
			console.log(canvaColumn1);
		},

		showColumn(canvasId, chartData) {
			canvaColumn = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: { show: true },
				fontSize: 12,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: false,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					disabled: true,
					min: 0
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio * 0.65,
				extra: {
					column: {
						type: 'meter',
						width: (_self.cWidth * _self.pixelRatio * 0.5) / chartData.categories.length,
						border: 4,
						fillColor: '#f00'
					}
				}
			});
		},
		touchColumn(e) {
			canvaColumn.showToolTip(e, {
				format: function(item, category) {
					if (typeof item.data === 'object') {
						return category + ' ' + item.name + ':' + item.data.value;
					} else {
						return category + ' ' + item.name + ':' + item.data;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.rwtable {
	width: 750upx;
	height: 300upx;
	@include borderbottom;
	background: url('/static/table.png') no-repeat;
	background-size: 750upx 300upx;
	@include userbor;
}

.scenelist {
	width: 750upx;
}
.scenelist .titlebox {
	width: 660upx;
	height: 72upx;
	line-height: 72upx;
	padding: 0 45upx;
	font-size: $fontsize-32;
}
.proItem {
	@include warpwidth;
	@include warppadding;
	@include rowflex;
	justify-content: flex-start;
	font-size: $fontsize-30;
	border-bottom: 2upx solid #cacaca;
	padding-top: 30upx;
	padding-bottom: 30upx;
}
.iconbg {
	width: 120upx;
	height: 120upx;
	border-radius: 66upx;
}
.iconjl {
	background: $color-u-jl;
	@include rowflex;
	justify-content: center;
}
.iconjl1 {
	width: 64upx;
	height: 64upx;
	border-radius: 64upx;
	background: $color-u-jl1;
	@include rowflex;
	justify-content: center;
}
.iconjl1 image,
.iconstar1 image,
.iconcj1 image,
.iconph1 image {
	width: 40upx;
	height: 40upx;
}
.iconstar {
	background: $color-u-star;
	@include rowflex;
	justify-content: center;
}
.iconstar1 {
	@extend .iconjl1;
	background: url(/static/menustar.png);
	background-size: 64upx 64upx;
	position: relative;
}
.iconstar1 image {
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 9;
}
.iconcj {
	background: $color-u-cj;
	@include rowflex;
	justify-content: center;
}
.iconcj1 {
	@extend .iconjl1;
	background: url(../../static/bajiao.png) no-repeat;
	background-size: 64upx 64upx;
}
.iconph {
	background: $color-u-ph;
	@include rowflex;
	justify-content: center;
}
.iconph1 {
	@extend .iconjl1;
	background: $color-u-ph1;
}
.menuinfo {
	@include colflex;
	justify-content: flex-start;
	align-items: flex-start;
	width: 450upx;
	margin-left: 32upx;
}
.menutitle {
	font-size: $fontsize-32;
	color: $color-36;
}
.menuword {
	color: $color-a5;
	font-size: $fontsize-24;
}

.qiun-padding {
	padding: 2%;
	width: 96%;
}
.qiun-wrap {
	display: flex;
	flex-wrap: wrap;
}
.qiun-rows {
	display: flex;
	flex-direction: row !important;
}
.qiun-columns {
	display: flex;
	flex-direction: column !important;
}
.qiun-common-mt {
	margin-top: 10upx;
}
.qiun-bg-white {
	background: #ffffff;
}
.qiun-title-bar {
	width: 96%;
	padding: 10upx 2%;
	flex-wrap: nowrap;
}
.qiun-title-dot-light {
	border-left: 10upx solid #0ea391;
	padding-left: 10upx;
	font-size: 32upx;
	color: #000000;
}
.qiun-charts {
	width: 750upx;
	height: 338upx;
	background-color: #ffffff;
}
.charts {
	width: 750upx;
	height: 338upx;
	background-color: #ffffff;
}
.charTime {
	margin-top: 30upx;
}
.menuTabs {
	width:650upx;
	height:60upx;
	line-height: 60upx;
	margin:0 50upx;
	@include rowflex;
	justify-content: flex-start;
	border-radius: 6upx;
	view {
		width:50%;
		box-sizing: border-box;
		height: 60upx;
		line-height: 60upx;
		background: #fff;
		text-align: center;
		color:$color-u-jl;
		border: 2upx solid $color-u-jl;

	}
	.cur {
		background: $color-u-jl;
		color: #fff;
	}
}
</style>
