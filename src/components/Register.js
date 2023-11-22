import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import axios from 'axios';

import withContext from '../withContext';



 class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm_password:"",
      valid_match:""

    };
  }

 
  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: ""})
       
        
    componentDidMount() {
        const {valid_match, password, confirm_password} = this.state;
        this.setState({valid_match:password===confirm_password});
    }

  register = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
     
    const res = await axios.post(
      'http://localhost:3001/users',
      { email, password },
    ).catch((res) => {
        if (!res === 200) {
            this.setState({ error: "User alredy exists" });
          } else {
            
                this.setState({ error: "Signup failed" });
              
          }
    })

   
  
     } 
    
  

  render() {
    return  (      
    <div className=' todoapp stack-large'>
        
          
        <form onSubmit={this.register} className="login">
        <h2>Register</h2>
    
                <label htmlFor="email">Email: </label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
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
                <label htmlFor="password_confirm"> Confirm Password: </label>
                <input
                  className="form-control"
                  id="password_confirm"
                  type="password"
                  name="confirm_password"
                  onChange={this.handleChange}
                />
              
              {this.state.error && (
                <div className={this.state.error?'errrmsg':'offscreen'}>{this.state.error}</div>
              )}
              
         <button disabled={
              !this.state.valid_match
                ? true
                : false
            }>
                  Submit
                </button>
                
              
    
        </form>
        <p>
           Already a User?
            <br />
            <span className="line">
                 <Link to='/login' className='link'>Login</Link>
            </span>
          </p>
      </div>
    )
   }
  }


  export default withContext(Register);