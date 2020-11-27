<template>
	<view class="uniwarp">
		<!-- <view :class="musicOn == true ? 'musicBox switchOn rotate' : 'musicBox switchOff'" @tap="musicEvent"></view> -->
		<view class="timeCir">
			<view class="uni-countdown">
				<text v-if="showDay" :style="{ color: color }" class="uni-countdown__number">{{ d }}</text>
				<text v-if="showDay" :style="{ color: splitorColor }" class="uni-countdown__splitor">天</text>
				<text v-if="showHour" :style="{ color: color }" class="uni-countdown__number">{{ h }}</text>
				<text v-if="showHour" :style="{ color: splitorColor }" class="uni-countdown__splitor">{{ showColon ? ':' : '时' }}</text>
				<text :style="{ color: color }" class="uni-countdown__number">{{ i }}</text>
				<text :style="{ color: splitorColor }" class="uni-countdown__splitor">{{ showColon ? ':' : '分' }}</text>
				<text :style="{ color: color }" class="uni-countdown__number">{{ s }}</text>
				<text v-if="!showColon" :style="{ color: splitorColor }" class="uni-countdown__splitor">秒</text>
			</view>
			<view class="timeout" v-if="timeout">
				<view>任务已超时</view>
				<view class="">超时 {{ timeoutSeconds }} 秒</view>
			</view>
		</view>
		<view class="taskbtnWarp">
			<view class="taskendBtn" @tap="taskover">{{ txtBtn }}</view>
			<view class="taskcal" @tap="taskcal">
				取消计时
			</view>
		</view>
		
		<!-- <view class="">
			{{hour}}时{{minute}}分{{second}}秒-超时{{isoverTime}}|{{h}}:{{i}}:{{s}}
		</view> -->
		
	</view>
</template>
<script>
/**
 * Countdown 倒计时
 * @description 倒计时组件
 * @tutorial https://ext.dcloud.net.cn/plugin?id=25
 * @property {String} backgroundColor 背景色
 * @property {String} color 文字颜色
 * @property {Number} day 天数
 * @property {Number} hour 小时
 * @property {Number} minute 分钟
 * @property {Number} second 秒
 * @property {Boolean} showDay = [true|false] 是否显示天数
 * @property {Boolean} showColon = [true|false] 是否以冒号为分隔符
 * @property {String} splitorColor 分割符号颜色
 * @event {Function} timeup 倒计时时间到触发事件
 * @example <uni-countdown :day="1" :hour="1" :minute="12" :second="40"></uni-countdown>
 */
