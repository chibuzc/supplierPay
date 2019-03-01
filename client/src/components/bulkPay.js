import React, { Component } from "react";
import { Redirect } from "react-router";
import Axios from "axios";

class BulkPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      redirect: false
    };
  }

  componentDidMount() {
    this.setState(
      { allTransactions: this.props.location.beneficiaries },
      () => {
        console.log(this.state);
      }
    );
  }

  handleSubmit = async () => {
      if(this.state.allTransactions.length === 1){
        const details = {
          amount : this.state.allTransactions[0].amount,
          transferReciept : { recipient_code: this.state.allTransactions[0].transferReciept }
        }
        const res = await Axios.post('/api/paystack/initializeTransfer', details )
        if(res.data){
        this.setState({redirect:true})
        return;
        }
      }
      console.log(`state....`,this.state)
      const res = await Axios.post("/api/paystack/bulk_transfer", this.state.allTransactions)
      console.log(`data :`, res.data)
      if(res.data){
        this.setState({redirect:true})
      }

  }

  handleChange = (e, b) => {
    
    const transactions = this.state.allTransactions.map(t => {
        if(t._id === b._id){
           return {...b,amount:e.target.value}
        }
        return t
    })
    this.setState({allTransactions: transactions},console.log('the state', this.state))
  };

  renderContent = () => {
    if(this.state.redirect){
      return(<Redirect to='/transfer_success' />)
    }
    if (
      this.props.location.beneficiaries &&
      this.props.location.beneficiaries.length
    ) {
      return this.props.location.beneficiaries.map(b => {
        return (
          <div>
            
            <p class="inline">
              <label>
                <input type="text" onChange={e => this.handleChange(e, b)} />
                <span>{b.name}</span>
              </label>
            </p>
           
            
          </div>
        );
      });
    } else {
      return <Redirect to="/beneficiaries" />;
    }
  };

  render() {
    return <div>
    {this.renderContent()}
    <button class="waves-effect waves-light btn" onClick={this.handleSubmit}>Transfer</button>
    </div>;
  }
}

export default BulkPay;
