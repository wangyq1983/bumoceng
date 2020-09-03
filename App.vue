<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show');
			uni.setKeepScreenOn({
			  keepScreenOn: true
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	
</style>
