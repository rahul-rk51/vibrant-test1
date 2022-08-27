
import './App.css';
import SignIn from './pages/sign-in/SignIn'
import Users from './component/users/Users';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import  Privateroutes  from './utils/Privateroutes';

function App() {
  


  
  return (   
     <Router>
    <Routes>
      <Route element={<Privateroutes/>}>
      <Route path="/users" exact element={<Users/>} />
      </Route>
      <Route path="/" exact element={<SignIn/>} />
      <Route path="/signin" element={<SignIn/>} />
      
     
    </Routes>
  </Router>  
  );
}

export default App;
