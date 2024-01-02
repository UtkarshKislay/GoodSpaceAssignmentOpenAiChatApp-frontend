import React from 'react'
import { useSelector } from 'react-redux'
const Home = () => {
    const data=useSelector((state)=>state.userInfo.data);
    console.log(data.userName);
  return (
    <div>
        {data.userName} 
       


    </div>
  )
}

export default Home