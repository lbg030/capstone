import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";

function Dashboard() {
  // const [totalData, setTotalData] = useState([]); // 전체 데이터 배열로 저장
  const [date, setDate] = useState({
    startCreateDt: "", // 검색 시작 날짜
    endCreateDt: "", // 검색 마지막 날짜
  }); // 전체 데이터 배열로 저장

  const onChange = (e) => {
    setDate({
      [e.target.name]: e.target.value, //  input창 입력값을 바로바로 state값 초기화
    });
    // console.log(this.state.location);
  };

  // ApiCall axios로 서버에 요청
  async function ApiCall() {
    try {
      const params = {
        // 시작,종료날짜 입력
        // startCreateDt: startCreateDt,
        // endCreateDt: state.endCreateDt,
        startCreateDt: date[startCreateDt],
        endCreateDt: date[endCreateDt],
      };
      const obj = await axios.post("http://localhost:5000/covid", params);
    } catch (err) {
      console.log(err);
    }
  }

  // usestate useEffect로 비동기 처리 -> 렌더링 전에 데이터 받기 위해!
  useEffect(() => {
    ApiCall();
  }, []);

  const [totalCount, setTotalCount] = useState(0);
  const [count, setCount] = useState(0);
  const [count10, setCount10] = useState(0);
  const [count20, setCount20] = useState(0);
  const [count30, setCount30] = useState(0);
  const [count40, setCount40] = useState(0);
  const [count50, setCount50] = useState(0);

  useEffect(() => {
    setTotalCount(totalData.length);
    setCount(totalData.filter((obj) => obj.age < 10 || obj.age >= 60).length); // 비동기 함수
    setCount10(totalData.filter((obj) => obj.age >= 10 && obj.age < 20).length); // 비동기 함수
    setCount20(totalData.filter((obj) => obj.age >= 20 && obj.age < 30).length); // 비동기 함수
    setCount30(totalData.filter((obj) => obj.age >= 30 && obj.age < 40).length); // 비동기 함수
    setCount40(totalData.filter((obj) => obj.age >= 40 && obj.age < 50).length); // 비동기 함수
    setCount50(totalData.filter((obj) => obj.age >= 50 && obj.age < 60).length); // 비동기 함수
  });

  return (
    <>
      <Container fluid>
        <div>
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
            {/* <h1>날짜 : {this.state.stdDay}</h1>
            <h1>지역 : {this.state.gubun}</h1>
            <h1>확진자 : {this.state.defCnt}</h1>
            <h1>사망자 : {this.state.deathCnt}</h1> */}
          </form>
        </div>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">확진자 연령별 현황</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "어린이",
                        "10대",
                        "20대",
                        "30대",
                        "40대",
                        "50대",
                      ],
                      series: [
                        [count, count10, count20, count30, count40, count50],
                        // [287, 385, 490, 492, 554, 586, 698, 695],
                        // [67, 152, 143, 240, 287, 335, 435, 437],
                        // [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 10,
                      // high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">확진자 연령별 현황</Card.Title>
                <p className="card-category">Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [
                        "어린이",
                        "10대",
                        "20대",
                        "30대",
                        "40대",
                        "50대",
                      ],
                      // series: [40, 20, 40],
                      series: [
                        (count / totalCount) * 100,
                        (count10 / totalCount) * 100,
                        (count20 / totalCount) * 100,
                        (count30 / totalCount) * 100,
                        (count40 / totalCount) * 100,
                        (count50 / totalCount) * 100,
                      ],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Bounce <i className="fas fa-circle text-warning"></i>
                  Unsubscribe
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
