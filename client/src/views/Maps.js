/*global kakao */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Otherpage from "../OtherPage";

const Maps = () => {
  const [place, setPlace] = useState([]);

  useEffect(() => {
    // we will use nginx to redirect it to the proper URL
    axios.get("/api/hospital").then((response) => {
      // console.log(response);
      setPlace(response.data.rows);
      // console.log(place);
    });
  }, []);

  const mapscript = () => {
    // console.log(place);
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.29742255286631, 126.8355379155881),
      level: 10,
    };

    //map
    const map = new kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

      displayMarker(locPosition, message);
    }

    function displayMarker(locPosition, message) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
    //지금 안담기는 이유가 처음에 빈 리스트여서 그래서 안담기는거 같은데...
    place.forEach((el) => {
      var infowindow = new kakao.maps.InfoWindow({
        map: map, // 인포윈도우가 표시될 지도
        position: new kakao.maps.LatLng(el.YPosWgs84, el.XPosWgs84),
        content: el.yadmNm,
      });
      // 마커를 생성합니다
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.YPosWgs84, el.XPosWgs84),
        //마커에 hover시 나타날 title
        title: el.yadmNm,
      });
    });
  };

  useEffect(() => {
    mapscript();
  }, [place]);
  // console.log(place);
  return (
    <>
      <div id="map" style={{ width: "50vw", height: "50vh" }}></div>
      <Otherpage />
      {/* <button onClick={mapscript}> 새로고침</button> */}
    </>
  );
};

export default Maps;
