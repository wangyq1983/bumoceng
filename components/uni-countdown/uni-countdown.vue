<template>
	<view class="uniwarp">
		<view :class="(musicOn == true)?'musicBox switchOn rotate':'musicBox switchOff'" @tap = "musicEvent">
			
		</view>
		<view class="timeCir">
			<view class="uni-countdown">
				<text v-if="showDay" :style="{ color: color }" class="uni-countdown__number">{{ d }}</text>
				<text v-if="showDay" :style="{ color: splitorColor }" class="uni-countdown__splitor">天</text>
				<text v-if="showHour" :style="{  color: color,  }" class="uni-countdown__number">{{ h }}</text>
				<text v-if="showHour" :style="{ color: splitorColor }" class="uni-countdown__splitor">{{ showColon ? ':' : '时' }}</text>
				<text :style="{ color: color }" class="uni-countdown__number">{{ i }}</text>
				<text :style="{ color: splitorColor }" class="uni-countdown__splitor">{{ showColon ? ':' : '分' }}</text>
				<text :style="{color: color}" class="uni-countdown__number">{{ s }}</text>
				<text v-if="!showColon" :style="{ color: splitorColor }" class="uni-countdown__splitor">秒</text>
			</view>
			<view class="timeout" v-if="timeout">
				<view>任务已超时</view>
				<view class="">
					超时 {{timeoutSeconds}} 秒
				</view>
			</view>
		</view>
		
		<view class="taskendBtn" @tap="taskover">
			{{txtBtn}}
		</view>
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
	const innerAudioContext  = uni.getBackgroundAudioManager();
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
			}
		},
		data() {
			return {
				musicOn:true,
				timer: null,
				syncFlag: false,
				d: '00',
				h: '00',
				i: '00',
				s: '00',
				leftTime: 0,
				seconds: 0,
				realDuration:0,
				btntext:"",
				timeout:false,  // 是否超时
				timeouter:null, // 超时计数器
				timeoutSeconds:0 // 超时秒数
			}
		},
		computed:{
			txtBtn:function(){
				if(this.timeout == false){
					return "任务完成"
				}else{
					return "任务结束"
				}
			}
		},
		watch: {
			day(val) {
				this.changeFlag()
			},
			hour(val) {
				this.changeFlag()
			},
			minute(val) {
				this.changeFlag()
			},
			second(val) {
				this.changeFlag()
			}
		},
		created: function(e) {
			this.startData();
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			musicEvent:function(){
				this.musicOn = !this.musicOn;
				if(this.musicOn == true){
					this.audioplay()
				}
				if(this.musicOn == false){
					this.audiostop()
				}
			},
			audioplay:function(){
				
				innerAudioContext.title = '作业不磨蹭';
				innerAudioContext.src = 'https://task.vsclouds.com/music/clock2.mp3';
				//innerAudioContext.src = 'https://jielongtest.vsclouds.com/music/clock2.mp3';
				innerAudioContext.onPlay(() => {//可以播放事件
					console.log('开始播放');
					//innerAudioContext.play()
					//this.playing = !innerAudioContext.paused;//查看是否可以自动播放
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				innerAudioContext.onEnded(()=>{
					console.log('播放结束')
					// innerAudioContext.seek(2);
					console.log('重新开始')
					innerAudioContext.src = 'https://task.vsclouds.com/music/clock2.mp3';
					//innerAudioContext.src = 'https://jielongtest.vsclouds.com/music/clock2.mp3';
					//innerAudioContext.play()
				})
			},
			audiostop:function(){
				console.log('audiostop')
				console.log(innerAudioContext)
				innerAudioContext.stop()
			},
			toSeconds(day, hours, minutes, seconds) {
				return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds
			},
			toMinutes(hours,minutes){
				return hours*60 + minutes;
			},
			timeUp() { 
				clearInterval(this.timer);
				this.timeout = true;
				this.timeoutStart();
				this.$emit('timeup')
			},
			timeOver(){
				clearInterval(this.timer);
			},
			
			// 计时完成
			taskover(){
				this.audiostop()
				if(this.timeout){
					// 如果超时
					clearInterval(this.timeouter);
					let allDuration = this.toSeconds(0,this.hour,this.minute,this.second) + this.timeoutSeconds;
					console.log(allDuration);
					this.$emit("on-complete",allDuration,4);
				}else{
					// 规定时间内完成
					
					this.timeOver();
					console.log('经历秒数是');
					console.log('hour is'+this.h+'minute is'+this.i + 'seconds is' + this.s);
					
					console.log(this.toSeconds(0,this.hour,this.minute,this.second))
					console.log('-')
					console.log(this.toSeconds(0,this.h,this.i,this.s));
					console.log('=');
					let realDuration = this.toSeconds(0,this.hour,this.minute,this.second) - this.toSeconds(0,this.h,this.i,this.s);
					console.log(realDuration)
					this.$emit("on-complete",(realDuration >= 0)?realDuration:0,3);
				}
			},
			
			countDown() {
				let seconds = this.seconds
				let [day, hour, minute, second] = [0, 0, 0, 0]
				if (seconds > 0) {
					day = Math.floor(seconds / (60 * 60 * 24))
					hour = Math.floor(seconds / (60 * 60)) - (day * 24)
					minute = Math.floor(seconds / 60) - (day * 24 * 60) - (hour * 60)
					second = Math.floor(seconds) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
				} else {
					this.timeUp()
				}
				if (day < 10) {
					day = '0' + day
				}
				if (hour < 10) {
					hour = '0' + hour
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
				this.d = day
				this.h = hour
				this.i = minute
				this.s = second
				
			},
			timeoutStart(){
				this.timeouter = setInterval(()=>{
					this.timeoutSeconds++ 
				},1000)
			},
			startData() {
				this.seconds = this.toSeconds(this.day, this.hour, this.minute, this.second)
				if (this.seconds <= 0) {
					return
				}
				this.audioplay()
				this.countDown()
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds < 0) {
						this.timeUp()
						return
					}
					this.countDown()
				}, 1000)
			},
			changeFlag() {
				if (!this.syncFlag) {
					this.seconds = this.toSeconds(this.day, this.hour, this.minute, this.second)
					this.startData();
					this.syncFlag = true;
				}
			}
		}
	}
</script>
<style scoped>
	.uniwarp{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.musicBox{
		width:72upx;
		height: 72upx;
		position: absolute;
		top: -32upx;
		right:-52upx;
		z-index: 999999;
	}
	@keyframes rotate{
	    0%{
	        transform: rotate(0);
	      }
		25%{
			transform:rotate(90deg);
		}  
	    50%{
	    	transform:rotate(180deg);
	    }
	    75%{
	    	transform:rotate(270deg);
	    }
		100%{
	         transform: rotate(360deg);
	    	}
		}
	 
	.rotate{
	    transition: 0.5s;
	    transform-origin: 36upx 36upx;  
	    animation: rotate 5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
	}
	.switchOn{
		background: url("/static/musicOn.png") no-repeat;
		background-size: 72upx 72upx;
		
	}
	.switchOff{
		background: url("/static/musicOff.png") no-repeat;
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
	.taskendBtn{
		width: 200upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		background: #FFCE00;
		color:#363636;
		margin-top:60upx;
	}
	.timeout{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 50rpx;
		color:#f55459;
	}
	.timeCir{
		width:472upx;
		height:472upx;
		border-radius: 400upx;
		background: rgba(255,255,255,0.5);
		border: 6upx solid #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>