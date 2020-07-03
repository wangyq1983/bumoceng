<template>
	<view class="maskbg" v-if="showmask">
		<view class="maskBox">
			<view class="maskCon"><slot></slot></view>
			<view class="maskClose" @tap="closeEvent">×</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			showmask:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			};
		},
		
		methods:{
			closeEvent(){
				console.log(this)
				this.$emit("on-close"); 
			}
		}
	}
</script>

<style lang="scss"></style>
