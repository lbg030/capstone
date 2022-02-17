/*global kakao */
import React, { useEffect } from "react";
import { department } from "./department";

export default function Map() {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.29742255286631, 126.8355379155881),
      level: 3,
    };

    //map
    const map = new kakao.maps.Map(container, options);

    department.forEach((el) => {
      // 마커를 생성합니다
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title,
      });
    });
  };

  return <div id="map" style={{ width: "50vw", height: "50vh" }}></div>;
}
