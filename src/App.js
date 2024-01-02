import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function App() {
  // const navigate = useNavigate();
  const data=useSelector((state)=>state.userInfo.data);
  // useEffect(()=>{
  //   const ifNotLogin=()=>{
  //     console.log(data.userName);
  //        if(!data.userName){
  //             //  navigate('/');
  //        }
  //   }
  //   ifNotLogin();
  // },[]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          ></Route>
          <Route
            path="/home"
            element={<Home />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
