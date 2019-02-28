import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { isLoggedIn } from "../helpers/loggedInUser";

class BankList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banks: null,
      redirect: false
    };
  }

  async componentDidMount() {
    try {
      const user = await axios.get("/api/current_user");

      this.setState({ user: user.data });
      const res = await axios.get("/api/paystack/banks");
      this.setState({ banks: res.data });
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = bank => {
    const code = bank.banks.code;
    this.setState({ redirect: true, beneficiaryBank: bank.banks });
  };

  renderContent() {
    if (!this.state.user) {
      return <div>You must be Logged in</div>;
    }
    if (this.state.banks) {
      
      return this.state.banks.map(banks => {
        return (
          <ul key={banks.code} class="collection with-header">
            {/* <li class="collection-header"><h4>First Names</h4></li> */}
            <li
              class="collection-item"
              key={banks.code}
              onClick={() => {
                this.handleClick({ banks });
              }}
            >
              <div>{banks.name}</div>
            </li>
          </ul>
        );
      });
    } else {
      return <div>LOADING.....</div>;
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/transfer",
            beneficiaryBank: this.state.beneficiaryBank
          }}
          push
        />
      );
    }
    return this.renderContent();
  }
}

export default BankList;
