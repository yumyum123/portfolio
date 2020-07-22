$(document).ready(function(){

	/*---------변수선언---------- */

	var slideboxInfo = [
		{imgSrc:'../img/slide1.jpg'},
		{imgSrc:'../img/slide2.jpg'},
        {imgSrc:'../img/slide3.jpg'},
        {imgSrc:'../img/slide4.jpg'},
        {imgSrc:'../img/slide5.jpg'}
	];

	var $slidebox = $('.slidebox ul');
	var $slide_prev = $('#slide>.inner>.prev');
	var $slide_next = $('#slide>.inner>.next');


/*---------이벤트 바인딩---------- */


	//페이지 로딩시 첫번째 순서값으로 슬라이더 초기화
	showSlide(0);
	createList($slidebox,slideboxInfo);
	var total =  $(".slidebox ul li").length;
	total = total-1;
	//alert(total);
	
	//다음버튼 클릭 시
	$slide_next.on("click",function(e){
		e.preventDefault();
		
		var i = $(".slidebox ul li.on").index();
		
		if(i==total){
			i=0;
		}else{
			i++;
		}
		showSlide(i);
	})
	
	//이전버튼 클릭시
	$slide_prev.on("click",function(e){
		e.preventDefault();
		
		var i = $(".slidebox ul li.on").index();
		if(i==0){
			i=total;
		}else{
			i--;
		}
		showSlide(i);
	})

/*---------함수선언---------- */

	
	//슬라이더 패널정의 함수
	function showSlide(index){
		$(".slidebox ul li").stop().fadeOut().removeClass("on");
		$(".slidebox ul li").eq(index).stop().fadeIn(1000).addClass("on");
	}	

// slidebox 이미지 연결
	function createList(target,data){
		for(var i=0; i<slideboxInfo.length; i++){
			var imgSrc = data[i].imgSrc;

			target.append(
				$('<li>')
				.css({
					backgroundImage :'url('+imgSrc+')'
				})
			)
		}
		target.children('li').eq(0).addClass('on');
	}

});



