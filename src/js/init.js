$(function() {
    // 页面初始化事件
    var initObj = {};
    $(window).on("pageInit", function(e, id, $page) {
        if(initObj[id]){
            return;
        }
        initObj[id] = true;
        switch (id) {
            case "index":
                base.page_pad('banners', 'init');
                $('#tab_today_goods').trigger('show');
                break;
            case "goods":
                initObj[id] = false;
                delete base.data.goods;
                base.page_pad('goods', 'init');
                $('.content').scrollTop(0);
                break;
            case "msg":
                base.page_pad('messages', 'init');
                break;
            case "9_9":
                base.page_pad('goods_9_9', 'init');
                break;
            case "share":
                base.page_pad('invitate_info', 'init');
                break;
            case "invitation_details":
                base.page_pad('invitations', 'init');
                break;
            case "my":
                base.page_pad('personal_info', 'init');
                break;
            case "money_detail":
                $('#income_detail').trigger('show');
                break;
            case "type_goods":
                initObj[id] = false;
                delete base.data.type_goods;
                base.page_pad('type_goods','init');
                $('.content').scrollTop(0);
                break;
        }
    });
});
