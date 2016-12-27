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
            case "setting":
                var user_id = localStorage.getItem('user_id');
                var user_name = localStorage.getItem('user_name');
                var bind_phone = localStorage.getItem('bind_phone');
                var bind_taobao = localStorage.getItem('bind_taobao');
                if(!user_id){
                    $('.user_register').addClass('show');
                }
                if(bind_phone){
                    $('.page-setting .phone_num_val').val(bind_phone);
                    $('.phone_num_text').text(bind_phone)
                                    .closest('.item-content').removeClass('item-link')
                                    .removeAttr('data-link')
                                    .find('.item-title').text('已登录');
                }
                if(+bind_taobao){
                    $('.taobao_unbind').addClass('show');
                    $('.alipay_num_text').text(user_name);
                }else{
                    $('.taobao_bind').addClass('show');
                }
                break;
            case "withdraw":
                var alipay_num = localStorage.getItem('alipay_num');
                var alipay_name = localStorage.getItem('alipay_name');
                var user_money = localStorage.getItem('user_money');

                $('.page-withdraw .withdraw_desc .user_money').text(user_money || 0);
                $('.page-withdraw .alipay_num').val(alipay_num || '');
                $('.page-withdraw .alipay_name').val(alipay_name || '');
                break;
            case "login":
                initObj[id] = false;
                var bind_phone = localStorage.getItem('bind_phone');
                $('.page-login .phone_num_val').val(bind_phone || '');
                break;
            case "password":
                var bind_phone = localStorage.getItem('bind_phone');
                if(bind_phone){
                    $('.page-password .phone_num_val').val(bind_phone);
                }else{
                    $('.page-password .phone_num_val').prop('readonly',false)
                }
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
