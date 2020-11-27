<template>
	<view class="successLayer" :style="successHeight">
		<view class="gongxi">恭 喜</view>
		<image class="slayImg" src="/static/bgtop.png" mode=""></image>
		<view class="slayCon">
			<view class="con">
				<view class="item" v-if="levelchange">
					<view class="lvBg">
						<view class="" style="color:#000; font-size: 78upx; font-weight: bold;">{{level}}</view>
						<view class="" style="color: #666; font-size: 30upx;">恭喜升级</view>
					</view>
				</view>
				<view class="item" v-if="honorchange">
					<view class="">获得称号：</view>
					<view class="honor">{{honor}}</view>
				</view>
				<view class="item" v-if="starNum">
					<view class="">获得:</view>
					<image src="/static/menustar.png" mode=""></image>
					<view class="" style="font-weight: bold;">{{ starNum}}</view>
				</view>
				<view class="item" v-if="expType>0">
					获得经验 : <text style="font-weight: bold;">{{ expType }}</text>
				</view>
				<view class="item" style="flex-direction: column;" v-if="cjList.length > 0">
					<view class="">获得以下成就：</view>
					<view class="cjlist">
						<view class="cjitem" v-for="items in honorList" :key="items.title">
							<view class="icon">{{ items.icon }}</view>
							<view class="title">{{ items.title }}</view>
						</view>
					</view>
				</view>
				<view class="" style="clear:both"></view>
			</view>
			<view class="" style="clear:both"></view>
		</view>
		<view class="" style="clear:both"></view>
	</view>
</template>

<script>
export default {
	props: {
		starNum: {
			type: Number
		},
		expType: {
			type: Number
		},
		cjList: {
			type: Array
		},
		level: {
			type: Number
		},
		honor: {
			type: String
		},
		levelchange: {
			type: Boolean
		},
		honorchange: {
			type: Boolean
		},
		jingyan:{
			type: Boolean,
			default:true
		}
	},
	data() {
		return {
			starNum1: 0,
			expType1: 0,
			successHeight:"height:0",
			honorList: [
				
			],
			level1:0,
			honor1:"",
			levelchange1:false,
			honorchange1:false
		};
	},
	created() {
		var that = this;
		this.cjList.forEach(function(item,index,arr){
			var cjicon = {
				icon:that.$api.honorCorres(item.title)
			}
			console.log(cjicon)
			Object.assign(item,cjicon)
		})
		console.log('this.cjlist')
		console.log(this.cjList)
		this.honorList = this.cjList;
	},
	beforeDestroy(){
		this.cjList = []
	},
	mounted() {
		this.createHeight()
	},
	watch:{
		$props:{
		handler:function(){
			this.createHeight()
		},
		deep:true
		}
	},
	methods: {
		createHeight(){
			var that = this;
			// 动态获取高度
			
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.slayCon')
				.boundingClientRect(data => {
					console.log('动态获取');
					console.log(data);
					that.successHeight = 'height:'+data.height + 'px'
				})
				.exec();
		}
	}
};
</script>

<style></style>
