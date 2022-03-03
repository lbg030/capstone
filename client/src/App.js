import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MainComponent from "./MainComponent";

function App() {
  return (
    <Router>
      <Fragment>
        <header className="header">
          <div> React Node postgreSQL Connection </div>

          {/* <Link to="/">Home</Link> */}
        </header>
        <div className="main">
          {/* <MainComponent /> */}
          <div>Kakao map</div>
          <MainComponent />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
