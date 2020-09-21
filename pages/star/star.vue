<template>
	<view>
		<userinfo></userinfo>
		<view class="userbor"></view>
		<view class="menuguide">
			
			<view class="left">
				星管理
			</view>
			<view class="right" @tap="showhistory">
				查看历史记录
			</view>
		</view>
		<view class="starinfo">
			奖励追加、惩罚扣除、遗漏补星都在这里
		</view>
		<view class="starWarp">
			<view class="starAction">
				<view :class="(changeType == 'add')?'actionBtn current':'actionBtn'" data-val = "add" @tap="actionEvt">  
					+增加
				</view>
				<view :class="(changeType == 'reduce')?'actionBtn current':'actionBtn'" data-val = "reduce" @tap="actionEvt">
					-减少
				</view>
			</view>
			<view class="starChange">
				<view class="">
					请输入
				</view>
				<image src="/static/menustar.png" mode=""></image>
				<view class="">
					数量
				</view>
				<input type="number" v-model="inputstar" />
				<view class="info">
					请输入整数
				</view>
			</view>
			<view class="starliyou">
				<textarea placeholder="请输入理由(选填)" v-model="starliyou" maxlength="500" />
			</view>
			
		</view>
		<view class="saveBox" v-if="clickable"><view class="saveBtn" @tap="saveEvent">确定</view></view>
		<view class="saveBox" v-if="(clickable == false)"><view class="saveBtn">变更中</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				changeType:'add',
				inputstar:'',
				starliyou:'',
				clickable:true
			}
		},
		methods: {
			actionEvt:function(e){
				console.log(e.currentTarget.dataset.val);
				this.changeType = e.currentTarget.dataset.val;
			},
			showhistory:function(){
				uni.navigateTo({
					url:"/pages/starhistory/starhistory"
				})
			},
			saveEvent:async function(){
				var that = this;
				var StarCount = Number(this.inputstar);
				console.log(StarCount)
				if(Number.isInteger(StarCount) && (StarCount !== 0)){
					this.clickable = false;
					var starNum = (this.changeType == 'add')?StarCount:(-Math.abs(StarCount));
					var params = {
						adjustCount:starNum,
						reason:this.starliyou
					}
					await this.$api.showLoading(); // 显示loading
					// var starRes = await this.$api.starAdjust(starNum,this.starliyou);
					var starRes = await this.$api.postData(this.$api.webapi.star,params);
					await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
					if (this.$api.reshook(starRes, this.$mp.page.route)) {
						if(starRes.resultCode == 0){
							await this.$api.getUserinfo()
							uni.showToast({
								title:'操作成功！',
								icon:'none',
								duration:1500
							})
							
							setTimeout(function(){
								console.log('this.clickable is');
								that.clickable = true;
								console.log(this.clickable)
								uni.navigateTo({
									url:'/pages/starhistory/starhistory'
								})
							},1550)
						}
					}
				}else{
					uni.showToast({
						title:'星数量请输入整数',
						icon:'none',
						duration:1500
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">

.starWarp{
	@include warpwidth;
	@include warppadding;
}
.starAction{
	@include rowflex;
	justify-content: flex-start;
	padding:20upx 0;
}
.actionBtn{
	width: 100upx;
	height:50upx;
	line-height: 50upx;
	text-align: center;
	font-size: $fontsize-28;
	background: $color-f7;
	margin-right:20upx;
	padding:3upx 15upx;
}
.current{
	background: $color-m;
}
.starChange{
	@include rowflex;
	justify-content: flex-start;
	font-size: $fontsize-30;
	padding:20upx 0;
	.info{
		color: $color-bb;
		padding-left: 20upx;
	}
}
.starChange image{
	width: 26upx;
	height:26upx;
	margin:0 8upx;
}
.starChange input{
	border: 2upx solid $color-m;
	margin-left: 10upx;
	width:120upx;
}
.starliyou{
	
}
.starliyou textarea{
	width:660upx;
	padding:10upx;
	border: 2upx solid $color-m;
}

.starinfo{
	padding:6upx 20upx;
	font-size: $fontsize-32;
	color: #666;
}
</style>
