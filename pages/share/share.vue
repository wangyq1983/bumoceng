<template>
	<view class="shareWarp">
		 <view class="shareBox">
			 
		 	<view class="box1">
				<view class="">
					<view class="usericon userHonor1" v-if="honor1 == honorqt"><image :src="avatar"></image></view>
					<view class="usericon userHonor2" v-if="honor1 == honorby"><image :src="avatar"></image></view>
					<view class="usericon userHonor3" v-if="honor1 == honorhj"><image :src="avatar"></image></view>
					<view class="usericon userHonor4" v-if="honor1 == honorbj"><image :src="avatar"></image></view>
					<view class="usericon userHonor5" v-if="honor1 == honorzs"><image :src="avatar"></image></view>
					<view class="usericon userHonor6" v-if="honor1 == honorxs"><image :src="avatar"></image></view>
				</view>
		 		<view class="shareU">
		 			<view class="uInfo">
		 				<view class="">
		 					{{name}}
		 				</view>
						
							<view class="qingtong1" @tap = "gotoHonor">
								{{honor1}}
							</view>
							
						
		 			</view>
					<view class="uTxt">
						分享的作业
					</view>
		 		</view>
		 	</view>
			<view class="box2">
				<view class="type">
					{{typeName}}
				</view>
				<view class="sjxs">
					<view class="sj">
						<view class="">
							预计时间:
						</view>
						<input type="text" v-model="duration" />
						<view class="">
							分钟
						</view>
					</view>
					<view class="xs">
						<view class="">
							奖励星数:
						</view>
						<input type="text" v-model="starNumber" />
						<view class="">
							颗
						</view>
					</view>
					<view class="xs" v-if="(taskState == 3)">
						<view class="">
							实际时间:{{realDuration}}
						</view>
					</view>
				</view>
				
			</view>
			<view class="box3">
				{{jobDescription }}
			</view>	
			
		 
		 </view>
		 <view class="box4">
		 	<button class="shareAc" open-type="share">
				<view class="">
					分享一下
				</view>
		 		
		 	</button>
			
			<!-- <view class="saveBox" v-if="clickable"><view class="saveBtn" @tap="creatzyRequest">{{btnWord}}</view></view>
			<view class="saveBox" v-if="(clickable == false)"><view class="saveBtn">保存中</view></view> -->
			
		 	<view class="addTask">
				<view class="saveAction" v-if="clickable" @tap = "addTask">
					加入任务
				</view>
				<view class="saveing" v-if="(clickable == false)">
					加入中。。。
				</view>
				<!--  v-if="!(userid == shareUserId)" -->
		 		
		 	</view>
			
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				honorqt:this.$api.honor.qt,
				honorby:this.$api.honor.by,
				honorhj:this.$api.honor.hj,
				honorbj:this.$api.honor.bj,
				honorzs:this.$api.honor.zs,
				honorxs:this.$api.honor.xs,
				clickable:true,
				userid:'',
				jobIds:'', // 任务id
				shareUserId:'', // 分享用户
				honor1:'', // 称号
				jobDescription:"", // 作业内容
				duration:0, // 计划时间
				realDuration:0, // 完成时间
				starNumber:0, //奖励星
				typeName:'', // 类别
				avatar:'', // 头像
				name:'', // 昵称
				level:0, // 等级
				createTime:"", //创建时间
				taskState:1
			}
		},
		onLoad(options) {
			console.log(options);
			this.jobIds = options.jobid;
			this.shareUserId = options.shareUserId;
			this.userid = uni.getStorageSync('userId'); 
			this.init();
		},
		
		onShareTimeline: async function(){
			console.log('分享到朋友圈');
			return {
			    title: "测试小程序朋友圈分享",
			    query: "userId=10679&dateTime=2020-08-23"
			  }
		},
		onShareAppMessage: async function() {
			//console.log('分享');
			// var jielongImg = '/static/shareImg1.jpg';
			//var jielongpath = '/pages/rwlist/rwlist';
			var alltitle = this.name + '分享了' + this.typeName + '作业'
			return {
				title: alltitle,
				// path: '/pages/rwlist/rwlist',
				// imageUrl: jielongImg,
				success: res => {
					//console.log('转发成功', res);
					//console.log(uni);
		
					uni.showToast({
						title: '转发成功',
						icon: 'none',
						duration: 1500
					});
				},
				fail: res => {
					// console.log("转发失败", res);
				}
			};
		},
		methods: {
			shareAction(){
				var _this = this;
				uni.showActionSheet({
					itemList: ['分享微信好友','分享到朋友圈'],
					success(res) {
						//console.log(res.tapIndex);
						if (res.tapIndex == 0) {
							_this.onShareAppMessage()
						}
						if (res.tapIndex == 1) {
							_this.onShareTimeline()
						}
					},
					fail(res) {
						console.log(res.errMsg);
					}
				});
			},
			async init(){
				
				var params = {
					jobIds:Number(this.jobIds),
					shareUserId:Number(this.shareUserId)
				};
				await this.$api.showLoading(); // 显示loading
				var shareTask = await this.$api.getData(this.$api.webapi.shareTask, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				console.log(shareTask)
				if(shareTask.resultCode == 0){
					var shareData = shareTask.data.jobInfoList[0];
					this.createTime = shareData.createDate;
					this.duration = shareData.duration;
					this.jobDescription = shareData.jobDescription;
					this.realDuration = this.$api.secToTime(shareData.realDuration);
					this.starNumber = shareData.starNumber;
					this.typeName = shareData.typeName;
					this.taskState = shareData.state;
					this.avatar = shareTask.data.userBaseInfo.avatar;
					this.name = shareTask.data.userBaseInfo.name;
					this.level = shareTask.data.userLevelInfo.level;
					
					this.honor1 = this.$api.expTitle(shareTask.data.userLevelInfo.level)
					
					
				}
				
			},
			addTask(){
				
			}
		}
	}
