/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState('');
  const[arr,Setarr]=useState([])

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.onerror = (err) => {
      console.error('Error', err);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const upload = async () => {
    try {
      const response = await fetch('http://localhost:3000', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          base64: image,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error', error);
    }
  };
  const getData=async()=>{
    const res=await axios.get("http://localhost:3000")
    console.log(res.data.m)
    Setarr(res.data.m)

  }
useEffect(()=>{
  getData()
},[])
  return (
    <div>
      <input type="file" accept="image/*" onChange={convertToBase64} />
      <img src={image} alt="" />
      <button onClick={upload}>Upload</button>
      <div>
        {
          arr.map((val)=>{
          return(
            <>
            <img src={val.img} alt="" />
            </>
          )
          })
        }
      </div>
    </div>
  );
};

export default App;
