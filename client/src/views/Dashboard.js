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
  const [totalData, setTotalData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]); // 전체 데이터 배열로 저장
  const [date, setDate] = useState(""); // 입력한(확인할) 날짜

  const onChange = (e) => {
    setDate(e.target.value);
  };

  // ApiCall axios로 서버에 요청
  const apiCall = async () => {
    try {
      console.log("hello api call");
      const a = await axios.post("http://localhost:3002/covid", date);
      // console.log(a);
    } catch (err) {
      console.log(err);
    }
  };

  // DB에 적재된 데이터 가져오기
  const covidData = async (e) => {
    try {
      e.preventDefault(); // 새로고침 방지 (data 받아와야 돼서 새로고침되면 안됨)
      const tmp = await axios.post("http://localhost:3002/dataCovid", { date });
      if (!tmp.data[0]) {
        console.log("empty!!! apiCall!!");
        await apiCall();
        console.log("After apiCall");
      }
      tmp.data.forEach((element) => {
        var index;
        switch (element.gubun) {
          case "서울":
            index = 0;
            break;
          case "세종":
            index = 1;
            break;
          case "울산":
            index = 2;
            break;
          case "대전":
            index = 3;
            break;
          case "광주":
            index = 4;
            break;
          case "인천":
            index = 5;
            break;
          case "대구":
            index = 6;
            break;
          case "부산":
            index = 7;
            break;
          case "경기":
            index = 8;
            break;
          case "제주":
            index = 9;
            break;
          case "경남":
            index = 10;
            break;
          case "경북":
            index = 11;
            break;
          case "전남":
            index = 12;
            break;
          case "전북":
            index = 13;
            break;
          case "충남":
            index = 14;
            break;
          case "충북":
            index = 15;
            break;
          case "강원":
            index = 16;
            break;
        }
        var arr;
        setTotalData((prev) => {
          arr = [...prev]; // 복사
          // arr[index] = element.defCnt;
          arr[index] = element.deathCnt;
          return arr;
        });
      });
    } catch (err) {
      console.log("error!");
      console.log(err);
    }
  };

  return (
    <>
      <Container fluid>
        <div>
          <form>
            <input
              placeholder="시작날짜(20220101형태)"
              name="startCreateDt"
              onChange={onChange}
            />
            <button onClick={covidData}>확진자 수 데이터 가져오기</button>
            <h1>예시 데이터</h1>
            <h1>시작 날짜 : {date}</h1>
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
                        "서울", // 특별시 1개
                        "세종", // 특별자치시 1개
                        "울산", // 광역시 6개
                        "대전",
                        "광주",
                        "인천",
                        "대구",
                        "부산",
                        "경기", // 도 9개
                        "제주",
                        "경남",
                        "경북",
                        "전남",
                        "전북",
                        "충남",
                        "충북",
                        "강원",
                      ],
                      series: [
                        [...totalData], // 배열!
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 5000,
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
                      series: [40, 20, 40],
                      // series: [
                      //   (count / totalCount) * 100,
                      //   (count10 / totalCount) * 100,
                      //   (count20 / totalCount) * 100,
                      //   (count30 / totalCount) * 100,
                      //   (count40 / totalCount) * 100,
                      //   (count50 / totalCount) * 100,
                      // ],
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
