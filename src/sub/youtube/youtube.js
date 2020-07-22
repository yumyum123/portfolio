$(document).ready(function(){
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';    
    var key = 'AIzaSyCsPU6dE3fxTkA1hngu573olt3olVDoyic';
    var playlistId = 'PL9GOLFF44JHm9LXcqvdfi8yuWVbBgL-Ev'; 

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 10,
        playlistId: playlistId
    }

    call_data();

    $('body').on('click','#list>li',function(){
        var vid_id = $(this).attr('data-vid'); 
        var vid_tit = $(this).find('h2').text();
        var vid_des = $(this).find('p').text();      
        create_pop(vid_id, vid_tit, vid_des);
    });

    $('body').on('click','.pop span',function(){
        $('.pop').fadeOut(500,function(){
            $(this).remove();
        })
    })

   //layerpopup 생성 
    function create_pop(id, tit, des ){
        $('body').append(
            $('<aside class="pop">').css({
                width:1000, padding:30, boxSizing:'border-box', 
                position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                zIndex:4, backgroundColor:'#000'
            })
            .append(
                $('<iframe>').attr({ width:'100%', height:700, src:'https://www.youtube.com/embed/'+id, frameborder:0 , allowfullscreen:true}),
                $('<span>').text('close').css({
                    position:'absolute', top:20, right:20, fontSize:12, color:'#fff', cursor:'pointer', 
                }),
                $('<h2>').text(tit).css({color:'#fff' }),
                $('<p>').text(des).css({color:'#fff'})
            )
        )  
    }


    //데이터 호출
    function call_data(){
        $.ajax({
            url : URL,
            dataType : 'jsonp',
            data : options
        })
        .success(function(data){
            console.log(data.items);
            creat_list(data.items);
        })
        .error(function(){
            alert('FAIL to loading');
        })
    }
    //리스트 생성
    function creat_list(data){
        console.log(data);
        $(data).each(function(){
            var thumb = this.snippet.thumbnails.medium.url;
            var title = this.snippet.title.substring(0,30);
            var details = this.snippet.description.substring(0,30);
            var details_len = details.length;
            var vid_id = this.snippet.resourceId.videoId;
            var date = this.snippet.publishedAt.substring(0,10); //날짜 앞부분만 보이게 자르기
            $('#list').append(
                $('<li>')
                .attr({'data-vid':vid_id})
                .append(
                    $('<div class="pic">').css({backgroundImage:'url('+thumb+')'}),
                    $('<div class="details">')
                    .append(
                        $('<h2>').text(title),
                        $('<p>').text(details),
                        $('<span>').text(date)
                    )
                )
            )
        })
    }

    


})