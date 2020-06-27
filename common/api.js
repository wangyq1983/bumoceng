var webhost = "http://192.168.3.9:8080/";
// var webhost = "https://develop.vsclouds.com/jielong/";

var webapi = {
	// 任务类别创建
	cTaskType = webhost + 'type/create',
	
	// 任务类别删除
	dTaskType = webhost + 'type/delete',
	
	// 查询任务类别列表
	rTaskType = webhost + 'type/list',
	
	// 创建任务
	cTask = webhost + 'job/create',
	
	// 修改任务
	uTask = webhost + 'job/update',
	
	// 删除任务
	dTask = webhost + 'job/delete',
	
	// 任务列表
	TaskList = webhost + 'job/list',
	
	// 任务结束动作
	TaskEnd = webhost + 'job/end',
	
	// 微信登陆
	  wxLogin: webhost + "public/weixin/mp/common/user/login/wx"
}

