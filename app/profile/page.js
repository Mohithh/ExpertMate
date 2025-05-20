"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [useremail, setuseremail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const [userData, setUserData] = useState(null);
  

  

  const [alldetails, setalldetails] = useState("")

  // First API: get user email from token
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
  
          console.log("User Emailnjnkjn:", res.email); 
  
          const ress = await fetch("/api/userimage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: res.email }),
          });
  
          const data = await ress.json();
          if (data.success) {
            setUserData(data.data);
          } else {
            console.log("Error fetching user image:", data.message);
          }
        } else {
          setError(res.message || "Something went wrong");
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
        console.log("User Email:", useremail); 
      }
    };
  
    checkuser();
  }, []);
  

  useEffect(() => {
    if (useremail) {
      const fetchFaculty = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/viewFacultydetails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: useremail }),
          });

          const result = await response.json();
          console.log("✅ Faculty Details Response:", result);
          setalldetails(result.data); 
        } catch (error) {
          console.error(" Error in viewFacultydetails:", error);
        }
      };

      

      fetchFaculty();
    }
  }, [useremail]); 

  return (
    <div className="">
      {loading ? (
        <p>Loading email...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="mb-8">
          <label className="font-bold text-2xl">Your Email ID:</label>
          <input
            type="text"
            value={useremail}
            readOnly
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
      )}

<div className=" flex flex-row  gap-8 justify-center items-center mb-1">
  {/* User Data with Image and Info */}
  {userData && (
    <div className=" flex flex-col">
      
      {/* Image Section */}
      <div className="relative flex-shrink-0 w-56 h-60 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
        <img
          src={`data:${userData.image.contentType};base64,${userData.image.fileBase64}`}
          alt={userData.image.filename}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Document Download Section */}
      <div className="flex flex-col items-start gap-4">
        <a
          href={`data:${userData.file.contentType};base64,${userData.file.fileBase64}`}
          download={userData.file.filename}
          className="m-3 items-center justify-center  inline-block bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          ⬇️ Download Doc
        </a>
      </div>

      {/* User Info Section */}
     
    </div>
  )}
  <div>


  <div className="m-5 text-left max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">User Information</h2>
        <p className="p-1 text-lg text-gray-800"><strong>Email:</strong> {alldetails.email}</p>
        <p className="p-1 text-lg text-gray-800"><strong>Country:</strong> {alldetails.country}</p>
        <p className="p-1 text-lg text-gray-800"><strong>City:</strong> {alldetails.city}</p>
        <p className="text-lg text-gray-800"><strong>Profession:</strong> {alldetails.profession}</p>
        <p className="p-1 text-lg text-gray-800"><strong>Profession Category:</strong> {alldetails.professionCategory}</p>
        <p className="p-1 text-lg text-gray-800"><strong>Gender:</strong> {alldetails.gender}</p>
        <p className="p-1 text-lg text-gray-800"><strong>Experience:</strong> {alldetails.experience}</p>
        <p className="p-1 text-lg text-gray-800"><strong>Age:</strong> {alldetails.age}</p>
        <p className="p-1 text-lg text-gray-800"><strong>Working Mode:</strong> {alldetails.workingMode}</p>
        <p className="p-1 text-lg text-gray-800"><strong>Job Type:</strong> {alldetails.jobType}</p>
        <p className="p-1 text-lg text-gray-800"><strong>Created At:</strong> {new Date(alldetails.createdAt).toLocaleString()}</p>
        <p className="p-1 text-lg text-gray-800"><strong>Updated At:</strong> {new Date(alldetails.updatedAt).toLocaleString()}</p>
      </div>
  </div>
</div>









      

    </div>
  );
};

export default page;