// const innerAudioContext = uni.getBackgroundAudioManager();
export default {
	name: 'UniCountdown',
	props: {
		showDay: {
			type: Boolean,
			default: true
		},
		showHour: {
			type: Boolean,
			default: true
		},
		showColon: {
			type: Boolean,
			default: true
		},
		backgroundColor: {
			type: String,
			default: '#FFFFFF'
		},
		borderColor: {
			type: String,
			default: '#000000'
		},
		color: {
			type: String,
			default: '#000000'
		},
		splitorColor: {
			type: String,
			default: '#000000'
		},
		day: {
			type: Number,
			default: 0
		},
		hour: {
			type: Number,
			default: 0
		},
		minute: {
			type: Number,
			default: 0
		},
		second: {
			type: Number,
			default: 0
		},
		startT:{
			type:Number
		},
		isoverTime:{
			type:Number
		},
		taskseconds:{
			type:Number
		}
	},
	data() {
		return {
			musicOn: true,
			timer: null,
			syncFlag: false,
			d: '00',
			h: '00',
			i: '00',
			s: '00',
			leftTime: 0,
			seconds: 0,
			realDuration: 0,
			btntext: '',
			timeout: false, // 是否超时
			timeouter: null, // 超时计数器
			timeoutSeconds: 0 // 超时秒数
		};
	},
	computed: {
		txtBtn: function() {
			if (this.timeout == false) {
				return '任务完成';
			} else {
				return '任务结束';
			}
		}
	},
	watch: {
		day(val) {
			this.changeFlag();
		},
		hour(val) {
			this.changeFlag();
		},
		minute(val) {
			this.changeFlag();
		},
		second(val) {
			this.changeFlag();
		},
		isoverTime(val){
			this.changeFlag()
		}
	},
	beforeCreate:function(){
		
	},
	created: function(e) {
		console.log('倒计时created')
		console.log('getSec is'+this.$api.TempData.getSec);
		if (!this.syncFlag) {
			console.log('执行startData函数_mounted')
			//this.seconds = this.toSeconds(this.day, this.hour, this.minute, this.second);
			if(this.$api.TempData.getSec){
				this.startData();
				this.syncFlag = true;
			}
		}
		 
	},
	beforeMount:function(){
		console.log('倒计时beforeMount')
	},
	mounted:function() {
		console.log('倒计时mounted')
		
	},
	beforeDestroy:function() {
		console.log('倒计时beforeDestroy')
		clearInterval(this.timer);
		clearInterval(this.timeouter);
	},

	methods: {
		// musicEvent: function() {
		// 	this.musicOn = !this.musicOn;
		// 	if (this.musicOn == true) {
		// 		this.audioplay();
		// 	}
		// 	if (this.musicOn == false) {
		// 		this.audiostop();
		// 	}
		// },
		// audioplay: function() {
		// 	innerAudioContext.title = '作业不磨蹭';
		// 	innerAudioContext.src = 'https://task.vsclouds.com/music/clock2.mp3';
		// 	//innerAudioContext.src = 'https://jielongtest.vsclouds.com/music/clock2.mp3';
		// 	innerAudioContext.onPlay(() => {
		// 		//可以播放事件
		// 		console.log('开始播放');
		// 		//innerAudioContext.play()
		// 		//this.playing = !innerAudioContext.paused;//查看是否可以自动播放
		// 	});
		// 	innerAudioContext.onError(res => {
		// 		console.log(res.errMsg);
		// 		console.log(res.errCode);
		// 	});
		// 	innerAudioContext.onEnded(() => {
		// 		console.log('播放结束');
		// 		// innerAudioContext.seek(2);
		// 		console.log('重新开始');
		// 		innerAudioContext.src = 'https://task.vsclouds.com/music/clock2.mp3';
		// 		//innerAudioContext.src = 'https://jielongtest.vsclouds.com/music/clock2.mp3';
		// 		//innerAudioContext.play()
		// 	});
		// },
		// audiostop: function() {
		// 	console.log('audiostop');
		// 	console.log(innerAudioContext);
		// 	innerAudioContext.stop();
		// },
		toSeconds(day, hours, minutes, seconds) {
			console.log('执行toseconds函数 转化为秒');
			
			return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds;
		},
		toMinutes(hours, minutes) {
			return hours * 60 + minutes;
		},
		timeUp() {
			console.log('执行timeup函数，终止常规计时，显示超时，超时计时开始')
			clearInterval(this.timer);
			this.timeout = true;
			this.timeoutStart();
			this.$emit('timeup');
		},
		timeOver() {
			console.log('执行timeover函数，终止常规计时')
			clearInterval(this.timer);
		},

		// 计时完成
		taskover() {
			var _this = this;
			uni.showModal({
				title: '提示',
				content: '您确定已经完成任务了吗？',
				success(res) {
					if (res.confirm) {
						// _this.audiostop();
						
						var nowTime = parseInt((new Date().getTime() - _this.startT) / 1000);
						
						if (_this.timeout) {
							// 如果超时
							clearInterval(_this.timeouter);
							let allDuration = _this.toSeconds(0, _this.hour, _this.minute, _this.second) + _this.timeoutSeconds;
							console.log(allDuration);
							_this.$emit('on-complete', nowTime, 4);
							
						} else {
							
							// 规定时间内完成
							_this.timeOver();
							console.log('经历秒数是');
							console.log('hour is' + _this.h + 'minute is' + _this.i + 'seconds is' + _this.s);
							console.log(_this.toSeconds(0, _this.hour, _this.minute, _this.second));
							console.log('-');
							console.log(_this.toSeconds(0, _this.h, _this.i, _this.s));
							console.log('=');
							let realDuration = _this.toSeconds(0, _this.hour, _this.minute, _this.second) - _this.toSeconds(0, _this.h, _this.i, _this.s);
							console.log(realDuration);
							_this.$emit('on-complete', nowTime >= 0 ? nowTime : 0, 3);
						}
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		
		// 取消计时
		taskcal(){
			var _this = this;
				uni.showModal({
					title: '提示',
					content: '您确定要取消计时吗？',
					success(res) {
						if (res.confirm) {
							// _this.audiostop();
							_this.$emit('on-cancel');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			
		},
		countDown() {
			console.log('执行countdown函数，开始倒计时')
			let seconds = this.seconds;
			let [day, hour, minute, second] = [0, 0, 0, 0];
			console.log('seconds is=='+seconds);
			if (seconds >= 0) {
				console.log('seconds 大于等于0')
				day = Math.floor(seconds / (60 * 60 * 24));
				hour = Math.floor(seconds / (60 * 60)) - day * 24;
				minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60;
				second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
				if (day < 10) {
					day = '0' + day;
				}
				if (hour < 10) {
					hour = '0' + hour;
				}
				if (minute < 10) {
					minute = '0' + minute;
				}
				if (second < 10) {
					second = '0' + second;
				}
				console.log('d-h-i-s赋值')
				this.d = day;
				this.h = hour;
				this.i = minute;
				this.s = second;
			} 
			
		},
		timeoutStart() {
			console.log('执行timeoutStart函数，超时计时运行中')
			this.timeoutSeconds = this.isoverTime;
			this.timeouter = setInterval(() => {
				this.timeoutSeconds++;
			}, 1000);
		},
		startData() {
			this.$api.TempData.getSec = false;
			console.log('执行startData函数')
			if(this.isoverTime == 0){
				console.log('isoverTime == '+0);
				console.log('this_day is = '+ this.day);
				console.log('this_hour is = '+ this.hour);
				console.log('this_minute is = '+ this.minute);
				console.log('this_second is = '+ this.second);
				this.seconds = this.toSeconds(this.day, this.hour, this.minute, this.second);
				this.countDown();
				this.timer = setInterval(() => {
					this.seconds--;
					if (this.seconds < 0) {
						this.timeUp();
						return;
					}
					this.countDown();
				}, 1000);
				
				// if (this.seconds <= 0) {
				// 	this.timeUp();
				// 	return;
				// }
				//this.audioplay();
				
			}else{
				console.log('isoverTime !=='+0)
				this.timeOver();
				this.timeoutSeconds = this.isoverTime;
				this.timeUp();
			}
			
		},
		changeFlag() {
			if (!this.syncFlag) {
				console.log('执行函数changeFlag')
				if(this.$api.TempData.getSec){
					this.seconds = this.toSeconds(this.day, this.hour, this.minute, this.second);
					this.startData();
					this.syncFlag = true;
				}
				
				
			}
		}
	}
};
</script>
<style scoped>
.uniwarp {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
}
.musicBox {
	width: 72upx;
	height: 72upx;
	position: absolute;
	top: -32upx;
	right: -52upx;
	z-index: 999999;
}
@keyframes rotate {
	0% {
		transform: rotate(0);
	}
	25% {
		transform: rotate(90deg);
	}
	50% {
		transform: rotate(180deg);
	}
	75% {
		transform: rotate(270deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.rotate {
	transition: 0.5s;
	transform-origin: 36upx 36upx;
	animation: rotate 5s linear infinite; /*开始动画后无限循环，用来控制rotate*/
}
.switchOn {
	background: url('/static/musicOn.png') no-repeat;
	background-size: 72upx 72upx;
}
.switchOff {
	background: url('/static/musicOff.png') no-repeat;
	background-size: 72upx 72upx;
}
.uni-countdown {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: flex-start;
	padding: 2rpx 0;
}

.uni-countdown__splitor {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	padding: 5rpx;
	font-size: 100rpx;
}

.uni-countdown__number {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
	font-size: 100rpx;
	margin: 5rpx;
	text-align: center;
}
.taskbtnWarp{
	width:500upx;
	height: 80upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 60upx;
	font-size:30upx;
}
.taskcal{
	width: 180upx;
	height:72upx;
	line-height: 72upx;
	background: #363636;
	color: #ffce00;
	text-align: center;
}
.taskendBtn {
	width: 200upx;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	background: #ffce00;
	color: #363636;
	
}
.timeout {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 50rpx;
	color: #f55459;
}
.timeCir {
	width: 472upx;
	height: 472upx;
	border-radius: 400upx;
	background: rgba(255, 255, 255, 0.5);
	border: 6upx solid #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
