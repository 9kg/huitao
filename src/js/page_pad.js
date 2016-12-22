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
                if(!$ct.find('.preloader').length && data_len){
                    $ct.append(preloader_html);
                    $.attachInfiniteScroll($('.infinite-scroll'));
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
            obj = function(data){
                var _html = base.html_temp('incomes',data);
                _page_pad('#income_detail ul',_html,data.length);
            };
            break;
        case "withdrawals":
            obj = function(data){
                var _html = base.html_temp('withdrawals',data);
                _page_pad('#withdraw_detail ul',_html,data.length);
            };
            break;
        case "personal_info":
            obj = function(data){
                $('.balance_num').text(data.balance);
                $('.user_money_total .num').text(data.total);
                $('.user_money_predict .num').text(data.predict);
                $('.user_money_withdrawn .num').text(data.withdrawn);
                $('.user_money_processing .num').text(data.processing);
                $('.receipt_num').text(data.receipt_num);

                if(data.bind_phone){
                    $('.phone_num_text').text(data.bind_phone)
                                    .closest('.item-content').removeClass('item-link')
                                    .removeAttr('data-link');
                    $('.phone_num_val').val(data.bind_phone);
                }
                if(data.alipay_num){
                    $('.taobao_unbind').show();
                    $('.alipay_num_text').text(data.alipay_num);
                    $('.alipay_num').val(data.alipay_num);
                    $('.alipay_name').val(data.alipay_name || '');
                }else{
                    $('.taobao_bind').show();
                }
            };
            break;
        case "invitations":
            obj = function(data){
                var _html = base.html_temp('invitations',data);
                _page_pad('.invitation_list',_html,data.length);
            };
            break;
        case "invitate_info":
            obj = function(data){
                $('.info_money .num').text(data.money);
                $('.info_person .num').text(data.person_num);
                var _html = base.html_temp('ranking_list',data.ranking_list,['<i class="icon icon-first"></i>', '<i class="icon icon-second"></i>', '<i class="icon icon-third"></i>']);
                _page_pad('.ranking_list',_html,data.length);
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
            obj = function(data){
                var _html = base.html_temp('messages',data);
                _page_pad('.msg_list',_html,data.length);
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
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                $.detachInfiniteScroll($('.infinite-scroll'));
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
