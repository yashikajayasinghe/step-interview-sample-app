import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import TitleSearch from "./components/TitleSearch";
import TitlePage from "./components/TitlePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.selectAddress = this.selectAddress.bind(this);
  }
  selectAddress(address) {
    this.props.history.push(`/titles/${address.title_no.replace('/', '$')}`);
  }
  render() {
    return (
      <Router>
        <div style={{margin: "15px"}}>
          <TitleSearch />
            
          <hr />
  
          <Route exact path="/" component={Home} />
          <Route path="/titles/:titleNo" component={TitlePage} />
        </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default App;