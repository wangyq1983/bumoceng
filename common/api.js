import store from '@/store'
// 正式服务器
//var webhost = "https://task.vsclouds.com/";

// 开发服务器
var webhost = "https://jielongtest.vsclouds.com/8080/polly/";

// 接口列表
var webapi = {
	// 任务类别创建
	cTaskType: webhost + 'type/create',

	// 任务类别删除
	dTaskType: webhost + 'type/delete',

	// 查询任务类别列表
	rTaskType: webhost + 'type/list',

	// 创建任务
	cTask: webhost + 'job/create',

	// 修改任务
	uTask: webhost + 'job/update',

	// 删除任务
	dTask: webhost + 'job/delete',

	// 任务列表
	TaskList: webhost + 'job/list',

	// 任务结束动作
	TaskEnd: webhost + 'job/end',
	
	// 排行榜
	ranklist:webhost + 'rank/list',

	// 微信登陆
	uniLogin: webhost + "public/weixin/mp/common/user/login/wx",
	
	// 获取用户信息
	userInfo: webhost + "weixin/mp/common/user/info",
	
	// 经验接口
	exp: webhost + "user/experience/cumulative",
	
	// 星接口  星数调整
	star: webhost + "star/adjust/create",
	
	// 星调整历史
	starhistory: webhost + 'star/adjust/history',
	
	// 创建奖励
	creward: webhost + 'star/exchange/create',
	
	// 奖励修改
	ureward: webhost + 'star/exchange/update',
	
	// 兑换记录查询
	rewardList: webhost + 'star/exchange/list',
	
	// 奖励兑换
	rewardOk: webhost + 'star/exchange/exchange',
	
	// 删除兑换记录
	rewardDelete:webhost + 'star/exchange/delete',
	
	// 统计图表chart
	charts: webhost + 'job/uchart',
	
	// 签到
	signin:webhost + 'sign/in',
	 
	// 签到查询
	signget: webhost + 'sign/get',
	
	// 签到清空
	signclear: webhost + 'sign/clear'
}

// 经验值设置
var expval = {
	ctask:10,
	endtask:30,
	signin:10,
	share:50,
}

// 获得周几
const getWeekDay = () =>{
	var myDate = new Date();
	var days = myDate.getDay();
	if(days == 0){
		return 7
	}else{
		return days
	}
}
const honor = {
	qt:"青铜学生",
	by:"白银学民",
	hj:"黄金学霸",
	bj:"铂金学帝",
	zs:"钻石学仙",
	xs:"学神"
}
// 经验值对应称号
const expTitle = (level) => {
	if(level >= 1 && level <= 2){
		return honor.qt
	}
	if(level >= 3 && level <= 4){
		return honor.by
	}
	if(level >= 5 && level <= 6){
		return honor.hj
	}
	if(level >= 7 && level <= 8){
		return honor.bj
	}
	if(level >= 9 && level <= 10){
		return honor.zs
	}
	if(level >10){
		return honor.xs
	}
}

// request get 请求
const getData = (url, param) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: 'GET',
			data: param,
			timeout: 12000,
			header: {
				"content-type": "application/json",
				token: uni.getStorageSync("token")
			},
			success(res) {
				console.log(res);
				if (res.statusCode == 200 || res.statusCode == 401) {
					resolve(res.data);
				} else {
					if (res.statusCode == 404) {
						uni.showToast({
							title: '访问资源错误',
							icon: 'none',
							duration: 1000
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						})
					}
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/rwlist/rwlist',
						})
					}, 1000)
				}
			},
			fail(err) {
				console.log(err);
				reject(err)
			}
		})
	})
}

// request post 请求
const postData = (url, param) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: 'POST',
			data: param,
			timeout: 12000,
			header: {
				// 'content-type': 'application/x-www-form-urlencoded' // 默认值
				"content-type": "application/json",
				token: uni.getStorageSync("token")
			},
			success(res) {
				console.log(res)
				resolve(res.data);
			},
			fail(err) {
				console.log(err);

				reject(err)
			}
		})
	})
}

