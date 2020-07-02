<template>
	<view>
		<userinfo></userinfo>
		<view class="timeSelect">2020年3月221日</view>
		<view class="createBox" style="border-bottom: 10upx solid #e6e6e6;">
			<view class="createTask zuoye" @tap="gotoCreate" data-type="zuoye">
				<view class="taskbg zuoye1"></view>
				<view class="taskInfo">
					<view class="taskIcon"><image src="/static/zuoye.png"></image></view>
					<view class="taskWord">创建作业任务</view>
				</view>
			</view>
			<view class="createTask other" @tap="gotoCreate" data-type="other">
				<view class="taskbg other1"></view>
				<view class="taskInfo">
					<view class="taskIcon"><image src="/static/other.png"></image></view>
					<view class="taskWord">创建其他任务</view>
				</view>
			</view>
		</view>
		<rwlistItem></rwlistItem>
		<rwlistItem></rwlistItem>
		<rwlistItem></rwlistItem>
		<rwlistItem></rwlistItem>
		<rwlistItem></rwlistItem>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataStep: 20,
			rwlist: []
		};
	},
	onLoad: function(options) {
		console.log('load');
		//console.log(this.$mp.page.route)
		this.init();
	},
	onShow() {
		console.log()
		console.log('show')
	},
	methods: {
		async init() {
			console.log('init run')
			console.log(this.dataStep)
			console.log(this.rwlist)
			var params = {
				from: 1,
				count: this.dataStep
			};
			await this.$api.showLoading(); // 显示loading
			var cjlist = await this.$api.getData(this.$api.webapi.TaskList, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (this.$api.reshook(cjlist, this.$mp.page.route)) {
				this.renderList(cjlist);
			}
		},
		renderList(res) {
			console.log(res);
		},
		gotoCreate: function(e) {
			let rwtype = e.currentTarget.dataset.type;
			console.log(e.currentTarget.dataset.type);
			if (rwtype == 'zuoye') {
				uni.navigateTo({
					url: '/pages/createrw/createrw'
				});
			}
			if (rwtype == 'other') {
				uni.navigateTo({
					url: '/pages/createother/createother'
				});
			}
			// alert(11);
		}
	}
};
</script>

<style lang="scss">
.timeSelect {
	width: 710upx;
	height: 80upx;
	line-height: 80upx;
	background: $color-m;
	font-size: 28upx;
	padding: 5upx 20upx;
}
.createBox {
	width: 750upx;
	height: 158upx;
	@include rowflex justify-content: space-around;
}
.createTask {
	width: 346upx;
	height: 116upx;
	position: relative;
}
.taskbg {
	width: 0;
	height: 0;
	border-left: 346upx solid transparent;
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 1;
}
.zuoye {
	background: $color-mbg;
}
.zuoye1 {
	border-bottom: 116upx solid $color-mtop;
}
.other {
	background: $color-otherbg;
}
.other1 {
	border-bottom: 116upx solid $color-othertop;
}
.taskInfo {
	width: 306upx;
	height: 76upx;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 9;
	padding: 20upx;
	@include rowflex;
	justify-content: flex-start;
}
.taskIcon {
	width: 76upx;
	height: 76upx;
	border-radius: 38upx;
	background: rgba(255, 255, 255, 0.35);
	@include rowflex;
	justify-content: center;
	margin-right: 28upx;
}
.taskIcon image {
	width: 44upx;
	height: 44upx;
}
.taskWord {
	font-size: $fontsize-32;
	color: #ffffff;
}
</style>
