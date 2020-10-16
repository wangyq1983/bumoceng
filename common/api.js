import store from '@/store'
// 正式服务器
var webhost = "https://task.vsclouds.com/";

// 开发服务器
// var webhost = "http://192.168.3.9:8080/";

// 开发服务器
//var webhost = "https://jielongtest.vsclouds.com/8080/polly/";

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

	// 任务开始动作
	TaskStart: webhost + 'job/start',

	// 任务结束动作
	TaskEnd: webhost + 'job/end',
	
	// 排行榜
	ranklist:webhost + 'rank/list',
	
	// 微信登陆
	// #ifdef MP-WEIXIN
	uniLogin: webhost + "public/weixin/mp/common/user/login/wx",
	// #endif
	
	// qq登录
	// #ifdef MP-QQ
	uniLogin:webhost + "public/qq/mp/common/user/login",
	// #endif
	
	
	// 游客登录
	visitLogin: webhost + "public/weixin/mp/common/tourist/login/wx",
	
	// #ifdef MP-WEIXIN 
	// 获取用户信息
	userInfo: webhost + "weixin/mp/common/user/info",
	//userInfo: webhost + "common/c/user/info",
	// #endif
	
	// #ifdef APP-PLUS || H5
	userInfo: webhost + "common/c/user/info",
	// #endif
	
	// #ifdef MP-QQ
	// 获取QQ用户信息
	userInfo:webhost + "qq/mp/common/user/info",
	// #endif
		
	// 修改用户昵称
	editName: webhost + "common/c/user/update",
	
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
	
	// 公告
	notice: webhost + 'announcement/current',
	 
	// 签到查询
	signget: webhost + 'sign/get',
	
	// 签到清空
	signclear: webhost + 'sign/clear',
	
	// 清空用户信息
	userclear: webhost + 'user/experience/clear',
	
	// 成就列表
	cjList:webhost + 'achievement/user/list',
	
	// 成就请求
	cjRequest:webhost + 'achievement/user/check',
	
	// 获取验证码
	getVerCode: webhost + 'public/common/user/code',
	
	// 手机号登录
	phoneLogin: webhost + 'public/weixin/mp/common/user/login/phone'
	
	
}

// 成就图标
var honorTitle = ['胜','三','十','百','千','初','传','应','秒','稳','坚','恒','精'];

const honorCorres = (honor) => {
	var honorList = [
		{
			title:"旗开得胜",
			icon:"胜"
		},
		{
			title:"三阳开泰",
			icon:"三"
		},
		{
			title:"十全十美",
			icon:"十"
		},
		{
			title:"百尺竿头",
			icon:"百"
		},
		{
			title:"千锤百炼",
			icon:"千"
		},
		{
			title:"初出茅庐",
			icon:"初"
		},
		{
			title:"十口相传",
			icon:"传"
		},
		{
			title:"一呼百应",
			icon:"应"
		},
		{
			title:"争分夺秒",
			icon:"秒"
		},
		{
			title:"高枕无忧",
			icon:"稳"
		},
		{
			title:"坚持不懈",
			icon:"坚"
		},
		{
			title:"持之以恒",
			icon:"恒"
		},
		{
			title:"精益求精",
			icon:"精"
		}
	]
	var curicon = "";
	honorList.forEach(function(item,index,arr){
		if(honor == item.title){
			curicon = item.icon
		}
	})
	return curicon
}

