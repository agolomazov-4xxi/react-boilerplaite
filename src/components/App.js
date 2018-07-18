import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import Loadable from "react-loadable";
import styled from "styled-components";
import Header from "./Header";

const Loading = () => "Loading...";

const AboutPage = Loadable({
  loader: () => import("../pages/AboutPage"),
  loading: Loading,
});

const HomePage = Loadable({
  loader: () => import("../pages/HomePage"),
  loading: Loading,
});

const Wrapper = styled.div`
  background: #cecece;
  padding: 20px;
  font-size: 20px;
`;

class App extends Component {
  state = {
    counter: 0,
  };

  handleClick = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }));
  };

  render() {
    return (
      <Wrapper onClick={this.handleClick}>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" exact component={AboutPage} />
        </Switch>
      </Wrapper>
    );
  }
}

export default App;
