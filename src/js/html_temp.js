base.html_temp = function (url_name, data, other_data){
    var _html = '';

    switch (url_name) {
        case 'banners':
            $.each(data, function(i, item) {
                _html += '<div class="swiper-slide" data-link_to="' + item.link + '">' +
                    '<div class="banner_item" style="background-image:' + 'url(' + item.icon_url + ');"></div>' +
                    '</div>';
            });
            break;
        case 'types_goods':
            $.each(data, function(i, item) {
                _html += '<li data-type_id="'+item.id+'">'
                    +'<div class="type_info">'
                        +'<p class="type_title">'+item.name+'</p>'
                        +'<p class="type_desc">'+item.desc+'</p>'
                    +'</div>'
                    +'<div class="type_img" style="background-image:url(\''+item.icon_url+'\')"></div>'
                +'</li>';
            });
            break;
        case 'goods':
            $.each(data, function(i, item) {
                _html += '<li data-goods_id="'+item.id+'">'
                    +'<div class="goods_img" style="background-image: url('+item.icon_url+')"></div>'
                    +'<div class="goods_info">'
                        +'<p class="goods_name">'+item.name+'</p>'
                        +'<p class="goods_price_pre">'
                            +'￥'+item.price_pre+'(已抢'+item.stock+'件)'
                        +'</p>'
                        +'<p class="goods_price_now">￥<span class="price_num">'+item.price+'</span></p>'
                    +'</div>'
                    +'<div class="goods_voucher">'
                        +'￥<span class="voucher_num">'+item.price_cut+'</span>'
                    +'</div>'
                    +'<span class="icon icon-share"></span>'
                +'</li>';
            });
            break;
        case 'messages':
            $.each(data, function(i, item) {
                _html += '<li>'
                    +'<p class="date_time">2011-11-11 11:11:11</p>'
                    +'<p class="msg">'
                        +'感谢您注册惠购，50元优惠券已发放到您的账户，请查收。'
                    +'</p>'
                +'</li>';
            });
            break;
        case 'ranking_list':
            $.each(data, function(i, item) {
                _html += '<li class="item-content">'
                    +'<div class="item-media">'
                        +'<span class="idx">'+(i > 2 ? i+1 : other_data[i])+'</span>'
                        +'<div class="head_img" style="background-image: url(\''+item.head_img+'\');"></div>'
                    +'</div>'
                    +'<div class="item-inner">'
                        +'<div class="item-title">'+item.name+'</div>'
                        +'<div class="item-after">'
                            +'成功邀请'+item.friends_num+'人，获得'+item.price+'元'
                        +'</div>'
                    +'</div>'
                +'</li>';
            });
            break;
        case 'invitations':
            $.each(data, function(i, item) {
                _html += '<li class="friend">'
                    +'<div class="friend_info">'
                        +'<div class="friend_img" style="background-image: url(\''+item.head_img+'\')"></div>'
                        +'<p class="friend_name">'+item.name+'</p>'
                    +'</div>'
                    +'<div class="list-block">'
                        +'<ul>'
                            + base.html_temp('money_friend',item.data)
                        +'</ul>'
                    +'</div>'
                +'</li>';
            });
            break;
        case 'money_friend':
            $.each(data, function(i, item) {
                _html += '<li class="item-content">'
                    +'<div class="item-inner">'
                        +'<div class="item-title">'+item.msg+'</div>'
                        +'<div class="item-after">'+item.date_time+'</div>'
                    +'</div>'
                +'</li>';
            });
            break;
        case 'incomes':
            $.each(data, function(i, item) {
                var price_desc = ['扣除','获得'][+(item.price > 0)] + Math.abs(item.price) + '元';
                _html += '<li class="item-content">'
                    +'<div class="other_info">'
                        +'<p class="friend">'
                            +'好友'
                            +'<span class="friend_name">'+item.friend_name+'</span>'
                        +'</p>'
                        +'<p class="date_time">'
                            +'2016-09-08 18:00'
                        +'</p>'
                    +'</div>'
                    +'<div class="item-inner">'
                        +'<div class="item-title">'+item.msg+'</div>'
                        +'<div class="item-after">'+price_desc+'</div>'
                    +'</div>'
                '</li>';
            });
            break;
        case 'withdrawals':
            $.each(data, function(i, item) {
                var price_desc = '提现'+['中','成功','失败'][+item.status];
                _html += '<li class="item-content">'
                    +'<div class="item-media">'+item.price+'元</div>'
                    +'<div class="item-inner">'
                        +'<div class="item-title">'+price_desc+'</div>'
                        +'<div class="item-after">'+item.date_time+'</div>'
                    +'</div>'
                +'</li>';
            });
            break;
    }
    return _html;
};
