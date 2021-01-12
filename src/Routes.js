import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
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
import Mason from "./Mason";
import Weird from "./WeirdSetState";
import Spotify from "./Spotify";
import SpotifyLogin from "./Spotify/Login";
import WebAudio from "./WebAudio";
import Cart from "./Cart";
import KakaoMap from "./KakaoMap";
import Aligo from "./Aligo";

// import { setContext } from "apollo-link-context";
import { setContext } from "@apollo/client/link/context";

const authLink = new ApolloLink(async (operation, forward) => {
  const res = await new Promise((resolve, reject) => {
    // async action
    // client.mutate()
    setTimeout(() => {
      resolve("auth success");
    }, 2000);
  });

  if (res) {
    const prevContext = operation.getContext();
    operation.setContext({ ...prevContext, headers: "" });
    return forward(operation);
  }
});

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: "http://localhost:8001/graphql",
});
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink, link]),
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
              <Route exact path="/mason" component={Mason} />
              <Route exact path="/weird" component={Weird} />
              <Route exact path="/spotifyLogin" component={SpotifyLogin} />
              <Route exact path="/spotify" component={Spotify} />
              <Route exact path="/audio" component={WebAudio} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/kakaomap" component={KakaoMap} />
              <Route exact path="/aligo" component={Aligo} />
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
