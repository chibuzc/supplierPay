import React,{Component} from 'react';
import './../index.css';
import axios from 'axios';
import { isLoggedIn } from '../helpers/loggedInUser';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {user: null }
    }

    async componentDidMount(){
    const user = await isLoggedIn()
    console.log(user)
    this.setState({user})
    }

    render(){
        return(
            <div className = "homepage">
                <h2 className= "bounceIn"> Welcome </h2>
                <a href="/auth/google" class="waves-effect waves-light btn google-login">Login With Google</a>
            </div>
        )
    }
}

export default Home