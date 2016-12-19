$(function() {
    // 页面初始化事件
    $(document).on("pageInit", function(e, id, $page) {
        console.log(id);
        if(id === "index"){
            base.render('banners',function(data){
                var _html = base.html_temp('banners',data);
                $('.swiper-wrapper .icon').remove();
                banner_index.removeAllSlides();
                banner_index.appendSlide(_html.split('^_^'));
                banner_index.slideTo(1);
            });
            $('#tab_today_goods').trigger('show');
        }else if(id === "goods"){
            base.render('goods',function(data){
                var _html = base.html_temp('goods',data);
                $('.goods_list').html(_html);
            });
        }else if(id === "msg"){
            base.render('messages',function(data){
                var _html = base.html_temp('messages',data);
                $('.msg_list').html(_html);
            });
        }else if(id === "9_9"){
            base.render({
                name: 'goods',
                id: 'goods_9_9',
                fn: function(data){
                    var _html = base.html_temp('goods',data);
                    $('.goods_list').html(_html);
                }
            });
        }else if(id === "share"){
            var idx_logos = ['<i class="icon icon-first"></i>', '<i class="icon icon-second"></i>', '<i class="icon icon-third"></i>'];
            base.render('invitate_info',function(data){
                $('.info_money .num').text(data.money);
                $('.info_person .num').text(data.person_num);
                var _html = base.html_temp('ranking_list',data.ranking_list,idx_logos);
                $('.ranking_list').html(_html);
            });
        }else if(id === "invitation_details"){
            base.render('invitations',function(data){
                var _html = base.html_temp('invitations',data);
                $('.invitation_list').html(_html);
            });
        }else if(id === "my"){
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
        }else if(id === "money_detail"){
            $('#income_detail').trigger('show');
        }
    });
});
