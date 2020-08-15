<template>
	<view>
		<mask :showmask="creward" @on-close="closemask">
			<view class="crewardLayer">
				<textarea placeholder="请输入想要的星愿奖励" v-model="rewardcon"></textarea>
				<view class="starbox">
					<view class="">请设置需要</view>
					<image src="/static/menustar.png" class="simg" mode=""></image>
					<view class="">的数量</view>
					<view class=""><input type="number" value="" v-model="starcon" /></view>
					<view class="tipinfo">(请输入整数)</view>
				</view>
				<view class="eventBtn" @tap="createReward">保存</view>
			</view>
		</mask>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide">
			<!-- <view class="guideicon"></view> -->
			<view class="left">星愿奖励</view>
		</view>
		<view class="jllist">
			
			<uni-swipe-action>
				<uni-swipe-action-item :options="items.delarr" @click="bindClick" data-id="items.id" v-for="items in rewardList" :key="items.id">
					<view class="jlitem" data-id="items.id">
						<view class="xyicon"><image src="/static/xing.png" mode=""></image></view>
						<view class="xybox">
							<view class="xyname">{{ items.description }}</view>
							<view class="xystar">
								<view>需要</view>
								<view>{{ items.consumeCount }}</view>
								<image src="/static/menustar.png" mode=""></image>
							</view>
						</view>
						<view v-if="items.isExchange" class="shixian shixianend" @tap="exchangeBtn" :data-info="items">已实现</view>
						<view v-if="!items.isExchange" class="shixian isshixian" @tap="exchangeBtn" :data-info="items">实现</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<view v-if = "isEmpty == 1">
		    <nodata wordinfo = "还没有添加星愿奖励哦"></nodata>
		  </view>
		  <view v-if="isEnd == true">
		     <endLine></endLine>
		  </view>
		<view class="addxy" @tap="addReward">
			<view class="addxyBtn"></view>
			<view class="addxyBtn1"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataStep: 50,
			rewardList: [],
			creward: false,
			rewardcon: '',
			starcon: '',
			isEmpty: 0,
			isEnd: false
		};
	},
	onLoad() {
		this.init();
	},
	onReachBottom: async function(){
		console.log('onReachBottom');
		console.log(this.rewardList.length)
		let params = {
		      from: this.rewardList.length + 1,
		      count: this.dataStep
		    }
			
		    if (this.isEnd !== true) {
		      this.renderReward(this.rewardList.length + 1,this.dataStep)
		    }
	},
	methods: {
		async bindClick(e) {
			console.log(e.content.id);
			var params = {
				id:e.content.id
			}
			await this.$api.showLoading(); // 显示loading
			var rewardDelRes = await this.$api.postData(this.$api.webapi.rewardDelete, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if(this.$api.reshook(rewardDelRes, this.$mp.page.route)){
				if (rewardDelRes.resultCode == 0) {
					uni.showToast({
						title: '操作成功！',
						icon: 'none',
						duration: 1500
					});
					this.rewardList = [];
					this.init();
				}
			}
		},
		async exchangeBtn(e) {
			console.log(e.currentTarget.dataset.info.isExchange);
			var item = e.currentTarget.dataset.info;
			if (!e.currentTarget.dataset.info.isExchange) {
				var params = {
					id: item.id,
					consumeCount: item.consumeCount,
					description: item.description
				};

				await this.$api.showLoading(); // 显示loading
				var rewardOkRes = await this.$api.postData(this.$api.webapi.rewardOk, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (this.$api.reshook(rewardOkRes, this.$mp.page.route)) {
					if (rewardOkRes.resultCode == 0) {
						uni.showToast({
							title: '操作成功！',
							icon: 'none',
							duration: 1500
						});
						

						// 是否要更新用户信息相关星？
						await this.$api.starAdjust(-item.consumeCount,item.description);
						this.rewardList = [];
						this.init();
					}
				}
			}
		},
		async createReward() {
			var StarCount = Number(this.starcon);
			if (Number.isInteger(StarCount) && StarCount !== 0) {
				var params = {
					description: this.rewardcon,
					consumeCount: StarCount
				};
				await this.$api.showLoading(); // 显示loading
				var cRewardRes = await this.$api.postData(this.$api.webapi.creward, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (this.$api.reshook(cRewardRes, this.$mp.page.route)) {
					if (cRewardRes.resultCode == 0) {
						this.creward = false;
						uni.showToast({
							title: '操作成功！',
							icon: 'none',
							duration: 1500
						});
						this.rewardList = [];
						this.init();
					}
				}
			} else {
				uni.showToast({
					title: '星数量请输入整数',
					icon: 'none',
					duration: 1500
				});
			}
		},
		async renderReward(from,count){
			var params = {
					from,
					count
				};
				await this.$api.showLoading(); // 显示loading
				var rewardlist = await this.$api.getData(this.$api.webapi.rewardList, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (this.$api.reshook(rewardlist, this.$mp.page.route)) {
					if (rewardlist.resultCode == 0) {
						if (rewardlist.data.length == 0) {
							this.isEmpty = 1;
							this.isEnd = false;
							this.rewardList = rewardlist.data
						    } else {
						      this.isEmpty = 0;
						      this.isEnd = (rewardlist.data.length < this.dataStep) ? true : false;
							  console.log(this.rewardList)
							  
						      this.rewardList = (this.rewardList.length == 0) ? rewardlist.data : this.rewardList.concat(rewardlist.data)
						    }
						
						console.log(this.rewardList)
						
						var that = this;
						this.rewardList.forEach(function(item, index, arr) {
							var switchAc = {
								delarr: [
									{
										text: '删除',
										style: {
											backgroundColor: '#F00'
										},
										id: item.id
									}
								]
							};
							var newitem = Object.assign(item, switchAc);
						});
						console.log(this.rewardList);
					}
					
				}
			
		},
		async init() {
			this.renderReward(1,this.dataStep)
		},
		addReward() {
			this.creward = true;
		},
		closemask() {
			this.creward = false;
		}
	}
};
</script>

<style lang="scss">
.menuguide {
	@include userguide;
}
.jllist {
	// @include colflex;
	// width:750upx;
	// justify-content: flex-start;
}
.jlitem {
	@include warpwidth;
	@include warppadding;
	@include rowflex;
	justify-content: flex-start;
	@include borderbottom;
}
.xyicon {
	width: 80upx;
	height: 80upx;
	border-radius: 50upx;
	background: $color-m;
	@include rowflex;
	justify-content: center;
}
.xyicon image {
	width: 66upx;
	height: 66upx;
}
.xybox {
	width: 430upx;
	margin-left: 20upx;
}
.xyname {
	font-size: $fontsize-32;
	color: $color-a5;
	margin-bottom: 15upx;
}
.xystar {
	font-size: $fontsize-28;
	color: $color-a5;
	@include rowflex;
	justify-content: flex-start;
}
.xystar image {
	width: 28upx;
	height: 28upx;
	margin-left: 10upx;
}
.shixian {
	width: 150upx;
	height: 58upx;
	line-height: 58upx;
	text-align: center;
	font-size: $fontsize-30;
}
.isshixian {
	background: $color-m;
}
.shixianend {
	background-color: #bebebe;
}
.addxy {
	width: 120upx;
	height: 120upx;
	background: $color-m;
	border-radius: 100upx;
	position: fixed;
	bottom: 60upx;
	left: 315upx;
	z-index: 2;
}
.addxyBtn {
	width: 10upx;
	height: 80upx;
	background: #ffffff;
	position: absolute;
	top: 20upx;
	left: 55upx;
	z-index: 3;
}
.addxyBtn1 {
	width: 80upx;
	height: 10upx;
	background: #ffffff;
	position: absolute;
	left: 20upx;
	top: 55upx;
	z-index: 3;
}
.simg {
	width: 20upx;
	height: 20upx;
}
.crewardLayer {
	width: 660upx;
	height: 500upx;
	@include colflex;
	justify-content: center;
	font-size: $fontsize-28;
	background: #ffffff;
	textarea {
		width: 580upx;
		height: 160upx;
		border: 2upx solid $color-bb;
		padding: 10upx;
		font-size: $fontsize-28;
		margin-bottom: 10upx;
		color: $color-36;
	}
	textarea::-webkit-input-placeholder {
		color: $color-bb;
	}
	.starbox {
		width: 600upx;
		height: 60upx;
		@include rowflex;
		justify-content: flex-start;
		margin: 20upx 0 50upx;
		image {
			width: 30upx;
			height: 30upx;
			margin: 0 20upx;
		}
		input {
			width: 120upx;
			border: 2upx solid $color-m;
			margin-left: 20upx;
		}
	}
}
.tipinfo {
	color: $color-bb;
	padding-left: 10upx;
}
</style>
