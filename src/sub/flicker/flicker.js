$(document).ready(function(){

    var url_interests = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList';
    var url_search = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';
    var key = 'ee948c58924e6837612c6235140abf62';

    get_flickr(url_interests,key);

    $('body').on('click','#gallery li a',function(e){
        e.preventDefault();
        var imgSrc = $(this).attr('href');
        create_pop(imgSrc);
    });

    $('body').on('click','.imgPop span',function(){
        remove_pop();
    });

    $('#search button').on('click',function(){        
        var tags = $('#search input[type=text]').val();      
        get_flickr(url_search, key, tags);
        $('#search input[type=text]').val('');
    })


    function get_flickr(url, key, tags){
        $.ajax({
            url : url,
            dataType : 'json',
            data : {
                api_key : key,
                per_page : 20,
                tags : tags,
                tagmode : 'any',
                privacy_filter : 5,
                format : 'json',
                nojsoncallback : 1
            }
            
        })
        .success(function(data){
            console.log(data);
            var item = data.photos.photo;

            $('#gallery ul').empty();

            $(item).each(function(){
                var farm = this.farm;
                var server = this.server;
                var imgId = this.id;
                var imgSec = this.secret;
                var tit = this.title;
                

                $('#gallery>ul').append(
                    $('<li>')
                        .append(
                            $('<a>')
                                .attr('href','https://farm'+farm+'.staticflickr.com/'+server+'/'+imgId+'_'+imgSec+'_b.jpg')
                                .append(
                                    $('<img>')
                                        .attr('src','https://farm'+farm+'.staticflickr.com/'+server+'/'+imgId+'_'+imgSec+'_m.jpg'),
                                        $('<h2>').text(tit)
                                )
                        )
                )
            })
        })
        .error(function(){
            alert('Fail to Load Flickr Images!!');
        })
    }

    function create_pop(src){
        $('body').append(
            $('<aside class="imgPop">')               
                .append(
                    $('<img>').attr('src',src)
                )
                .append(
                    $('<span>').text('close')
                )
                .hide()
                .fadeIn()
                .css('display','flex')
        )
    }

    function remove_pop(){
        $('.imgPop').fadeOut(500, function(){
            $(this).remove();
        })
    }

})


/*
    flickr image 주소 구조
    https://farm66.staticflickr.com/65535/49852239266_bef45a9bb8_b.jpg
    https://farm{farm}}.staticflickr.com/{server}/{imgId}_{imgSec}_b.jpg

    _s : 75,
    _t : 100,
    _m : 240,
    
    _b : 1025,
    _h : 1600,
    _k : 2048

*/