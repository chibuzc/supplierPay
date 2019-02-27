import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import "./../index.css";

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: null,
      accountName: null,
      transferReciept: null,
      saveBeneficiary: false
    };
  }

  resolveAccountName = async () => {
    // e.preventDefault()
    await this.setState(
      { bankCode: this.props.location.beneficiaryBank.code },
      () => {
        console.log(`state2`, this.state);
      }
    );
    const res = await axios.post(
      "/api/paystack/verifyaccount",
      this.state
    );
    console.log(res.data);
    this.setState({ accountName: res.data.account_name }, () =>
      console.log(`state3`, this.state)
    );
  };

  handleChange = e => {
    const accountNumber = e.target.value;
    this.setState({ accountNumber }, () => {
      console.log("state", this.state);
    });
    if (/^[0-9]{10}$/.test(e.target.value)) {
      console.log("GOOD");
      this.resolveAccountName();
    }
  };

  handleAmountChange = e => {
    const amount = e.target.value;
    this.setState({ amount }, () => {
      console.log(this.state);
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.accountName) {
      const reciept = await axios.post(
        "/api/paystack/transferReciept",
        this.state
      );
      this.setState({ transferReciept: reciept.data.data }, () => {
        console.log(`newState`, this.state);
      });
    }
  };

  handleCheckbox = e => {
    console.log(`e.trage`, e.target.value)
    if(e.target.checked){
      this.setState({saveBeneficiary: true},()=>{console.log('want ot save/unsave',this.state)})
    }
  }

  renderNameField = () => {
    if (this.state.accountName) {
      return (
        <div>
          <div class="row">
            <div class="input-field col s6">
              <input
                placeholder="Account Name"
                id="accountName"
                type="text"
                class="validate"
                value={this.state.accountName}
                // onChange={this.onClick}
              />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input
                placeholder="Amount"
                id="amount"
                type="text"
                class="validate"
                onChange={this.handleAmountChange}
              />
            </div>
          </div>
          <p>
            <label>
              <input type="checkbox" class="filled-in" onChange={this.handleCheckbox}/>
              <span>Save as Beneficiary</span>
            </label>
          </p>
          <button type="submit" class="waves-effect waves-light btn">
            button
          </button>
        </div>
      );
    }
  };

  renderContent() {
    if (!this.props.location.beneficiaryBank) {
      return <Redirect to="/" />;
    } else if (this.state.transferReciept) {
      return (
        <Redirect
          to={{
            pathname: "/transfer/confirmation",
            transferDetails: this.state
          }}
          push
        />
      );
    }
    return (
      <div className = "transfer">
        <form class="col s6" onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="input-field col s6">
              <input
                placeholder="Bank"
                id="Bank"
                type="text"
                class="validate"
                value={this.props.location.beneficiaryBank.name}
                // onChange={this.onClick}
              />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input
                placeholder="Account Number"
                id="Account Number"
                type="text"
                class="validate"
                onChange={this.handleChange}
                value={this.state.accountNumber}
              />
            </div>
          </div>
          {this.renderNameField()}
        </form>
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default Transfer;
