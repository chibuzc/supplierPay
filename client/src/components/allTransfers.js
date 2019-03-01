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
    this.setState({ allTransfers: res.data });
  }

  renderTransfers() {
    return this.state.allTransfers.map(transfer => {
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