</script>

<style lang="scss">
	button{
		display: flex;
		margin:0;
	}
	.shareWarp{
		position: absolute;
		z-index: 1;
		top:0upx;
		right:0upx;
		bottom:0upx;
		left:0upx;
		background-image: linear-gradient(#ffce00, #3d8ceb);
	}
	.shareBox{
		position: absolute;
		z-index: 2;
		top:50upx;
		right:50upx;
		bottom:50upx;
		left:50upx;
		background: #fff;
		border-radius: 6upx;
		overflow-y: auto;
		.box1{
			height: 150upx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding: 20upx;
		}
		.box2{
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
			padding:10upx 40upx;
			border-top: 1upx solid #ffce00;
			.type{
				display: inline-block;
				padding:2upx 18upx;
				border: 1upx solid #ffce00;
				background: #ffc300;
				color: #fff;
				font-size: 28upx;
				margin-right: 40upx;
				margin-top: 10upx;
			}
			.sjxs{
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				font-size: $fontsize-28;
			}
			.sj,.xs{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				height:64upx;
				input{
					width:100upx;
					border: 1upx solid #ddd;
					margin: 0 10upx;
					padding:0 10upx;
					text-align: center;
				}
			}
		}
		.box3{
			background: #fde987;
			background: rgba(2553,233,135,0.6);
			border: 1upx solid #ffc004;
			margin:20upx 20upx 200upx 20upx;
			padding:30upx;
			font-size: $fontsize-28;
			border-radius: 10upx;
			line-height: 40upx;
			word-wrap: break-word;			
		}
		
	}
	.box4{
		width:90%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		left:5%;
		bottom:100upx;
		z-index: 99;
		.shareAc{
			padding:0 30upx;
			height:100upx;
			line-height: 100upx;
			background: #3d8ceb;
			color: #fff;
			font-size: $fontsize-32;
			text-align: center;
			border-radius: 6upx;
		}
		.addTask{
			height:100upx;
			line-height: 100upx;
			
			.saveAction,.saveing{
				padding:0 30upx;
				height: 100upx;
				line-height: 100upx;
				background: #ffce00;
				color: #fff;
				font-size: $fontsize-32;
				text-align: center;
				border-radius: 6upx;
			}
			
		}
	}
	.usericon {
		width: 72upx;
		height: 72upx;
		float: left;
		padding:19upx 32upx 5upx 32upx;
	}
	.userHonor1{
		background: url("/static/hz_qingtong1.jpg") no-repeat;
		background-size: 134upx 96upx;
	}
	.userHonor2{
		background: url("/static/hz_baiyin2.jpg") no-repeat;
		background-size: 134upx 96upx;
	}
	.userHonor3{
		background: url("/static/hz_huangjin3.jpg") no-repeat;
		background-size: 134upx 96upx;
	}
	.userHonor4{
		background: url("/static/hz_bojin4.jpg") no-repeat;
		background-size: 134upx 96upx;
	}
	.userHonor5{
		background: url("/static/hz_zuanshi5.jpg") no-repeat;
		background-size: 134upx 96upx;
	}
	.userHonor6{
		background: url("/static/hz_xueshen6.jpg") no-repeat;
		background-size: 134upx 96upx;
	}
	.usericon image {
		width: 72upx;
		height: 72upx;
		border-radius: 168upx;
	}
	.shareU{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin-left: 20upx;
		height:110upx;
		.uInfo{
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			font-size: $fontsize-28;
		}
		.uTxt{
			font-size: 32upx;
			margin-top: 20upx;
			font-weight: bold;
		}
	}
</style>