// 经验值设置
var expval = {
	ctask:10,
	endtask:30,
	signin:10,
	share:50
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
	qt:"青铜学渣",
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


// 字符型的true false转换布尔型
const strbool = (str) =>{
  if(str == 'true'){
    return true
  }
  if (str == 'false') {
    return false
  }
  if (str == 'undefined') {
    return true
  }
}

// 星变化返回true or false
const startPd = (num) =>{
	
	if(num == null){
		return false;
	}else{
		return true
	}
}

// 获取用户信息
const getUserinfo = async() => {
	// 获取用户信息
	var userRes = await getData(webapi.userInfo);

	// console.log('token is');
	// console.log(uni.getStorageSync("token"))
	// console.log('userinfo is')
	// console.log(userRes)
	if (reshook(userRes)) {
		
		// userRes字段  currentExperience  、  totalExperienceForCurrentLevel
		var expProgress = parseInt((userRes.data.userLevelInfo.currentExperience / userRes.data.userLevelInfo.totalExperienceForCurrentLevel)*100); 
		// console.log('====================================================================================================================================')
		// console.log('currentExperience');
		// console.log(userRes.data.userLevelInfo.currentExperience);
		// console.log('totalExperienceForCurrentLevel');
		// console.log(userRes.data.userLevelInfo.totalExperienceForCurrentLevel);
		// console.log('exp Progress is = ');
		// console.log(expProgress)
		// console.log('获取状态开始--------------------------------------------------------------------------------')
		// console.log(store.state)
		// console.log('获取状态结束--------------------------------------------------------------------------------')
		
		if(uni.getStorageSync('level')){
			if(userRes.data.userLevelInfo.level == uni.getStorageSync('level')){
				store.commit('levelUpdata', false)
			}else{
				store.commit('levelUpdata', true)
			}
		}
		
		if(uni.getStorageSync('honor')){
			if(expTitle(userRes.data.userLevelInfo.level) == uni.getStorageSync('honor')){
				store.commit('honorUpdata', false)
			}else{
				store.commit('honorUpdata', true)
			}
		}
		
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
			data: userRes.data.starSummary.currentCount
		});
		store.commit('changeStar', userRes.data.starSummary.currentCount)
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
const addExp = async(exp,nogetuser)=>{
	let params = {
		experience:exp
	}
	var expRes = await postData(webapi.exp,params);
	if(reshook(expRes)){
		if(expRes.resultCode == 0){
			console.log(expRes);
			if(nogetuser){
				
			}else{
				getUserinfo()
			}
			// 
		}
		
	}
}

// 成就变化检查
const cjCheck = async(cjinfo) => {
	// 请求参数示例
	// {
	//     "jobInfoId":12,
	//     "thresholdTypeList": [
	//         "job",
	//         "completionTimeToEnd"
	//     ]
	// }
	var checkCj = await postData(webapi.cjRequest,cjinfo);
	if(reshook(checkCj)){
		console.log('成就返回结果')
		console.log(checkCj);
		if(checkCj.resultCode == 0){
			return checkCj;
		}
	}
}

// 星变化接口
const starAdjust = async(star,reason,nogetuser) =>{
	let params = {
		adjustCount:star,
		reason:reason
	}
	var starRes = await postData(webapi.star,params);
	if(reshook(starRes)){
		if(starRes.resultCode == 0){
			console.log(starRes);
			if(nogetuser){
				
			}else{
				getUserinfo()
			}
		}
		
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
	if (code == 0 ) {
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
		if(res.resultCode == 87014 || res.resultCode == 7001){
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
 * 年月日时分秒 转化为 时分秒
 */
const timeSwitch = (time) =>{
	if(time !== 1){
		var timestr = new Array();
		var timestr = time.split(" ");
		return timestr[1]
	}
}

/**
 * 年月日时分秒时间转换为时间戳
 */
const switchTimestamp = (time) => {
	return new Date(time).getTime()
}

/**
 * 返回剩余任务时间进入计时画面 
 * duration 需要的时长
 * beginTime 开始时间
 */
const surplusTime = (duration,beginTime) => {
	if(beginTime !== 1){
		console.log('开始时间戳')
		var beginStamp = switchTimestamp(beginTime); // 开始时间戳
		console.log(beginStamp);
		
		console.log('当前时间戳')
		var nowStamp = new Date().getTime(); // 当前时间戳
		console.log(nowStamp);
		var surplusSec = (duration*60) - parseInt((nowStamp - beginStamp)/1000)
		// console.log('预算时间'+duration*60);
		// console.log('使用时间'+parseInt((nowStamp - beginStamp)/1000));
		// console.log('surplusSec is ---' + surplusSec);
		return surplusSec
	}
}


/**
 * 判断后台执行的任务是否已经超时
 */


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
	getWeekDay,
	expTitle,
	honorTitle,
	cjCheck,
	strbool,
	honorCorres,
	timeSwitch,
	surplusTime,
	startPd
}
