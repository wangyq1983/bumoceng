<template>
	<view>
		<mask :showmask = 'creward' @on-close = "closemask">
			<view class="crewardLayer">
				<textarea placeholder = "请输入想要的星愿奖励" v-model="rewardcon"></textarea>
				<view class="starbox">
					<view class="">
						请设置需要
					</view>
					<image src="/static/menustar.png" class="simg" mode=""></image>
					<view class="">
						的数量
					</view>
					<view class="">
						<input type="text" value="" v-model="starcon" />
					</view>
					<view class="tipinfo">
						(请输入整数)
					</view>
				</view>
				<view class="eventBtn" @tap="createReward">
					保存
				</view>
			</view>
		</mask>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide">
			<view class="guideicon">
				
			</view>
			<view class="">
				星愿奖励
			</view>
			
		</view>
		<view class="jllist">
			
			
			<!-- <view class="jlitem">
				<view class="xyicon">
					<image src="/static/xing.png" mode=""></image>
				</view>
				<view class="xybox">
					<view class="xyname">
						常州恐龙园1日游
					</view>
					<view class="xystar">
						<view>需要</view>
						<view>15 </view>
						<image src="/static/menustar.png" mode=""></image> 
					</view>
				</view>
				<view class="shixian isshixian">
					实现
				</view>
			</view> -->
			<uni-swipe-action>
				<uni-swipe-action-item :options="options1" @click="bindClick">
					<view class="" style="width:650upx;height:200upx; background: #fff;">
						ABCDEFGHIJKLMNOPQRSTUVWXYZ
					</view>
				</uni-swipe-action-item>
				</uni-swipe-action>	
			<uni-swipe-action>
				<uni-swipe-action-item :options="options1" @click="bindClick">
					<view class="jlitem" >
							<view class="xyicon">
								<image src="/static/xing.png" mode=""></image>
							</view>
							<view class="xybox">
								<view class="xyname">
									asdadsSDFASFASAFD
								</view>
								<view class="xystar">
									<view>需要</view>
									<view>211 </view>
									<image src="/static/menustar.png" mode=""></image> 
								</view>
							</view>
							<view v-if="items.isExchange" class="shixian shixianend" @tap="exchangeBtn" :data-info = "items">
								已实现
							</view>
							<view  class="shixian isshixian" @tap="exchangeBtn" :data-info = "items">
								实现
							</view>
						</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
			
			<view class="jlitem" v-for="items in rewardList" :key = 'items.id'>
					<view class="xyicon">
						<image src="/static/xing.png" mode=""></image>
					</view>
					<view class="xybox">
						<view class="xyname">
							{{items.description}}
						</view>
						<view class="xystar">
							<view>需要</view>
							<view>{{items.consumeCount}} </view>
							<image src="/static/menustar.png" mode=""></image> 
						</view>
					</view>
					<view v-if="items.isExchange" class="shixian shixianend" @tap="exchangeBtn" :data-info = "items">
						已实现
					</view>
					<view v-if="!items.isExchange" class="shixian isshixian" @tap="exchangeBtn" :data-info = "items">
						实现
					</view>
				</view>
			</view>
		
		
		
		
		<view class="addxy" @tap="addReward">
			<view class="addxyBtn">
				
			</view>
			<view class="addxyBtn1">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataStep:50,
				rewardList:[],
				creward:false,
				rewardcon:'',
				starcon:'',
				options1: [{
					text: '删除',
					style:{
						backgroundColor:'#F00'
					}
				}]
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			bindClick(e){
				uni.showToast({
					title: `点击了${e.content.text}按钮`,
					icon: 'none'
				})
			},
			async exchangeBtn(e){
				console.log(e.currentTarget.dataset.info.isExchange)
				var item = e.currentTarget.dataset.info;
				if(!e.currentTarget.dataset.info.isExchange){
					var params = {
						id:item.id,
						consumeCount:item.consumeCount,
						description:item.description
					}
					
					await this.$api.showLoading(); // 显示loading
					var rewardOkRes = await this.$api.postData(this.$api.webapi.rewardOk, params);
					await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
					if (this.$api.reshook(rewardOkRes, this.$mp.page.route)) {
						if(rewardOkRes.resultCode == 0){
							uni.showToast({
								title:'操作成功！',
								icon:'none',
								duration:1500
							})
							this.init()
							
							// 是否要跟新用户信息相关星？
							
						}
					}
				}
			},
			async createReward(){
				var StarCount = Number(this.starcon);
				if(Number.isInteger(StarCount) && (StarCount !== 0)){
					var params = {
						description:this.rewardcon,
						consumeCount:StarCount
					}
					await this.$api.showLoading(); // 显示loading
					var cRewardRes = await this.$api.postData(this.$api.webapi.creward, params);
					await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
					if (this.$api.reshook(cRewardRes, this.$mp.page.route)) {
						if(cRewardRes.resultCode == 0){
							this.creward = false;
							uni.showToast({
								title:'操作成功！',
								icon:'none',
								duration:1500
							})
							this.init()
						}
					}
				}else{
					uni.showToast({
						title:'星数量请输入整数',
						icon:'none',
						duration:1500
					})
				}
			},
			async init(){
				var params = {
					from:1,
					count:this.dataStep
				}
				await this.$api.showLoading(); // 显示loading
				var rewardlist = await this.$api.getData(this.$api.webapi.rewardList, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (this.$api.reshook(rewardlist, this.$mp.page.route)) {
					if(rewardlist.resultCode == 0){
						this.rewardList = rewardlist.data
					}
					console.log(rewardlist)
				}
			},
			addReward(){
				this.creward = true;
			},
			closemask(){
				this.creward = false;
			}
		}
	}
