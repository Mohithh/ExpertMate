"use client";
import React, { useState } from 'react'

const page = () => {

    const [email, setemail] = useState("")
    const [userData, setUserData] = useState(null);



    const onChange = (e)=>{
        setemail(e.target.value)
    }
    const submit = async (e) => {
        
        e.preventDefault()
        console.log("working  part 1")

        const res = await fetch("/api/userimage",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        })
        const data = await res.json();

        if (data.success) {
            setUserData(data.data);
            console.log("working  part 2")

          } 


    }
   
  return (
    <div>


        <div className='flex flex-col w-[300px] m-auto mt-10'>

            <form  onSubmit={submit} action="">

            
        <label htmlFor="">Email</label>
        <input required className='border border-black' onChange={onChange} type="email" value={email} name='email' />

        <button  type="submit" className='m-3 p-1 rounded-2xl  cursor-pointer  bg-green-300' > submit mail</button>

        </form>


        </div>
        


        {email}

        {userData && (
        <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2 text-center">Your Uploaded Image:</h2>
          <img
            src={`data:${userData.image.contentType};base64,${userData.image.fileBase64}`}
            alt={userData.image.filename}
            className="w-full max-w-xs mx-auto border mb-4"
          />

          <h2 className="text-lg font-semibold mb-2 text-center">Your Uploaded File:</h2>
          <div className="text-center">
            <a
              href={`data:${userData.file.contentType};base64,${userData.file.fileBase64}`}
              download={userData.file.filename}
              className="text-blue-600 underline"
            >
              Download {userData.file.filename}
            </a>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default page
