
import React,{useEffect} from 'react';
import { useState } from "react";

import ClipLoader from "react-spinners/ClockLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;

function App(props) {
 
 
  useEffect(() => {
   
    setTimeout(()=> {
      // setLoad(false)
    }, 500)
    
  }, []);

  return (
    <div  style={{
        height:'100vh',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    }}>
      <ClipLoader color={'red'} loading={true}  size={150} />
    </div>
  );
}

export default App;