</script>

<style lang="scss">
.menuguide{
	@include userguide;
}
.jllist{
	@include colflex;
	width:750upx;
	justify-content: flex-start;
}
.jlitem{
	@include warpwidth;
	@include warppadding;
	@include rowflex;
	justify-content: flex-start;
	@include borderbottom;
}
.xyicon{
	width:80upx;
	height: 80upx;
	border-radius: 50upx;
	background: $color-m;
	@include rowflex;
	justify-content: center;
}
.xyicon image{
	width:66upx;
	height:66upx;
}
.xybox{
	width: 430upx;
	margin-left: 20upx;
}
.xyname{
	font-size: $fontsize-32;
	color: $color-a5;
	margin-bottom:15upx
}
.xystar{
	font-size: $fontsize-28;
	color: $color-a5;
	@include rowflex;
	justify-content: flex-start;
}
.xystar image{
	width: 28upx;
	height:28upx;
	margin-left: 10upx;
}
.shixian{
	width: 150upx;
	height: 58upx;
	line-height: 58upx;
	text-align: center;
	font-size: $fontsize-30;
}
.isshixian{
	background: $color-m;
}
.shixianend{
	background-color: #bebebe;
}
.addxy{
	width: 120upx;
	height:120upx;
	background: $color-m;
	border-radius: 100upx;
	position: fixed;
	bottom:60upx;
	left:315upx;
	z-index: 2;
}
.addxyBtn{
	width:10upx;
	height:80upx;
	background:#ffffff;
	position:absolute;
	top:20upx;
	left:55upx;
	z-index: 3;
}
.addxyBtn1{
	width:80upx;
	height:10upx;
	background:#ffffff;
	position:absolute;
	left:20upx;
	top:55upx;
	z-index: 3;
}
.simg{
	width:20upx;
	height:20upx;
}
.crewardLayer{
	width:660upx;
	height:500upx;
	@include colflex;
	justify-content: center;
	font-size: $fontsize-28;
	background: #ffffff;
	textarea{
		width:580upx;
		height:160upx;
		border: 2upx solid $color-bb;
		padding:10upx;
		font-size: $fontsize-28;
		margin-bottom: 10upx;
		color: $color-36;
	}
	textarea::-webkit-input-placeholder {
		color:$color-bb
	}
	.starbox{
		width:600upx;
		height: 60upx;
		@include rowflex;
		justify-content: flex-start;
		margin:20upx 0 50upx;
		image{
			width:30upx;
			height:30upx;
			margin:0 20upx;
		}
		input{
			width:120upx;
			border: 2upx solid $color-m;
			margin-left:20upx;
		}
	}
}
.tipinfo{
	color: $color-bb;
	padding-left:10upx;
}



/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.cont {
		flex: 1;
		height: 45px;
		line-height: 45px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding: 10px 0;
		background-color: #fff;
	}

	.button {
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		padding: 4px 8px;
		border-radius: 4px;
	}

	.button-text {
		font-size: 15px;
	}
</style>
