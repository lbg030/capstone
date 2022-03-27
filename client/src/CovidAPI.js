import React from "react";

class CovidAPI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startCreateDt: "", // 검색 시작 날짜
      endCreateDt: "", // 검색 마지막 날짜
      stdDay: "",
      gubun: "",
      deathCnt: "",
      defCnt: "",
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, //  input창 입력값을 바로바로 state값 초기화
    });
    console.log(this.state.location);
  };

  search = (e) => {
    //input창에 지역 쓰고 버튼 누르면 발동되는 함수
    e.preventDefault();

    const body = {
      // 시작,종료날짜 입력
      startCreateDt: this.state.startCreateDt,
      endCreateDt: this.state.endCreateDt,
    };

    //http://localhost:3002/hospital
    fetch("http://localhost:3002/covid", {
      // localhost 서버 3002번 포트의 location에게 보낸다.
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), // json화 해버리기
    })
      .then((res) => res.json()) // 서버로부터 받음
      .then((json) => {
        console.log(json[1]);
        console.log(json[1].gubun._text);
        console.log(json[1].deathCnt._text);
        console.log(json[1].defCnt._text);

        this.setState({
          stdDay: json[1].stdDay._text,
          gubun: json[1].gubun._text,
          deathCnt: json[1].deathCnt._text,
          defCnt: json[1].defCnt._text,
        });
      });
  };

  render() {
    return (
      <div className="main">
        <h1>코로나 일일 확진자 API</h1>
        <form>
          <input
            placeholder="시작날짜(20220101형태)"
            name="startCreateDt"
            onChange={this.onChange}
          />
          <input
            placeholder="종료날짜(20220101형태)"
            name="endCreateDt"
            onChange={this.onChange}
          />
          <button onClick={this.search}>확진자 수 데이터 가져오기</button>
          <h1>예시 데이터</h1>
          <h1>날짜 : {this.state.stdDay}</h1>
          <h1>지역 : {this.state.gubun}</h1>
          <h1>확진자 : {this.state.defCnt}</h1>
          <h1>사망자 : {this.state.deathCnt}</h1>
        </form>
      </div>
    );
  }
}

export default CovidAPI;
