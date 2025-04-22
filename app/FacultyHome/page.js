"use client";
import React, { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

import Link from 'next/link';


const page = () => {
  const [useremail, setuseremail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkuser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/useremail", {
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

  const submitform = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await fetch("http://localhost:3000/api/Facultydetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: useremail,
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
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };
  

  return (
    <div className='p-10 max-w-4xl mx-auto'>


      <Link className='font-bold text-xl' href={"/details"}>View information</Link>
       


      <form action="" onSubmit={submitform} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <ProgressBar 
    completed={progress}
    bgColor="#10b981"
    baseBgColor="#e5e7eb"
    height="20px"
    labelAlignment="center"
    className="mb-6 z-50 sticky top-0"


  />

{loading ? (
      <p>Loading email...</p>
    ) : error ? (
      <p style={{ color: "red" }}>{error}</p>
    ) : (
      <div className='mb-8'>

        <label className='font-bold text-2xl'>Your Email ID:</label>
        <input
          type="text"
          value={useremail}
          readOnly
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
    )}
      {/* Location Section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Location</h2>


        <div className='mb-4'>
          <label htmlFor="" className='block text-lg font-semibold'>Select Country</label>
          <select required name="" id="" onChange={handlechange} className='mt-2 p-2 border rounded-md w-full'>
            <option value="">Select</option>
            {Object.keys(data).map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor="" className='block text-lg font-semibold'>Select City</label>
          <select required name="" id="" onChange={handlecity} className='mt-2 p-2 border rounded-md w-full'>
            <option value="">Select</option>
            {country && Object.keys(data[country]).map((value) => (
              <option key={value} value={value}>{data[country][value]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Profession Section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Profession</h2>

        <div className='mb-4'>
          <label htmlFor="" className='block text-lg font-semibold'>Select Profession</label>
          <select required name="" id="" onChange={handleprofession} className='mt-2 p-2 border rounded-md w-full'>
            <option value="">Select</option>
            {Object.keys(professions).map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor="" className='block text-lg font-semibold'>Select Profession Category</label>
          <select onChange={handleCategory} className='mt-2 p-2 border rounded-md w-full' disabled={!profession}>
            <option value="">Select</option>
            {profession && Object.entries(professions[profession]).map(([key, val]) => (
              <option key={key} value={key}>{val}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Personal Information</h2>

        <div className='mb-4'>
          <label htmlFor="" className='block text-lg font-semibold'>Select Gender</label>
          <select required name="" id="" onChange={handlegender} className='mt-2 p-2 border rounded-md w-full'>
            <option value="">Select</option>
            {Object.keys(genders).map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor="" className='block text-lg font-semibold'>Select Experience</label>
          <select required name="" id="" onChange={handleexperience} className='mt-2 p-2 border rounded-md w-full'>
            <option value="">Select</option>
            {Object.keys(experiences).map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor="" className='block text-lg font-semibold'>Select Age</label>
          <select required name="" id="" onChange={handleage} className='mt-2 p-2 border rounded-md w-full'>
            <option value="">Select</option>
            {Object.keys(ages).map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Preferences Section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Job Preferences</h2>

        <div className='mb-4'>
          <label htmlFor="" className='block text-lg font-semibold'>Select Working Mode</label>
          <select required name="" id="" onChange={handlemode} className='mt-2 p-2 border rounded-md w-full'>
            <option value="">Select</option>
            {Object.keys(working_mode).map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor="" className='block text-lg font-semibold'>Select Job Type</label>
          <select required name="" id="" onChange={handlejob_type}  className='mt-2 p-2 border rounded-md w-full'>
            <option value="">Select</option>
            {Object.keys(Job_types).map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Values */}
      <p className='mt-4 p-4 bg-green-600 text-white rounded-md'>
        Selected values: {country} {city} {profession} {pcatagory} {gender} {experience} {age} {mode} {job_type}
      </p>

      <button className=' p-3 m-3 bg-green-400 w-full hover:bg-red-400 cursor-pointer'> Submit </button>


      </form>




     




    </div>
  );
};

export default page;
