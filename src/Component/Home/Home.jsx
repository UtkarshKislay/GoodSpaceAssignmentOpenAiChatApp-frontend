import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate=useNavigate();
    const data=useSelector((state)=>state.userInfo.data);
    console.log(data);
    useEffect(()=>{
       if(data.userName===undefined){
          navigate("/");
       }
    },[]);
  return (
    <div>
        {data.userName} 
        
       


    </div>
  )
}

export default Home