<view><userinfo vue-id="0be16910-1" bind:__l="__l"></userinfo><view class="menuTabs"><view class="{{[menutab==1?'cur':'']}}" data-val="1" data-event-opts="{{[['tap',[['menutap',['$event']]]]]}}" bindtap="__e">任务完成情况</view><view class="{{[menutab==2?'cur':'']}}" data-val="2" data-event-opts="{{[['tap',[['menutap',['$event']]]]]}}" bindtap="__e">任务时间</view></view><view class="charTime"><block qq:if="{{menutab==1}}"><view class="qiun-columns"><view class="qiun-charts"><canvas class="charts" canvas-id="canvasColumn" id="canvasColumn" data-event-opts="{{[['touchstart',[['touchColumn',['$event']]]]]}}" bindtouchstart="__e"></canvas></view></view></block><block qq:if="{{menutab==2}}"><view class="timelist"><view class="qiun-charts"><canvas class="charts" canvas-id="canvasColumn1" id="canvasColumn1" data-event-opts="{{[['touchstart',[['touchColumn',['$event']]]]]}}" bindtouchstart="__e"></canvas></view></view></block></view><view class="scenelist"><view class="proItem" data-type="jl" data-event-opts="{{[['tap',[['gotoItem',['$event']]]]]}}" bindtap="__e"><view class="iconbg iconjl"><view class="iconjl1"><image src="/static/jl1.png" mode></image></view></view><view class="menuinfo"><view class="menutitle">星愿奖励</view><view class="menuword">给自己设置一个奖励，使用获得的奖励星来兑换自己心仪的奖励</view></view></view><view class="proItem" data-type="star" data-event-opts="{{[['tap',[['gotoItem',['$event']]]]]}}" bindtap="__e"><view class="iconbg iconstar"><view class="iconstar1"><image src="/static/star1.png" mode></image></view></view><view class="menuinfo"><view class="menutitle">星管理</view><view class="menuword">根据具体情况增加减少“星”的数量</view></view></view><view class="proItem" data-type="ph" data-event-opts="{{[['tap',[['gotoItem',['$event']]]]]}}" bindtap="__e"><view class="iconbg iconph"><view class="iconph1"><image src="/static/ph1.png" mode></image></view></view><view class="menuinfo"><view class="menutitle">排行榜</view><view class="menuword">不磨蹭拖拉，高效利用时间，自律排行榜</view></view></view><view class="proItem" data-type="cj" data-event-opts="{{[['tap',[['gotoItem',['$event']]]]]}}" bindtap="__e"><view class="iconbg iconcj"><view class="iconcj1"><image src="/static/cj1.png" mode></image></view></view><view class="menuinfo"><view class="menutitle">成就列表</view><view class="menuword">珍惜时间，提高效率，解锁成就！</view></view></view></view></view>