// 全局配置
window.cfg_lz = {
    native_timeout: 1200                    //原生接口调用延迟
};

(function(){
    window.base = {
        data:{},                            //页面数据缓存
        // back_url: 'http://git.bramble.wang/data/',
        back_url: 'http://item.mssoft.info/shopping/',                                          //后台host
        share_link: 'http://item.mssoft.info/shoppingView/static/share/share.html?goods_id=',   //商品分享链接
        invite_link: 'http://item.mssoft.info/shoppingView/static/share/invite.html?uid=',      //分享链接
        invite_img: 'http://item.mssoft.info/shoppingView/static/share/img/icon.jpg',           //分享的图
        service_qq_num: '2547127766',                                                           //qq服务号
        apple_url: 'https://itunes.apple.com/cn/app/youbini-laite/id1149698186?mt=8',   //苹果app更新地址
        native_call_times: {},              //原生接口调用时间
        callback: {},                       //所有原生方法的回调函数的容器
        page_size: 10,
        is_loading: false,
        cur_page: {
            goods_today_list: 1,
            goods_9_9: 1,
            type_goods: 1,
            goods: 1
        },
        img_best: function(url){
            var ext = '_200x200.jpg';
            if(window.devicePixelRatio === 3){
                ext = '_300x300.jpg';
            }
            return url + ext;
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
        data_check: function(data){
            // 非对象数据一律认定为格式错误
            if($.type(data) !== 'object'){
                $.alert('网络故障<br>(response data is not json)');
                return false;
            }else{
                return true;
            }
        },
        native_data_check: function(data){          //对原生应用返回数据的检测
            // 非对象数据一律认定为格式错误
            if(!base.data_check(data)){
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
                    if(base.native_data_check(data)){
                        _fn(data);
                    }
                    // 方法调用完删除自身，避免无限增加内存溢出
                    delete base.callback[_cb_name];
                };
                obj.callback = 'base.callback.'+_cb_name;
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
        render: function(name, fn, data){
            var id = '';
            var _type = 'POST';
            var is_refresh = false;
            if($.type(name) === "object"){
                data = name.data;
                fn = name.fn;
                id = name.id || name.name;
                is_refresh = !!name.is_refresh;
                _type = name.req_type || _type;
                name = name.name;
            }else{
                id = name;
            }

            // 数据已存在时直接加载现有数据
            if(base.data[id]){
                fn && fn(base.data[id]);
                return;
            }

            var _url = base.back_url+name //+'.json'+'?t='+(+new Date);
            if($.type(data) === 'string'){
                _type = data;
            }else if($.type(data) === 'object' && $.type(data.req_type) === 'string'){
                _type = data.req_type || _type;
                delete data.req_type;
            }

            // 非下拉刷新及非banners请求的情况下  显示加载提示
            !is_refresh && name !== "banners" && $.showIndicator();

            data = _type.toLocaleLowerCase() === 'post' ? JSON.stringify(data) : data;
            $.ajax({
                url: _url,
                type: _type,
                dataType: 'json',
                data: data,
                success: function(data){
                    name !== "banners" && $.hideIndicator();
                    if(base.data_check(data)){
                        if(data.status !== 1){
                            $.toast(data.msg || '操作失败');
                            is_refresh && $.pullToRefreshDone('.pull-to-refresh-content');
                        }else{
                            base.data[id] = data.data || data;
                            fn && fn(base.data[id]);
                        }
                    }
                },
                error: function(xhr, errorType, err){
                    is_refresh && $.pullToRefreshDone('.pull-to-refresh-content');
                    name !== "banners" && $.hideIndicator();
                    $.toast(err);
                }
            });
        }
    };
})();
