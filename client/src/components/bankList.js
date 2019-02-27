import React, {Component} from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router';
import * as isLoggedIn from '../helpers/loggedInUser'

class BankList extends Component{

    constructor(props){
        super(props)
        this.state = {
            banks:null,
            redirect: false
        }
    }

    async componentDidMount(){
        const user = await isLoggedIn.isLoggedIn()
        console.log(`user`, user.data)
        const res = await Axios.get('/api/paystack/banks')
        this.setState({banks:res.data},()=>{console.log(this.state)})

    }

    handleClick = (bank) => {
        console.log(bank.banks)
        const code = bank.banks.code
        console.log(code)
        this.setState({redirect:true,
            beneficiaryBank:bank.banks
        })
        
    }

    renderContent(){
        if(this.state.banks){
            {console.log(`banks`,this.state.banks)}
            return this.state.banks.map(banks => {
                console.log('bankssssss', banks)
                return(
                    <ul key={banks.code} class="collection with-header">
                {/* <li class="collection-header"><h4>First Names</h4></li> */}
                <li class="collection-item" key={banks.code} onClick={()=>{this.handleClick({banks})}}><div>{banks.name}</div></li>
                </ul>
                )
            })
            
            
        }else{
            return <div>LOADING.....</div>
        }
    }


    render(){
        if(this.state.redirect){
            return(<Redirect to={{pathname:'/transfer',beneficiaryBank:this.state.beneficiaryBank}} push />)
        }
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }
} 

export default BankList