base.page_pad = function(port,way){
    var obj;
    switch(port){
        case "incomes":
            obj = function(data){
                var _html = base.html_temp('incomes',data);
                $('#income_detail ul').html(_html);
            };
            break;
        case "withdrawals":
            obj = function(data){
                var _html = base.html_temp('withdrawals',data);
                $('#withdraw_detail ul').html(_html);
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
                $('.invitation_list').html(_html);
            };
            break;
        case "invitate_info":
            obj = function(data){
                $('.info_money .num').text(data.money);
                $('.info_person .num').text(data.person_num);
                var _html = base.html_temp('ranking_list',data.ranking_list,['<i class="icon icon-first"></i>', '<i class="icon icon-second"></i>', '<i class="icon icon-third"></i>']);
                $('.ranking_list').html(_html);
            };
            break;
        case "goods_9_9":
            obj = {
                name: 'goods',
                id: port,
                fn: function(data){
                    var _html = base.html_temp('goods',data);
                    $('.goods_list').html(_html);
                }
            };
            break;
        case "goods_types":
            obj = {
                name: 'goods',
                id: 'goods_types',
                fn: function(data){
                    var _html = base.html_temp('goods',data);
                    $('.page-type_goods .goods_list').html(_html);
                },
                data: {type: base.page_type_goods_id}
            };
            base.page_type_goods_title && $('.page-type_goods .title').html(base.page_type_goods_title);
            break;
        case "goods":
            obj = function(data){
                var _html = base.html_temp('goods',data);
                $('.goods_list').html(_html);
            };
            break;
        case "messages":
            obj = function(data){
                var _html = base.html_temp('messages',data);
                $('.msg_list').html(_html);
            };
            break;
        case "types_goods":
            obj = function(data){
                var _html = base.html_temp('types_goods',data);
                $('.list_type').html(_html);
            };
            break;
        case "goods_today_list":
            obj = {
                name: 'goods',
                id: port,
                fn: function(data){
                    var _html = base.html_temp('goods',data);
                    $('.goods_today_list').html(_html);
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
    }
    base.render(config);
};
