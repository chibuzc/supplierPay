import React, { Component } from "react";
// import Axios from "axios";
import { Redirect } from "react-router";
import axios from "axios";

class BeneficiaryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transferList: [],
      next: false,
      trueBeneficiaries: null,
      selectedBeneficiaries: null,
      selected: false
    };
  }

  async componentDidMount() {
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
      console.log("trueBeneficiaries", trueBeneficiaries);
      this.setState({trueBeneficiaries, next: true }, () => {
        console.log(this.state.next);
      });
    }
  };

  handleCheck = (e, details) => {
    const ben = this.state.beneficiaries.map(b => {
      //   console.log(`bbbbbbbbbbbbb`, b._id === details._id);
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

  renderContent() {
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
    return <div>LOADING.....</div>;
  }

  render() {
    // if(this.state.redirect){
    //     return(<Redirect to={{pathname:'/transfer',beneficiaryBank:this.state.beneficiaryBank}} push />)
    // }
    return (
      <div>
        {this.renderContent()}
        <button
          //   type="submit"
          onClick={this.handleClick}
          class="waves-effect waves-light btn"
        >
          button
        </button>
      </div>
    );
  }
}

export default BeneficiaryList;
