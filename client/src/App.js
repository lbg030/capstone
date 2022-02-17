import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import MainComponent from "./MainComponent";
import MapContainer from "./mapContainer";

function App() {
  return (
    <Router>
      <Fragment>
        <header className="header">
          <div> React Node postgreSQL Connection </div>

          <Link to="/">Home</Link>
          <Link to="/otherpage">Other page[아무것도 없음 연동 확인용]</Link>
          <Link to="/map">Map</Link>
        </header>
        <div className="main">
          <Route exact path="/" component={MainComponent} />
          <Route path="/otherpage" component={OtherPage} />
          <Route path="/map" component={MapContainer} />

          <MapContainer />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
