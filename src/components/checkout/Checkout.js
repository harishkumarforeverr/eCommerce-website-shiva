import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CheckoutHeader from "./CheckoutHeader";
import PageWrapper from "../ui/PageWrapper";
import Email from "./Email";
import Shipping from "./Shipping";
import CreditCards from "./CreditCards";
import CartSmall from "../cart/CartSmall";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 12 * 2,
    color: theme.palette.text.secondary,
    marginBottom: "20px",
  },
  inputInfo: {
    fontSize: "16px",
    marginTop: "20px",
    color: "black",
  },
  labelFocus: {
    color: "#1d1d1d",
    borderColor: "#1d1d1d",
  },
});

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pane: 0,
      items: [],
      email: "",
      address: {},
    };
  }
  componentDidMount() {
    const slug = `${this.props.config.store_slug}_products`;
    const items = JSON.parse(localStorage.getItem(slug));
    this.setState({ items: items ? items : [] });
  }
  changePane = (pane) => {
    this.setState({ pane });
  };
  handleChange = (name, value) => {
    // this.setState({ [name]: value });
    this.setState((prev) => ({
      ...prev,
      [name]: value ,
      error: false,
    }));
  };
  createOrder = (address) => {
    const { items, email } = this.state;

    const itemSKUS = items.map((i) => ({
      type: "sku",
      parent: i.sku_id,
      quantity: +i.quantity,
    }));

    let metadata = { status: "Ordered" };
    items.forEach((item, index) => {
      metadata[`order-${index}-${item.sku_id}`] = JSON.stringify(item.attr);
    });

    const postBody = {
      items: itemSKUS,
      metadata: metadata,
      shipping: {
        name: `${address.givenName} ${address.familyName}`,
        address: {
          line1: address.address1,
          line2: address.address2,
          city: address.locality,
          state: address.region,
          country: "US",
          postal_code: address.postalCode,
        },
      },
      email: email,
    };

    
  };

  setToken = (token) => {
    
  };

  render() {
    const { classes, config } = this.props;
    const { pane, address } = this.state;

    let displayAddress;
    if (address.postalCode) {
      displayAddress = (
        <div className={classes.inputInfo}>
          <div>
            {address.givenName} {address.familyName}
          </div>
          <div>{address.address1}</div>
          <div>{address.address2}</div>
          <div>
            {address.locality}, {address.region}
          </div>
          <div>{address.postalCode}</div>
        </div>
      );
    }
    return (
      <PageWrapper>
        {
          //Render Only if user has something in cart
          this.state.items.length > 0 && (
            <Grid
              container
              className={classes.root}
              spacing={10}
              direction={"row-reverse"}
            >
              <Grid item md={4} xs={12}>
                <Paper className={classes.paper}>
                  <CartSmall items={this.state.items} config={config} />
                </Paper>
              </Grid>
              <Grid item md={8} xs={12}>
                <Paper className={classes.paper}>
                  <CheckoutHeader
                    text={"Your Email"}
                    classes={classes.heading}
                    pane={0}
                    currentPane={pane}
                    changePane={() => this.changePane(0)}
                  />
                  {pane === 0 ? (
                    <span>
                      <Email
                        email={this.state.email}
                        handleChange={this.handleChange}
                        changePane={() => {
                          var regexEmail =
                            /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                          if (regexEmail.test(this.state.email)) {
                            this.changePane(1);
                          } else {
                            this.setState((prev) => ({
                              ...prev,
                              error: true,
                            }));
                          }
                        }}
                      />
                      
                    </span>
                  ) : (
                    <div className={classes.inputInfo}>{this.state.email}</div>
                  )}
                </Paper>
                <Paper className={classes.paper}>
                  <CheckoutHeader
                    text={"Shipping Address"}
                    classes={classes.heading}
                    pane={1}
                    currentPane={pane}
                    changePane={() => this.changePane(1)}
                  />
                  {pane === 1 ? (
                    <Shipping
                      address={this.state.address}
                      handleChange={this.handleChange}
                      createOrder={this.createOrder}
                      changePane={() => this.changePane(2)}
                    />
                  ) : (
                    displayAddress
                  )}
                </Paper>
                <Paper className={classes.paper}>
                  <CheckoutHeader
                    text={"Payment"}
                    classes={classes.heading}
                    pane={2}
                    currentPane={pane}
                    changePane={() => this.changePane(2)}
                  />
                  {this.state.error && (
                    <p style={{ color: "#f40" }}>
                      Sorry, an error has occurred. Invalid detail's, Please refresh the page and
                      try again.
                    </p>
                  )}
                  {!this.state.error && pane === 2 && (
                    <CreditCards setToken={this.setToken} />
                  )}
                </Paper>
              </Grid>
            </Grid>
          )
        }
        { 
          this.state.items.length === 0 && (
            <Grid>
              <Paper style={{ minHeight: "500px" }}>
                <h2 style={{ padding: "40px 0 0 40px", fontWeight: 600 }}>
                  Checkout
                </h2>
                <p style={{ paddingLeft: "40px" }}>
                  Hmmmm, probably don't need to checkout if you don't have
                  anything in your cart.
                </p>
              </Paper>
            </Grid>
          )
        }
      </PageWrapper>
    );
  }
}
export default withRouter(withStyles(styles)(Checkout));
