<template>
	<view class="shareWarp">
		<mask :showmask="cdtime" @on-close="closemask">
			<successdata
				:cjList="cjList"
				v-if="taskSuccess"
			></successdata>
		</mask>
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
						<view class="">{{ name }}</view>
						<view class="qingtong1" @tap="gotoHonor">{{ honor1 }}</view>
					</view>
					<view class="uTxt">分享的作业</view>
				</view>
			</view>
			<view class="box2">
				<view class="type">{{ typeName }}</view>
				<view class="sjxs">
					<view class="sj">
						<view class="leftbox">预计时间:</view>

						<view class="">{{ duration }}分钟</view>
					</view>
					<view class="xs">
						<view class="leftbox">奖励星数:</view>

						<view class="">{{ starNumber }}颗</view>
					</view>
					<view class="xs" v-if="taskState == 3">
						<view class="leftbox">实际时间:</view>
						<view class="">{{ realDuration }}</view>
					</view>
				</view>
			</view>
			<view class="box3">{{ jobDescription }}</view>
		</view>
		<view class="box4">
			<button class="shareAc" open-type="share"><view class="">分享一下</view></button>

			<!-- <view class="saveBox" v-if="clickable"><view class="saveBtn" @tap="creatzyRequest">{{btnWord}}</view></view>
			<view class="saveBox" v-if="(clickable == false)"><view class="saveBtn">保存中</view></view> -->

			<view class="addTask">
				<view class="saveAction" v-if="clickable" @tap="addTask">加入任务</view>
				<view class="saveing" v-if="clickable == false">加入中</view>
			</view>

			<!-- v-if="!(userid == shareUserId)" -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			flag: 1,
			completionSwitch: false,
			honorqt: this.$api.honor.qt,
			honorby: this.$api.honor.by,
			honorhj: this.$api.honor.hj,
			honorbj: this.$api.honor.bj,
			honorzs: this.$api.honor.zs,
			honorxs: this.$api.honor.xs,
			clickable: true,
			userid: '',
			jobIds: '', // 任务id
			shareUserId: '', // 分享用户
			honor1: '', // 称号
			jobDescription: '', // 作业内容
			duration: 0, // 计划时间
			realDuration: 0, // 完成时间
			starNumber: 0, //奖励星
			typeName: '', // 类别
			avatar: '', // 头像
			name: '', // 昵称
			level: 0, // 等级
			createTime: '', //创建时间
			taskState: 1,
			routePath: '',
			currentPage: '',
			cjList:[],
			taskSuccess:false,
			cdtime:false
		};
	},
	onLoad(options) {
		var pages = getCurrentPages(); //获取加载的页面
		var currentPage = pages[pages.length - 1]; //获取当前页面的对象
		var url = currentPage.route; //当前页面url
		var options = currentPage.options; //获取url中所带的参数 //拼接url的参数
		var currentPage = url + '?';
		for (var key in options) {
			var value = options[key];
			currentPage += key + '=' + value + '&';
		}
		currentPage = currentPage.substring(0, currentPage.length - 1);
		console.log('currentPage is ===');
		console.log(currentPage);
		this.currentPage = currentPage;
		console.log(options);
		console.log('route is');
		this.jobIds = options.jobIds;
		this.shareUserId = options.shareUserId;
		this.routePath = this.$mp.page.route + '?jobIds=' + encodeURIComponent(options.jobIds) + '&shareUserId=' + encodeURIComponent(options.shareUserId);
		this.userid = uni.getStorageSync('userId');
		console.log(this.routePath);
		this.init();
	},
	onShareTimeline: async function() {
		// console.log('分享到朋友圈');
		return {
			title: '作业不磨蹭'
		};
	},

	onShareAppMessage: async function() {
		//console.log('分享');
		// var jielongImg = '/static/shareImg1.jpg';
		//var jielongpath = '/pages/rwlist/rwlist';
		var alltitle = this.name + '分享了' + this.typeName + '作业';
		var sharePath = '/' + this.currentPage;
		let cjparams = {
			jobInfoId: 0,
			thresholdTypeList: ['share']
		};
		var cjResult = await this.$api.cjCheck(cjparams);
		this.renderCjlist(cjResult);
		return {
			title: alltitle,
			path: sharePath
			// imageUrl: jielongImg,

			//query:'jobIds=' + encodeURIComponent(this.jobIds) + '&shareUserId=' + encodeURIComponent(this.shareUserId)
		};
	},
	methods: {
		closemask: function() {
			this.taskSuccess = false;
			this.cdtime = false;
		},
		shareAction() {
			var _this = this;
			uni.showActionSheet({
				itemList: ['分享微信好友', '分享到朋友圈'],
				success(res) {
					//console.log(res.tapIndex);
					if (res.tapIndex == 0) {
						_this.onShareAppMessage();
					}
					if (res.tapIndex == 1) {
						_this.onShareTimeline();
					}
				},
				fail(res) {
					console.log(res.errMsg);
				}
			});
		},
		renderCjlist: function(res) {
			//console.log(res);
			this.cjList = [];
			if (res.data.length > 0) {
				this.taskSuccess = true;
				this.cdtime = true;
				this.cjList = res.data;
			}
		},
		async init() {
			var params = {
				jobIds: Number(this.jobIds),
				shareUserId: Number(this.shareUserId)
			};
			await this.$api.showLoading(); // 显示loading
			var shareTask = await this.$api.getData(this.$api.webapi.shareTask, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			console.log(shareTask);

			if (shareTask.resultCode == 0) {
				if (shareTask.data.jobInfoList.length == 0) {
					uni.showModal({
						title: '此分享的作业任务已被删除',
						content: '此分享的作业任务已被删除',
						success: res => {
							if (res.confirm) {
								resolve();
							} else {
								reject();
							}
						}
					});
				} else {
					var shareData = shareTask.data.jobInfoList[0];
					this.createTime = shareData.createDate;
					this.duration = shareData.duration;
					this.jobDescription = shareData.jobDescription;
					this.realDuration = this.$api.secToTime(shareData.realDuration);
					this.starNumber = shareData.starNumber;
					this.typeName = shareData.typeName;
					this.taskState = shareData.state;
					this.flag = shareData.flag;
					this.completionSwitch = shareData.completionSwitch;
					this.avatar = shareTask.data.userBaseInfo.avatar;
					this.name = shareTask.data.userBaseInfo.name;
					this.level = shareTask.data.userLevelInfo.level;
					this.honor1 = this.$api.expTitle(shareTask.data.userLevelInfo.level);
				}
			}
		},
		async addTask() {
			console.log('addTask is click');
			this.clickable = false;
			var params = {
				flag: this.flag,
				typeName: this.typeName,
				jobDescription: this.jobDescription,
				duration: parseInt(this.duration),
				starNumber: parseInt(this.starNumber),
				completionSwitch: this.completionSwitch
			};

			await this.$api.showLoading(); // 显示loading
			var ctask = await this.$api.postData(this.$api.webapi.cTask, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (this.$api.reshook(ctask, this.routePath)) {
				if (ctask.resultCode == 0) {
					uni.showToast({
						title: '任务添加成功！',
						icon: 'none',
						duration: 1500
					});
					setTimeout(function() {
						this.clickable = true;
						uni.reLaunch({
							url: '/pages/rwlist/rwlist'
						});
					}, 1550);
				}
			}
		}
	}
};
</script>

<style lang="scss">
button {
	display: flex;
	margin: 0;
}
.shareWarp {
	position: absolute;
	z-index: 1;
	top: 0upx;
	right: 0upx;
	bottom: 0upx;
	left: 0upx;
	background-image: linear-gradient(#ffce00, #3d8ceb);
}
.shareBox {
	position: absolute;
	z-index: 2;
	top: 50upx;
	right: 50upx;
	bottom: 50upx;
	left: 50upx;
	background: #fff;
	border-radius: 6upx;
	overflow-y: auto;
	.box1 {
		height: 150upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 20upx;
	}
	.box2 {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 10upx 40upx;
		border-top: 1upx solid #ffce00;
		.type {
			display: inline-block;
			padding: 2upx 18upx;
			border: 1upx solid #ffce00;
			background: #ffc300;
			color: #fff;
			font-size: 28upx;
			margin-right: 40upx;
			margin-top: 10upx;
		}
		.sjxs {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			font-size: $fontsize-28;
		}
		.sj,
		.xs {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			height: 64upx;
			.leftbox {
				margin-right: 20upx;
			}
			input {
				width: 100upx;
				border: 1upx solid #ddd;
				margin: 0 10upx;
				padding: 0 10upx;
				text-align: center;
			}
		}
	}
	.box3 {
		background: #fde987;
		background: rgba(2553, 233, 135, 0.6);
		border: 1upx solid #ffc004;
		margin: 20upx 20upx 200upx 20upx;
		padding: 30upx;
		font-size: $fontsize-28;
		border-radius: 10upx;
		line-height: 40upx;
		word-wrap: break-word;
	}
}
.box4 {
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	position: absolute;
	left: 5%;
	bottom: 100upx;
	z-index: 99;
	.shareAc {
		padding: 0 30upx;
		height: 100upx;
		line-height: 100upx;
		background: #3d8ceb;
		color: #fff;
		font-size: $fontsize-32;
		text-align: center;
		border-radius: 6upx;
	}
	.addTask {
		.saveAction,
		.saveing {
			padding: 0 30upx;
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
	padding: 19upx 32upx 5upx 32upx;
}
.userHonor1 {
	background: url('/static/hz_qingtong1.jpg') no-repeat;
	background-size: 134upx 96upx;
}
.userHonor2 {
	background: url('/static/hz_baiyin2.jpg') no-repeat;
	background-size: 134upx 96upx;
}
.userHonor3 {
	background: url('/static/hz_huangjin3.jpg') no-repeat;
	background-size: 134upx 96upx;
}
.userHonor4 {
	background: url('/static/hz_bojin4.jpg') no-repeat;
	background-size: 134upx 96upx;
}
.userHonor5 {
	background: url('/static/hz_zuanshi5.jpg') no-repeat;
	background-size: 134upx 96upx;
}
.userHonor6 {
	background: url('/static/hz_xueshen6.jpg') no-repeat;
	background-size: 134upx 96upx;
}
.usericon image {
	width: 72upx;
	height: 72upx;
	border-radius: 168upx;
}
.shareU {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin-left: 20upx;
	height: 110upx;
	.uInfo {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: $fontsize-28;
	}
	.uTxt {
		font-size: 32upx;
		margin-top: 20upx;
		font-weight: bold;
	}
}
</style>
