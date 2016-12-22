$(function() {
    $(document).on('click', '[data-link]', function(e) {
        // page路由跳转
        var _link = $(this).data('link');
        $.router.load(_link);
    }).on('click', '.popup_share', function(e) {
        // 点击分享弹出框背景区域关闭弹框
        $(e.target).is('.popup_share') && $.closeModal();
    }).on('click', '.share_cancel', function(e) {
        // 点击分享弹出框取消按钮关闭弹框
        $.closeModal();
    }).on('click', '.share_item', function(e) {
        // 点击分享按钮
        console.log($(this).data('type'));
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
    $(document).on('click','.icon-shopping_cart',function(){
        base.native('shopping_cart');
    }).on('click','.service_wechat',function(){
        base.native('service',{type:'wechat'});
    }).on('click','.service_qq',function(){
        base.native('service',{type:'qq',qq_num:'2547127766'});
    }).on('click','.link_orders',function(){
        base.native('orders');
    }).on('click','.share_item',function(){
        var _type = $(this).data('type');
        base.native('share', {type: _type});
    }).on('click','.goods_list li',function(e){
        if($(e.target).is('.icon-share1')) return;
        var _goods_id = $(this).data('goods_id');
        base.native('goods_detail', {goods_id: _goods_id});
    });
});
