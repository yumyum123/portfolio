$(document).ready(function(){

    /*---------이벤트 바인딩---------- */
    
        //렌더링된 리스트 갯수
        var ListNum = 3;
        //더보기 누를시 화면에 렌더링 될 갯수
        var RenderListNum = 1;
        //렌더링 될 줄 수
        var CurrentRenderListRow = 1;
        var ListInfo;
        var url ='static/datelist.json';
        var url1 ='static/datelist1.json';
        callData(url);

        $('#notice>.inner>.txt>p').on('click',function(){
            callData(url1);
        })


        //ajax 데이터 호출
        function callData(url){
            $.ajax({
                url:url,
                success : function(data){
                    console.log(data);
                    $(data).each(function(index,item){
                        // var tit = item.title;
                        var today = data[index].today;
                        var date = data[index].date;
                        var name = data[index].name;
                        var title = data[index].title;
                        var text = data[index].text;
        
        
                        if(data != null && data.length > 0){
                            $('#date>.inner').append(
                                $('<article>')
                                    .append(
                                        $('<div class="today">')
                                        .append(
                                            $('<p>').text(today)
                                                .append(
                                                    $('<span>').text(date)
                                                )
                                        )
                                    )
                                    .append(
                                        $('<h2>').text(name)
                                    )
                                    .append(
                                        $('<p>').text(title)
                                    )
                                    .append(
                                        $('<span>').text(text)
                                    )
                                    // .appendChild()(
                                    // 	$('<div class="btn_more">')
                                    // )
                                
                            )
                        }
                        
                    })
                    
                },
                error : function(){
                    console.log('Fail to data load!!!');
                }
            })
        }


        
        //더보기 버튼 클릭 시 리스트 렌더링
        $(".btn_more").on("click",function(){
            if(RenderListNum+CurrentRenderListRow <= ListInfo.length){
                renderList(ListInfo);
            }else(
                alert("LAST PAGE!")
            )
        });
    
    });
    
    
    
    