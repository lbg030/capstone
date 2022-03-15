import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import MainComponent from "./MainComponent";
import CovidAPI from "./CovidAPI";

function App() {
  return (
    <Router>
      <Fragment>
        <header className="header">
          <div> React Node postgreSQL Connection </div>
          <Link to="/">Home</Link>
          <Link to="/otherpage">병원 주소, 위도, 경도 가져오기</Link>
          <Link to="/CovidAPI">코로나 확진자 수 가져오기</Link>
        </header>
        <div className="main">
          <Route exact path="/" component={MainComponent} />
          <Route path="/otherpage" component={OtherPage} />
          <Route path="/covidapi" component={CovidAPI} />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
