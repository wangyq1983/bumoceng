(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/starhistory/starhistory"],{100:
/*!*************************************************************************************************************!*\
  !*** D:/g工作/zilv/code/defaultmoban/defaultmoban/pages/starhistory/starhistory.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************/
/*! no static exports found */function(n,t,e){"use strict";e.r(t);var r=e(/*! -!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./starhistory.vue?vue&type=script&lang=js& */101),o=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);t["default"]=o.a},101:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/g工作/zilv/code/defaultmoban/defaultmoban/pages/starhistory/starhistory.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(e(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */10));function o(n){return n&&n.__esModule?n:{default:n}}function u(n,t,e,r,o,u,i){try{var a=n[u](i),c=a.value}catch(s){return void e(s)}a.done?t(c):Promise.resolve(c).then(r,o)}function i(n){return function(){var t=this,e=arguments;return new Promise((function(r,o){var i=n.apply(t,e);function a(n){u(i,r,o,a,c,"next",n)}function c(n){u(i,r,o,a,c,"throw",n)}a(void 0)}))}}var a={data:function(){return{historyList:[],dataStep:50,isEmpty:0}},onLoad:function(){this.init()},computed:{},methods:{init:function(){var n=this;return i(r.default.mark((function t(){var e,o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e={from:1,count:n.dataStep},t.next=3,n.$api.showLoading();case 3:return t.next=5,n.$api.getData(n.$api.webapi.starhistory,e);case 5:if(o=t.sent,!n.$api.reshook(o,n.$mp.page.route)){t.next=10;break}return t.next=9,n.$api.hideLoading();case 9:o.data.length>0?(n.historyList=o.data,n.isEmpty=0):n.isEmpty=1;case 10:case"end":return t.stop()}}),t)})))()}}};t.default=a},102:
/*!**********************************************************************************************************************!*\
  !*** D:/g工作/zilv/code/defaultmoban/defaultmoban/pages/starhistory/starhistory.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************/
/*! no static exports found */function(n,t,e){"use strict";e.r(t);var r=e(/*! -!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./starhistory.vue?vue&type=style&index=0&lang=scss& */103),o=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);t["default"]=o.a},103:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/g工作/zilv/code/defaultmoban/defaultmoban/pages/starhistory/starhistory.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(n,t,e){},96:
/*!*******************************************************************************************************!*\
  !*** D:/g工作/zilv/code/defaultmoban/defaultmoban/main.js?{"page":"pages%2Fstarhistory%2Fstarhistory"} ***!
  \*******************************************************************************************************/
