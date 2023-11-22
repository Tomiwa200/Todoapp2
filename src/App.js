import React, {Component}  from 'react';

import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';

import Context from './context';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
 ]





class App extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      auth:null,
      email: "",
      password: ""
    };
  }
   

componentDidMount() {
  let auth = localStorage.getItem ("auth");
   auth = auth ? JSON.parse(auth) : null;
  
    this.setState({ auth });
};

   

  login = async (email,password) => {
    
      const response = await axios.post(
        'http://localhost:3001/login',
        { email, password },
        
      ).catch((res) => {
        return { status: 401, message: 'Unauthorized' }
      })

      if(response.status === 200) {
        const { email } = jwt_decode(response.data.accessToken)
        
       const auth = {
        email, token : response.data.accessToken}
       console.log(this.setState({ auth }));
       localStorage.setItem("auth", JSON.stringify(auth));
       
        
        return true;
      } else {
        return false;
      }
    };
   logout = e => {
    e.preventDefault();
    this.setState({auth:null});
     localStorage.removeItem("auth");
    

    
  };
  

  render() {
 
  return (
      
        <Context.Provider value={{ ...this.state, login:this.login}}>
    
    
        <Router>
         
      
      


   
       
        
        
        
           <div>
        
            <nav>
              {!this.state.auth ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item">
                    Logout
                  </Link>
                )}
           </nav>
            
           
        
           <Routes>
              <Route exact path="/" element= {<Main />} /> 
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register/>} />
              <Route exact path="/main" element={<Main tasks={DATA}/>} />
              
         </Routes>
      
        </div>
       
       
      
       
    </Router>
    </Context.Provider> 
    );
  }

}

export default App;
