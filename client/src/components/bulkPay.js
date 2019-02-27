import React, { Component } from "react";
import { Redirect } from "react-router";
import Axios from "axios";

class BulkPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: []
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
      console.log(`state....`,this.state)
      const res = await Axios.post("/api/paystack/bulk_transfer", this.state.allTransactions)
      console.log(`data :`, res.data)

  }

  handleChange = (e, b) => {
    // console.log(`bbb`, b);
    // //   const amount = e.taget.value
    // console.log(`amount`, e.target.value);
    // let amount = {};
    // const updatedTransactions = this.state.allTransactions.map(transaction => {
    //   if (transaction._id === b._id) {
    //     console.log(`compare`, transaction._id, b._id);
    //     return { ...transaction, ...{ amount: e.target.value } };
    //   }
    // });
    // console.log(`update`, updatedTransactions);
    
    const transactions = this.state.allTransactions.map(t => {
        if(t._id === b._id){
           return {...b,amount:e.target.value}
        }
        return t
    })
    this.setState({allTransactions: transactions},console.log('the state', this.state))
  };

  renderContent = () => {
    if (
      this.props.location.beneficiaries &&
      this.props.location.beneficiaries.length
    ) {
      // this.setState({allTransactions:this.props.location.beneficiaries})
      return this.props.location.beneficiaries.map(b => {
        return (
          <div>
            {/* <ul class="collection with-header">
              <li class="collection-item">
                <div> */}
            <p class="inline">
              <label>
                <input type="text" onChange={e => this.handleChange(e, b)} />
                <span>{b.name}</span>
              </label>
            </p>
            {/* </div>
              </li>
            </ul> */}
            
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
    <button class="waves-effect waves-light btn" onClick={this.handleSubmit}>button</button>
    </div>;
  }
}

export default BulkPay;
