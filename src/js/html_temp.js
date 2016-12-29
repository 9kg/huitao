base.html_temp = function (url_name, data, other_data){
    var _html = '';
    var withdraw_statuss = {
        '1': '中',
        '2': '中',
        '3': '失败',
        '4': '成功',
        '5': '失败'
    };
    switch (url_name) {
        case 'banners':
            $.each(data, function(i, item) {
                _html += '<div class="swiper-slide" data-link_to="' + item.link + '">' +
                    '<div class="banner_item" style="background-image:' + 'url(' + item.icon_url + ');"></div>' +
                    '</div>^_^';
            });
            break;
        case 'types_goods':
            $.each(data, function(i, item) {
                _html += '<li data-type_id="'+item.id+'">'
                    +'<div class="type_info">'
                        +'<p class="type_title">'+item.name+'</p>'
                        +'<p class="type_desc">'+item.desc+'</p>'
                    +'</div>'
                    +'<div class="type_img" style="background-image:url(\''+base.img_best(item.icon_url)+'\')"></div>'
                +'</li>';
            });
            break;
        case 'goods':
            $.each(data, function(i, item) {
                _html += '<li data-goods_id="'+item.id+'"  data-goods_img="'+item.icon_url+'" data-vocher_url="'+item.vocher_url+'">'
                    +'<div class="goods_img" style="background-image: url('+base.img_best(item.icon_url)+')"></div>'
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
                    +'<span class="icon icon-share1"></span>'
                +'</li>';
            });
            break;
        case 'messages':
            $.each(data, function(i, item) {
                _html += '<li>'
                    +'<p class="date_time">'+item.date_time+'</p>'
                    +'<p class="msg">'
                        +item.msg
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
                        +'<p class="friend_name">'+item.nickname+'</p>'
                    +'</div>'
                    +'<div class="list-block">'
                        +'<ul>'
                            + (item.data.length ?
                                base.html_temp('money_friend',item.data)
                                : '<li class="no_income"><i class="icon icon-no_income"></i></li>')
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
                var price_desc = '提现'+withdraw_statuss[+item.status];
                _html += '<li class="item-content">'
                    +'<div class="item-media">'+item.price+'元</div>'
                    +'<div class="item-inner">'
                        +'<div class="item-title">'+price_desc+'</div>'
                        +'<div class="item-after">'+item.date_time+'</div>'
                    +'</div>'
                +'</li>';
            });
            break;
        case 'share':
            _html = '<div class="popup popup_share">'
                +'<div class="share_icons_ct">'
                    +'<div class="row">'
                        +'<div class="col-33 share_item" data-type="wechat_friends">'
                            +'<div class="share_icon_ct">'
                                +'<span class="icon icon-wechat_friends"></span>'
                            +'</div>'
                            +'<p class="share_desc">微信朋友圈</p>'
                        +'</div>'
                        +'<div class="col-33 share_item" data-type="qq_space">'
                            +'<div class="share_icon_ct">'
                                +'<span class="icon icon-qq_space"></span>'
                            +'</div>'
                            +'<p class="share_desc">QQ空间</p>'
                        +'</div>'
                        +'<div class="col-33 share_item" data-type="sina">'
                            +'<div class="share_icon_ct">'
                                +'<span class="icon icon-sina"></span>'
                            +'</div>'
                            +'<p class="share_desc">新浪微博</p>'
                        +'</div>'
                    +'</div>'
                    +'<div class="row">'
                        +'<div class="col-50 share_item" data-type="wechat">'
                            +'<div class="share_icon_ct">'
                                +'<span class="icon icon-wechat"></span>'
                            +'</div>'
                            +'<p class="share_desc">微信好友</p>'
                        +'</div>'
                        +'<div class="col-50 share_item" data-type="qq">'
                            +'<div class="share_icon_ct">'
                                +'<span class="icon icon-qq"></span>'
                            +'</div>'
                            +'<p class="share_desc">手机QQ</p>'
                        +'</div>'
                    +'</div>'
                    +'<a href="#" class="button button-fill button-big share_cancel">取消</a>'
                +'</div>'
            +'</div>';
            break;
    }
    return _html;
};