// 获取用户信息
const getUserinfo = async() => {
	// 获取用户信息
	var userRes = await getData(webapi.userInfo);
	console.log('token is');
	console.log(uni.getStorageSync("token"))
	console.log('userinfo is')
	console.log(userRes)
	if (reshook(userRes)) {
		
		// userRes字段  currentExperience  、  totalExperienceForCurrentLevel
		var expProgress = parseInt((userRes.data.userLevelInfo.currentExperience / userRes.data.userLevelInfo.totalExperienceForCurrentLevel)*100); 
		console.log('====================================================================================================================================')
		console.log('currentExperience');
		console.log(userRes.data.userLevelInfo.currentExperience);
		console.log('totalExperienceForCurrentLevel');
		console.log(userRes.data.userLevelInfo.totalExperienceForCurrentLevel);
		console.log('exp Progress is = ');
		console.log(expProgress)
		
		uni.setStorage({
			key: 'level',
			data: userRes.data.userLevelInfo.level
		});
		store.commit('changeLevel', userRes.data.userLevelInfo.level)
		
		uni.setStorage({
			key: 'honor',
			data:expTitle(userRes.data.userLevelInfo.level)
		})
		store.commit('changeHonor', expTitle(userRes.data.userLevelInfo.level))
		
		uni.setStorage({
			key: 'progress',
			data: expProgress
		})
		store.commit('changeProgress', expProgress)
		
		uni.setStorage({
			key: 'starNum',
			data: userRes.data.starSummary.totalCount
		});
		store.commit('changeStar', userRes.data.starSummary.totalCount)
		
		return true
	}else{
		
		uni.showModal({
		  title: '用户信息获取失败',
		  content: uni.getStorageSync('token')?uni.getStorageSync('token'):'no token',
		  success (res) {
		    if (res.confirm) {
				console.log(userRes)
		      console.log('用户点击确定')
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
		// uni.showToast({
		// 	title:'用户信息获取失败',
		// 	icon:'none',
		// 	duration:1500
		// })
		return false
	}
}

// 经验变化接口
const addExp = async(exp)=>{
	let params = {
		experience:exp
	}
	var expRes = await postData(webapi.exp,params);
	if(reshook(expRes)){
		console.log(expRes);
		getUserinfo()
	}
}

// 星变化接口
const starAdjust = async(star,reason) =>{
	let params = {
		adjustCount:star,
		reason:reason
	}
	var starRes = await postData(webapi.star,params);
	if(reshook(starRes)){
		console.log(starRes);
		getUserinfo()
	}
}

// loading加载提示
const showLoading = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...',
			mask: true,
			success(res) {
				// console.log('显示loading')
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

// 关闭loading
const hideLoading = () => {
	return new Promise((resolve) => {
		uni.hideLoading()
		// console.log('隐藏loading')
		resolve()
	})
}

const checkCode = (code) => {
	// console.log(code);
	if (code == 0) {
		return true;
	} else {
		return false
	}
}

function trim(str){ //删除左右两端的空格
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
　　 }

const reshook = (res, path) => {
	if (checkCode(res.resultCode)) {
		return true
	} else {
		if(res.resultCode == 4001) {
			var data = {
				url: path
			}
			var origin = encodeData(data);
			console.log('/pages/login/login?' + origin)
			uni.redirectTo({
				url: '/pages/login/login?' + origin
			})
		}
		if(res.resultCode == 87014){
		    uni.showToast({
		      title: res.message,
		      icon:"none",
		      duration:1500
		    })
		  }
	}
	console.log('reshook')
	console.log(res)
	console.log(path)
	console.log(this)
}

const encodeData = (datadetail) => {
	var dataparams = Object.keys(datadetail).map(function(key) {
		return encodeURIComponent(key) + "=" + encodeURIComponent(datadetail[key]);
	}).join("&");
	return dataparams
}

// 秒数转正常时间显示 x小时x分钟x秒

const secToTime = (sec) =>{
	if(sec > 3600){
		let hour = parseInt(sec/3600);
		let minu = parseInt((sec-(hour*3600))/60);
		let second = sec- hour*3600 - minu*60;
		return hour+'小时'+minu+'分钟'+second+'秒'
	}else{
		let minu = parseInt(sec/60);
		let second = sec- minu*60;
		return ((minu == 0)?'':minu+'分钟')+second+'秒'
	}
}


/** 
 * new Date() ---> 转化为 年 月 日 时 分 秒
 * let date = new Date();
 * date: 传入参数日期 Date
*/
// 时间

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatTime = (date) => {	
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-') 
}

export default {
	encodeData,
	getData,
	postData,
	webapi,
	honor,
	reshook,
	showLoading,
	hideLoading,
	formatTime,
	getUserinfo,
	trim,
	secToTime,
	addExp,
	starAdjust,
	expval,
	getWeekDay
}
