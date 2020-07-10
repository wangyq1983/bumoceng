<template>
	<view class="successLayer">
			<image class="slayImg" src="/static/successlayer.png" mode=""></image>
			<view class="slayCon">
				<view class="title">
					恭喜完成任务
				</view>
				<view class="con">
					<view class="item" v-if="starNum">
						<view class="">
							获得:
						</view>
						<image src="/static/menustar.png" mode=""></image>
						<view class="">
							{{starNum}}
						</view>
					</view>
					<view class="item" v-if="expType">
						获得经验 :  {{expType}}
					</view>
				</view>
			</view>
		</view>
	
</template>

<script>
	export default {
		props:{
			starNum:{
				type: Number,
				default: 0
			},
			expType:{
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
