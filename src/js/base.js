// 全局配置
window.cfg_lz = {
    native_timeout: 1200                    //原生接口调用延迟
};
(function(){
    window.base = {
        apple_url: 'https://itunes.apple.com/cn/app/youbini-laite/id1149698186?mt=8',   //苹果app更新地址
        native_call_times: {},              //原生接口调用时间
        callback: {},                       //所有原生方法的回调函数的容器
        link_title: {                       //页面标题
            personal: '个人中心',
            index: '首页'
        },
        addLoading: function(){             //添加页面Loding
            var _html = '<div class="loading">'
                +'<div class="loading_box">'
                    +'<i class="loading_circle"></i>'
                +'</div>'
            +'</div>';
            $('body').prepend(_html);
        },
        removeLoading: function(time){      //取消页面Loding
            setTimeout(function(){
                $('.loading').remove();
            },time || 0);
        },
        getData: function(url, fn){
            var data = back[url];
            // 非对象数据一律认定为格式错误
            if($.type(data) !== 'object'){
                $.alert('网络故障<br>(response data is not json)');
                return false;
            }

            if(data.status === 1){
                fn && fn(data.data || data);
            }else{
                $.alert('后台返回数据异常');
            }
        },
        dataCheck: function(data){          //对原生应用返回数据的检测
            // 非对象数据一律认定为格式错误
            if($.type(data) !== 'object'){
                $.alert('网络故障<br>(response data is not json)');
                return false;
            }
            if(+data.errcode === 0){
                $.modal({
                    title: '网络异常',
                    buttons: [{
                        text: '重试',
                        onClick: function() {
                            base.native.recent_call();
                        }
                    }]
                });
                return false;
            }else if(+data.errcode === 1){
                $.alert(data.msg || "网络故障<br>(errcode: 1)");
                return false;
            }
            return true;
        },
        native: function(fn_name, obj){     //原生方法调用（1.方法名 2.传的参数或回调函数）
            // 最近一次原生调用记忆
            base.native.recent_call = (function(fn_name, obj){
                if(fn_name === "render"){
                    base.data_refresh = obj.callback;
                }
                return function(){
                    base.native(fn_name, obj);
                }
            })(fn_name, $.extend({},typeof obj === "function" ? {callback: obj} : obj));
            // 接口防暴力调用
            var _now_time = +new Date;
            if(base.native_call_times[fn_name] && _now_time - base.native_call_times[fn_name] < cfg_lz.native_timeout){
                $.toast('操作频繁');
                return false;
            }
            base.native_call_times[fn_name] = _now_time;

            // 回调函数封装
            var _cb_name = fn_name+'_'+_now_time;
            var _fn;
            if($.type(obj) === "function"){
                _fn = obj;
                obj = {};
            }else if($.type(obj) === "object" && obj.callback){
                _fn = obj.callback;
            }

            if(_fn !== undefined){
                base.callback[_cb_name] = function(data){
                    // 检查数据是否异常
                    if(base.dataCheck(data)){
                        _fn(data);
                    }
                    // 方法调用完删除自身，避免无限增加内存溢出
                    delete base.callback[_cb_name];
                };
                obj.callback = 'base.callback.'+_cb_name;
            }

            // 添加页面标题
            if(fn_name === 'page_to' && obj.link){
                obj.title = base.link_title[obj.link] || obj.title || '<%= activity %>';
            }

            // 原生调用差异性整合封装
            if(window.native_android){
                window.native_android[fn_name](JSON.stringify(obj));
            }else if(window.webkit && window.webkit.messageHandlers){
                window.webkit.messageHandlers[fn_name].postMessage(obj || '');
            }else{
                window.native[fn_name](obj);
            }
        },
        refresh: function(flag){
            // 页面刷新的后续操作
            var tips = ["<%= refresh_fail %>", '<%= refresh_success %>']
            $.pullToRefreshDone('.pull-to-refresh-content');
            $.toast(tips[flag]);
        }
    };
})();
