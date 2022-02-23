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
        </header>
        <div className="main">
          <Route exact path="/" component={MainComponent} />

          <MapContainer />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
