$(function() {  

	var $wrap = $("#visual>.inner");	//슬라이더 등록
	var $article = $('#visual>.inner article');
	var duration = 400; //좌우 슬라이드 속도
	var threshold = 10; //최소 스와이핑 거리
	var cancelThreshold = 50; //캔슬 스와이핑 거리(역방향)
	var num = 0;	
	var isRight = true;	
	var isLeft = false;
	
	
	
	$wrap.swipe({	
		threshold : 10,	 //스와이프시 swipe함수를 호출하기위한 최소 거리값
		cancelThreshold : 50,	//스와이프시 swipe함수를 취소하기위한 최소 역방향 거리값
		//스와이프를 하는도중에 얻는 정보값
		swipeStatus : function(event, phase, direction, distance){

			console.log(phase);
			console.log(direction);

			//현재 스와이프 하고 있는 방향이 왼쪽이면,
			if(direction=="left"){

				//만약에 이미 prev()함수가 호출된 상태면 아예 이벤트를 막기 위함
				if(isLeft){		
					
					//밀고 있는 거리값을 실시간으로 article의 rotateY값에 연동
					num = num-(distance/1000);					
					$article.css({
						transform: 'rotateY('+num+'deg)'
					});					
				}

			}

			//현재 스와이프 하고 있는 방향이 오른쪾이면 
			if(direction=="right"){	

				//만약에 이미 next()함수가 호출된 상태면 아예 이벤트를 막기 위함
				if(isRight){	
					
					//밀고있는 거리값만큼 aritcle의 rotateY값을 연동
					num = num+(distance/1000);				
					$article.css({
						transform: 'rotateY('+num+'deg)'
					});					
				}
			}			
			
			//밀다가 다시 역방향으로 캔슬시켰으면
			if(phase=="cancel"){
				//오른쪽으로 밀다 캔슬시키면 앞면인 prev함수 호출
				if(isRight){
					prev();
				}
				//왼쪽으로 밀다 캔슬시키면 뒷면이 next함수 호출
				if(isLeft){
					next();
				}
			}	

			//마우스를 떼지 않은 상태에서 계속 스와이프를 화면 왼쪽 바깥까지 나가면 
			//모션이 멈추기 때문에 왼쪽 방향으로 이벤트 상태가 end일떄는 무조건 초기화모션실행
			if(phase=="end" && direction=="left"){				
				prev();		
			}	
			
		},	
		//스와이프 함수가 실행될떄 처리할 정보값
		swipe : function(event, direction){		
		
			if(direction=="left"){
				if(isLeft) prev();
			}
			if(direction=="right"){
				if(isRight) next();
			}			
			
		}		
	});	

	//앞면이 보이는 모션 함수
	function prev(){
		//초기상태로 다시 확대
		$('section').removeClass('on');

		//이미 앞면이 보이는 상태면 왼쪾으로 스와이프 하더라도 중복해서 prev함수를 호출하지 않기 위함
		isLeft = false;

		//만약에 회전값이 0보다 작지 않으면 0도가 될떄까지 계속 num값을 뺴줌 (0deg)로 회전
		timer = setInterval(function(){		
			if(num>0){
				num-=2;
			}else{
				clearInterval(timer);
				num=0;
				//앞면이 보이는 모션이 완료가 되면 다시 오른쪽 방향으로 스와이프 이벤트를 발생시킬수 있게
				//isRight을 true로 활성화
				isRight = true;
			}		
			$article.css({
				transform : 'rotateY('+num+'deg)'
			});
		},10);

	}

	//뒷면이 보이는 함수
	function next(){
		//뒷면일시 축소
		$('section').addClass('on');	
		
		//이미 뒷면이 보이는 상태면 오른쪽으로 스와이프 하더라도 중복해서 next함수를 호출하지 않기 위함
		isRight = false;

		//만약에 회전값이 180보다 크지 않으면 180도가 될떄까지 계속 num값을 증가 (180deg)로 회전
		timer = setInterval(function(){
			//console.log(num);
			if(num<178){
				num+=2;
			}else{
				clearInterval(timer);
				num=180;	
				//앞면이 보이는 모션이 완료가 되면 다시 왼쪽 방향으로 스와이프 이벤트를 발생시킬수 있게
				//isLeft true로 활성화
				isLeft = true;		
			}		
			$article.css({
				transform : 'rotateY('+num+'deg)'
			});
		},10);		
	}
	
	//모바일 경우

	/*
	// 브라우저 로딩시 rwd호출
    rwd();
	//브라우저가 리사이즈 될때마다 rwd()호출
    $(window).on('resize',function(){
		rwd();
	 });
    function rwd(){
        var wid =$(window).width();
        console.log(wid);

        if (wid>=600){
			$('#visual .inner section').removeClass('mobile');
		}else{
			$('#visual .inner section').addClass('mobile');
			alert('dd00');
		}
	} */
});




