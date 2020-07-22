window.onload = function() {

    //카카오맵에 표시될 DOM지정
    var container = document.getElementById('map');

    //표시할 지역의 경도, 위도, 줌레벨 설정
    var options = {
        center: new daum.maps.LatLng(37.497942, 127.027621),
        level: 3
    };

    //map 인스턴스 생성
    var map = new daum.maps.Map(container, options);

    var branchOpt = [
        {
            title : '본점',
            latlng :  new daum.maps.LatLng(37.497942, 127.027621),
            imgSrc : 'img/map.png',
            imgSize : new daum.maps.Size(100,100),
            btn : document.getElementById('btn1')
        },
        {
            title : '지점1',
            latlng : new daum.maps.LatLng(37.508861, 127.0609603),
            imgSrc : 'img/map2.png',
            imgSize : new daum.maps.Size(100,100),
            btn : document.getElementById('btn2')
        },
        {
            title : '지점2',
            latlng : new daum.maps.LatLng(37.5250324,126.9252148),
            imgSrc : 'img/map3.png',
            imgSize : new daum.maps.Size(100,100),
            btn : document.getElementById('btn3')
        },
        {
            title : '지점3',
            latlng : new daum.maps.LatLng(37.5129949,127.1005435),
            imgSrc : 'img/map4.png',
            imgSize : new daum.maps.Size(100,100),
            btn : document.getElementById('btn4')
        }
    ];


    for(var i=0; i<branchOpt.length; i++){
        
        new daum.maps.Marker({
            map : map,
            position : branchOpt[i].latlng,
            title : branchOpt[i].title,
            image : new daum.maps.MarkerImage(branchOpt[i].imgSrc, branchOpt[i].imgSize)
        });

        (function(index){
            branchOpt[index].btn.onclick = function(){
                console.log(index);              
                map.panTo(branchOpt[index].latlng);
                return false;
            }
        })(i);       
        
    }   

    //스카이뷰 컨트롤 표시
    var mapTypeControl = new daum.maps.MapTypeControl();
    // map.addControl(mapTypeControl, daum.maps.ControlPosition.BOTTOMLEFT);

    //줌 컨트롤 표시
    // var zoomControl = new daum.maps.ZoomControl();
    // map.addControl(zoomControl, daum.maps.ControlPosition.BOTTOMRIGHT);

    //드래그기능 활성화
    setDraggable(true);

    function setDraggable(draggable) {
        map.setDraggable(draggable);
    }

    //줌기능 활성화
    setZoomable(false);

    function setZoomable(zoomable) {
        map.setZoomable(zoomable);
    }

    //교통정보 표시
    var t_on =  this.document.getElementById('t_on');
    var t_off =  this.document.getElementById('t_off');

    t_on.onclick =function(){
        map.addOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);
        setZoomable(true);
        return false;
    }
    t_off.onclick =function(){
        map.removeOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);
        setZoomable(false);
        return false;
    }


    
}