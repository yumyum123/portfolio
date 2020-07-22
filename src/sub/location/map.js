window.onload = function(){

    //카카오맵에 표시될 DOM지정
    //찾는 값이 id가 아닌 class이면 -> 
    // var container = document.getElementByClassName('map)[0];
    var container = document.getElementById('map');

    //표시할 지역의 경도, 위도, 줌레벨 설정
    var options = {
        center: new daum.maps.LatLng(37.5059691,126.7490634),
        level: 3
    };

    //map 인스턴스 생성
    var map = new daum.maps.Map(container, options);


    // 마커가 표시될 위치 
    var markerPosition  = new daum.maps.LatLng(37.5059691,126.7490634); 

    // 마커를 생성
    var marker = new daum.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);

    //스카이뷰 컨트롤 표시
    var mapTypeControl = new daum.maps.MapTypeControl();
    map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPLEFT);

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
    //map.addOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);       

   // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    var iwContent = '<div style="padding:10px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        position : iwPosition, 
        content : iwContent 
    });
    
    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map, marker); 
   
}