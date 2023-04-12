import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import PageWrapper from "../ui/PageWrapper";

class Login extends Component {
  state = {
    password: ""
  };

  updatePassword = e => {
    this.setState({ password: e.target.value });
  };
  logUserIn = () =>  {}

  render() {
    return (
      <PageWrapper>
        <Paper>
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              <span style={{ marginRight: "10px" }}>password:</span>
              <Input
                value={this.state.password}
                onChange={this.updatePassword}
                style={{ color: "rgba(0,0,0,0.2)" }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.logUserIn}
            >
              log in
            </Button>
            <div style={{ marginTop: "20px" }}>{this.state.error}</div>
          </div>
        </Paper>
      </PageWrapper>
    );
  }
}
export default withRouter(Login);
