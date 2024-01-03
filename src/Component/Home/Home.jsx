import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = 'http://localhost:5000'
const Home = () => {

  const navigate = useNavigate();
  const data = useSelector((state) => state.userInfo.data);
  const [query,setQuery]=useState();
  const [queryResponse,setQueryResponse]=useState();


  useEffect(() => {
    if (data.userName === undefined) {
      navigate("/");
    }
  }, []);

  const handleQuery=async()=>{
       try{
         const res=await axios(`${BASE_URL}/openai/chat`,{
           method:'post',
           maxBodyLength: Infinity,
           headers: { 
            'Content-Type': 'application/json'
          },
           data:{
            email:data.userEmail,
            message:query
           }
         });
         console.log(res);
         const responseRe=res.data;
        if(responseRe.message==="Query execute Successfully"){
           console.log(responseRe.data);
           setQueryResponse(responseRe.data);
        }else{
           console.log(responseRe);
        }
       }catch(err){
        console.log(err);
       }
  }



  return (
    <div>
      {data.userName}
      {data.userEmail}

      <div className='ChatBox'>
        <div className='Display Chat'>
           {queryResponse}
        </div>
        <div className='Enter Query'>
          <input type="text" placeholder='Enter ' name='query' value={query} onChange={(e)=>setQuery(e.target.value)}/>
          <button onClick={handleQuery}>Send</button>
        </div>
      </div>




    </div>
  )
}

export default Home