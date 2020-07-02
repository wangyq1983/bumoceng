import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		loginProvider: "",
		userInfo: {},
		avatar:"",
		nickname:"",
		token:"",
		userid:"",
		level:1,
		openid: null,
		testvuex: false,
		colorIndex: 0,
		colorList: ['#FF0000', '#00FF00', '#0000FF']
	},
	mutations: {
		login(state, res) {
			state.hasLogin = true;
			state.userInfo = res;
			state.avatar = res.weiChatAuthUser.avatarUrl;
			state.nickname = res.weiChatAuthUser.nickName;
			state.token = res.token;
			// 仅做测试
			state.level = 1;
			
			var storgeName = ['avatarUrl','nickName','token','isLogin', 'userId'];
			var storgeVal = [res.weiChatAuthUser.avatarUrl, res.weiChatAuthUser.nickName, res.token, true,res.userId];
			for (var i = 0; i < storgeName.length; i++) {
				uni.setStorage({
					key: storgeName[i],
					data: storgeVal[i]
				})
			}
			console.log('store state')
			console.log(state.userInfo)
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		addLevel(state,num){
			state.level = state.level + num
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setTestTrue(state) {
			state.testvuex = true
		},
		setTestFalse(state) {
			state.testvuex = false
		},
		setColorIndex(state, index) {
			state.colorIndex = index
		}
	},
	getters: {
		currentColor(state) {
			return state.colorList[state.colorIndex]
		}
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function() { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store