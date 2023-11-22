import React, { Component } from 'react'

import { Link, Navigate} from 'react-router-dom';

import withContext from '../withContext';



 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

 
  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: ""})
      
        
    login = (e) => {
      e.preventDefault();
      const { username, password } = this.state;
      this.props.context.login(username,password)
      .then((res) => {
        if (!res) {
          this.setState({ error: "no server response" });
        }  else if (res === 400) {
          this.setState({ error: "Missing Username or Password" });
        } else if (res === 401) {
          this.setState({ error: "Unauthorized" });
        } else {
          this.setState({ error: "Login Failed" });
        }
      });

    }
    
  

  render() {
    return  !this.props.context.auth?(      
    <div className='todoapp stack-large'>
        
          
        <form onSubmit={this.login} className="login">
        <h2 >Login</h2>
    
                <label htmlFor="email">Email: </label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="username"
                  onChange={this.handleChange}
                />
             
              
                <label htmlFor="password"> Password: </label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              
              {this.state.error && (
                <div className={this.state.error?'errrmsg':'offscreen'}>{this.state.error}</div>
              )}
              
                <button>
                  Submit
                </button>
                
        </form>
        <p>
        Need an Account?
            <br />
            <span className="line">
                 <Link to='/Register' className='link'>SignUp</Link>
            </span>
          </p>
      </div>
    ) : (<Navigate to ='/main' />)
   }
  }


  export default withContext( Login);