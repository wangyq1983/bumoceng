<template>
	<view>
		<mask :showmask = 'cdtime' @on-close = "closemask">
			<successdata :cjList = 'cjList' v-if="taskSuccess"></successdata>
		</mask>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide"><view class="left">总排行</view></view>
		<view class="phlist">
			<view class="phitem" v-for="(items, index) in phlist" :key = "items.avatarUrl">
				<view class="phbox">
					<view class="phNum">{{ index + 1 }}</view>
					<image :src="items.avatarUrl" mode=""></image>
					<view class="phinfo">
						<view class="phname">{{ items.nickName }}</view>
						<view class="phdj">
							<view class="phlevel">Lv{{ items.userLevelInfo.level }}</view>
							<view class="ph_hon">
								{{items.honor}}
							</view>
						</view>
						
					</view>
				</view>
				<view class="timebox">{{ items.realDurationSumZh }}</view>
			</view>
		</view>
		<view class="curUser">
			<view class="phbox">
				<view class="ph1">
					<image :src="curIcon" mode=""></image>
					<view class="phcon">
						<view class="curph">
							<view class="">
								{{curNickname}}
							</view>
						</view>
						<view class="curpm">
							<view class="" style="margin-right: 50upx;">
								lv{{curLevel}}
							</view>
							<view class="">
								{{curhonor}}
							</view>
						</view>
					</view>
				</view>
				
				
			</view>
			<view class="phright">
				<view class="" style="margin-right: 25upx;">
					<view class="phshare" v-if="curData.ranking > 0">
						<view>
							排名 {{curData.ranking}} 
						</view>
						<button class="shareBtn" open-type="share">
							<image src="/static/sharImg2.png" mode=""></image>
							<view class="">
								分享
							</view>
							
						</button>
					</view>
					<view class="" v-else>
						暂无排名
					</view>
				</view>
				<view class="timebox" style="color:#ffce00">
					{{curData.realDurationSumZh}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataStep: 100,
			phlist: [],
			phlistWeek: [],
			curIcon: uni.getStorageSync('avatarUrl'),
			curNickname:uni.getStorageSync('nickName'),
			curLevel:uni.getStorageSync('level'),
			curhonor:uni.getStorageSync('honor'),
			curData:'',
			taskSuccess:false,
			cdtime:false,
			cjList:[]
		};
	},
	onLoad() {
		this.init();
	},
	onShareAppMessage:async function(){
		console.log('分享');
		console.log(this.curData)
		var rankingNum = (this.curData.ranking > 0)?'我在作业效率榜中排名第'+this.curData.ranking:'作业不磨蹭'
		var jielongImg = '/static/phshare.jpg';
		var jielongpath = '/pages/ph/ph';
		let cjparams = {
			jobInfoId:0,
			thresholdTypeList:["share"]
		}
		var cjResult = await this.$api.cjCheck(cjparams);
		this.renderCjlist(cjResult);
		return {
		  title: rankingNum,
		  path: '/pages/ph/ph',
		  imageUrl: jielongImg,
		  success: (res) => {
			console.log("转发成功", res);
			console.log(uni);
			
			uni.showToast({
				title:'转发成功',
				icon:'none',
				duration:1500
			})
		  },
		  fail: (res) => {
			}
		}
	},
	methods: {
		renderCjlist:function(res){
			console.log(res)
			this.cjList = [];
			if(res.data.length > 0){
				this.taskSuccess = true;
				this.cdtime = true;
				this.cjList = res.data;
			}
		},
		// 关闭计时弹层
		closemask:function(){
			// console.log(this);
			this.cdtime = false;
			this.taskSuccess = false;
			
		},
		async init() {
			//  rankType
			//  summaryRank 总排行
			//  weekRank  周排行
			var that = this;
			var params = {
				from: 1,
				count: this.dataStep,
				rankType: 'summaryRank'
			};
			await this.$api.showLoading(); // 显示loading
			var ranklist = await this.$api.getData(this.$api.webapi.ranklist, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (this.$api.reshook(ranklist, this.$mp.page.route)) {
				console.log(ranklist);
				
				ranklist.data.rankList.forEach(function(item,index,arr){
					console.log(item)
					var arr = []
					var honor = {
						honor:that.$api.expTitle(item.userLevelInfo.level)
					}
					var newInfo = Object.assign(item,honor);
					console.log(newInfo)
					console.log(index)
					console.log(arr)
					arr.push(newInfo)
					
				})
				console.log(ranklist.data)
				this.phlist = ranklist.data.rankList;
				this.curData = ranklist.data.userRankInfo;
			}
		}
	}
};
</script>

