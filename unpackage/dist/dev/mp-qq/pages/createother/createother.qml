<view><mask vue-id="5845f20c-1" showmask="{{newtypeshow}}" data-event-opts="{{[['^onClose',[['closemask']]]]}}" bind:onClose="__e" bind:__l="__l" vue-slots="{{['default']}}"><view class="layerCon"><view class="title">新建类别</view><view class="con"><input type="text" placeholder="请输入类别名称" maxlength="20" data-event-opts="{{[['input',[['__set_model',['','typevalue','$event',[]]]]]]}}" value="{{typevalue}}" bindinput="__e"/></view><view data-event-opts="{{[['tap',[['ctype',['$event']]]]]}}" class="eventBtn" bindtap="__e">保存</view></view></mask><view class="typetip">请选择类别,长按类型标签出现删除按钮</view><view class="typeCon"><view class="typeWarp"><view class="typeBox cur">其他</view></view></view><view class="wordBox"><textarea value="{{zycon}}" placeholder="请输入任务内容" data-event-opts="{{[['input',[['__set_model',['','zycon','$event',[]]]]]]}}" bindinput="__e"></textarea></view><view class="selectTime"><image class="Imgicon" src="/static/time1.png" mode></image><view>请设置时长</view><input type="number" value="{{timelength}}" maxlength="3" data-event-opts="{{[['input',[['__set_model',['','timelength','$event',[]]]]]]}}" bindinput="__e"/><view>分钟<text class="muststyle">(必填)</text></view></view><view class="selectStar"><image class="Imgicon" src="/static/starother.png" mode></image><view>设置奖励星</view><input type="number" value="{{rewardstar}}" maxlength="6" data-event-opts="{{[['input',[['__set_model',['','rewardstar','$event',[]]]]]]}}" bindinput="__e"/><view>颗<text class="muststyle">(必填)</text></view></view><view class="zhiliangSwitch"><view>完成质量检查</view><view><switch color="#3c8ceb" checked="{{quality}}" data-event-opts="{{[['change',[['switch2Change',['$event']]]]]}}" bindchange="__e"></switch></view><view class="nomuststyle">(选填)</view></view><view class="saveBox"><view data-event-opts="{{[['tap',[['creatzyRequest',['$event']]]]]}}" class="saveBtn" bindtap="__e">保存</view></view></view>