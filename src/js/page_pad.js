base.page_pad = function(port,way){
    var obj;
    console.log(port+":"+way);
    // 需要下拉加载的页面
    var need_preloader = !!~['goods_9_9','type_goods','goods','goods_today_list'].indexOf(port);

    if(need_preloader){
        if(way === 'loading_more'){
            // 上拉加载
            if(base.is_loading){
                return;
            }
            base.is_loading = true;
            base.cur_page[port]++;
        }else{
            base.cur_page[port] = 1;
        }
    }


    // 直接填充或是在后面加载
    var _page_pad = function(sel,_html,data_len){
        var $ct = $(sel).closest('.list-block');
        if(way === 'loading_more'){
            $(sel).append(_html);
        }else{
            if(data_len){
                $(sel).html(_html);
            }else{
                $(sel).html('<li class="icon_ct">'
                                +'<span class="icon icon-no_data"></span>'
                            +'</li>');
                $ct.find('.preloader').remove();
            }
            // 非下拉加载时给需要下拉加载的页面动态填充下拉加载提示图标
            if(need_preloader){
                var preloader_html = '<div class="infinite-scroll-preloader">'
                    +'<div class="preloader"></div>'
                +'</div>';
                if(data_len === base.page_size){
                    if(!$ct.find('.preloader').length){
                        $ct.append(preloader_html);
                        $.attachInfiniteScroll($('.page-current .infinite-scroll'));
                    }
                }else{
                    $ct.find('.infinite-scroll-preloader').remove();
                }
            }
        }
    };

    switch(port){
        case "banners":
            obj = function(data){
                var _html = base.html_temp('banners',data);
                $('.swiper-wrapper .icon').remove();
                banner_index.removeAllSlides();
                banner_index.appendSlide(_html.split('^_^'));
                banner_index.slideTo(1);
            };
            break;
        case "incomes":
            obj = {
                name: 'incomes',
                id: port,
                fn: function(data){
                    var _html = base.html_temp('incomes',data);
                    _page_pad('#income_detail ul',_html,data.length);
                },
                data: {
                    user_id: localStorage.getItem('user_id'),
                    bind_phone: localStorage.getItem('bind_phone'),
                    token: localStorage.getItem('user_token')
                }
            };
            break;
        case "withdrawals":
            obj = {
                name: 'withdrawals',
                id: port,
                fn: function(data){
                    var _html = base.html_temp('withdrawals',data);
                    _page_pad('#withdraw_detail ul',_html,data.length);
                },
                data: {
                    user_id: localStorage.getItem('user_id'),
                    bind_phone: localStorage.getItem('bind_phone'),
                    token: localStorage.getItem('user_token')
                }
            };
            break;
        case "personal_info":
            var user_id = localStorage.getItem('user_id');
            var user_token = localStorage.getItem('user_token');
            if(!user_token){
                if(user_id){
                    $.toast('请先登录');
                }else{
                    $.toast('请先注册');
                }
                $.pullToRefreshDone('.pull-to-refresh-content');
                return;
            }
            $('.page-my .user_img').css('background-image','url("'+localStorage.getItem('user_head_img')+'")');
            $('.page-my .user_name').text(localStorage.getItem('user_name'));
            obj = {
                name: 'personal_info',
                id: port,
                fn: function(data){
                    $('.balance_num').text(data.balance);
                    $('.page-my .user_img').css('background-image','url("'+data.head_img+'")');
                    $('.page-my .user_name').text(data.nickname);
                    $('.user_money_total .num').text(data.total);
                    $('.user_money_predict .num').text(data.predict);
                    $('.user_money_withdrawn .num').text(data.withdrawn);
                    $('.user_money_processing .num').text(data.processing);

                    if(data.balance){
                        localStorage.setItem('user_money',data.balance);
                    }
                    if(data.head_img){
                        localStorage.setItem('user_head_img',data.head_img);
                    }
                    if(data.nickname){
                        localStorage.setItem('user_name',data.nickname);
                    }

                    if(data.bind_phone){
                        localStorage.setItem('bind_phone', data.bind_phone)
                    }
                    if(data.taobao_name){
                        localStorage.setItem('taobao_name', data.taobao_name)
                    }
                    if(data.bind_alipay_num){
                        localStorage.setItem('bind_alipay_num', data.bind_alipay_num)
                    }
                    if(data.bind_alipay_name){
                        localStorage.setItem('bind_alipay_name', data.bind_alipay_name)
                    }
                    if(!data.sfuid){
                        $('.input_share_code').addClass('show');
                        $.toast('',1,'hack4apple5');
                    }
                },
                data: {
                    user_id: localStorage.getItem('user_id'),
                    bind_phone: localStorage.getItem('bind_phone'),
                    token: localStorage.getItem('user_token')
                }
            };
            break;
        case "invitations":
            obj = {
                name: 'invitations',
                id: port,
                fn: function(data){
                    var _html = base.html_temp('invitations',data);
                    _page_pad('.invitation_list',_html,data.length);
                },
                data: {
                    user_id: localStorage.getItem('user_id'),
                    bind_phone: localStorage.getItem('bind_phone'),
                    token: localStorage.getItem('user_token')
                }
            };
            break;
        case "invitate_info":
            var user_id = localStorage.getItem('user_id');
            obj = {
                name: 'invitate_info',
                id: port,
                fn: function(data){
                    $('.info_money .num').text(data.money || 0);
                    $('.info_person .num').text(data.person_num || 0);
                    user_id ? $('.share_code_num').text(user_id) : $('.user_share_code').html('我的邀请码：<a href="./my.html#login" class="login_pre">请先登录</a>');
                    var _html = base.html_temp('ranking_list',data.ranking_list,['<i class="icon icon-first"></i>', '<i class="icon icon-second"></i>', '<i class="icon icon-third"></i>']);
                    _page_pad('.ranking_list',_html,data.ranking_list.length);
                },
                data: {
                    user_id: localStorage.getItem('user_id'),
                    bind_phone: localStorage.getItem('bind_phone'),
                    token: localStorage.getItem('user_token')
                }
            };
            break;
        case "goods_9_9":
            obj = {
                name: 'goods',
                id: port,
                fn: function(data){
                    var _html = base.html_temp('goods',data);
                    _page_pad('.page-9_9 .goods_list',_html,data.length);
                },
                data: {
                    type: '9.9',
                    cur_page: base.cur_page.goods_9_9,
                    page_size: base.page_size,
                    query: $(".page-9_9 #search").val()
                }
            };
            break;
        case "type_goods":
            $('.page-type_goods .pull-to-refresh-layer').css('visibility','visible');
            obj = {
                name: 'goods',
                id: 'type_goods',
                fn: function(data){
                    var _html = base.html_temp('goods',data);
                    _page_pad('.page-type_goods .goods_list',_html,data.length);
                },
                data: {
                    type: $('.page-type_goods').data('id'),
                    cur_page: base.cur_page.type_goods,
                    page_size: base.page_size
                }
            };

            break;
        case "goods":
            obj = {
                name: 'goods',
                id: 'goods',
                fn: function(data){
                    var _html = base.html_temp('goods',data);
                    _page_pad('.page-goods .goods_list',_html,data.length);
                },
                data: {
                    cur_page: base.cur_page.goods,
                    page_size: base.page_size,
                    query: $(".page-goods #search").val()
                }
            };
            break;
        case "messages":
            $('.page-msg .pull-to-refresh-layer').css('visibility','visible');
            obj = {
                name: 'messages',
                id: port,
                fn: function(data){
                    var _html = base.html_temp('messages',data);
                    _page_pad('.msg_list',_html,data.length);
                },
                data: {
                    user_id: localStorage.getItem('user_id'),
                    bind_phone: localStorage.getItem('bind_phone'),
                    token: localStorage.getItem('user_token')
                }
            };
            break;
        case "types":
            obj = function(data){
                var _html = base.html_temp('types_goods',data);
                _page_pad('.list_type',_html,data.length);
            };
            break;
        case "goods_today_list":
            obj = {
                name: 'goods',
                id: port,
                fn: function(data){
                    var _html = base.html_temp('goods',data);
                    _page_pad('.page-index .goods_today_list',_html,data.length);
                },
                data: {
                    type: 'today',
                    cur_page: base.cur_page.goods_today_list,
                    page_size: base.page_size
                }
            };
            break;
        default:
            return false;
    }
    var config;
    if($.type(obj) === "object"){
        config = obj;
    }else{
        config = {
            name: port,
            fn: obj
        };
    }
    var _fn = config.fn;
    if(way === 'refresh'){
        config.is_refresh = true;
        config.fn = function(data){
            _fn(data);
            $.pullToRefreshDone('.pull-to-refresh-content');
        };
        delete base.data[config.id || config.name];
    }else if(way === 'search'){
        delete base.data[config.id || config.name];
    }else if(way === 'loading_more'){
        config.fn = function(data){
            _fn(data);
            base.is_loading = false;
            if (data.length < base.page_size) {
                $.toast('没有更多啦~',3500);
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                $.detachInfiniteScroll($('.page-current .infinite-scroll'));
                // 删除加载提示符
                $('.infinite-scroll-preloader').remove();
            }
            //容器发生改变,如果是js滚动，需要刷新滚动
            $.refreshScroller();
        };
        delete base.data[config.id || config.name];
    }
    base.render(config);
};
