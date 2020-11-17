<script>
	export default {
		
		onLaunch: function() {
			console.log('App Launch')
			if (wx.cloud) {
			      wx.cloud.init({
					env: "pre-le9xo", 
			        traceUser: true
			      });
			    } else {
			      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
			    }
		},
		onShow: function(options) {
			console.log('App Show');
			uni.setKeepScreenOn({
			  keepScreenOn: true
			});
			console.log(options)
			console.log('onshow is end');
			// if(this.$api.TempData.taskid){
			// 	uni.reLaunch({
			// 		url:'/pages/rwlist/rwlist?taskid='+this.$api.TempData.taskid
			// 	})
			// }
		},
		onHide: function() {
			this.$api.TempData.getSec = false;
			// console.log('App Hide');
			// this.$api.TempData.smzq = [];
			// this.$api.TempData.zxlc = [];
			// if(this.$api.TempData.taskid){
				
				// uni.reLaunch({
				// 	url:'/pages/rwlist/rwlist'
				// })
			// }
			
			if(this.$api.TempData.taskid){
				uni.reLaunch({
					url:'/pages/rwlist/rwlist?taskid='+this.$api.TempData.taskid
				})
			}

		}
	}
</script>

<style>
	
</style>
