<template>
	<view>
		<view>store:  level is {{storelevel}}; exp is {{storel}} * 150</view>
		<view>storage:level is {{storagelevel}}; exp is {{storagel}} * 150</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storelevel:0,
				storagelevel:0
			}
		},
		methods: {
			
		},
		computed:{
			storel(){
				return this.storelevel*150
			},
			storagel(){
				return this.storagelevel*150
			}
		},
		onLoad() {
			this.storelevel = this.$store.state.level;
			this.storagelevel = uni.getStorageSync("level")
		}
	}
</script>

<style lang="scss">

</style>
