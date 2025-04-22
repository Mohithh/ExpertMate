"use client";
import React, { useEffect, useState } from "react";

const Page = () => {  // Changed from 'page' to 'Page'
  const [useremail, setuseremail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alldetails, setalldetails] = useState("");

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
        } else {
          setError(res.message || "Something went wrong");
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    checkuser();
  }, []);

  // Second API: get faculty details when email is available
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
          setalldetails(result.data); // Assuming result.data contains the faculty details
        } catch (error) {
          console.error(" Error in viewFacultydetails:", error);
        }
      };

      fetchFaculty();
    }
  }, [useremail]); 

  return (
    <div>
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

      {alldetails && (
        <div className="mb-8">
          <label className="font-bold text-2xl">your Details:</label>
          <div className="border px-3 py-2 rounded-md w-full mt-2">
            <p>Email: {alldetails.email}</p>
            <p>Country: {alldetails.country}</p>
            <p>City: {alldetails.city}</p>
            <p>Profession: {alldetails.profession}</p>
            <p>Profession Category: {alldetails.professionCategory}</p>
            <p>Gender: {alldetails.gender}</p>
            <p>Experience: {alldetails.experience}</p>
            <p>Age: {alldetails.age}</p>
            <p>Working Mode: {alldetails.workingMode}</p>
            <p>Job Type: {alldetails.jobType}</p>
            <p>Created At: {new Date(alldetails.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(alldetails.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;  // Changed from 'page' to 'Page'