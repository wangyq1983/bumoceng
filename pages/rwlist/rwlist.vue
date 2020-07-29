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
					<view :class="(nowweekday == items.day)?'signItemCur':'signItem'" v-for="items in listsign" :key="items.weekday">
						<view :class="(nowweekday == items.day)?'sItem':'sItemCur'">
							{{items.day}}
						</view>
						<view class="">
							<view class="expfont">
								EXP经验
							</view>
							<view class="" style="font-size: 24upx; color: #ff7900;">
								+{{items.exp}}
							</view>
							<view class="yiqiandao" v-if="items.isSigned == true">
								已签到
							</view>
							<view class="weiqiandao" v-if="items.isSigned == false">
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
		<!-- <view class="actionTest">
			<view class="" @tap="storetap">
				store test
			</view>
			<view class="" @tap="storagetap">
				storagetest
			</view>
		</view> -->
		<view class="newsbox">
			<image src="/static/news.png" mode=""></image>
			<view class="">
				作业不磨蹭操作使用说明
			</view>
		</view>
		<view class="timeSelect">
			
			<picker mode="date" :value="date" start="2020-07-01" :end="enddate" @change="DateChange">
				<view class="selectCon">
					<view class="">
						{{date}}
					</view>
					<view class="arrow">
					</view>
				</view>
			</picker>
			<!-- <view class="" @tap = "clearsign">
				取消签到
			</view> -->
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
		<view v-if = "isEmpty == 1">
		    <nodata wordinfo = "今天还没有创建任务, 赶快行动起来吧" type = "1"></nodata>
		  </view>
		  <view v-if="isEnd == true">
		     <endLine></endLine>
		  </view>
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
			// cdtime:true,
			taskTime:'',
			minuteTask:'',
			secondTask:'',
			hourTask:'',
			showhour:false,
			nowtask:'',  // 真实状态下为 ""
			datetime:'',
			star:null,
			exptype:null,
			ifswitch:false,
			signid:'',
			signIn:false,

			nowweekday:'',
			date: '',
			enddate:'',
			isEmpty: 0,
			isEnd: false
		};
	},
	computed:{
		listsign:function(){
			return this.$store.state.signList
		}
	},
	components:{
		uniCountdown
	},
	onLoad: function(options) {
		// console.log('load');
		//console.log(this.$mp.page.route)
		// this.signget()
		this.init();
		
	},
	onShow() {
		// console.log('show');
	},
	onReachBottom: async function(){
		// console.log('onReachBottom');
		// console.log(this.rwlist.length)
		let params = {
		      from: this.rwlist.length + 1,
		      count: this.dataStep
		    }
			
		    if (this.isEnd !== true) {
		      this.renderList(this.rwlist.length + 1,this.dataStep,this.date)
		    }
	},
	onShareTimeline(){
		console.log('分享到朋友圈')
	},
	onShareAppMessage(){
		var jielongImg = '/static/timebg.jpg';
		var jielongpath = '/pages/rwlist/rwlist';
		return {
		  title: '123',
		  path: '/pages/rwlist/rwlist',
		  imageUrl: jielongImg,
		  success: (res) => {
			console.log("转发成功", res);
			console.log(uni)
			uni.showToast({
				title:'转发成功',
				icon:'none',
				duration:1500
			})
		  },
		  fail: (res) => {
			// console.log("转发失败", res);
		  }
		}
	},
	methods: {
		
		DateChange:function(e) {
			// console.log(e)
			this.date = e.detail.value;
			this.rwlist = [];
			this.isEnd = false;
			this.renderList(1,this.dataStep,this.date)
		},
		daystate:function(e){
			
		},
		clearsign:async function(){
			await this.$api.getData(this.$api.webapi.signclear);
		},
		signEvent:function(){
			this.signget()
		},
		signOk:async function(e){
			var _this = this;
			// console.log(this.nowweekday);
			var nowexp;
			var signed;
			var tempsign = [
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
			];
			tempsign.forEach(function(item,index,arr){
				if(item.day == _this.nowweekday){
					nowexp = item.exp;
					signed = item.isSigned
				}
			})
			// console.log(nowexp);
			if(!signed){
				var params = {
					experience:nowexp
				}
				await this.$api.showLoading(); // 显示loading
				var signRes = await this.$api.postData(this.$api.webapi.signin, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (this.$api.reshook(signRes, this.$mp.page.route)) {
					// console.log(signRes);
					if(signRes.resultCode == 0){
						// 签到成功增加经验
						await this.$api.addExp(nowexp);
						uni.showToast({
							title:'签到成功',
							icon:'none',
							duration:1500
						})
					}
					this.signget()
					// this.closemask();
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
			var tempsign = [
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
			]
			var signget = await this.$api.getData(this.$api.webapi.signget);
			if (this.$api.reshook(signget, this.$mp.page.route)) {
				signget.data.forEach(function(item,index,arr){
					// console.log(tempsign[index])
					var newitem = Object.assign(item,tempsign[index]);
					// console.log(newitem)
					newArr.push(newitem)
				})
				// console.log(newArr);
				// this.signList = newArr;
				
				this.$store.commit('changesignList', newArr);
				// console.log('签到查询');
				// console.log(this.signList);
				this.signIn = true;
				this.cdtime = true;
				this.nowWeek()
			}
		},
		deltask:function(id){
			this.rwlist.forEach(function(item, index, arr) {
				if(item.id == id) {
					arr.splice(index, 1);
					// this.rwlist = arr
				}
				// console.log(arr)
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
			// console.log(cdtime);
			// console.log(taskid)
			this.nowtask = taskid;
			this.star = star;
			this.ifswitch = ifswitch;
			this.signIn = false;
			this.formatTime(cdtime)
		},
		// 关闭计时弹层
		closemask:function(){
			// console.log(this);
			if(this.taskSuccess){
				this.taskSuccess = false;
				this.showhour = false;
				this.cdtime = false;
				this.nowtask = '';
				this.rwlist = [];
				
				this.init();
			}else if(this.signIn){
				this.signIn = false;
				this.showhour = false;
				this.cdtime = false;
				this.nowtask = '';
			}else{
				this.$refs.countDown.audiostop();
				this.showhour = false;
				this.cdtime = false;
				this.nowtask = '';
				this.rwlist = [];
				
				this.init();
			}
			
		},
		// 任务完成
		timed:async function(minute,state){
			// console.log('秒数');
			// console.log(minute);
			// console.log('nowtask is');
			// console.log(this.nowtask);
			var params = {
				id:this.nowtask,
				realDuration:minute,
				state:state
			};
			await this.$api.showLoading(); // 显示loading
			var taskend = await this.$api.postData(this.$api.webapi.TaskEnd, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (this.$api.reshook(taskend, this.$mp.page.route)) {
				// console.log(taskend)
				if(taskend.resultCode == 0){
					if(this.ifswitch){
						//await this.$api.addExp(this.$api.expval.endtask)
						//this.taskSuccess = true;
						// this.nowtask = '';
						// this.cdtime = false;
						this.closemask();
					}else{
						if(state == 3){
							await this.$api.addExp(this.$api.expval.endtask);
							await this.$api.starAdjust(this.star,'任务完成');
							// await this.$api.getUserinfo()
							this.taskSuccess = true;
							this.nowtask = '';
							this.exptype = this.$api.expval.endtask
						}
						if(state == 4){
							this.nowtask = '';
							this.closemask();
						}
						
						
					}
				}
			}
		},
		async init() {
			var date = new Date();
			this.date = this.$api.formatTime(date);
			this.enddate = this.$api.formatTime(date);
			this.renderList(1,this.dataStep,this.date)
		},
		async renderList(from,count,dateTime){
			var params = {
				from,
				count,
				dateTime
			};
			await this.$api.showLoading(); // 显示loading
			var cjlist = await this.$api.getData(this.$api.webapi.TaskList, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (this.$api.reshook(cjlist, this.$mp.page.route)) {
				// this.renderList(cjlist);
				if(cjlist.resultCode == 0){
					if (cjlist.data.length == 0) {
						this.isEmpty = 1;
						this.isEnd = false;
						this.rwlist = cjlist.data
					    } else {
					      this.isEmpty = 0;
					      this.isEnd = (cjlist.data.length < this.dataStep) ? true : false;
					      this.rwlist = (this.rwlist.length == 0) ? cjlist.data : this.rwlist.concat(cjlist.data)
					    }
					// this.rwlist = cjlist.data
				}
			}
		},
		gotoCreate: function(e) {
			let rwtype = e.currentTarget.dataset.type;
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
		},
		// storetap() {
		// 	console.log('storetap');
		// 	this.$store.commit('addLevel', 1);
		// 	// this.$emit('close');
		// },
		// storagetap() {
		// 	console.log('storagetap');
		// 	uni.setStorage({
		// 		key: 'level',
		// 		data: uni.getStorageSync('level') + 1
		// 	});
		// 	// this.$emit('click');
		// }
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
		width:256upx;
		height:60upx;
		line-height: 60upx;
		border: 4upx solid #848484;
		padding:0 20upx;
		@include rowflex;
		justify-content: space-between;
	}
	.signCon{
		height:58upx;
		padding:1upx 20upx;
		border-radius: 10upx;
		background-image: linear-gradient(#736427, #221e0c);
		color: $color-m;
		font-size: $fontsize-30;
		image{
			width:36upx;
			height:36upx;
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
	background: url("/static/timebg.jpg") no-repeat;
	background-size: 720upx 800upx;
	@include rowflex;
	justify-content: center;
	
}

.signin{
	width: 660upx;
	height:620upx;
	padding:20upx 0;
	@include colflex;
	justify-content: space-around;
	align-items: center;
	background: #fff;
	.signTitle{
		width: 600upx;
		height:80upx;
		line-height: 80upx;
		text-align: center;
		font-weight: bold;
		font-size: 32upx;
		color:#fff;
		background-image: linear-gradient(#ffa317, #ffce00);
	}
	.signList{
		width:600upx;
		height:390upx;
		display: flex;
		flex-wrap:wrap;
		font-size: $fontsize-28;
		.signItemCur{
			width:126upx;
			border:4upx solid #ffce00;
			@include colflex;
			justify-content:flex-start;
			margin:5upx 8upx;
			padding:0;
		}
		.signItem{
			width:126upx;
			border:4upx solid #f2f2f2;
			@include colflex;
			justify-content:flex-start;
			margin:5upx 8upx;
		}
		.sItem{
			width:100%;
			height:50upx;
			line-height: 50upx;
			background: #ffce00;
			padding-left:10upx;
			box-sizing: border-box;
		}
		.sItemCur{
			width:100%;
			height:50upx;
			line-height: 50upx;
			background: #f2f2f2;
			padding-left:10upx;
			box-sizing: border-box;
			color:#909090;
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
	.expfont{
		font-weight: bold;
		color:#ffbe09
	}
	.yiqiandao{
		margin-top: 10upx;
		background: #ffce00;
		padding:5upx;
		font-size: 24upx;
		color:#fff
	}
	.weiqiandao{
		margin-top: 10upx;
		background: #f2f2f2;
		padding:5upx;
		font-size: 24upx;
		color:#909090;
	}
}
.newsbox{
	width:730upx;
	height:40upx;
	line-height: 40upx;
	padding:10upx;
	background: #E8F4D9;
	font-size: $fontsize-24;
	color: #666;
	@include rowflex;
	justify-content: flex-start;
	image{
		width:30upx;
		height:30upx;
		margin-right:16upx;
		opacity: 0.3;
	}
}
</style>