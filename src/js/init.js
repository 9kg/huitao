$(function() {
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
    }).on('click', '.goods_list .icon-share,[data-share]', function(e) {
        var _link = $(this).data('link');

        var popupHTML = '<div class="popup popup_share">'
            +'<div class="share_icons_ct">'
                +'<div class="row">'
                    +'<div class="col-33 share_item" data-type="wechat_friends">'
                        +'<div class="share_icon_ct">'
                            +'<span class="icon icon-settings"></span>'
                        +'</div>'
                        +'<p class="share_desc">微信朋友圈</p>'
                    +'</div>'
                    +'<div class="col-33 share_item" data-type="qq_space">'
                        +'<div class="share_icon_ct">'
                            +'<span class="icon icon-settings"></span>'
                        +'</div>'
                        +'<p class="share_desc">QQ空间</p>'
                    +'</div>'
                    +'<div class="col-33 share_item" data-type="sina">'
                        +'<div class="share_icon_ct">'
                            +'<span class="icon icon-settings"></span>'
                        +'</div>'
                        +'<p class="share_desc">新浪微博</p>'
                    +'</div>'
                +'</div>'
                +'<div class="row">'
                    +'<div class="col-50 share_item" data-type="wechat">'
                        +'<div class="share_icon_ct">'
                            +'<span class="icon icon-settings"></span>'
                        +'</div>'
                        +'<p class="share_desc">微信好友</p>'
                    +'</div>'
                    +'<div class="col-50 share_item" data-type="qq">'
                        +'<div class="share_icon_ct">'
                            +'<span class="icon icon-settings"></span>'
                        +'</div>'
                        +'<p class="share_desc">手机QQ</p>'
                    +'</div>'
                +'</div>'
                +'<a href="#" class="button button-fill button-big share_cancel">取消</a>'
            +'</div>'
        +'</div>'
        $.popup(popupHTML);
    });


});
