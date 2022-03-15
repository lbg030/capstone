import React from 'react';

class OtherPage extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
        ID:'',
        pageNo:'',
        addr:'',	//주소
        XPosWgs84:'',	//위도
        YPosWgs84:'',	//경도
    }
  }
    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value ,   //  input창 입력값을 바로바로 state값 초기화
        })
        console.log(this.state.location);
    }

    search=(e)=>{       //input창에 지역 쓰고 버튼 누르면 발동되는 함수
        e.preventDefault();

        const body = {
          pageNo: this.state.pageNo		// 현재 시,도이름을 body에 넣는다.
        }

        //http://localhost:5000/hospital
        fetch('http://localhost:5000/hospital',{ // localhost 서버 5000번 포트의 location에게 보낸다.
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(body),	// json화 해버리기
        })
        .then(res => res.json())    // 서버로부터 받음
        .then(json => {
            console.log(json);      
            console.log(json.list[0].addr._text);     //addr 주소 콘솔 출력
            console.log(json.list[0].XPosWgs84._text);    //XPosWgs84 위도 콘솔출력
            console.log(json.list[0].YPosWgs84._text);    //YPosWgs84 경도 콘솔출력

            this.setState({
              addr: json.list[0].addr._text, // 위에서 만든 state값 초기화
              XPosWgs84: json.list[0].XPosWgs84._text,
              YPosWgs84: json.list[0].YPosWgs84._text,
          })
        });
    }


    render() {
        return (
            <div className="main">
                <h1>코로나 검사소 병원 정보</h1>
                <form>
                    {/* <input placeholder="페이지개수" name="pageNo" onChange={this.onChange}/> */}
                    <button onClick={this.search}>병원데이터 가져오기</button>
                    <h1>예시 데이터</h1>
                    <h1>주소 : {this.state.addr}</h1>
                    <h1>위도 : {this.state.XPosWgs84}</h1>
                    <h1>경도 : {this.state.YPosWgs84}</h1>
                </form>
            </div>
        );
    }
}

export default OtherPage;