	<template>
	<view class="rwItem">
		<view class="TitleBox">
			<view v-if="itemcon.state == 1 && itemcon.flag == 1" class="rwState ongoing"></view>
			<view v-if="itemcon.state == 2 && surplusTime > 0 && itemcon.flag == 1" class="rwState goon"></view>
			<view v-if="itemcon.state == 2 && surplusTime <= 0 && itemcon.flag == 1" class="rwState goon"></view>
			<view v-if="itemcon.state == 3 && itemcon.flag == 1" class="rwState onend"></view>
			<view v-if="itemcon.state == 4 && itemcon.flag == 1" class="rwState onfail"></view>
			<view v-if="itemcon.state == 1 && itemcon.flag == 2" class="rwState ongoing1"></view>
			<view v-if="itemcon.state == 2 && surplusTime > 0 && itemcon.flag == 2" class="rwState goon1"></view>
			<view v-if="itemcon.state == 2 && surplusTime <= 0 && itemcon.flag == 2" class="rwState goon1"></view><strong></strong>
			<view v-if="itemcon.state == 3 && itemcon.flag == 2" class="rwState onend1"></view>
			<view v-if="itemcon.state == 4 && itemcon.flag == 2" class="rwState onfail1"></view>
			<view :class="itemcon.flag == 1 ? 'rwType':'rwType1'">{{ itemcon.typeName }}</view>
			<view class="rwTitle">
				<image src="/static/menustar.png" mode=""></image>
				<view class="">{{ itemcon.starNumber }}</view>
			</view>
			<view class="itemAction">
				<view class="rwShare" @tap = "itemShare">
					<image src="/static/zyshare1.png" mode="" v-if="itemcon.flag == 1"></image>
					<image src="/static/zyshare2.png" mode="" v-if="itemcon.flag == 2"></image>
				</view>
				<view class="rwEdit" @tap = "itemEdit">
					<image src="/static/cz1.png" mode="" v-if="itemcon.flag == 1"></image>
					<image src="/static/cz2.png" mode="" v-if="itemcon.flag == 2"></image>
				</view>
			</view>
			<!-- <view class="rwHandle" @tap="delAction">⋮</view> -->
		</view>
		<view class="rwInfo" v-if="itemcon.jobDescription">{{ itemcon.jobDescription }}</view>
		<view class="rwAction">
			<view v-if="itemcon.state == 1 && itemcon.flag == 1" class="rwBtn" @tap="beginTask" :data-time="itemcon.duration*60"><view class="startBtn">开始任务</view></view>
			<view v-if="itemcon.state == 1 && itemcon.flag == 2" class="rwBtn" @tap="beginTask" :data-time="itemcon.duration*60"><view class="startBtn1">开始任务</view></view>
			
			<view class="rwBtn" v-if="itemcon.state == 2 && (surplusTime > 0)" @tap="goonTask" :data-time="surplusTime"><view class="taskgoon">任务进行中</view></view>
			<view class="rwBtn" v-if="itemcon.state == 2 && (surplusTime <= 0)" @tap="goonTask" :data-time="surplusTime"><view class="taskgoon">任务已超时</view></view>
			<view class="rwBtn" v-if="itemcon.state == 3"><view class="taskover">任务已完成</view></view>
			<view class="rwBtn" v-if="itemcon.state == 4"><view class="taskover">任务已失败</view></view>
			<view class="timebox">
				<view class="rwTime">
					预计时间：
					<text>{{ itemcon.duration }}分钟</text>
				</view>
				<view v-if="itemcon.state == 3" class="rwTime">
					实际完成时间
					<text>{{ realtime }}</text>
				</view>
				<view v-if="itemcon.state == 4" class="rwTime">
					实际完成时间
					<text>{{ realtime }}</text>
				</view>
				<view v-if="itemcon.state == 2" class="rwTime">
					开始时间:
					<text>{{ shortTime }}</text>
					<!-- 剩余时间：
					<text>{{surplusTime}}</text> -->
				</view>
			</view>
		</view>

		<view class="rwOther" v-if="(itemcon.completionSwitch && itemcon.state !== 4 && !itemcon.completionCheck)">
			<view class="title">完成质量:</view>
			<radio-group @change="radioChange" class="radiogroup">
				<label v-for="(item, index) in items" :key="item.value">
					<radio color="#ffce00" :value="item.value" :checked="index === current" style="transform:scale(0.7)" />
					<view class="">{{ item.name }}</view>
				</label>
			</radio-group>
			<view :class="itemcon.flag == 1 ? 'zhiliangBtn' : 'zhiliangBtn1'" @tap="zhiliangEvent" v-if="clickable">确定</view>
			<view :class="itemcon.flag == 1 ? 'zhiliangBtn' : 'zhiliangBtn1'" v-if="(clickable == false)">确定</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			clickable:true,
			itemcon: {},
			zhiliangCur: null,
			items: [
				{
					value: 1,
					name: '优'
				},
				{
					value: 2,
					name: '良'
				},
				{
					value: 3,
					name: '中'
				},
				{
					value: 4,
					name: '差'
				}
			]
		};
	},
	props: {
		info: Object,
		nowtask:Number
	},
	created() {
		// console.log('组件创建后，但还未挂载');
		this.itemcon = this.info;
		if(this.itemcon.id == this.nowtask){
			console.log('taskid相等则触发goontask函数调出计时界面')
			this.goonTask()
		}
		// console.log(this.itemcon);
	},
	computed: {
		realtime() {
			return this.$api.secToTime(this.itemcon.realDuration);
		},
		shortTime(){
			return this.$api.timeSwitch(this.itemcon.beginDate?this.itemcon.beginDate:1)
		},
		surplusTime:{
			get:function(){
				return this.$api.surplusTime(this.itemcon.duration,this.itemcon.beginDate?this.itemcon.beginDate:1)
			},
			set:function(){
				
			}
		}
		
	},
	methods: {
		radioChange(evt) {
			//console.log(evt.detail.value);
			this.zhiliangCur = evt.detail.value;
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.detail.value) {
					this.current = i;
					break;
				}
			}
		},
		async beginTask(e) {
			//console.log(this);
			//console.log(e.currentTarget.dataset.time);
			
			var params = {
				id:this.itemcon.id
			}
			await this.$api.showLoading(); // 显示loading
			var taskS = await this.$api.postData(this.$api.webapi.TaskStart, params);
			await this.$api.hideLoading();
			var beginTime = new Date().getTime(); // 获取任务开始时间戳
			this.$emit('on-cdtime', e.currentTarget.dataset.time, this.itemcon.id, this.itemcon.starNumber, this.itemcon.completionSwitch,beginTime);
		},
		goonTask(e) {
			var surplusTime1 = this.$api.surplusTime(this.itemcon.duration,this.itemcon.beginDate?this.itemcon.beginDate:1);
			var beginTime = new Date(this.itemcon.beginDate?this.itemcon.beginDate:1).getTime();
			console.log('执行goonTask函数，计时剩余秒数是'+surplusTime1+'开始时间'+beginTime+'taskid是'+this.itemcon.id);
			this.$emit('on-cdtime', surplusTime1, this.itemcon.id, this.itemcon.starNumber, this.itemcon.completionSwitch,beginTime);
		},
		async zhiliangEvent() {
			
			if (this.itemcon.state == 1 || this.itemcon.state == 2) {
				uni.showToast({
					title: '任务未完成,不能评价完成质量',
					icon: 'none',
					duration: 1500
				});	
			} else {
				//console.log('zhiliangCur is ' + this.zhiliangCur);
				
				if(this.zhiliangCur == null){
					uni.showToast({
						title:"请选择完成质量",
						icon:'none'
					})
				}else{
					this.clickable = false;
					var params = {
						id:this.itemcon.id,
						// completionSwitch
						// completionCheck
						completion:this.zhiliangCur,
						completionCheck:true
					}
					
					await this.$api.showLoading(); // 显示loading
					var utask = await this.$api.postData(this.$api.webapi.uTask, params);
					await this.$api.hideLoading();
					var zhiliangpoint;
					if(this.zhiliangCur == 1){
						// 优
						zhiliangpoint = 120
					}
					if(this.zhiliangCur == 2){
						// 良
						zhiliangpoint = 100
					}
					if(this.zhiliangCur == 3){
						// 中
						zhiliangpoint = 80
					}
					if(this.zhiliangCur == 4){
						// 差
						zhiliangpoint = 50
					}
					
					var realstar = Math.ceil(this.itemcon.starNumber * 0.01 * zhiliangpoint);
					await this.$api.addExp(this.$api.expval.endtask,true);
					await this.$api.starAdjust(realstar, '任务完成',true);
					await this.$api.getUserinfo();
					let cjparams = {
						jobInfoId:this.itemcon.id,
						thresholdTypeList:["job","completionTimeToEnd","completeDays","completionQuality"]
					}
					var cjlist = await this.$api.cjCheck(cjparams);
					this.$emit('on-zhiliang', realstar, this.$api.expval.endtask,cjlist.data);
					this.clickable = true;
				}
			}
		},
		itemShare(){
			uni.navigateTo({
				url:'/pages/share/share?jobIds='+this.itemcon.id + '&shareUserId='+this.itemcon.userId
			})
		},
		itemEdit() {
			var _this = this;
			uni.showActionSheet({
				itemList: ['编辑','删除'],
				success(res) {
					//console.log(res.tapIndex);
					if (res.tapIndex == 0) {
						_this.edittask()
					}
					if (res.tapIndex == 1) {
						_this.deltask()
					}
				},
				fail(res) {
					console.log(res.errMsg);
				}
			});
		},
		async edittask() {
			var params = {
				id:this.itemcon.id,
				flag:this.itemcon.flag,
				typeName:this.itemcon.typeName,
				jobDescription:this.itemcon.jobDescription,
				duration:this.itemcon.duration,
				starNumber:this.itemcon.starNumber,
				completionSwitch:this.itemcon.completionSwitch
			}
			if(this.itemcon.flag == 1){
				uni.navigateTo({
					url:"/pages/createrw/createrw?"+this.$api.encodeData(params)
				})
			}
			if(this.itemcon.flag == 2){
				uni.navigateTo({
					url:"/pages/createother/createother?"+this.$api.encodeData(params)
				})
			}
		},
		async deltask() {
			var params = {
				id: this.itemcon.id
			};
			await this.$api.showLoading(); // 显示loading
			var taskdel = await this.$api.postData(this.$api.webapi.dTask, params);
			await this.$api.hideLoading();
			//console.log(taskdel);
			this.$emit('on-del',this.itemcon.id)
		}
	}
};
</script>

