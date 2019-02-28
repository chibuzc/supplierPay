import React , {Component} from 'react'


class Login extends Component {


    render(){
    return
    (
    <div>
        You need to be Logged in!!!
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
    </div>
    )
    }

}

export default Login