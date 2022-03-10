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
  // state object로 관리 -> 나중에 객체 수정하기
  const [state, setState] = useState([]); // 전체 데이터 배열로 저장
  async function ApiCall() {
    try {
      const obj = await axios.get("http://localhost:3001/backend/patient/age");
      const array = obj.data;
      console.log(array); // [{...}. {...}, {...}]
      console.log(array[0]); // {id:1, age:20}

      // state에 array 배열을 담고 싶음..!  => 근데 state가 object, object로 출력됨.. WHY?
      // console.log(`before state ${state}`);
      setState((state) => [...state, array]);
      // console.log(state);
    } catch (err) {
      console.log(err);
    }
  }
  // usestate useEffect로 비동기 처리 -> 렌더링 전에 데이터 받기 위해!
  useEffect(() => {
    ApiCall();
  }, []);

  //graphql : 프론트에서 쿼리 요청 -> 백에서 처리 (지금은 사용 X)
  // filter, reduce -> 배열 만들기
  // 임시 데이터 for chartist 테스트
  const tmp = [
    { id: 1, age: 20 },
    { id: 2, age: 30 },
    { id: 3, age: 40 },
    { id: 4, age: 10 },
  ];

  return (
    <>
      <Container fluid>
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
                        "10대",
                        "20대",
                        "30대",
                        "40대",
                        // "12:00AM",
                        // "3:00PM",
                        // "6:00PM",
                        // "9:00PM",
                        // "12:00PM",
                        // "3:00AM",
                        // "6:00AM",
                      ],
                      series: [
                        [tmp[0].id, tmp[1].id, tmp[2].id, tmp[3].id],
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
                      labels: ["40%", "20%", "40%"],
                      series: [40, 20, 40],
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
