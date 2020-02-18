import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import QuestionPoll from "./QuestionPoll";
import QuestionPollResults from "./QuestionPollResults";
import Leaderboard from "./Leaderboard";
import Navbar from "./Navbar";
import Login from "./Login";
import Logout from "./Logout";
import ProtectedRoute from "./ProtectedRoute";
import LoadingBar from "react-redux-loading";
import PageNotFound from "./PageNotFound";
import { handleGetQuestions } from "../actions/questions";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetQuestions());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.authenticated == null ? null : (
            <Navbar loggedInUser={this.props.loggedInUser} />
          )}
          <div>
            {this.props.loading === true ? null : (
              <div>
                <Switch>
                  <ProtectedRoute
                    path="/"
                    exact
                    component={Dashboard}
                    isAuthenticated={this.props.authenticated}
                  />
                  <ProtectedRoute
                    path="/question/:id"
                    exact
                    component={connect(mapStateToProps)(QuestionPoll)}
                    isAuthenticated={this.props.authenticated}
                  />
                  <ProtectedRoute
                    path="/question/:id/results"
                    exact
                    component={connect(mapStateToProps)(QuestionPollResults)}
                    isAuthenticated={this.props.authenticated}
                  />
                  <ProtectedRoute
                    path="/add"
                    exact
                    component={NewQuestion}
                    isAuthenticated={this.props.authenticated}
                  />
                  <ProtectedRoute
                    path="/leaderboard"
                    exact
                    component={Leaderboard}
                    isAuthenticated={this.props.authenticated}
                  />
                  <Route path="/login" exact component={withRouter(Login)} />
                  <Route path="/logout" exact component={withRouter(Logout)} />
                  <ProtectedRoute
                    component={PageNotFound}
                    isAuthenticated={this.props.authenticated}
                  />
                </Switch>
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users, login }) {
  return {
    loading: false,
    loggedInUser: login.loggedInUser,
    authenticated: login.authenticated
  };
}

export default connect(mapStateToProps)(App);
