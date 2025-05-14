"use client";
import React, { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

import Link from 'next/link';


const page = () => {
  const [useremail, setuseremail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const [dp, setdp] = useState()
    const [file, setfile] = useState()

  useEffect(() => {
    const checkuser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token not found");
        setLoading(false);
        return;
      }
 
      try {
        const response = await fetch( `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/useremail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const res = await response.json();

        if (res.success) {
          setuseremail(res.email);
        } else {
          setError(res.message || "Something went wrong");
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false); // ✅ set loading to false after everything
      }
    };

    checkuser();
  }, []);

  
  const data = {
    india: { delhi: 'Delhi', mumbai: 'Mumbai' },
    usa: { newyork: 'New York', california: 'California' },
    uk: { london: 'London', manchester: 'Manchester' }
  };

  const professions = {
    doctor: { cardiologist: 'Cardiologist', dermatologist: 'Dermatologist', pediatrician: 'Pediatrician' },
    engineer: { software: 'Software Engineer', civil: 'Civil Engineer', mechanical: 'Mechanical Engineer' },
    teacher: { math: 'Math Teacher', science: 'Science Teacher', english: 'English Teacher' },
    lawyer: { criminal: 'Criminal Lawyer', corporate: 'Corporate Lawyer', family: 'Family Lawyer' },
    artist: { painter: 'Painter', musician: 'Musician', dancer: 'Dancer' }
  };

  const genders = {
    Male: "Male",
    Female: "Female",
    Other: "Other"
  };

  const experiences = {
    fresher: "fresher",
    "0-1": "0-1",
    "1-2": "1-2",
    "2-3": "2-3",
    "3-4": "3-4",
    "4-5": "4-5",
    "5+": "5+"
  };

  const ages = {
    "0-10": "0-10",
    "11-20": "11-20",
    "21-30": "21-30",
    "31-40": "31-40",
    "41-50": "41-50",
    "51-60": "51-60",
    "61+": "61+"
  };

  const working_mode = {
    remote: "remote",
    office: "office",
    onsite: "onsite",
    hybrid: "hybrid",
  };

  const Job_types = {
    full_time: "full_time",
    part_time: "part_time",
    contract: "contract",
    internship: "internship",
    freelance: "freelance"
  };

  const [country, setcountry] = useState("");
  const [city, setcity] = useState();
  const [profession, setprofession] = useState("");
  const [pcatagory, setppcatagory] = useState("");
  const [gender, setgender] = useState("");
  const [experience, setexperience] = useState("");
  const [age, setage] = useState("");
  const [mode, setmode] = useState("");
  const [job_type, setjob_type] = useState("");
  const [progress, setProgress] = useState(0);

  const [username, setusername] = useState("")
  const [description, setdescription] = useState("")

  const [mobile, setmobile] = useState("")


  const mailupload =(e)=>{
    setuseremail(e.target.value)
    // console.log(email)
  }

  const imgupload = (e)=>{
    // setdp(e.target.value)
    setdp(e.target.files[0])
  }

  const fileupload = (e)=>{
    setfile(e.target.files[0])
  }


  const handlechange = (e) => {
    setcountry(e.target.value);
    setcity("");
    setProgress(progress+10)
  };

  const handlecity = (e) => {
    setcity(e.target.value);
    setProgress(progress+10)
  };

  const handleprofession = (e) => {
    setprofession(e.target.value);
    setppcatagory("");
    setProgress(progress+10)
  };

  const handleCategory = (e) => {
    setppcatagory(e.target.value);
    setProgress(progress+10)
  };

  const handlegender = (e) => {
    setgender(e.target.value);
    setProgress(progress+10)
  };

  const handleexperience = (e) => {
    setexperience(e.target.value);
    setProgress(progress+10)
  };

  const handleage = (e) => {
    setage(e.target.value);
    setProgress(progress+10)
  };

  const handlemode = (e) => {
    setmode(e.target.value);
    setProgress(progress+10)
  };

  const handlejob_type = (e) => {
    setjob_type(e.target.value);
    setProgress(progress+20)
  };

  const onchnagename = (e)=>{
    setusername(e.target.value)
  }

  const onchnageDescription = (e)=>{
    setdescription(e.target.value)

  }
  const onchangemobile = (e)=>{
    setmobile(e.target.value)
  }

  const submitform = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/Facultydetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: useremail,
          name: username,
          description: description,
          mobile: mobile,
          country: country,
          city: city,
          profession: profession,
          professionCategory: pcatagory,
          gender: gender,
          experience: experience,
          age: age,
          workingMode: mode,
          jobType: job_type
        }),
      });
  
      const result = await response.json();
      console.log("✅ Response:", result);



      const formData = new FormData();
    formData.append("email", useremail);
    formData.append("image", dp);
    formData.append("file", file);

    const res = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    setuseremail("");
    setdp(null);
    setfile(null);



    } catch (error) {
      console.error("❌ Error:", error);
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-green-600">Submit Your Details</h1>
      <Link href="/details" className="text-blue-600 font-semibold hover:underline text-lg">
        View Information
      </Link>
    </div>
  
    <form onSubmit={submitform} className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 border border-gray-100">
      
      {/* ProgressBar */}
      <ProgressBar 
        completed={progress}
        bgColor="#10b981"
        baseBgColor="#e5e7eb"
        height="20px"
        labelAlignment="center"
        className="sticky top-0 z-50"
      />
  
      {/* Email Section */}
      {loading ? (
        <p className="text-gray-700">Loading email...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <label className="block text-xl font-bold mb-2">Your Email ID:</label>
          <input
            type="text"
            value={useremail}
            readOnly
            className="border border-gray-300 px-4 py-2 rounded-lg w-full bg-gray-100"
          />
        </div>
      )}


<section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input  onChange={onchnagename} type="text" value={username} name='name' required className="w-full p-3 rounded-md border border-gray-300" />
          </div>

          <div>
            <label className="block font-medium mb-1">Contact Number</label>
            <input   onChange={onchangemobile} type="number" value={mobile} name='number' required className="w-full p-3 rounded-md border border-gray-300" />
          </div>
         
        </div>
      </section>






  
      {/* Location Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Select Country</label>
            <select onChange={handlechange} required className="w-full p-3 rounded-md border border-gray-300">
              <option value="">Select</option>
              {Object.keys(data).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block font-medium mb-1">Select City</label>
            <select onChange={handlecity} required className="w-full p-3 rounded-md border border-gray-300">
              <option value="">Select</option>
              {country && Object.keys(data[country]).map((value) => (
                <option key={value} value={value}>{data[country][value]}</option>
              ))}
            </select>
          </div>
        </div>
      </section>
  
      {/* Profession Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Profession</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Select Profession</label>
            <select onChange={handleprofession} required className="w-full p-3 rounded-md border border-gray-300">
              <option value="">Select</option>
              {Object.keys(professions).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block font-medium mb-1">Select Profession Category</label>
            <select onChange={handleCategory} disabled={!profession} className="w-full p-3 rounded-md border border-gray-300">
              <option value="">Select</option>
              {profession && Object.entries(professions[profession]).map(([key, val]) => (
                <option key={key} value={key}>{val}</option>
              ))}
            </select>
          </div>
        </div>
      </section>
  
      {/* Personal Info Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block font-medium mb-1">Select Gender</label>
            <select onChange={handlegender} required className="w-full p-3 rounded-md border border-gray-300">
              <option value="">Select</option>
              {Object.keys(genders).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block font-medium mb-1">Select Experience</label>
            <select onChange={handleexperience} required className="w-full p-3 rounded-md border border-gray-300">
              <option value="">Select</option>
              {Object.keys(experiences).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block font-medium mb-1">Select Age</label>
            <select onChange={handleage} required className="w-full p-3 rounded-md border border-gray-300">
              <option value="">Select</option>
              {Object.keys(ages).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </section>
  
      {/* Job Preferences */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Job Preferences</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Select Working Mode</label>
            <select onChange={handlemode} required className="w-full p-3 rounded-md border border-gray-300">
              <option value="">Select</option>
              {Object.keys(working_mode).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block font-medium mb-1">Select Job Type</label>
            <select onChange={handlejob_type} required className="w-full p-3 rounded-md border border-gray-300">
              <option value="">Select</option>
              {Object.keys(Job_types).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </section>
  
      {/* Selected Values */}
      <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-sm text-green-700">
        Selected values: {country} {city} {profession} {pcatagory} {gender} {experience} {age} {mode} {job_type}
      </div>
  
      {/* File Upload Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-2">Upload Image</label>
          <input type="file" onChange={imgupload} accept="image/*" required className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block font-medium mb-2">Upload File</label>
          <input type="file" onChange={fileupload} required className="w-full p-2 border rounded-md" />
        </div>
      </div>





      <section>
        <div className="">
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea required className='border w-full h-24 border-black ' onChange={onchnageDescription} name="description" value={description} id=""></textarea>
          </div>

         
        </div>
      </section>
  






      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition duration-300"
      >
        Submit Form
      </button>
    </form>
  </div>
  
  );
};

export default page;
