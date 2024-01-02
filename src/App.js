import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';

function App() {
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
          <Route
            path="/redirect"
            element={<Navigate to="/home" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
