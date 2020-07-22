$(document).ready(function(){	

	var $wrap = $('#wrap');

	$($wrap).on('mouseover',function(){
		$($wrap).addClass('on');
		$('.txtBox').addClass('on');
		
		
	});

	$($wrap).on('mouseleave',function(){
		$($wrap).removeClass('on');
		$('.txtBox').removeClass('on');
	});



/*---------함수정의부분---------- */

	//선택자안의 문자열을 변수에 옮겨담음
	var txt = $('.txt').text();
	$('.txt').text(' ');
	console.log(txt.length);

	//문자열은 es6에서 for of 반복문으로 순환을 돌 수 있음




	

	var num = 1;
	for(let i of txt){
		console.log(i);

		$('.txt').append(
			$('<span>').text(i).css({
				transitionDelay:(1+0.1*num)+'s',
				transitionDuration:'1s'
			})
		)
		num++;
	}


});





