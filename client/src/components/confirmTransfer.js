import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";

class confirmTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        transferSuccess : false
    }
  }

  handleClick = async() => {
    
    const transfer = await axios.post('/api/paystack/initializeTransfer', this.props.location.transferDetails)
    console.log('transfer',transfer)
    this.setState({transferSuccess:true})
  }

  saveBeneficiary = async () => {
   const beneficiary = await axios.post('/api/beneficiary/create', this.props.location.transferDetails)
   console.log(`beneficiary`, beneficiary)
  }

  renderContent = () => {
    if(this.state.transferSuccess === true){
        return <Redirect to='/transfer_success'/>
    }
    if (this.props.location.transferDetails) {
        console.log(`props`, this.props.location.transferDetails)
      const transferDetails = this.props.location.transferDetails;
      return (
        <div>
          <ul class="collection with-header">
            <li class="collection-header">
              <h4>Confirm Transfer</h4>
            </li>
            <li class="collection-item">
              <p>Transfer N{transferDetails.amount}</p>
              <p>To</p>
              <p>{transferDetails.accountName}</p>
              {}
            </li>
            
          </ul>
          <button onClick={this.handleClick} type="submit" class="waves-effect waves-light btn">
            confirm
          </button>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  };

  render() {
    return this.renderContent();
  }
}

export default confirmTransfer;
