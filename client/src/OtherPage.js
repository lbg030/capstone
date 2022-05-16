import Axios from "axios";
import React, { useState } from "react";

function OtherPage() {
  const [data, setData] = useState({
    addr: "",
    XPosWgs84: "",
    YPosWgs84: "",
  });

  async function Apicall() {
    try {
      await Axios.post("/hospital").then((returnData) => {
        console.log(returnData);
        if (returnData) {
          data.addr = setData(returnData.list[0].addr._text);
        } else {
          alert("가져오기 실패");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="main">
      <h1>코로나 검사소 병원 정보</h1>
      <form>
        <button onClick={Apicall}>병원데이터 가져오기</button>
        <h1>예시 데이터</h1>
        <h1>주소 : {data.addr}</h1>
      </form>
    </div>
  );
}

export default OtherPage;
