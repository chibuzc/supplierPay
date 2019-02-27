import React, { Component } from "react";
import axios from 'axios'
import Form from './components/form'
import { BrowserRouter, Route } from 'react-router-dom'
import bankList from './components/bankList'
import "./App.css";
import NavBar from "./components/navBar";
import Transfer from "./components/transfer";
import confirmTransfer from "./components/confirmTransfer";
import beneficiaryList from "./components/beneficiaryList"
import BulkPay from "./components/bulkPay";
import Home from "./components/home";



class App extends Component {

  constructor(props){
    super(props)
    this.state = {user:null}
  }

  componentDidMount(){
    // console.log(`here`)
    // const user = axios.get('http://localhost:5000/auth/google')
    // this.setState({user})
  }


  render() {
    return (
     <BrowserRouter>
     <div>
       <NavBar />
       <div className="container">
       <Route exact path ='/' component={Home} />
       <Route exact path ='/initiate_transfer' component={bankList} />
       <Route exact path ='/transfer' component={Transfer}/>
       <Route exact path = '/transfer/confirmation' component={confirmTransfer} />
       <Route exact path = '/beneficiaries' component={beneficiaryList} />
       <Route exact path='/bulkpay' component={BulkPay} />
       </div>
       
     </div>
     </BrowserRouter>
    );
  }
}

export default App;