/*! no static exports found */function(n,t,e){"use strict";(function(n){e(/*! uni-pages */4);r(e(/*! vue */2));var t=r(e(/*! ./pages/starhistory/starhistory.vue */97));function r(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */1)["createPage"])},97:
/*!************************************************************************************!*\
  !*** D:/g工作/zilv/code/defaultmoban/defaultmoban/pages/starhistory/starhistory.vue ***!
  \************************************************************************************/
/*! no static exports found */function(n,t,e){"use strict";e.r(t);var r=e(/*! ./starhistory.vue?vue&type=template&id=d73346e8& */98),o=e(/*! ./starhistory.vue?vue&type=script&lang=js& */100);for(var u in o)"default"!==u&&function(n){e.d(t,n,(function(){return o[n]}))}(u);e(/*! ./starhistory.vue?vue&type=style&index=0&lang=scss& */102);var i,a=e(/*! ../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */8),c=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],i);c.options.__file="pages/starhistory/starhistory.vue",t["default"]=c.exports},98:
/*!*******************************************************************************************************************!*\
  !*** D:/g工作/zilv/code/defaultmoban/defaultmoban/pages/starhistory/starhistory.vue?vue&type=template&id=d73346e8& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(n,t,e){"use strict";e.r(t);var r=e(/*! -!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../download/t/HBuilderX.2.6.1.20200226.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./starhistory.vue?vue&type=template&id=d73346e8& */99);e.d(t,"render",(function(){return r["render"]})),e.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),e.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),e.d(t,"components",(function(){return r["components"]}))},99:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/g工作/zilv/code/defaultmoban/defaultmoban/pages/starhistory/starhistory.vue?vue&type=template&id=d73346e8& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(n,t,e){"use strict";e.r(t),e.d(t,"render",(function(){return o})),e.d(t,"staticRenderFns",(function(){return i})),e.d(t,"recyclableRender",(function(){return u})),e.d(t,"components",(function(){return r}));var r={userinfo:function(){return e.e(/*! import() | components/userinfo/userinfo */"components/userinfo/userinfo").then(e.bind(null,/*! @/components/userinfo/userinfo.vue */138))},timeFormat:function(){return e.e(/*! import() | components/timeFormat/timeFormat */"components/timeFormat/timeFormat").then(e.bind(null,/*! @/components/timeFormat/timeFormat.vue */188))},nodata:function(){return e.e(/*! import() | components/nodata/nodata */"components/nodata/nodata").then(e.bind(null,/*! @/components/nodata/nodata.vue */152))}},o=function(){var n=this,t=n.$createElement;n._self._c},u=!1,i=[];o._withStripped=!0}},[[96,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovZ+W3peS9nC96aWx2L2NvZGUvZGVmYXVsdG1vYmFuL2RlZmF1bHRtb2Jhbi9wYWdlcy9zdGFyaGlzdG9yeS9zdGFyaGlzdG9yeS52dWU/Y2Q4NCIsInVuaS1hcHA6Ly8vcGFnZXMvc3Rhcmhpc3Rvcnkvc3Rhcmhpc3RvcnkudnVlIiwid2VicGFjazovLy9EOi9n5bel5L2cL3ppbHYvY29kZS9kZWZhdWx0bW9iYW4vZGVmYXVsdG1vYmFuL3BhZ2VzL3N0YXJoaXN0b3J5L3N0YXJoaXN0b3J5LnZ1ZT81OTBmIiwidW5pLWFwcDovLy9tYWluLmpzIiwid2VicGFjazovLy9EOi9n5bel5L2cL3ppbHYvY29kZS9kZWZhdWx0bW9iYW4vZGVmYXVsdG1vYmFuL3BhZ2VzL3N0YXJoaXN0b3J5L3N0YXJoaXN0b3J5LnZ1ZT8yZDcyIiwid2VicGFjazovLy9EOi9n5bel5L2cL3ppbHYvY29kZS9kZWZhdWx0bW9iYW4vZGVmYXVsdG1vYmFuL3BhZ2VzL3N0YXJoaXN0b3J5L3N0YXJoaXN0b3J5LnZ1ZT9jODkzIiwid2VicGFjazovLy9EOi9n5bel5L2cL3ppbHYvY29kZS9kZWZhdWx0bW9iYW4vZGVmYXVsdG1vYmFuL3BhZ2VzL3N0YXJoaXN0b3J5L3N0YXJoaXN0b3J5LnZ1ZT9jMjk1Il0sIm5hbWVzIjpbImNyZWF0ZVBhZ2UiLCJQYWdlIiwicmVuZGVyanMiLCJjb21wb25lbnQiLCJvcHRpb25zIiwiX19maWxlIiwiY29tcG9uZW50cyIsInVzZXJpbmZvIiwidGltZUZvcm1hdCIsIm5vZGF0YSIsInJlbmRlciIsIl92bSIsInRoaXMiLCJfaCIsIiRjcmVhdGVFbGVtZW50IiwiX3NlbGYiLCJfYyIsInJlY3ljbGFibGVSZW5kZXIiLCJzdGF0aWNSZW5kZXJGbnMiLCJfd2l0aFN0cmlwcGVkIl0sIm1hcHBpbmdzIjoiOzs7OzJEQUFBLHk2QkFBazNCLGVBQUcsRzs7OztvbEJDcURyM0IsQ0FDQSxLQURBLFdBRUEsT0FDQSxlQUNBLFlBQ0EsWUFHQSxPQVJBLFdBU0EsYUFFQSxZQUdBLFNBQ0EsS0FEQSxXQUNBLHdJQUNBLEdBQ0EsT0FDQSxrQkFIQSxTQUtBLHFCQUxBLHVCQU1BLDRDQU5BLFVBTUEsRUFOQSxRQVFBLG1DQVJBLGlDQVNBLHFCQVRBLE9BVUEsaUJBQ0EscUJBQ0EsYUFFQSxZQWRBLGlEOzs7OzJEQ3BFQSw2bURBQStqRCxlQUFHLEc7Ozs7Ozs7O3dFQ0Fsa0QscUJBQ0Esc0JBQ0EscUQsbURBQ0FBLEVBQVdDLGE7Ozs7MkRDSFgsMFJBQ0lDLEVBREoseU1BU0lDLEVBQVkscUJBQ2QsYUFDQSxZQUNBLHNCQUNBLEVBQ0EsS0FDQSxLQUNBLE1BQ0EsRUFDQSxnQkFDQUQsR0FHRkMsRUFBVUMsUUFBUUMsT0FBUyxvQ0FDWixhQUFBRixFOzs7OzJHQ3ZCZiw2MEM7Ozs7MkdDQUEsOExBQUlHLEVBQWEsQ0FDZkMsU0FBVSxXQUNSLE9BQU8sbUpBSVRDLFdBQVksV0FDVixPQUFPLCtKQUlUQyxPQUFRLFdBQ04sT0FBTyx3SUFLUEMsRUFBUyxXQUNYLElBQUlDLEVBQU1DLEtBQ05DLEVBQUtGLEVBQUlHLGVBQ0pILEVBQUlJLE1BQU1DLElBRWpCQyxHQUFtQixFQUNuQkMsRUFBa0IsR0FDdEJSLEVBQU9TLGVBQWdCLEkiLCJmaWxlIjoicGFnZXMvc3Rhcmhpc3Rvcnkvc3Rhcmhpc3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi8uLi8uLi9kb3dubG9hZC90L0hCdWlsZGVyWC4yLjYuMS4yMDIwMDIyNi5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xMi0xIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc2NyaXB0LmpzIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc3R5bGUuanMhLi9zdGFyaGlzdG9yeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEyLTEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zY3JpcHQuanMhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3N0YXJoaXN0b3J5LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsIjx0ZW1wbGF0ZT5cclxuXHQ8dmlldz5cclxuXHRcdDx1c2VyaW5mbz48L3VzZXJpbmZvPlxyXG5cdFx0PHZpZXcgY2xhc3M9XCJ1c2VyYm9yXCI+PC92aWV3PlxyXG5cdFx0PHZpZXcgY2xhc3M9XCJtZW51Z3VpZGVcIj5cclxuXHRcdFx0PHZpZXcgY2xhc3M9XCJsZWZ0XCI+XHJcblx0XHRcdFx05p+l55yL5Y6G5Y+y6K6w5b2VXHJcblx0XHRcdDwvdmlldz5cclxuXHRcdFx0PC92aWV3PlxyXG5cdFx0PHZpZXcgY2xhc3M9XCJjdS10aW1lbGluZVwiIHYtZm9yPVwiaXRlbXMgaW4gaGlzdG9yeUxpc3RcIiA6a2V5PVwiaXRlbXMuY3JlYXRlRGF0ZVwiPlxyXG5cdFx0XHQ8dmlldyBjbGFzcz1cImN1LXRpbWVcIj5cclxuXHRcdFx0XHQ8dGltZUZvcm1hdCA6dGltZWRhdGUgPSBcIml0ZW1zLmNyZWF0ZURhdGVcIiA6dHlwZSA9IFwiMVwiPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0PC90aW1lRm9ybWF0PlxyXG5cdFx0XHQ8L3ZpZXc+XHJcblx0XHRcdDx2aWV3IGNsYXNzPVwiY3UtaXRlbVwiIHYtZm9yPVwiaXRlbSBpbiBpdGVtcy5zdGFySW5mb1wiIDprZXkgPSBcIml0ZW0uaWRcIj5cclxuXHRcdFx0XHQ8dmlldyBjbGFzcz1cImFkZGljb25cIiB2LWlmPVwiaXRlbS5hZGp1c3RDb3VudCA+IDBcIj5cclxuXHRcdFx0XHRcdCtcclxuXHRcdFx0XHQ8L3ZpZXc+XHJcblx0XHRcdFx0PHZpZXcgY2xhc3M9XCJqaWFuaWNvblwiIHYtaWY9XCJpdGVtLmFkanVzdENvdW50IDwgMFwiPlxyXG5cdFx0XHRcdFx0LVxyXG5cdFx0XHRcdDwvdmlldz5cclxuXHRcdFx0XHQ8dmlldyA6Y2xhc3M9XCIoaXRlbS5hZGp1c3RDb3VudCA+IDApID8gJ2NvbnRlbnQgYWRkYmcnIDogJ2JnLWJsdWUgY29udGVudCBqaWFuYmcnXCI+XHJcblx0XHRcdFx0XHQ8dmlldyBjbGFzcz1cImNvbjFcIj5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0PHRpbWVGb3JtYXQgOnRpbWVkYXRlID0gXCJpdGVtLnVwZGF0ZURhdGVcIiA6dHlwZSA9IFwiMlwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0PC90aW1lRm9ybWF0PlxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0PGltYWdlIHNyYz1cIi9zdGF0aWMvbWVudXN0YXIucG5nXCIgbW9kZT1cIlwiPjwvaW1hZ2U+XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQ8dmlldyBjbGFzcz1cIlwiIHYtaWY9XCJpdGVtLmFkanVzdENvdW50ID4gMFwiPlxyXG5cdFx0XHRcdFx0XHRcdCt7e2l0ZW0uYWRqdXN0Q291bnR9fVxyXG5cdFx0XHRcdFx0XHQ8L3ZpZXc+XHJcblx0XHRcdFx0XHRcdDx2aWV3IGNsYXNzPVwiXCIgdi1pZj1cIml0ZW0uYWRqdXN0Q291bnQgPCAwXCI+XHJcblx0XHRcdFx0XHRcdFx0e3tpdGVtLmFkanVzdENvdW50fX1cclxuXHRcdFx0XHRcdFx0PC92aWV3PlxyXG5cdFx0XHRcdFx0PC92aWV3PlxyXG5cdFx0XHRcdFx0PHZpZXcgY2xhc3M9XCJjb24yXCI+XHJcblx0XHRcdFx0XHRcdHt7aXRlbS5yZWFzb259fVxyXG5cdFx0XHRcdFx0PC92aWV3PlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0PC92aWV3PlxyXG5cdFx0XHQ8L3ZpZXc+XHJcblx0XHQ8L3ZpZXc+XHJcblx0XHJcblx0XHQ8dmlldyB2LWlmID0gXCJpc0VtcHR5ID09IDFcIj5cclxuXHRcdCAgICA8bm9kYXRhIHdvcmRpbmZvID0gXCLmsqHmnInmmJ/lj5jmm7Tljoblj7LorrDlvZVcIiB0eXBlID0gXCIxXCI+PC9ub2RhdGE+XHJcblx0XHQgIDwvdmlldz5cclxuXHQ8L3ZpZXc+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGhpc3RvcnlMaXN0OltdLFxyXG5cdFx0XHRkYXRhU3RlcDo1MCxcclxuXHRcdFx0aXNFbXB0eTowXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0b25Mb2FkKCkge1xyXG5cdFx0dGhpcy5pbml0KClcclxuXHR9LFxyXG5cdGNvbXB1dGVkOntcclxuXHRcdFxyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0YXN5bmMgaW5pdCgpe1xyXG5cdFx0XHR2YXIgcGFyYW1zID0ge1xyXG5cdFx0XHRcdGZyb206MSxcclxuXHRcdFx0XHRjb3VudDp0aGlzLmRhdGFTdGVwXHJcblx0XHRcdH1cclxuXHRcdFx0YXdhaXQgdGhpcy4kYXBpLnNob3dMb2FkaW5nKCk7IC8vIOaYvuekumxvYWRpbmdcclxuXHRcdFx0dmFyIGhpc3RvcnlsaXN0ID0gYXdhaXQgdGhpcy4kYXBpLmdldERhdGEodGhpcy4kYXBpLndlYmFwaS5zdGFyaGlzdG9yeSwgcGFyYW1zKTtcclxuXHRcdFx0XHJcblx0XHRcdGlmICh0aGlzLiRhcGkucmVzaG9vayhoaXN0b3J5bGlzdCwgdGhpcy4kbXAucGFnZS5yb3V0ZSkpIHtcclxuXHRcdFx0XHRhd2FpdCB0aGlzLiRhcGkuaGlkZUxvYWRpbmcoKTsgLy8g562J5b6F6K+35rGC5pWw5o2u5oiQ5Yqf5ZCO77yM6ZqQ6JePbG9hZGluZ1xyXG5cdFx0XHRcdGlmKGhpc3RvcnlsaXN0LmRhdGEubGVuZ3RoID4gMCl7XHJcblx0XHRcdFx0XHR0aGlzLmhpc3RvcnlMaXN0ID0gaGlzdG9yeWxpc3QuZGF0YTtcclxuXHRcdFx0XHRcdHRoaXMuaXNFbXB0eSA9IDBcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHRoaXMuaXNFbXB0eSA9IDFcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ICBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cclxuLm1lbnVndWlkZXtcclxuXHRAaW5jbHVkZSB1c2VyZ3VpZGU7XHJcblx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcbi8qID09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICDml7bpl7TovbRcclxuID09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4uY3UtdGltZWxpbmUge1xyXG5cdGRpc3BsYXk6IGJsb2NrO1xyXG5cdGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcblx0Zm9udC1zaXplOiAkZm9udHNpemUtMjg7XHJcbn1cclxuXHJcbi5jdS10aW1lbGluZSAuY3UtdGltZSB7XHJcblx0d2lkdGg6IDEyMHVweDtcclxuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0cGFkZGluZzogMjB1cHggMDtcclxuXHRmb250LXNpemU6IDI2dXB4O1xyXG5cdGNvbG9yOiAjODg4O1xyXG5cdGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uY3UtdGltZWxpbmU+LmN1LWl0ZW0ge1xyXG5cdHBhZGRpbmc6IDMwdXB4IDMwdXB4IDMwdXB4IDEyMHVweDtcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0ZGlzcGxheTogYmxvY2s7XHJcblx0ei1pbmRleDogMDtcclxufVxyXG5cclxuLmN1LXRpbWVsaW5lPi5jdS1pdGVtOm5vdChbY2xhc3MqPVwidGV4dC1cIl0pIHtcclxuXHRjb2xvcjogIzMzMztcclxufVxyXG5cclxuLmN1LXRpbWVsaW5lPi5jdS1pdGVtOjphZnRlciB7XHJcblx0Y29udGVudDogXCJcIjtcclxuXHRkaXNwbGF5OiBibG9jaztcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0d2lkdGg6IDF1cHg7XHJcblx0YmFja2dyb3VuZC1jb2xvcjogI2RkZDtcclxuXHRsZWZ0OiA2MHVweDtcclxuXHRoZWlnaHQ6IDEwMCU7XHJcblx0dG9wOiAwO1xyXG5cdHotaW5kZXg6IDg7XHJcbn1cclxuLmN1LXRpbWVsaW5lPi5jdS1pdGVtIC5jb250ZW50e1xyXG5cdHBhZGRpbmc6MjB1cHg7XHJcblx0Ym9yZGVyLXJhZGl1czogMTZ1cHg7XHJcblx0anVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG59XHJcbi5jdS10aW1lbGluZT4uY3UtaXRlbSAuY29udGVudCBpbWFnZXtcclxuXHR3aWR0aDozMHVweDtcclxuXHRoZWlnaHQ6MzB1cHg7XHJcblx0bWFyZ2luOjAgMTB1cHggMCAyMHVweDtcclxufVxyXG4uY29uMXtcclxuXHRAaW5jbHVkZSByb3dmbGV4O1xyXG5cdGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxufVxyXG4uY29uMntcclxuXHRwYWRkaW5nOjEwdXB4O1xyXG59XHJcbi5hZGRiZ3tcclxuXHRiYWNrZ3JvdW5kOiAjMzliNTRhO1xyXG5cdGNvbG9yOiAjZmZmO1xyXG59XHJcbi5qaWFuYmd7XHJcblx0YmFja2dyb3VuZDogIzAwODFmZjtcclxuXHRjb2xvcjogI2ZmZjtcclxufVxyXG4uYWRkaWNvbntcclxuXHR3aWR0aDogNDB1cHg7XHJcblx0aGVpZ2h0OjQwdXB4O1xyXG5cdGxpbmUtaGVpZ2h0OiA0MHVweDtcclxuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0Y29sb3I6ICNmZmY7XHJcblx0YmFja2dyb3VuZDogIzM5YjU0YTtcclxuXHRib3JkZXItcmFkaXVzOiAzMHVweDtcclxuXHRib3JkZXI6IDZ1cHggc29saWQgI2ZmZmZmZjtcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0ei1pbmRleDogIDk5OTtcclxuXHRsZWZ0OjM0dXB4O1xyXG5cdHRvcDoxNnVweDtcclxufVxyXG4uamlhbmljb257XHJcblx0d2lkdGg6IDQwdXB4O1xyXG5cdGhlaWdodDo0MHVweDtcclxuXHRsaW5lLWhlaWdodDogNDB1cHg7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdGNvbG9yOiAjZmZmO1xyXG5cdGJhY2tncm91bmQ6ICMwMDgxZmY7XHJcblx0Ym9yZGVyLXJhZGl1czogMzB1cHg7XHJcblx0Ym9yZGVyOiA2dXB4IHNvbGlkICNmZmZmZmY7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdHotaW5kZXg6ICA5OTk7XHJcblx0bGVmdDozNHVweDtcclxuXHR0b3A6MTZ1cHg7XHJcbn1cclxuXHJcbjwvc3R5bGU+XG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9sb2FkZXIuanM/P3JlZi0tOC1vbmVPZi0xLTAhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtb25lT2YtMS0xIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi8uLi9kb3dubG9hZC90L0hCdWlsZGVyWC4yLjYuMS4yMDIwMDIyNi5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTEtMiEuLi8uLi8uLi8uLi8uLi8uLi8uLi9kb3dubG9hZC90L0hCdWlsZGVyWC4yLjYuMS4yMDIwMDIyNi5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTEtMyEuLi8uLi8uLi8uLi8uLi8uLi8uLi9kb3dubG9hZC90L0hCdWlsZGVyWC4yLjYuMS4yMDIwMDIyNi5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtb25lT2YtMS00IS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMS01IS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc3R5bGUuanMhLi9zdGFyaGlzdG9yeS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2xvYWRlci5qcz8/cmVmLS04LW9uZU9mLTEtMCEuLi8uLi8uLi8uLi8uLi8uLi8uLi9kb3dubG9hZC90L0hCdWlsZGVyWC4yLjYuMS4yMDIwMDIyNi5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tOC1vbmVPZi0xLTEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMS0yIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMS0zIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tOC1vbmVPZi0xLTQhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0xLTUhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3N0YXJoaXN0b3J5LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9c2NzcyZcIiIsImltcG9ydCAndW5pLXBhZ2VzJztcbmltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IFBhZ2UgZnJvbSAnLi9wYWdlcy9zdGFyaGlzdG9yeS9zdGFyaGlzdG9yeS52dWUnXG5jcmVhdGVQYWdlKFBhZ2UpIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSBmcm9tIFwiLi9zdGFyaGlzdG9yeS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZDczMzQ2ZTgmXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9zdGFyaGlzdG9yeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL3N0YXJoaXN0b3J5LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9zdGFyaGlzdG9yeS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9zdGFyaGlzdG9yeS9zdGFyaGlzdG9yeS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9kb3dubG9hZC90L0hCdWlsZGVyWC4yLjYuMS4yMDIwMDIyNi5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uLy4uLy4uL2Rvd25sb2FkL3QvSEJ1aWxkZXJYLjIuNi4xLjIwMjAwMjI2LmZ1bGwvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTE2LTAhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi90ZW1wbGF0ZS5qcyEuLi8uLi8uLi8uLi8uLi8uLi8uLi9kb3dubG9hZC90L0hCdWlsZGVyWC4yLjYuMS4yMDIwMDIyNi5mdWxsL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci9wYWdlLW1ldGEuanMhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG93bmxvYWQvdC9IQnVpbGRlclguMi42LjEuMjAyMDAyMjYuZnVsbC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL3N0YXJoaXN0b3J5LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1kNzMzNDZlOCZcIiIsInZhciBjb21wb25lbnRzID0ge1xuICB1c2VyaW5mbzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGltcG9ydChcbiAgICAgIC8qIHdlYnBhY2tDaHVua05hbWU6IFwiY29tcG9uZW50cy91c2VyaW5mby91c2VyaW5mb1wiICovIFwiQC9jb21wb25lbnRzL3VzZXJpbmZvL3VzZXJpbmZvLnZ1ZVwiXG4gICAgKVxuICB9LFxuICB0aW1lRm9ybWF0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaW1wb3J0KFxuICAgICAgLyogd2VicGFja0NodW5rTmFtZTogXCJjb21wb25lbnRzL3RpbWVGb3JtYXQvdGltZUZvcm1hdFwiICovIFwiQC9jb21wb25lbnRzL3RpbWVGb3JtYXQvdGltZUZvcm1hdC52dWVcIlxuICAgIClcbiAgfSxcbiAgbm9kYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaW1wb3J0KFxuICAgICAgLyogd2VicGFja0NodW5rTmFtZTogXCJjb21wb25lbnRzL25vZGF0YS9ub2RhdGFcIiAqLyBcIkAvY29tcG9uZW50cy9ub2RhdGEvbm9kYXRhLnZ1ZVwiXG4gICAgKVxuICB9XG59XG52YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbn1cbnZhciByZWN5Y2xhYmxlUmVuZGVyID0gZmFsc2VcbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0iXSwic291cmNlUm9vdCI6IiJ9