<style lang="scss">
.rwItem {
	@include warpwidth;
	@include warppadding;
	border-bottom: 10upx solid #c7c7c7;
}
.TitleBox {
	@include warpwidth;
	height: 78upx;
	@include rowflex;
	justify-content: flex-start;
	position: relative;
}
.rwState {
	width: 50upx;
	height: 50upx;
}
.goon{
	background-image: url(/static/goon.png);
	background-size: 50upx 50upx;
}
.goon1{
	background-image: url(/static/goon1.png);
	background-size: 50upx 50upx;
}
.ongoing {
	background-image: url(/static/tanhao.png);
	background-size: 50upx 50upx;
}
.ongoing1 {
	background-image: url(/static/tanhao1.png);
	background-size: 50upx 50upx;
}
.onend {
	background-image: url(/static/duihao.png);
	background-size: 50upx 50upx;
}
.onend1 {
	background-image: url(/static/duihao1.png);
	background-size: 50upx 50upx;
}
.onfail {
	background-image: url(/static/fail.png);
	background-size: 50upx 50upx;
}
.onfail1 {
	background-image: url(/static/fail1.png);
	background-size: 50upx 50upx;
}
.rwType {
	padding: 10upx;
	color: $color-m;
	font-size: $fontsize-28;
}
.rwType1 {
	padding: 10upx;
	color: $color-u-jl;
	font-size: $fontsize-28;
}
.rwTitle {
	padding-left: 30upx;
	font-size: $fontsize-24;
	color: $color-a5;
	@include rowflex;
	justify-content: flex-start;
	image {
		width: 30upx;
		height: 30upx;
		margin-right: 10upx;
	}
}
.itemAction{
	width:200upx;
	height: 50upx;
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: space-between;
	justify-content: center;
	align-items: center;
}
.rwShare,.rwEdit{
	width: 80upx;
	height: 40upx;
	margin-top: 10upx;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	image{
		width: 40upx;
		height: 40upx;
	}
}
.rwHandle {
	width: 60upx;
	text-align: center;
	height: 50upx;
	line-height: 50upx;
	font-weight: bold;
	color:#000;
	font-size: $fontsize-36;
	position: absolute;
	top: 0;
	right: 0;
}
.rwInfo {
	@include warpwidth;
	padding: 15upx;
	box-sizing: border-box;
	background: $color-bor;
	border-radius: 10upx;
	color: $color-00;
	font-size: $fontsize-28;
}
.rwAction {
	@include warpwidth;
	height: 86upx;
	@include rowflex;
	justify-content: space-between;
	padding-top: 16upx;
}
.rwBtn {
	font-size: $fontsize-30;
}
.rwBtn > view{
	border-radius: 8upx;
}
.startBtn {
	background: $color-m;
	padding: 10upx 20upx;
}
.startBtn1{
	background: $color-u-jl;
	padding: 10upx 20upx;
	color: #fff;
}
.taskover {
	background: $color-36;
	color: $color-m;
	padding: 10upx 20upx;
}
.taskgoon{
	background-color: #f75900;
	color: #fff;
	padding: 10upx 20upx;
}
.endBtn {
	background: #8861d9;
}
.rwTime {
	font-size: $fontsize-28;
	color: #333;
}
.rwOther {
	@include warpwidth;
	height: 70upx;
	@include rowflex;
	justify-content: flex-start;
	font-size: $fontsize-28;
	padding-top: 10upx;
	.title {
		padding-right: 28upx;
	}
	.item {
	}
}

.timebox {
	@include colflex;
	justify-content: flex-start;
	align-items: flex-start;
	view {
		padding: 8upx 0;
	}
	text {
		font-weight: bold;
	}
}
.radiogroup {
	@include rowflex;
	justify-content: flex-start;
	label {
		@include rowflex;
		justify-content: flex-start;
		margin-right: 16upx;
	}
}
.zhiliangBtn {
	background: $color-m;
	color: $color-36;
	font-size: $fontsize-28;
	text-align: center;
	padding: 8upx 26upx;
	margin-left: 16upx;
}
.zhiliangBtn1 {
	background: $color-u-jl;
	color: #fff;
	font-size: $fontsize-28;
	text-align: center;
	padding: 8upx 26upx;
	margin-left: 16upx;
}
</style>
