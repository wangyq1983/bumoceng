import store from '@/store'

// 正式服务器
//var webhost = "https://task.vsclouds.com/";

// 开发服务器
var webhost = "http://jielongtest.vsclouds.com/8080/polly/";

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
	userInfo: webhost + "weixin/mp/common/user/info"
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
	
	if (reshook(userRes)) {
		console.log('userinfo is')
		console.log(userRes)
		// userRes字段  currentExperience  、  totalExperienceForCurrentLevel
		uni.setStorage({
			key: 'level',
			data: userRes.data.userLevelInfo.level
		});
	}
}

// loading加载提示
const showLoading = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...',
			mask: true,
			success(res) {
				console.log('显示loading')
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
		console.log('隐藏loading')
		resolve()
	})
}

const checkCode = (code) => {
	console.log(code);
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
	reshook,
	showLoading,
	hideLoading,
	formatTime,
	getUserinfo,
	trim
}
