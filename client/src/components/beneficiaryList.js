import React, { Component } from "react";
// import Axios from "axios";
import { Redirect } from "react-router";
import axios from "axios";
import { isLoggedIn } from "../helpers/loggedInUser";

class BeneficiaryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transferList: [],
      next: false,
      trueBeneficiaries: null,
      selectedBeneficiaries: null,
      selected: false,
      user: null
    };
  }

  async componentDidMount() {
    const user = await axios.get("/api/current_user");
    this.setState({ user: user.data });
    const res = await axios.get("/api/beneficiary/all");
    const data = res.data.map(d => {
      d.selected = false;
      return d;
    });
    this.setState({ beneficiaries: data });
  }

  handleClick = e => {
    e.preventDefault();
    const trueBeneficiaries = this.state.beneficiaries.filter(b => {
      return b.selected;
    });
    if (trueBeneficiaries.length) {
      this.setState({ trueBeneficiaries, next: true });
    }
  };

  handleCheck = (e, details) => {
    const ben = this.state.beneficiaries.map(b => {
      
      if (b._id === details._id) {
        return {
          ...b,
          selected: !b.selected
        };
      }
      return b;
    });
    this.setState({ beneficiaries: ben });
  };

  renderBeneficiaries() {
    return this.state.beneficiaries.map(beneficiaries => {
      return (
        <div>
          <ul class="collection with-header">
            {/* <li class="collection-header"><h4>First Names</h4></li> */}
            <li class="collection-item">
              {/* <div>{beneficiaries.name}</div> */}
              <div>
                <p class="inline">
                  <label>
                    <input
                      type="checkbox"
                      onChange={e => this.handleCheck(e, beneficiaries)}
                    />
                    <span>{beneficiaries.name}</span>
                  </label>
                </p>
              </div>
            </li>
          </ul>
        </div>
      );
    });
  }

  renderButton() {
    return (
      <button
        //   type="submit"
        onClick={this.handleClick}
        class="waves-effect waves-light btn"
      >
        button
      </button>
    );
  }

  renderContent() {
    if (!this.state.user) {
      return <div>You must be Logged in</div>;
    }
    if (this.state.next) {
      return (
        <Redirect
          to={{
            pathname: "/bulkpay",
            beneficiaries: this.state.trueBeneficiaries
          }}
          push
        />
      );
    }

    if (this.state.beneficiaries) {
      return <div>{this.renderBeneficiaries}</div>;
    }
    return <div>LOADING.....</div>;
  }

  render() {
    // if(this.state.redirect){
    //     return(<Redirect to={{pathname:‘/transfer’,beneficiaryBank:this.state.beneficiaryBank}} push />)
    // }
    return (
      <div>
        {this.renderContent()}
        {this.renderButton}
      </div>
    );
  }
}

export default BeneficiaryList;
