<template>
	<view>
		<mask :showmask = 'cdtime' @on-close = "closemask">
			
			<view class="cdlayer" v-if="nowtask">
				<uniCountdown @on-complete = 'timed' :showmask = 'cdtime' :show-day="false" :show-hour="showhour" :hour="hourTask" :minute="minuteTask" :second="secondTask" ref = "countDown"></uniCountdown>
			</view>
			<successdata :starNum = 'star' :expType = 'exptype' v-if="taskSuccess"></successdata>
			
		</mask>
		
		<userinfo></userinfo>
		<view class="timeSelect">{{datetime}}</view>
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
		<rwlistItem v-for="items in rwlist" :key='items.id' :info = "items" @on-cdtime = "countTime" @on-zhiliang = "zhiliang" @on-del = "deltask"></rwlistItem>
	</view>
</template>

<script>
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
export default {
	data() {
		return {
			taskSuccess:false,
			dataStep: 50,
			rwlist: [],
			cdtime:false,
			taskTime:'',
			minuteTask:'',
			secondTask:'',
			hourTask:'',
			showhour:false,
			nowtask:'',
			datetime:'',
			star:null,
			exptype:null,
			ifswitch:false
		};
	},
	components:{
		uniCountdown
	},
	onLoad: function(options) {
		console.log('load');
		//console.log(this.$mp.page.route)
		this.signget()
		this.init();
	},
	onShow() {
		console.log()
		console.log('show')
	},
	methods: {
		signget:async function(){
			var signget = await this.$api.getData(this.$api.webapi.signget);
			console.log('签到查询');
			console.log(signget)
		},
		deltask:function(id){
			this.rwlist.forEach(function(item, index, arr) {
				if(item.id == id) {
					arr.splice(index, 1);
					// this.rwlist = arr
				}
				console.log(arr)
			});
		},
		zhiliang:function(star,exp){
			this.star = star;
			this.exptype = exp;
			this.cdtime = true;
			this.taskSuccess = true;
		},
		formatTime:function(tasktime){
			// tasktime 任务计时默认以分钟计算
			this.secondTask = 0;
			if(tasktime > 60){
				this.hourTask = Math.floor(tasktime/60);
				this.minuteTask = tasktime % 60;
				this.showhour = true
			}else{
				this.hourTask = 0;
				this.minuteTask = tasktime;
				this.showhour = false;
			}
		},
		//子组件点击开始任务触发
		countTime:function(cdtime,taskid,star,ifswitch){
			this.cdtime = true;
			console.log(cdtime);
			console.log(taskid)
			this.nowtask = taskid;
			this.star = star;
			this.ifswitch = ifswitch;
			this.formatTime(cdtime)
		},
		// 关闭计时弹层
		closemask:function(){
			console.log(this);
			if(this.taskSuccess){
				this.taskSuccess = false
			}else{
				this.$refs.countDown.audiostop()
			}
			this.showhour = false;
			this.cdtime = false;
			this.nowtask = '';
			this.rwlist = [];
			this.init();
		},
		// 任务完成
		timed:async function(minute){
			console.log('秒数');
			console.log(minute);
			console.log('nowtask is');
			console.log(this.nowtask);
			var params = {
				id:this.nowtask,
				realDuration:minute
			};
			await this.$api.showLoading(); // 显示loading
			var taskend = await this.$api.postData(this.$api.webapi.TaskEnd, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (this.$api.reshook(taskend, this.$mp.page.route)) {
				console.log(taskend)
				if(taskend.resultCode == 0){
					if(this.ifswitch){
						//await this.$api.addExp(this.$api.expval.endtask)
						//this.taskSuccess = true;
						// this.nowtask = '';
						// this.cdtime = false;
						this.closemask();
					}else{
						await this.$api.addExp(this.$api.expval.endtask);
						await this.$api.starAdjust(this.star,'任务完成');
						this.taskSuccess = true;
						this.nowtask = '';
						this.exptype = this.$api.expval.endtask
					}
				}
			}
		},
		async init() {
			console.log('init run')
			console.log(this.dataStep)
			console.log(this.rwlist)
			var date = new Date();
			console.log('当前日期')
			this.datetime = this.$api.formatTime(date);
			console.log(this.$api.formatTime(date));
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
			// state  状态：1 创建完成，2 开始（未使用该状态），3 完成，4 超时
			if(res.resultCode == 0){
				this.rwlist = res.data
			}
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
	@include rowflex; justify-content: space-around;
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
.cdlayer{
	width: 720upx;
	height:800upx;
	background: #fff;
	@include rowflex;
	justify-content: center;
}

</style>
