import React, { Component } from "react";
import axios from "axios";

class allTransfers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransfers: null
    };
  }

  async componentDidMount() {
    const res = await axios.get("/api/paystack/allTransfers");
    // console.log(`api response for all transfers `, res)
    this.setState({ allTransfers: res.data });
  }

  renderTransfers() {
    return this.state.allTransfers.map(transfer => {
      console.log(`Here nowww`, transfer);
      return (
        <div>
            
          <ul class="collection">
            <li class="collection-item avatar">
              <p>
               To: {transfer.account_name} <br />
                Amount: {transfer.amount} <br/>
                Date: {transfer.amount} <br/>
                Status: {transfer.status} <br/>

              </p>
              {/* <a href="#!" class="secondary-content">
                <i class="material-icons">grade</i>
              </a> */}
            </li>
          </ul>
        </div>
      );
    });
  }



  render() {
   
    if (this.state.allTransfers && this.state.allTransfers.length) {
      return this.renderTransfers();
    }
    return <div>Loading...</div>;
  }
}

export default allTransfers;
