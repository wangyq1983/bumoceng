
<template>
	<view>
		<mask :showmask = 'newtypeshow' @on-close = "closemask">
			<view class="layerCon">
				<view class="title">
					新建类别
				</view>
				<view class="con">
					<input type="text" placeholder="请输入类别名称" v-model="typevalue" maxlength="20"  />
				</view>
				<view class="eventBtn" @tap="ctype">
					保存
				</view>
			</view>
		</mask>
		<view class="typetip">请选择类别,长按类型标签出现删除按钮</view>
		<view class="typeCon">
			<view class="typeWarp">
				<view class = "typeBox cur" >
					其他
				</view>
			</view>
		</view>
		
		<view class="wordBox"><textarea value="" placeholder="请输入任务内容" v-model="zycon" /></view>
		<view class="selectTime">
			<image src="/static/time1.png" mode="" class="Imgicon"></image>
			<view class="">请设置时长</view>
			<input type="text" value="" v-model="timelength" maxlength="3" />
			<view class="">分钟<text class="muststyle">(必填)</text></view>
		</view>
		<view class="selectStar">
			<image src="/static/starother.png" mode="" class="Imgicon"></image>
			<view class="">设置奖励星</view>
			<input type="text" value="" v-model="rewardstar" maxlength="12" />
			<view class="">颗<text class="muststyle">(必填)</text></view>
		</view>
		<view class="zhiliangSwitch">
			<view class="">
				完成质量检查
			</view>
			<view class="">
				<switch color="#3c8ceb" @change="switch2Change" />
			</view>
			<view class="nomuststyle">
				(选填)
			</view>
		</view>
		<view class="saveBox"><view class="saveBtn" @tap="creatzyRequest">保存</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			defaluttype:[],
			deftype:[],
			curtype:'其他',
			curdel:'', 
			zycon:'',
			timelength:'',
			rewardstar:'',
			quality:false,
			newtypeshow:false,
			typevalue:'',
			isdel:false
		};
	},
	onShow() {
		this.typelist()
	},
	methods: {
		// 参数校验
		paramsVer:function(params){
			console.log('ver');
			console.log(params);
			if(params.typeName == ''){
				uni.showToast({
					title:'请选择类别,类别不可为空!',
					icon:'none',
					duration:1500
				})
				return false
			}
			if(Number.isInteger(params.duration) == false || params.duration == 0){
				uni.showToast({
					title:'时长请填写整数',
					icon:'none',
					duration:1500
				})
				return false
			}
			if(Number.isInteger(params.starNumber) == false || params.starNumber == 0){
				uni.showToast({
					title:'奖励星请填写整数',
					icon:'none',
					duration:1500
				})
				return false
			}
			return true;
		},
		// 类型删除事件
		deltype:async function(e){
			console.log('deltype');
			console.log(e.currentTarget.dataset.id);
			if(e.currentTarget.dataset.id == undefined){
				uni.showToast({
					title:'初始类别不可删除',
					icon:'none',
					duration:1500
				})
				return false;
			}
			var params = {
				id:e.currentTarget.dataset.id
			}
			await this.$api.showLoading(); // 显示loading
			var typedel = await this.$api.postData(this.$api.webapi.dTaskType, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			console.log(typedel)
			if (this.$api.reshook(typedel, this.$mp.page.route)) {
				if(typedel.resultCode == 0){
					let delId = typedel.data.id;
					
					this.defaluttype.forEach(function(item, index, arr) {
						if(item.id == delId) {
							arr.splice(index, 1);
							//this.defaulttype = arr
						}
					});

				}
			}
		},
		// 显示类别删除
		showdel:function(e){
			//var cur = e.currentTarget.dataset.value;
			console.log('showdel')
			if(e.currentTarget.dataset.id){
				console.log(e)
				this.curdel = e.currentTarget.dataset.id; 
			}else{
				uni.showToast({
					title:'默认类别不能删除哦',
					icon:'none',
					duration:1500
				})
			}
		}, 
		// 查询类别
		typelist:async function(){
			var params = {
				flag:2
			} 
			await this.$api.showLoading(); // 显示loading
			var typelist = await this.$api.getData(this.$api.webapi.rTaskType, params);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			console.log(typelist)
			if (this.$api.reshook(typelist, this.$mp.page.route)) {
				//this.createSuccess(ctask);
				console.log('typelist')
				console.log(typelist.data)
				
				var deftype = [
					// {	
					// 	typeName:'语文'
					// },
					// {
					// 	typeName:'数学'
					// },
					// {
					// 	typeName:'英语'
					// }
				]
				// console.log(deftype.concat(typelist.data))
				this.defaluttype = deftype.concat(typelist.data)
			}
		},
		// 创建类别
		ctype:async function(){
			var params = {
				flag:2,
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
						_this.defaluttype.unshift(ctype.data)
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
			
			let verparam = {
				typeName:this.curtype,
				duration:Number(this.timelength),
				starNumber:Number(this.rewardstar),
			}
			if(this.paramsVer(verparam)){
				console.log('params is ok')
				var params = {
					flag:2,
					typeName:this.curtype,
					jobDescription:this.zycon,
					duration:parseInt(this.timelength),
					starNumber:parseInt(this.rewardstar),
					completionSwitch:this.quality
				}

				await this.$api.showLoading(); // 显示loading
				var ctask = await this.$api.postData(this.$api.webapi.cTask, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading

				if (this.$api.reshook(ctask, this.$mp.page.route)) {
					
					this.createSuccess(ctask); 
				}
			}
			
		},
		createSuccess(res){
			console.log(res);
			if(res.resultCode == 0){
				uni.showToast({
					title:"任务创建成功！",
					icon:'none',
					duration:1500
				});
			}
			
			setTimeout(function(){
				uni.reLaunch({
					url:'/pages/rwlist/rwlist'
				})
			},1550)
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
	font-size: $fontsize-28;
	color: $color-bb;
	text-align: center;
}
.typeCon {
	@include rowflex;
	flex-wrap: wrap;
	border-bottom: 10upx solid $color-bor;
}
.typeWarp{
	@include rowflex;
	justify-content: flex-start;
	margin: 15upx 20upx;
}
.typeBox {
	padding: 5upx 20upx;
	font-size: $fontsize-28;
	color: $color-36;
	background: #ffffff;
	border: 1upx solid $color-u-jl;
	
	@include rowflex;
	justify-content: flex-start;
}
.typeBox.cur {
	background: $color-u-jl;
	color: #ffffff;
}
.wordBox {
	@include warpwidth;
	@include warppadding;
	@include borderbottom;
}
.wordBox textarea {
	@include warpwidth;
	border: 2upx solid $color-u-jl;
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
	border: 2upx solid $color-u-jl;
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
			border: 2upx solid $color-u-jl;
			padding:10upx;
		}
	}
	.eventBtn{
		width: 300upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		background: $color-u-jl;
		color: #fff;
		font-size: $fontsize-32;
	}
}
.zhilianginfo{
	margin:10upx 30upx;
	font-size: $fontsize-28;
	background: $color-f7;
	color: $color-a5;
	padding:20upx;
	line-height: 48upx;
}
.saveBox {
	@include warpwidth;
	@include warppadding;
	@include rowflex;
	justify-content: center;
}
.saveBtn {
	width: 200upx;
	height:80upx;
	line-height: 80upx;
	text-align: center;
	background: $color-otherbg;
	color: #fff;
}
</style>