<style lang="scss">
.menuguide {
	@include userguide;
	justify-content: space-between;
}
.phlist {
	@include colflex;
	justify-content: flex-start;
	align-items: flex-start;
	padding-bottom: 130upx;
}
.phitem {
	@include rowflex;
	justify-content: space-between;
	padding: 20upx 0;
	border-bottom: 5upx solid $color-bor;
	width:750upx;
}
.phbox {
	@include rowflex;
	justify-content: space-between;
}
.phitem image {
	width: 72upx;
	height: 72upx;
	border-radius: 50upx;
	margin: 0 20upx;
	border: 6upx solid #fff;
	box-shadow: 0upx 0upx 6upx #999;
}
.phNum {
	width: 64upx;
	text-align: center;
	font-weight: bold;
	color: #363636;
}
.ph_hon{
	font-size: 28upx;
	// background: #ffce00;
	color: #363636;
}
.phinfo {
	@include colflex;
	justify-content: flex-start;
	align-items: flex-start;
	.phname{
		margin-bottom: 6upx;
		font-size: 28upx;
	}
	.phlevel {
		background: $color-36;
		color: $color-m;
		font-size: $fontsize-22;
		margin-right: 20upx;
		padding: 0 10upx;
		border-radius: 6upx;
	}
	.phdj{
		@include rowflex;
		justify-content: flex-start;
	}
}
.timebox {
	font-size: $fontsize-28;
	color: $color-36;
	padding-left: 50upx;
	background: url('/static/shijian.png') no-repeat;
	background-size: 40upx 40upx;
	margin-right: 30upx;
}
.curUser{
	width:750upx;
	height:128upx;
	position: fixed;
	left:0;
	bottom:0;
	z-index: 9;
	background: $color-36;
	color:$color-m;
	@include rowflex;
	justify-content: space-between;
	
	image{
		width: 72upx;
		height: 72upx;
		border-radius: 50upx;
		margin: 0 20upx;
		border: 6upx solid #fff;
		box-shadow: 0upx 0upx 6upx #999;
	}
	// background-image: linear-gradient(#3c8ceb,#5ebbf8) ;
	.phcon{
		@include colflex;
		justify-content: flex-start;
		align-items: flex-start;
		.curph{
			@include rowflex;
			justify-content: flex-start;
			color:#fff;
			view{
				margin-right:20upx;
			}
		}
		.curpm{
			color:$color-m;
			@include rowflex;
			justify-content: flex-start;
			font-size: $fontsize-28;
		}
	}
	.ph1{
		@include rowflex;
		justify-content: flex-start;
	}
}
.phright{
	text-align: right;
}
.phshare{
	@include rowflex;
	justify-content: center;
}
.shareBtn{
	// background: $color-m;
	color: $color-m;
	@include rowflex;
	justify-content: center;
	margin-left: 20upx;
	padding: 0 15upx;
	border-radius: 6upx;
	height: 40upx;
	line-height: 40upx;
	font-size: $fontsize-28;
	border: 2upx solid $color-m;
	image{
		width:24upx;
		height: 24upx;
		border: none;
		border-radius:0;
		margin: 0 16upx 0 0;
		box-shadow:none
	}
}
button{
	background: linear-gradient(to top,#363636,#666666);
}
</style>
