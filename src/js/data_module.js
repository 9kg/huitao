// web端调试(模拟app端方法)
var err_obj = function() {
    var _obj = {
        errcode: ~~(Math.random() * 3)
    };
    _obj.errcode === 2 && (_obj.msg = '测试返回一个错误的数据~~');
    var _random = Math.random();
    if (_random > 0.35) {
        _obj = {
            status: 1
        };
        if (_random > 0.8) {
            _obj = {
                status: ~~(Math.random() * 3)
            };
        }
    }
    return _obj;
};

// 原生交互接口
window.native = {
    encode: function(data) {
        setTimeout(function() {
            eval(data.callback + '(' + JSON.stringify(err_obj()) + ');');
        }, 100);
    },
    decode: function(data) {
        setTimeout(function() {
            eval(data.callback + '(' + JSON.stringify(err_obj()) + ');');
        }, 100);
    }
};

// 后台交互测试数据
window.back = {
    "types_goods": {
        "status": 1,
        "msg": "请求成功",
        "data": [{
            "id": "1",
            "name": "女装精品",
            "desc": "裙装、毛衣",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "2",
            "name": "鞋包配饰",
            "desc": "短靴、手提包",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "3",
            "name": "母婴童装",
            "desc": "婴儿车、奶瓶",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "4",
            "name": "贴身内衣",
            "desc": "文胸、保暖内衣",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "5",
            "name": "数码家电",
            "desc": "鼠标、手机壳",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "6",
            "name": "男装精品",
            "desc": "裤装、卫衣",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "7",
            "name": "美食特产",
            "desc": "坚果、冲饮",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "8",
            "name": "日用百货",
            "desc": "洗涤剂、纸巾",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "9",
            "name": "美妆各户",
            "desc": "润唇膏、粉底液",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "10",
            "name": "运动文体",
            "desc": "羽毛球、跳绳衫",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }]
    },
    "goods": {
        "status": 1,
        "msg": "请求成功",
        "data": [{
            "id": "1",
            "name": "【百家好世】拖把桶旋驱动好神拖手压",
            "stock": "4389",
            "price_pre": "109.90",
            "price_cut": "60",
            "price": "49.90",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "2",
            "name": "【百家好世】拖把桶旋驱动好神拖手压",
            "stock": "4389",
            "price_pre": "109.90",
            "price_cut": "60",
            "price": "49.90",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "3",
            "name": "【百家好世】拖把桶旋驱动好神拖手压",
            "stock": "4389",
            "price_pre": "109.90",
            "price_cut": "60",
            "price": "49.90",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "4",
            "name": "【百家好世】拖把桶旋驱动好神拖手压",
            "stock": "4389",
            "price_pre": "109.90",
            "price_cut": "60",
            "price": "49.90",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "5",
            "name": "【百家好世】拖把桶旋驱动好神拖手压",
            "stock": "4389",
            "price_pre": "109.90",
            "price_cut": "60",
            "price": "49.90",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "6",
            "name": "【百家好世】拖把桶旋驱动好神拖手压",
            "stock": "4389",
            "price_pre": "109.90",
            "price_cut": "60",
            "price": "49.90",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "7",
            "name": "【百家好世】拖把桶旋驱动好神拖手压",
            "stock": "4389",
            "price_pre": "109.90",
            "price_cut": "60",
            "price": "49.90",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "8",
            "name": "【百家好世】拖把桶旋驱动好神拖手压",
            "stock": "4389",
            "price_pre": "109.90",
            "price_cut": "60",
            "price": "49.90",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "9",
            "name": "【百家好世】拖把桶旋驱动好神拖手压",
            "stock": "4389",
            "price_pre": "109.90",
            "price_cut": "60",
            "price": "49.90",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "id": "10",
            "name": "【百家好世】拖把桶旋驱动好神拖手压",
            "stock": "4389",
            "price_pre": "109.90",
            "price_cut": "60",
            "price": "49.90",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }]
    },
    "banners": {
        "status": 1,
        "msg": "请求成功",
        "data": [{
            "link": "http://www.baidu.com",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "link": "#page_url",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }, {
            "link": "#page_url2",
            "icon_url": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg"
        }]
    },
    "messages": {
        "status": 1,
        "msg": "请求成功",
        "data": [{
            "date_time": "2016-11-11 11:11",
            "msg": "感谢你注册惠购，注册奖励已发送到您的账户，购物别忘领券哦~~"
        }, {
            "date_time": "2016-11-11 11:11",
            "msg": "恭喜您，您的好友成功下单签收，您获得了5元现金奖励，请查收~"
        }]
    },
    "incomes": {
        "status": 1,
        "msg": "请求成功",
        "data": [{
            "date_time": "2016-11-11 11:11",
            "friend_name": "蜡笔小新",
            "price": "5",
            "msg": "成功签收首单"
        }, {
            "date_time": "2016-11-11 11:11",
            "friend_name": "蜡笔小新",
            "price": "-5",
            "msg": "退单"
        }]
    },
    "withdrawals": {
        "status": 1,
        "msg": "请求成功",
        "data": [{
            "date_time": "2016-11-11 11:11",
            "price": "50",
            "msg": "提现中，预计下周二到账，请耐心等候。",
            "status": "0"
        }, {
            "date_time": "2016-11-11 11:11",
            "price": "20",
            "msg": "提现成功，请查收。",
            "status": "1"
        }, {
            "date_time": "2016-11-11 11:11",
            "price": "10",
            "msg": "提现失败，支付宝账号与姓名不符。",
            "status": "2"
        }]
    },
    "ranking_list": {
        "status": 1,
        "msg": "请求成功",
        "data": [{
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "price": "334",
            "friends_num": "38"
        }, {
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "price": "334",
            "friends_num": "38"
        }, {
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "price": "334",
            "friends_num": "38"
        }, {
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "price": "334",
            "friends_num": "38"
        }, {
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "price": "334",
            "friends_num": "38"
        }, {
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "price": "334",
            "friends_num": "38"
        }, {
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "price": "334",
            "friends_num": "38"
        }, {
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "price": "334",
            "friends_num": "38"
        }, {
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "price": "334",
            "friends_num": "38"
        }, {
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "price": "334",
            "friends_num": "38"
        }]
    },
    "invitations": {
        "status": 1,
        "msg": "请求成功",
        "data": [{
            "name": "两袖清风",
            "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
            "data": [{
                "date_time": "2016-11-11 11:11",
                "msg": "成功注册，奖励5元"
            }, {
                "date_time": "2016-11-11 11:11",
                "msg": "签收首单，奖励5元"
            }, {
                "date_time": "2016-11-11 11:11",
                "msg": "签收第二单，奖励5元"
            }, {
                "date_time": "2016-11-11 11:11",
                "msg": "签收一单，奖励2元"
            }, {
                "date_time": "2016-11-11 11:11",
                "msg": "签收一单，奖励2元"
            }]
        }]
    },
    "id_code": {
        "status": 2,
        "msg": "验证码不匹配"
    },
    "password": {
        "status": 2,
        "msg": "设置失败，密码长度不足"
    },
    "login": {
        "status": 1,
        "msg": "登录成功"
    },
    "withdraw_info": {
        "status": 1,
        "msg": "请求成功",
        "balance": "20.00"
    },
    "invitation_info": {
        "status": 1,
        "msg": "请求成功",
        "name": "一声不吭",
        "head_img": "http://icon.nipic.com/BannerPic/20161102/home/20161102123234.jpg",
        "balance": "20.00",
        "predict": "50.00",
        "total": "100.00",
        "withdrawn": "60.00",
        "processing": "20.00"
    },
    "withdraw": {
        "status": 1,
        "msg": "提现成功"
    }
};
