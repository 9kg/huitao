$(function() {
    // 点击事件
    $('body').on('click', '[data-link]', function(e) {
        var _link = $(this).data('link');
        $.router.load(_link);
    }).on('click', '.popup_share', function(e) {
        if(!$(e.target).is('.popup_share')){
            return;
        }
        $.closeModal();
    }).on('click', '.share_cancel', function(e) {
        $.closeModal();
    }).on('click', '.share_item', function(e) {
        console.log($(this).data('type'));
    }).on('click', '.goods_list .icon-share1,[data-share]', function(e) {
        var _link = $(this).data('link');
        $.popup(base.html_temp('share'));
    });

    // page index
    $(document).on('click', '.types_list li', function(){
        var type_id = $(this).data('type_id');
        $.router.load('#type_goods');
        $('.page-type_goods .title').html($('.type_title',this).text());

        base.render('goods',function(data){
            var _html = base.html_temp('goods',data);
            $('.page-type_goods .goods_list').html(_html);
        },{type: type_id});
    }).on('show', '#tab_types,#tab_today_goods', function(e){
        if($(e.target).is('#tab_types')){
            base.render('types_goods',function(data){
                var _html = base.html_temp('types_goods',data);
                $('.list_type').html(_html);
            });
        }else{
            base.render({
                name: 'goods',
                id: 'goods_today_list',
                fn: function(data){
                    var _html = base.html_temp('goods',data);
                    $('.goods_today_list').html(_html);
                }
            });
        }
    });
    // page my
    $(document).on('show', '#income_detail,#withdraw_detail', function(e){
        if($(e.target).is('#income_detail')){
            base.render('incomes',function(data){
                var _html = base.html_temp('incomes',data);
                $('#income_detail ul').html(_html);
            });
        }else{
            base.render('withdrawals',function(data){
                var _html = base.html_temp('withdrawals',data);
                $('#withdraw_detail ul').html(_html);
            });
        }
    });
    // 首页搜索进入商品列表页
    $(document).on('keydown','.page-index #search',function(e){
        if(e.keyCode === 13){
            var val = $(this).val();
            $(this).blur().val('');
            setTimeout(function(){
                $.router.load('#goods');
                $('.page-goods #search').val(val);
                // goods 加载
                base.render('goods',function(data){
                    var _html = base.html_temp('goods',data);
                    $('.page-goods .goods_list').html(_html);
                });
            },100);
        }
    });

    // 搜索进入商品列表页
    $(document).on('keydown','.page-9_9 #search',function(e){
        if(e.keyCode === 13){
            $(this).blur();
            $('.goods_list').html('');
            setTimeout(function(){
                // goods 加载
                base.render('goods',function(data){
                    var _html = base.html_temp('goods',data);
                    $('.goods_list').html(_html);
                });
            },100);
        }
    });

    // 下拉刷新
    $(document).on('refresh', '#index .pull-to-refresh-content',function(e) {
        var $tab_active = $('.tabs .tab.active');
        if($tab_active.is('#tab_types')){
            delete base.data.types_goods;
            $('#tab_types').trigger('show');
        }else{
            delete base.data.goods_today_list;
            $('#tab_today_goods').trigger('show');
        }
        $.pullToRefreshDone('.pull-to-refresh-content');
    }).on('refresh', '#msg .pull-to-refresh-content',function(e) {
        delete base.data.messages;
        base.render('messages',function(data){
            var _html = base.html_temp('messages',data);
            $('.msg_list').html(_html);
        });
        $.pullToRefreshDone('.pull-to-refresh-content');
    }).on('refresh', '#goods .pull-to-refresh-content',function(e) {
        delete base.data.goods;
        base.render('goods',function(data){
            var _html = base.html_temp('goods',data);
            $('.goods_list').html(_html);
        });
        $.pullToRefreshDone('.pull-to-refresh-content');
    }).on('refresh', '.page-9_9 .pull-to-refresh-content',function(e) {
        delete base.data.goods_9_9;
        base.render({
            name: 'goods',
            id: 'goods_9_9',
            fn: function(data){
                var _html = base.html_temp('goods',data);
                $('.goods_list').html(_html);
            }
        });
        $.pullToRefreshDone('.pull-to-refresh-content');
    }).on('refresh', '#share .pull-to-refresh-content',function(e) {
        delete base.data.invitate_info;
        var idx_logos = ['<i class="icon icon-first"></i>', '<i class="icon icon-second"></i>', '<i class="icon icon-third"></i>'];
        base.render('invitate_info',function(data){
            $('.info_money .num').text(data.money);
            $('.info_person .num').text(data.person_num);
            var _html = base.html_temp('ranking_list',data.ranking_list,idx_logos);
            $('.ranking_list').html(_html);
        });
        $.pullToRefreshDone('.pull-to-refresh-content');
    }).on('refresh', '#invitation_details .pull-to-refresh-content',function(e) {
        delete base.data.invitations;
        base.render('invitations',function(data){
            var _html = base.html_temp('invitations',data);
            $('.invitation_list').html(_html);
        });
        $.pullToRefreshDone('.pull-to-refresh-content');
    }).on('refresh', '#my .pull-to-refresh-content',function(e) {
        delete base.data.personal_info;
        base.render('personal_info',function(data){
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
        });
        $.pullToRefreshDone('.pull-to-refresh-content');
    }).on('refresh', '#money_detail .pull-to-refresh-content',function(e) {
        delete base.data.personal_info;
        var $tab_active = $('.tabs .tab.active');
        if($tab_active.is('#income_detail')){
            delete base.data.incomes;
            $('#income_detail').trigger('show');
        }else{
            delete base.data.withdrawals;
            $('#withdraw_detail').trigger('show');
        }
        $.pullToRefreshDone('.pull-to-refresh-content');
    });
});
