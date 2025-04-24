"use client"
import React, {  useState } from 'react'
// import React, { useEffect, useState } from 'react'

const page = () => {

  const [email, setemail] = useState("")
  const [dp, setdp] = useState()
  const [file, setfile] = useState()


  const mailupload =(e)=>{
    setemail(e.target.value)
    // console.log(email)
  }

  const imgupload = (e)=>{
    // setdp(e.target.value)
    setdp(e.target.files[0])
  }

  const fileupload = (e)=>{
    setfile(e.target.files[0])
  }

  const submit = async () => {
   
    const formData = new FormData();
    formData.append("email", email);
    formData.append("image", dp);
    formData.append("file", file);

    const res = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    setemail("");
    setdp(null);
    setfile(null);
  };
  
    
  



  useState
  return (
    <div>


      this is form 


      <form onSubmit={submit} className='flex flex-col' action=""  >
        <input required onChange={mailupload} value={email} type="email" name="" id="" placeholder='Email' />

        <input required   onChange={imgupload} accept="image/*"  type="file" name="" id="" />  
        <input  required  onChange={fileupload}  type="file" name="" id="" /> 


        <button type="submit" className='bg-green-500 text-2xl font-bold'> submit form</button>
      </form>

{email} {dp?.name}
{file?.name}

      

{dp && <img src={URL.createObjectURL(dp)} alt="preview" width="200" />}
{file && <img src={URL.createObjectURL(file)} alt="preview" width="200" />}




      
      
    </div>
  )
}

export default page
