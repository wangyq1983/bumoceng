<view><userinfo vue-id="d7336e54-1" bind:__l="__l"></userinfo><view class="userbor"></view><view class="menuguide"><view class="left">查看历史记录</view></view><block qq:for="{{historyList}}" qq:for-item="items" qq:for-index="__i0__" qq:key="createDate"><view class="cu-timeline"><view class="cu-time"><time-format vue-id="{{'d7336e54-2-'+__i0__}}" timedate="{{items.createDate}}" type="{{1}}" bind:__l="__l"></time-format></view><block qq:for="{{items.starInfo}}" qq:for-item="item" qq:for-index="__i1__" qq:key="id"><view class="cu-item"><block qq:if="{{item.adjustCount>0}}"><view class="addicon">+</view></block><block qq:if="{{item.adjustCount<0}}"><view class="jianicon">-</view></block><view class="{{[item.adjustCount>0?'content addbg':'bg-blue content jianbg']}}"><view class="con1"><time-format vue-id="{{'d7336e54-3-'+__i0__+'-'+__i1__}}" timedate="{{item.updateDate}}" type="{{2}}" bind:__l="__l"></time-format><image src="/static/menustar.png" mode></image><block qq:if="{{item.adjustCount>0}}"><view>{{'+'+item.adjustCount+''}}</view></block><block qq:if="{{item.adjustCount<0}}"><view>{{''+item.adjustCount+''}}</view></block></view><view class="con2">{{''+item.reason+''}}</view></view></view></block></view></block><block qq:if="{{isEmpty==1}}"><view><nodata vue-id="d7336e54-4" wordinfo="没有星变更历史记录" type="1" bind:__l="__l"></nodata></view></block></view>