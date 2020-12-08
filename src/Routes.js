import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import App from "./ComponentReuse/AppHooks";
import LinkParse from "./htmlAtagParse";
import Note from "./Nodepad";
import State from "./statePropsEvent";
import Parent from "./Lifecycle/Parents";
import Apollo from "./ApolloAdmin";
import Antd from "./Antd";

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: "http://localhost:8001/graphql",
});
const client = new ApolloClient({
  cache,
  link,
});

class Routes extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <ErrorCatcher>
            <Switch>
              <Route exact path="/inputreuse" component={App} />
              <Route exact path="/link" component={LinkParse} />
              <Route exact path="/note" component={Note} />
              <Route exact path="/state" component={State} />
              <Route exact path="/lifecycle" component={Parent} />
              <Route exact path="/apollo" component={Apollo} />
              <Route exact path="/antd" component={Antd} />
            </Switch>
          </ErrorCatcher>
        </Router>
      </ApolloProvider>
    );
  }
}

export default Routes;

class ErrorCatcher extends Component {
  state = {
    isError: false,
  };

  componentDidCatch(err, info) {
    console.log(err, info);
    this.setState({ isError: true });
  }

  render() {
    if (this.state.isError) return <div>에러!</div>;

    return this.props.children;
  }
}
