/**
 * Created by Administrator on 2016/11/28.
 */
//当窗口发生改变时，大窗口显示大背景图，小窗口显示小图片
$(function () {
    function resize() {
        var windowWidth = $(window).width();
        $('#main_ad>.carousel-inner>.item').each(function (i, item) {
            if (windowWidth > 768) {
                var lgIMG = $(item).data('lg-img');
                $(item).css("backgroundImage", "url('" + lgIMG + "')");
            } else {
                var smIMG = $(item).data('sm-img');
            }
            if (smIMG) {
                $(item).html('<img src="' + smIMG + '">');
            } else {
                $(item).empty();
            }
        })
    }

    $(window).on('resize', resize).trigger('resize');
    //初始化tooltip
    $('[data-toggle="tooltip"]').tooltip();
//控制第二个tab选项卡，当屏幕小于ul宽度时，出现滚动条
    var windowWidth = $(window).width();
    var ulWidth = 0;
    $('.nav-tabs>li').each(function (i, v) {
        //console.log($(v).width())
        ulWidth += $(v).width();
    })
    if (windowWidth < ulWidth) {
        $('.nav-tabs').width(ulWidth);
        $('.nav-tabs').parent().css('overflow-x', 'scroll')
    }
    else {
        $('.nav-tabs').width('auto');
        $('.nav-tabs').parent().css('overflow-x', 'hidden')
    }

    //新闻标题注册点击事件
    $('#newslist .icon-news ul li a').on('click', function () {
        var newTitle = $(this).data('newstitle');
        //alert(newTitle)
        $('#newslist #newtitlewrap').text(newTitle);
    })
    //轮播图触屏效果
    //1.先监听触屏时的横坐标和触屏结束后的横坐标
    //2.startX>endX prev 否则即next 注意 要设定一个阀值，如果不设置 触发太过灵敏
    //注意 touchend事件不能捕获坐标值 要用touchmove
    var startX, endX;
    var distance = 50;
    $('.carousel').on('touchstart', function (e) {
        startX = e.originalEvent.changedTouches[0].clientX;
        //console.log();
    })
    $('.carousel').on('touchmove', function (e) {
        endX = e.originalEvent.changedTouches[0].clientX;
    })
    $('.carousel').on('touchend', function (e) {
        if (Math.abs(startX - endX) > distance) {
    //说明有运动方向了
    // 再判断方向
            startX>endX?$(this).carousel('next'):$(this).carousel('prev');
        }
    })


})