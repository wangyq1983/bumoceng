<template>
	<view class="rwItem">
		<view class="TitleBox">
			<view v-if="itemcon.state == 1" class="rwState ongoing"></view>
			<view v-if="itemcon.state == 3" class="rwState onend"></view>
			<view class="rwType">{{itemcon.typeName}}</view>
			<view class="rwTitle">
				<image src="/static/menustar.png" mode=""></image>
				<view class="">
					{{itemcon.starNumber}}
				</view>
				
			</view>
			<view class="rwHandle">⋮</view>
		</view>
		<view class="rwInfo" v-if="itemcon.jobDescription">{{itemcon.jobDescription}}</view>
		<view class="rwAction">
			<view v-if="itemcon.state == 1" class="rwBtn" @tap="beginTask" :data-time = "itemcon.duration"><view class="startBtn">开始任务</view></view>
			<view class="rwBtn" v-if="itemcon.state == 3">
				<view class="taskover">
					任务已完成
				</view>
				
			</view>
			
			<view class="timebox">
				<view class="rwTime">预计时间： <text>{{itemcon.duration}}分钟</text></view>
				<view v-if="itemcon.state == 3" class="rwTime">
					实际完成时间 <text>{{realtime}}</text>
				</view>
			</view>
			
		</view>
		<view class="rwOther" v-if="itemcon.completionSwitch">
			<view class="title">完成质量:</view>
			<radio-group @change="radioChange" class="radiogroup">
				<label v-for="(item, index) in items" :key="item.value">
					<radio color="#ffce00" :value="item.value" :checked="index === current" style="transform:scale(0.7)" />
					<view class="">
						{{item.name}}
					</view>
				</label>
			</radio-group>
			<view class="zhiliangBtn">
				确定
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			itemcon: {},
			items:[
				{
					value:120,
					name:'优'
				},
				{
					value:100,
					name:'良'
				},
				{
					value:80,
					name:'中'
				},
				{
					value:50,
					name:'差'
				},
			]
		};
	},
	props: {
		info: Object
	},
	created() {
		
		console.log('组件创建后，但还未挂载');
		this.itemcon = this.info;
		console.log(this.itemcon)
	},
	computed:{
		realtime(){
			return this.$api.secToTime(this.itemcon.realDuration)
		}
	},
	methods:{
		radioChange(evt) {
			console.log(evt.detail.value)
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.detail.value) {
					this.current = i;
					break;
				}
			}
		},
		beginTask(e){
			console.log(this)
			console.log(e.currentTarget.dataset.time)
			this.$emit("on-cdtime",e.currentTarget.dataset.time,this.itemcon.id); 
		}
	}
};
</script>

<style lang="scss">
.rwItem {
	@include warpwidth;
	@include warppadding;
	border-bottom: 10upx solid $color-bor;
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
.ongoing {
	background-image: url(/static/tanhao.png);
	background-size: 50upx 50upx;
}
.onend {
	background-image: url(/static/duihao.png);
	background-size: 50upx 50upx;
}
.onfail{
	
}
.rwType {
	padding: 10upx;
	color: $color-m;
	font-size: $fontsize-28;
}
.rwTitle {
	padding-left:30upx;
	font-size: $fontsize-24;
	color: $color-a5;
	@include rowflex;
	justify-content: flex-start;
	image{
		width:30upx;
		height:30upx;
		margin-right:10upx;
	}
}
.rwHandle {
	width: 40upx;
	height: 50upx;
	position: absolute;
	top: 0;
	right: 0;
}
.rwInfo {
	@include warpwidth;
	padding:15upx;
	box-sizing: border-box;
	background: $color-bor;
	color: $color-00;
	font-size: $fontsize-28;
}
.rwAction {
	@include warpwidth;
	height: 86upx;
	@include rowflex;
	justify-content: space-between;
	padding-top:16upx;
}
.rwBtn {
	font-size: $fontsize-30;
}
.startBtn {
	background: $color-m;
	padding: 10upx 20upx;
}
.taskover{
	background:  $color-36;
	color:$color-m;
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
	padding-top:10upx;
	.title{
		padding-right:28upx;
	}
	.item{
		
	}
}

.timebox{
	@include colflex;
	justify-content: flex-start;
	align-items: flex-start;
	view{
		padding:8upx 0;
	}
	text{
		font-weight: bold;
	}
}
.radiogroup{
	@include rowflex;
	justify-content: flex-start;
	label{
		@include rowflex;
		justify-content: flex-start;
		margin-right: 16upx;
	}
}
.zhiliangBtn{
	background: $color-m;
	color:$color-36;
	font-size: $fontsize-28;
	text-align: center;
	padding:8upx 26upx;
	margin-left:16upx
}
</style>
