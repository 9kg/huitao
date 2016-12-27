$(function() {
    $(document).on('click', '[data-link]', function(e) {
        // page路由跳转
        var _link = $(this).data('link');
        var _require = $(this).data('require');
        if(_require === 'login'){
            if(localStorage.getItem('user_token')){
                $.router.load(_link);
            }else{
                if(localStorage.getItem('user_id')){
                    $.router.load('./my.html#login');
                }else{
                    $.router.load('./my.html#register');
                }
            }
        }else{
            $.router.load(_link);
        }
    }).on('click', '[data-link_native]', function(e) {
        // 原生接口访问
        var _link = $(this).data('link_native');
        var _require = $(this).data('require');
        if(_require === 'login'){
            if(localStorage.getItem('user_token')){
                base.native(_link);
            }else{
                if(localStorage.getItem('user_id')){
                    $.router.load('./my.html#login');
                }else{
                    $.router.load('./my.html#register');
                }
            }
        }else{
            base.native(_link);
        }
    }).on('click', '.popup_share', function(e) {
        // 点击分享弹出框背景区域关闭弹框
        if($(e.target).is('.popup_share')){
            $('.popup-overlay').remove();
            $.closeModal();
        }
    }).on('click', '.share_cancel', function(e) {
        // 点击分享弹出框取消按钮关闭弹框
        $('.popup-overlay').remove();
        $.closeModal();
    }).on('click', '.btn_invitate', function(e) {
        // 点击按钮弹出分享框
        $.popup(base.html_temp('share'));
    }).on('click', '.goods_list .icon-share1,[data-share]', function(e) {
        // 点击对应元素弹出分享框
        var _link = $(this).data('link');
        $.popup(base.html_temp('share'));
        e.stopPropagation();
    }).on('click', '.types_list li:not(.icon_ct)', function() {
        // 点击大类进入对应大类的商品页面，调整大类标题
        var $page_type_goods = $('.page-type_goods');
        $page_type_goods.data('id', $(this).data('type_id'));
        $page_type_goods.find('.title').html($('.type_title', this).text());
        $.router.load('#type_goods');
    }).on('show', '#tab_types', function(e) {
        // 首页 商品分类 tab项显示时  加载对应的页面
        if($('.types_list .icon_ct').length === 1){
            base.page_pad('types','init');
        }
    }).on('show', '#tab_today_goods', function(e) {
        // 首页 今日上新 tab项显示时  加载对应的页面
        if($('.goods_today_list .icon_ct').length === 1){
            base.page_pad('goods_today_list','init');
        }
    }).on('show', '#income_detail,#withdraw_detail', function(e) {
        // 个人中心页 资金明细 下对应的tab显示
        base.page_pad($(e.target).is('#income_detail') ? 'incomes' : 'withdrawals','init');
    }).on('keydown', '.page-index #search', function(e) {
        // 首页搜索进入商品列表页
        if (e.keyCode === 13) {
            $('.content').scrollTop(0);
            var val = $(this).val();
            $(this).blur().val('');
            setTimeout(function() {
                $.router.load('#goods');
                $('.page-goods #search').val(val);
            }, 100);
        }
    }).on('keydown', '.page-goods #search', function(e) {
        // 商品列表页搜索
        if (e.keyCode === 13) {
            $(this).blur();
            $('.content').scrollTop(0);
            base.page_pad('goods', 'search');
        }
    }).on('keydown', '.page-9_9 #search', function(e) {
        // 9块9页搜索
        if (e.keyCode === 13) {
            $(this).blur();
            $('.content').scrollTop(0);
            base.page_pad('goods_9_9', 'search');
        }
    });

    // 下拉刷新
    $(document).on('refresh', '#index .pull-to-refresh-content', function(e) {
        // 首页  下拉刷新当前显示的tab项
        base.page_pad($('#tab_types.tab.active').length ? 'types' : 'goods_today_list', 'refresh');
    }).on('refresh', '#msg .pull-to-refresh-content', function(e) {
        // 消息页
        base.page_pad('messages', 'refresh');
    }).on('refresh', '#goods .pull-to-refresh-content', function(e) {
        // 商品页
        base.page_pad('goods', 'refresh');
    }).on('refresh', '#type_goods .pull-to-refresh-content', function(e) {
        // 某一类商品页
        base.page_pad('type_goods', 'refresh');
    }).on('refresh', '.page-9_9 .pull-to-refresh-content', function(e) {
        // 9块9商品页
        base.page_pad('goods_9_9', 'refresh');
    }).on('refresh', '#share .pull-to-refresh-content', function(e) {
        // 分享页
        base.page_pad('invitate_info', 'refresh');
    }).on('refresh', '#invitation_details .pull-to-refresh-content', function(e) {
        // 我的邀请列表页
        base.page_pad('invitations', 'refresh');
    }).on('refresh', '#my .pull-to-refresh-content', function(e) {
        // 个人中心页
        base.page_pad('personal_info', 'refresh');
    }).on('refresh', '#money_detail .pull-to-refresh-content', function(e) {
        // 资金明细页
        base.page_pad($('.tab.active#income_detail').length ? 'incomes' : 'withdrawals', 'refresh');
    });

    // 上拉加载
    $(document).on('infinite', '.infinite-scroll', function() {
        var $page = $(this).closest('.page');
        if($page.is('.page-index')){
            if($('#tab_types.tab.active').length){
                return;
            }
            base.page_pad('goods_today_list', 'loading_more');
        }else if($page.is('.page-type_goods')){
            base.page_pad('type_goods', 'loading_more');
        }else if($page.is('.page-goods')){
            base.page_pad('goods', 'loading_more');
        }else if($page.is('.page-9_9')){
            base.page_pad('goods_9_9', 'loading_more');
        }
    });

    // 原生调用
    $(document).on('click','.service_wechat',function(){
        base.native('service',{type:'wechat'});
    }).on('click','.service_qq',function(){
        base.native('service',{type:'qq',qq_num: base.service_qq_num});
    }).on('click','.share_item',function(){
        var _type = $(this).data('type');
        base.native('share', {type: _type});
    }).on('click','.goods_list li[data-goods_id]',function(e){
        if($(e.target).is('.icon-share1')) return;

        var _goods_id = $(this).data('goods_id');
        var _vocher_url = $(this).data('vocher_url');

        var is_register = !!localStorage.getItem('user_id');
        var user_token = localStorage.getItem('user_token');
        if(user_token){
            base.native('goods_detail', {goods_id: _goods_id,vocher_url:_vocher_url});
        }else{
            $.router.load('./my.html#'+(is_register ? 'login' : 'register'));
        }
    });

    var moneys_cut_service = {
        '10': '9.5',
        '30': '29.5',
        '50': '49.5',
        '100': '99.5'
    };
    //注册登录提现获取验证码
    $(document).on('click','.get_id_code',function(){
        if($(this).is('.loading')){
            return;
        }
        $(this).addClass('loading');
        var phone = $('.page-current .input_phone').val();
        if(!phone){
            $.toast('请输入手机号！');
            return;
        }
        $.showIndicator();
        disable_get_id_code($(this));
        var data = JSON.stringify({
            phone: phone
        });
        $.ajax({
            url: base.back_url+'id_code',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(data){
                $.hideIndicator();
                if(base.data_check(data)){
                    if(data.status !== 1){
                        $.toast(data.msg || '操作失败');
                    }else{
                        $.toast('验证码已发送。');
                    }
                }
            },
            error: function(xhr, errorType, err){
                $.hideIndicator();
                $.toast(err);
            }
        });
    }).on('change','.page-withdraw [name="withdraw_money"]',function(){
        $('.page-withdraw .withdraw_desc .num').text(moneys_cut_service[$(this).val()]);
    }).on('click','.taobao_bind',function(){
        bind_taobao();
    }).on('click','.taobao_unbind',function(){
        unbind_taobao();
    }).on('click','.btn_withdraw',function(){
        var data = {
            price: $('.page-withdraw [name="withdraw_money"]:checked').val(),
            alipay_num: $('.page-withdraw .alipay_num').val() || '',
            alipay_name: $('.page-withdraw .alipay_name').val() || '',
            user_id: localStorage.getItem('user_id')
        };
        withdraw(data);
    }).on('click','.btn_login',function(){
        var data = {
            phone: $('.page-current .input_phone').val() || '',
            password: $('.page-current .input_password').val() || ''
        };
        login(data);
    }).on('click','.btn_register',function(){
        var data = {
            phone: $('.page-current .input_phone').val() || '',
            id_code: $('.page-current .input_id_code').val() || '',
            password: $('.page-current .input_password').val() || ''
        };
        login(data,'注册');
    }).on('click','.btn_password',function(){
        var data = {
            phone: $('.page-current .input_phone').val() || '',
            id_code: $('.page-current .input_id_code').val() || '',
            password: $('.page-current .input_password').val() || ''
        };
        login(data,'密码修改');
    });

    // 登录
    function login(data,type){
        if(data.phone !== undefined && !(/^1[0-9]{10}$/.test(data.phone))){
            $.toast('手机号格式有误');
            return;
        }
        if(data.password !== undefined && !(/^[a-zA-Z0-9]{6,}$/.test(data.password))){
            $.toast('密码须是不低于6位的字母数字组合');
            return;
        }
        if(data.id_code !== undefined && !(/^[a-zA-Z0-9]{4}$/.test(data.id_code))){
            $.toast('验证码格式错误');
            return;
        }
        // base.native('platform',function(data_platform){
            var bind_phone = data.phone;
            $.extend(data,{type:1,"deviceW":720,"wifiBid":"e8:fc:af:a3:ee:fc","appVer":"1.0-debug","onlineType":"","appBid":"com.shhb.gd.shop","imei":"865370025289241","deviceVer":"1","deviceModel":"android","ip":"192.168.1.119","appName":"惠淘","simType":"N/A","deviceName":"Xiaomi","deviceH":1280,"address":"中国上海市上海市普陀区曹杨路450-256-2512号绿地和创大厦","bdid":"","wifiSid":"houbu1","jaibreak":""});

            data = JSON.stringify($.extend(data));
            $.showIndicator();
            $.ajax({
                url: base.back_url+'login',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function(resp){
                    $.hideIndicator();
                    if(base.data_check(resp)){
                        if(resp.status !== 1){
                            $.toast(resp.msg || '操作失败');
                        }else{
                            localStorage.setItem('user_token',resp.token);
                            localStorage.setItem('user_id',resp.user_id);
                            localStorage.setItem('bind_phone',bind_phone);
                            $('.page-setting .phone_num_val').val(bind_phone);
                            $('.phone_num_text').text(bind_phone)
                                            .closest('.item-content').removeClass('item-link')
                                            .removeAttr('data-link')
                                            .find('.item-title').text('已登录');
                            $.toast((type || '登录')+'成功');
                            base.native('set_user_id',{user_id:resp.user_id});
                            setTimeout(function(){
                                $.router.back();
                            },2000);
                        }
                    }
                },
                error: function(xhr, errorType, err){
                    $.hideIndicator();
                    $.toast(err);
                }
            });
        // });

    }

    // 提现
    function withdraw(data){
        if(!data.alipay_num){
            $.toast('请输入支付宝账号');
            return;
        }
        if(!data.alipay_name){
            $.toast('请输入姓名');
            return;
        }

        localStorage.setItem('alipay_num',data.alipay_num);
        localStorage.setItem('alipay_name',data.alipay_name);
        var user_money = parseInt(localStorage.getItem('user_money') - data.price);
        data = JSON.stringify(data);
        $.showIndicator();
        $.ajax({
            url: base.back_url+'withdraw',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(resp){
                $.hideIndicator();
                if(base.data_check(resp)){
                    if(resp.status !== 1){
                        $.toast(resp.msg || '操作失败');
                    }else{
                        $.toast(resp.msg || '操作成功');


                        localStorage.setItem('user_money',user_money);
                        $('.page-withdraw .withdraw_desc .user_money').text(user_money);
                        setTimeout(function(){
                            $.router.back();
                            $.pullToRefreshTrigger('.page-my .pull-to-refresh-content');
                        },2000);
                    }
                }
            },
            error: function(xhr, errorType, err){
                $.hideIndicator();
                $.toast(err);
            }
        });
    }
    // 绑定淘宝
    function bind_taobao(){
        if(!localStorage.getItem('user_token')){
            if(localStorage.getItem('user_id')){
                $.router.load('./my.html#login');
            }else{
                $.router.load('./my.html#register');
            }
        }else{
            base.native('bind_taobao',function(data){
                if(data.status !== 1){
                    $.toast(data.msg || '授权失败');
                }else{
                    localStorage.setItem('bind_taobao',1);
                    localStorage.setItem('user_head_img',data.avatarUrl);
                    localStorage.setItem('user_name',data.nick);

                    $('.taobao_unbind').addClass('show');
                    $('.taobao_bind').removeClass('show');
                    $('.alipay_num_text').text(data.nick);

                    var taobao_data = JSON.stringify({
                        uuid: data.uuid,
                        bdid: data.bdid,
                        idfa: data.idfa,
                        deviceVer: data.deviceVer,
                        imei: data.imei,
                        user_id: localStorage.getItem('user_id'),
                        taobao_id: data.openId,
                        user_name: data.nick,
                        user_head_img: data.avatarUrl
                    });

                    $.alert(taobao_data);

                    $.showIndicator();
                    $.ajax({
                        url: base.back_url+'authInfo',
                        type: 'POST',
                        dataType: 'json',
                        data: taobao_data,
                        success: function(resp){
                            $.alert(JSON.stringify(resp));

                            $.toast('授权成功');
                            $.hideIndicator();
                        },
                        error: function(xhr, errorType, err){
                            $.hideIndicator();
                            $.toast(err);
                        }
                    });
                }
            });
        }
    }
    // 解除绑定淘宝
    function unbind_taobao(){
        base.native('unbind_taobao',function(data){
            if(data.status !== 1){
                $.toast(data.msg || '解除授权失败');
            }else{
                localStorage.setItem('bind_taobao',0);
                localStorage.removeItem('user_head_img');
                localStorage.removeItem('user_name');


                $('.taobao_unbind').removeClass('show');
                $('.taobao_bind').addClass('show');

                var taobao_data = JSON.stringify({
                    user_id: localStorage.getItem('user_id')
                });

                $.showIndicator();
                $.ajax({
                    url: base.back_url+'authInfo',
                    type: 'POST',
                    dataType: 'json',
                    data: taobao_data,
                    success: function(resp){
                        $.alert(JSON.stringify(resp));
                        $.toast('解除授权成功');
                        $.hideIndicator();
                    },
                    error: function(xhr, errorType, err){
                        $.hideIndicator();
                        $.toast(err);
                    }
                });
            }
        });
    }

    // 验证码60秒禁用
    function disable_get_id_code($el,t){
        t = t !== undefined ? t : 59;
        $el.html('<span class="num">'+t+'</span>秒后重新获取');
        if(t > 0){
            setTimeout(function(){
                disable_get_id_code($el,--t);
            },1000);
        }else{
            setTimeout(function(){
                $el.html('获取验证码');
                $el.removeClass('loading');
            },1000);
        }
    }
});
