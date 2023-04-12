import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import AdminTable from "./AdminTable";
import PageWrapper from "../ui/PageWrapper";

class Admin extends Component {
  state = {
    view_status: "paid"
  };

  componentDidMount() {
    this.getOrders(this.state.view_status);
  }

  getOrders = status => {
    
  };

  logout = () => {
    
  };

  switchView = (event, view_status) => {
    this.setState({ view_status });
    this.getOrders(view_status);
  };

  updateStatus = (i, status) => {
    let statuses = [...this.state.statuses];
    statuses[i] = status;
    this.setState({ statuses });
  };

  updateShipping = (i, tracking) => {
    let shipping = [...this.state.shipping];
    shipping[i] = tracking;
    this.setState({ shipping });
  };

  updateOrder = index =>  {}

  render() {
    const {
      view_status,
      orders = [],
      statuses = [],
      shipping = []
    } = this.state;

    return (
      <PageWrapper>
        <Paper style={{ position: "relative " }}>
          <Button
            color="primary"
            onClick={this.logout}
            style={{
              position: "absolute",
              right: "20px",
              top: "10px",
              zIndex: "1"
            }}
          >
            Logout
          </Button>
          <AdminTable
            view_status={view_status}
            orders={orders}
            statuses={statuses}
            shipping={shipping}
            updateOrder={this.updateOrder}
            updateShipping={this.updateShipping}
            updateStatus={this.updateStatus}
            switchView={this.switchView}
          />
        </Paper>
      </PageWrapper>
    );
  }
}
export default withRouter(Admin);
