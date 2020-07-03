<template>
	<view>
		<mask :showmask = 'newtypeshow' @on-close = "closemask">
			<view class="layerCon">
				<view class="title">
					新建类别
				</view>
				<view class="con">
					<input type="text" placeholder="请输入类别名称" v-model="typevalue" />
				</view>
				<view class="eventBtn" @tap="ctype">
					保存
				</view>
			</view>
		</mask>
		<view class="typetip">请选择类别,长按类型标签出现删除按钮</view>
		<view class="typeCon">
			<view :class = "(curtype == items.typeName)?'typeBox cur':'typeBox'"  v-for="items in defaluttype" :key='items.typeName' @tap="typeselect" :data-value = "items.typeName">
				{{items.typeName}}
			</view>
			<view class="typeBox noedit" @tap = "newtype">
				+新建类别
			</view>
		</view>
		<view class="wordBox"><textarea value="" placeholder="请输入作业内容" v-model="zycon" /></view>
		<view class="selectTime">
			<image src="/static/shijian.png" mode="" class="Imgicon"></image>
			<view class="">请设置时长</view>
			<input type="text" value="" v-model="timelength" />
			<view class="">分钟</view>
		</view>
		<view class="selectStar">
			<image src="/static/star.png" mode="" class="Imgicon"></image>
			<view class="">设置奖励星</view>
			<input type="text" value="" v-model="rewardstar" />
			<view class="">颗</view>
		</view>
		<view class="zhiliangSwitch">
			<view class="">
				完成质量检查
			</view>
			<view class="">
				<switch color="#FFCE00" :checked="quality" @change="switch2Change" />
			</view>
		</view>
		<view class="saveBox"><view class="saveBtn" @tap="creatzyRequest">保存</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			defaluttype:['语文','数学','英语'],
			curtype:'',
			zycon:'',
			timelength:'',
			rewardstar:'',
			quality:false,
			newtypeshow:false,
			typevalue:''
		};
	},
	onShow() {
		this.typelist()
	},
	methods: {
		// 查询类别
		typelist:async function(){
			var params = {
				flag:1
			}
			await this.$api.showLoading(); // 显示loading
			var typelist = await this.$api.getData(this.$api.webapi.rTaskType, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			console.log(typelist)
			if (this.$api.reshook(typelist, this.$mp.page.route)) {
				//this.createSuccess(ctask);
				console.log('typelist')
				console.log(typelist.data)
				this.defaluttype = typelist.data
			}
		},
		// 创建类别
		ctype:async function(){
			var params = {
				flag:1,
				typeName:this.typevalue
			}
			await this.$api.showLoading(); // 显示loading
			var ctype = await this.$api.postData(this.$api.webapi.cTaskType, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if (this.$api.reshook(ctype, this.$mp.page.route)) {
				console.log('ctype')
				console.log(ctype)
				let _this = this;
				if(ctype.resultCode == 0){
					uni.showToast({
						title:'类别新建成功',
						icon:'none',
						duration:1500
					})
					setTimeout(function(){
						_this.closemask();
					},1500)
					
				}
			}
		},
		closemask:function(){
			this.newtypeshow = false
		},
		//打开创建类别弹层
		newtype:function(){
			console.log('newtype is tap');
			this.newtypeshow = true
		},
		creatzyRequest:async function(){
			var params = {
				flag:1,
				typeName:this.curtype,
				jobDescription:this.zycon,
				duration:parseInt(this.timelength),
				starNumber:parseInt(this.rewardstar),
				completionSwitch:this.quality
			}
			console.log(params);
			await this.$api.showLoading(); // 显示loading
			var ctask = await this.$api.postData(this.$api.webapi.cTask, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			console.log(ctask)
			if (this.$api.reshook(ctask, this.$mp.page.route)) {
				this.createSuccess(ctask);
			}
		},
		createSuccess(res){
			console.log(res)
			uni.showToast({
				title:"任务创建成功！",
				icon:'none',
				duration:2000
			});
			setTimeout(function(){
				uni.reLaunch({
					url:'/pages/rwlist/rwlist'
				})
			},2000)
		},
		typeselect:function(e){
			console.log(e.currentTarget.dataset.value)
			this.curtype = e.currentTarget.dataset.value
		},
		switch1Change: function (e) {
			console.log('switch1 发生 change 事件，携带值为', e.detail.value)
			this.quality = e.detail.value
		},
		switch2Change: function (e) {
			console.log('switch2 发生 change 事件，携带值为', e.detail.value)
			this.quality = e.detail.value
		}
	}
};
</script>

<style lang="scss">
.typetip {
	@include warpwidth;
	@include warppadding;
	font-size: $fontsize-22;
	color: $color-bb;
	text-align: center;
}
.typeCon {
	@include rowflex;
	flex-wrap: wrap;
	border-bottom: 10upx solid $color-bor;
}
.typeBox {
	padding: 5upx 20upx;
	font-size: $fontsize-28;
	color: $color-36;
	background: #ffffff;
	border: 1upx solid $color-mbg;
	margin: 15upx 20upx;
}
.typeBox.cur {
	background: $color-mbg;
	color: #ffffff;
}
.wordBox {
	@include warpwidth;
	@include warppadding;
	@include borderbottom;
}
.wordBox textarea {
	@include warpwidth;
	border: 2upx solid $color-m;
	box-sizing: border-box;
	padding: 20upx;
	height: 256upx;
	color: $color-36;
}
.selectTime,
.selectStar {
	@include warpwidth;
	@include warppadding;
	@include rowflex;
	@include borderbottom;
	font-size: $fontsize-32;
}
.selectTime view,
.selectStar view {
	padding: 0 15upx;
}
.selectTime input,
.selectStar input {
	width: 180upx;
	border: 2upx solid $color-m;
}
.selectStar {
}
.zhiliangSwitch {
	@include warpwidth;
	@include warppadding;
	@include rowflex;
	justify-content: flex-start;
	font-size: $fontsize-32;
}
.zhiliangSwitch view{
	padding: 0 10upx;
}
.Imgicon {
	width: 50upx;
	height: 50upx;
}
.layerCon{
	width:600upx;
	height:500upx;
	background: #fff;
	@include colflex;
	justify-content: center;
	.title{
		width: 600upx;
		height:60upx;
		line-height: 60upx;
		text-align: center;
		color:$color-36
	}
	.con{
		width:600upx;
		input{
			width:450upx;
			height:70upx;
			margin: 70upx;
			border: 2upx solid $color-m;
			padding:10upx;
		}
	}
	.eventBtn{
		width: 300upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		background: $color-m;
		color: $color-36;
		font-size: $fontsize-32;
	}
}
</style>
