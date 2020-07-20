<template>
	<view>
		{{formatTime}}
	</view>
</template>

<script>
 
	/* 
		时间日期 格式转换 自定义类型：
		type 1 输出 日期 7-18  输入 20200718
		type 2 输出 时间 10:22:23 输入 2020-07-18 21:57:19
	 */

	export default {
		data() {
			return {
				formatTime:''
			};
		},
		props: {
			timedate: String,
			type:Number
		},
		created(){
			if(this.type == 1){
				this.formatTime = this.toDate(this.timedate)
			}
			if(this.type == 2){
				this.formatTime = this.toTime(this.timedate)
			}
		},
		methods:{
			// 返回日期格式 type 1 输出 日期 7-18  输入 20200718
			toDate(t){
				var t1 = t.slice(4,8);
				var t2 = t1.slice(0,2);
				var t3 = t1.slice(2,4);
				return (t2+'-'+t3)
			},
			// 返回时间格式 type 2 输出 时间 10:22:23 输入 2020-07-18 21:57:19
			toTime(t){
				var arr1 = t.split(" ");
				console.log(arr1[1]);
				console.log(typeof arr1[1])
				return arr1[1]
			}
		}
	}
</script>

<style>

</style>
