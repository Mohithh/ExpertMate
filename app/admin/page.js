"use client"
import React, { useState,useEffect,useRef  } from 'react'

const page = () => {
  const [schat, setschat] = useState(true);

  const [sendermail, setsendermail] = useState("")
  const [recievermail, setrecievermail] = useState("")
  const [openchat, setopenchat] = useState(false)
  const scrollRef = useRef(null);
  const [Upload, setUpload] = useState(false)


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



  

  const [data, setdata] = useState([]);

  const chat = () => {
    setschat(true);
    setUpload(false)
    setopenchat(false)
  }

  const onchangesendermail = (e) => {
    setsendermail(e.target.value);
  }
  const onchangerecievermail = (e) => {
    setrecievermail(e.target.value);
  }

  const chatform = async (e) => {
    e.preventDefault();
    console.log("Sender's email:", sendermail);
    console.log("Receiver's email:", recievermail);
    openchatbox()
   
  }

  const openchatbox = async() => {

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/readchat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              senderEmail: sendermail,
              receiverEmail: recievermail,
          }),
      });

      const result = await response.json();

      if (result.chats && result.chats.length > 0) {
          setdata(result.chats);
      } else {
          setdata([]);
      
      }
    setopenchat(true);
  }

  const upload = () => {
    setschat(!chat);
    setopenchat(false)
    setUpload(!Upload)
  }



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);
    
  return (
    <div>

      <div className='flex flex-col mt-5 items-center '>

        <div className="flex flex-wrap gap-5 mb-10">

          <button onClick={chat} className="px-5 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white text-lg rounded-xl shadow-md hover:scale-105 transition-transform" >Chat</button>

          <button onClick={upload} className="px-5 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-lg rounded-xl shadow-md hover:scale-105 transition-transform" >Upload</button>

          <button className="px-5 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-lg rounded-xl shadow-md hover:scale-105 transition-transform" >Edit</button>
        </div>

      </div>







      {schat && (
  <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-2xl  max-w-md mx-auto">
    {/* For chat */}
    <form action=""  onSubmit={chatform} className="flex flex-col gap-4">
      
      <label htmlFor="senderEmail" className="text-sm font-semibold text-gray-700">Sender's Email</label>
      <input
      required
        type="email"
        id="senderEmail"
        onChange={onchangesendermail}
        value={sendermail}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter sender's email"
      />

      <label htmlFor="receiverEmail" className="text-sm font-semibold text-gray-700">Receiver's Email</label>
      <input
      required
        type="email"
        id="receiverEmail"
        onChange={onchangerecievermail}
        value={recievermail}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter receiver's email"
      />

      <button
        type="submit"
        className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>

  
  </div>
)}
 {openchat && (
  <div className="flex justify-center items-center py-10 px-4">
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white text-center py-5 px-6">
        <h2 className="text-2xl font-bold tracking-wide">Chat with {recievermail}</h2>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto h-[400px] bg-gray-50 px-6 py-4 space-y-4">
        {data.length === 0 ? (
          <p className="text-center text-gray-400 italic mt-10">No messages yet. Start a conversation!</p>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className={`max-w-[75%] px-4 py-3 rounded-xl text-sm break-words shadow-sm ${
                item.senderEmail === sendermail
                  ? "ml-auto bg-teal-600 text-white rounded-br-none"
                  : "mr-auto bg-gray-200 text-black rounded-bl-none"
              }`}
            >
              <p>{item.text}</p>
              <div className="text-xs text-black mt-1 text-right">
  {new Date(item.createdAt).toLocaleDateString()}{" "}
  {new Date(item.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
</div>

            </div>
          ))
        )}
        <div ref={scrollRef}></div>
      </div>

      {/* Chat Input */}

    </div>
  </div>
)}




{Upload && (
  <div className="min-h-screen bg-gradient-to-r   to-white flex justify-center items-center">
    <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg">
      <h2 className="text-3xl font-extrabold text-teal-600 text-center mb-6">
        Upload Form
      </h2>
      
      <form onSubmit={submit} className="space-y-6">
        <div className="flex flex-col space-y-3">
          <label htmlFor="email" className="text-lg text-teal-700 font-semibold">
            Email Address
          </label>
          <input
            required
            onChange={mailupload}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="p-3 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="image" className="text-lg text-teal-700 font-semibold">
            Upload Profile Image
          </label>
          <input
            required
            onChange={imgupload}
            accept="image/*"
            type="file"
            id="image"
            className="p-3 border border-teal-400 rounded-lg bg-teal-50 text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="file" className="text-lg text-teal-700 font-semibold">
            Upload Document
          </label>
          <input
            required
            onChange={fileupload}
            type="file"
            id="file"
            className="p-3 border border-teal-400 rounded-lg bg-teal-50 text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white font-semibold text-lg rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Submit Form
        </button>
      </form>

      {/* Preview section */}
      <div className="mt-6 text-center text-teal-700 space-y-2">
        <p>Email: {email}</p>
        <p>Image: {dp?.name}</p>
        <p>File: {file?.name}</p>
      </div>

      <div className="flex flex-col items-center mt-6 space-y-4">
        {dp && (
          <div className="w-40 h-40">
            <img
              src={URL.createObjectURL(dp)}
              alt="Profile Image Preview"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
        {file && (
          <div className="w-40 h-40">
            <img
              src={URL.createObjectURL(file)}
              alt="Document Preview"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  </div>
)}










    </div>
  )
}

export default page
