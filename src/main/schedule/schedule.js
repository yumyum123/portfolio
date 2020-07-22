$(document).ready(function(){

	/*---------변수선언---------- */
	var $tab_btn = $('.tab_btn>li>a');
	var $tab_article = $('#schedule>.inner>.content>div');


/*---------이벤트 바인딩---------- */
	//탭메뉴
	$tab_btn.on({
		'click' : function(e){
			e.preventDefault();
			var $this = $(this);
			activation($this);
		},
		'focusin' : function(e){
			e.preventDefault();
			var $this = $(this);
			activation($this);
		}
	})
	
/*---------함수선언---------- */

	//탭메뉴함수
	function activation(item){
		var target = item.attr('href');

		$tab_article.removeClass('on');
		$(target).addClass('on');

		$tab_btn.removeClass('on');
		item.addClass('on');
	}

});



