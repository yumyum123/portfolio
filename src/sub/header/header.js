$(document).ready(function(){	

    var $skip_a = $('#skip a');
    var $header = $('#header');
    var $gnb = $('#gnb');
    var $gnb_li = $gnb.children('li');
    var $gnb_li_a = $gnb_li.children('a');
    var $gnb_li_ul = $gnb_li.children('ul');
    var $gnb_li_ul_li_a = $gnb_li_ul.find('a');
    var $header_hover = $('#header').mouseenter();

    var ht_arr = [];
    var ht_1depth = $gnb_li_a.outerHeight();
    var ht_max = 0;
    var ht_header = $header.height();
    var bgColor =$gnb_li_ul_li_a.css('background-color');
    var speed = 500;
    var doneClose = true;

    //스킵네비 이벤트
    $skip_a.on('focusin',function(){
        $(this).addClass('on');

    });
    $skip_a.on('focusout',function(){
        $(this).removeClass('on');

    });

    //로딩시 bgGnb의 높이값 설정
    getSubMaxHeight();

    //gnb영역에 마우스 오버시 2depth. bgGnb 보임
    $header.on('mouseenter',openSub);    

    //gnb영역에 마우스 아웃시 2depth, bgGnb안보임
    $header.on('mouseleave', closeSub);   

    //gnb 1depth a태그에 포커스(탭키) 이벤트 연결   
    $gnb_li_a.on('focusin',openSub);    
    $gnb_li.last().find('a').last().on('focusout',closeSub);

    //1depth메뉴 활성화 유지    
    $gnb_li.on('mouseenter',function(){
        $(this).children('a').addClass('on');
    });
    $gnb_li.on('mouseleave',function(){
        $(this).children('a').removeClass('on');
    });

    $header.css('background','rgba(0,0,0,0)');

    function getSubMaxHeight(){
        $gnb_li.each(function(i){
            var current_ht = $(this).children('ul').height();
            ht_max = Math.max(ht_max, current_ht);
            //ht_arr.push( $(this).children('ul').height() );
            //ht_max = Math.max(ht_max, ht_arr[i]);
        });       
    }

    $('.btnCall').on('click',function(e){
		e.preventDefault();
		if(isAnimated){
			isAnimated = false;	  
			$('#m_gnb').stop().slideDown();
			$('.btnCall').addClass('on');
		}
		else{
			$('#m_gnb').stop().slideUp();
			$('.btnCall').removeClass('on');
			isAnimated =true;
		}
	})

    function openSub(){
        var isBgGnb = $('.bgGnb').length;

        if(!isBgGnb){
            $header.prepend(
                $('<div class="bgGnb">').css({
                    width:'100%', height:ht_max,
                    backgroundColor:bgColor,
                    position:'absolute', top:ht_header, left:'0%',
                    zIndex:'1', display:'none'
                })
            );
        }  
        
        if(doneClose){
            doneClose = false;
            $header.css('background','rgba(0,0,0,1)');
            $gnb_li_ul.stop().slideDown(speed);
            $('.bgGnb').stop().slideDown(speed);
        }
        
    }

    function closeSub(){
        $gnb_li_ul.slideUp(speed-300,function(){
            $header.css('background','rgba(0,0,0,0)');
        });
        $('.bgGnb').slideUp(speed,function(){
            $(this).remove();
            doneClose = true;
        });
    }

    var $boxs = $('section>div');
    var posArr = [];

    $boxs.each(function(){
        posArr.push( $(this).offset().top);
    });

    console.log(posArr);

    $(window).on('scroll',function(){
        var scroll = $(this).scrollTop();

        for(var i =0; i<posArr.length; i++){
            if(scroll>posArr[1]){
                $('#header').css('background','rgba(255,255,255,1)');
                $('#header').css('border-bottom','1px solid rgb(221, 221, 221)');
            }
            if(scroll<posArr[1]){
                $('#header').css('background','rgba(0,0,0,1)');
                $('#header').css('border-bottom','1px solid rgba(255, 255, 255, 0.1)');
            }
        }
    });
});
