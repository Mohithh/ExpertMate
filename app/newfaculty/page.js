"use client"
import React, { useEffect, useState  } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; 

const Page = () => {
    const router = useRouter();
  
   useEffect(() => {
      const token = localStorage.getItem('token')
  
      if(token){
        router.push("/");
      }
      
    }, [router])
 
  
  

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const onchangeinput = (e)=>{
    if(e.target.name=="name"){
      setname(e.target.value)
    }
     else if(e.target.name=="email"){
      setemail(e.target.value)
    }
   else if(e.target.name=="password"){
      setpassword(e.target.value)
    } 
  }   

  const submitform =async(e)=>{     
    e.preventDefault() 
 
    const data = {name,email,password}  
  
    try {
      
    //  const response = await fetch("http://localhost:3000/api/signin", {
     const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/FacultyNewLogin`, {
      method: "POST",
      headers:{"context-type":"application/json"},
      body:JSON.stringify(data)
    });
    const res = await response.json()
    toast.info("Account has been created", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
    setemail("");
    setname("")
    setpassword("")
      
    } catch (error) {
      toast.error("account Already exist", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    }




  }
  return (
    <div className=' '>
       <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
              />


    


      <div className='w-64 md:w-1/4  m-auto mb-10 items-center text-center mt-20  '>

      <FaRegUserCircle className='text-5xl items-center m-auto ' />


        <h2 className='mt-5 font-bold text-2xl'>Sign up Your Account  </h2>
 

        <form onSubmit={submitform} action="" method='POST' >

       <div className='m-2 '>
      <label className='' htmlFor="name">Name</label>
      <input required  onChange={onchangeinput} className='mt-2 w-full border border-gray-400 rounded p-1  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' placeholder='Enter name ' value={name} type="name" name="name" id="name" />

</div>    
<div className='m-2 '>
      <label className='' htmlFor="email">Email</label>
      <input required onChange={onchangeinput} className='mt-2 w-full border border-gray-400 rounded p-1  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' placeholder='Email id' value={email} type="email" name="email" id="email" />

</div>   


     <div className='m-2 '>
      <label htmlFor="password">Password</label>
      <input required onChange={onchangeinput} className='mt-2 w-full border border-gray-400 rounded p-1  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type="password" name="password" value={password} id="password" placeholder='Password' />
</div> 

<button  className=" w-full m-auto items-center mt-5 mx-2 text-white bg-pink-500 border-0 py-3  focus:outline-none hover:bg-indigo-600 rounded">Sign in </button>

{/* <Link href="/login"> <p className='mx-10 mt-5 text-blue-500  font-extralight '> Login</p></Link>
<Link href="forgot"> <p className='mx-10 mt-5 text-blue-500 font-extralight'>forgot password</p></Link> */}





{/* <div className='flex '> */}
 <Link href="/facultylogin"> <p className='mx-10 mt-5 text-blue-500  font-extralight '> Login</p></Link>
 <Link href="forgot"> <p className='mx-10 mt-5 text-blue-500 font-extralight'>forgot password</p></Link>

{/* </div> */}



        
        </form>




        

      </div>
   
    </div>
  )
}

export default Page
