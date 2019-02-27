import React, { Component } from "react";
import axios from 'axios';
import BankList from "./bankList";

class Form extends Component {

    constructor(props) {
        super(props);
        this.state={}
    }

onClick = (e) => {
    const value = e.target.value
    const fieldName = e.target.id
    console.log({[fieldName]:value})
    this.setState({[fieldName]:value})
}

async handleSubmit(e){
    e.preventDefault()
    console.log('herrr;', this.state)
   const res = await axios.post('/api/newCustomer', this.state)
  // const res = await axios.get('http://localhost:5000/')
   console.log(res.data)
}


  render() {
    return (
      <div>
          <form class="col s12" onSubmit={this.handleSubmit.bind(this)}>
        <div class="row">
          <div class="input-field col s12">
            <input
              placeholder="Name"
              id="first_name"
              type="text"
              class="validate"
              onChange={this.onClick}
            />
          </div>
        </div>




        {/* <div class="row">
          <div class="input-field col s12">
            <input
              placeholder="Bank"
              id="bankName"
              type="text"
              class="validate"
              onChange={this.onClick}
            />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              placeholder="Amount"
              id="amount"
              type="text"
              class="validate"
              onChange={this.onClick}
            />
          </div>
        </div> */}
        <button type="submit" class="waves-effect waves-light btn">button</button>
        </form>
       
      </div>
    );
  }
}

export default Form;
