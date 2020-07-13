<template>
	<view>
		<mask :showmask = 'cdtime' @on-close = "closemask">
			<view class="cdlayer" v-if="nowtask">
				<uniCountdown @on-complete = 'timed' :showmask = 'cdtime' :show-day="false" :show-hour="showhour" :hour="hourTask" :minute="minuteTask" :second="secondTask" ref = "countDown"></uniCountdown>
			</view>
			<successdata :starNum = 'star' :expType = 'exptype' v-if="taskSuccess"></successdata>
			<view class="signin" v-if="signIn">
				<view class="signTitle">
					一周签到
				</view>
				<view class="signList">
					<view :class="(nowweekday == items.day)?'signItemCur':'signItem'" v-for="items in signList" :key="items.weekday">
						<view :class="(nowweekday == items.day)?'sItem':'sItemCur'">
							{{items.day}}
						</view>
						<view class="">
							<view class="">
								EXP经验
							</view>
							
							<view class="">
								+{{items.exp}}
							</view>
							<view class="" v-if="items.isSigned == true">
								已签到
							</view>
							<view class="" v-if="items.isSigned == false">
								未签到
							</view>
						</view>
					</view>
				</view>
				<view class="signBtn" @tap="signOk" :data-exp = 'items.exp'>
					签到
				</view>
			</view>
		</mask>
		
		<userinfo></userinfo>
		<view class="timeSelect">
			<view class="selectCon">
				{{datetime}}
			</view>
			<view class="signCon" @tap="signEvent">
				<image src="/static/sign.png" mode=""></image>
				<view>签到</view>
			</view>
			
		</view>
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
			ifswitch:false,
			signIn:false,
			signList:[
				{
					day:'周一',
					exp:10
				},
				{
					day:'周二',
					exp:20
				},
				{
					day:'周三',
					exp:10
				},
				{
					day:'周四',
					exp:20
				},
				{
					day:'周五',
					exp:30
				},
				{
					day:'周六',
					exp:10
				},
				{
					day:'周日',
					exp:10
				}
			],
			nowweekday:''
		};
	},
	components:{
		uniCountdown
	},
	onLoad: function(options) {
		console.log('load');
		//console.log(this.$mp.page.route)
		// this.signget()
		this.init();
	},
	onShow() {
		console.log();
		console.log('show');
	},
	methods: {
		daystate:function(e){
			
		},
		signEvent:function(){
			this.signget()
		},
		signOk:async function(e){
			var _this = this;
			console.log(this.nowweekday);
			var nowexp;
			var signed;
			this.signList.forEach(function(item,index,arr){
				if(item.day == _this.nowweekday){
					nowexp = item.exp;
					signed = item.isSigned
				}
			})
			console.log(nowexp);
			if(!signed){
				var params = {
					experience:nowexp
				}
				await this.$api.showLoading(); // 显示loading
				var signRes = await this.$api.postData(this.$api.webapi.signin, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (this.$api.reshook(signRes, this.$mp.page.route)) {
					console.log(signRes);
					this.closemask();
				}
			}else{
				uni.showToast({
					title:'已经签到过了',
					icon:'none',
					duration:1500
				})
			}
		},
		nowWeek:function(){
			var d = new Date();
			let weekList = [
				'周日',
				'周一',
				'周二',
				'周三',
				'周四',
				'周五',
				'周六'
			]
			this.nowweekday = weekList[d.getDay()];
		},
		signget:async function(){
			var _this = this;
			var newArr = [];
			var signget = await this.$api.getData(this.$api.webapi.signget);
			// this.signList;
			console.log(this.signList)
			signget.data.forEach(function(item,index,arr){
				console.log(_this.signList[index])
				var newitem = Object.assign(item,_this.signList[index]);
				console.log(newitem)
				newArr.push(newitem)
			})
			console.log(newArr);
			this.signList = newArr;
			console.log('签到查询');
			console.log(signget);
			this.signIn = true;
			this.cdtime = true;
			this.nowWeek()
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
			this.signIn = false;
			this.formatTime(cdtime)
		},
		// 关闭计时弹层
		closemask:function(){
			console.log(this);
			if(this.taskSuccess){
				this.taskSuccess = false
			}else if(this.signIn){
				this.signIn = false
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
		timed:async function(minute,state){
			console.log('秒数');
			console.log(minute);
			console.log('nowtask is');
			console.log(this.nowtask);
			var params = {
				id:this.nowtask,
				realDuration:minute,
				state:state
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
	@include rowflex;
	justify-content:space-between;
	.selectCon{
		
	}
	.signCon{
		padding:1upx 20upx;
		border-radius: 10upx;
		background: #489cf0;
		color:#fff;
		image{
			width:40upx;
			height:40upx;
			margin-right:20upx;
		}
		@include rowflex;
		justify-content: flex-start;
	}
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
.signin{
	width: 660upx;
	height:660upx;
	@include colflex;
	justify-content: center;
	align-items: center;
	background: #fff;
	.signTitle{
		width: 570upx;
		height:80upx;
		line-height: 80upx;
		text-align: center;
	}
	.signList{
		width:570upx;
		height:360upx;
		display: flex;
		flex-wrap:wrap;
		font-size: $fontsize-28;
		.signItemCur{
			width:126upx;
			height:150upx;
			border-radius: 6upx;
			border:4upx solid #ffce00;
			@include colflex;
			justify-content: center;
		}
		.signItem{
			width:126upx;
			height:150upx;
			border-radius: 6upx;
			border:4upx solid #cccccc;
			@include colflex;
			justify-content: center;
		}
		.sItem{
			height:60upx;
			line-height: 60upx;
			background: #ffce00;
		}
		.sItemCur{
			height:60upx;
			line-height: 60upx;
			background: #ccc;
		}
	}
	.signBtn{
		width:320upx;
		height:72upx;
		line-height: 72upx;
		text-align: center;
		background: $color-m;
		color: $color-36;
		font-size: $fontsize-32;
	}
}
</style>
