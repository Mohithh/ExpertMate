"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const [email, setemail] = useState("");
  const [alldetails, setalldetails] = useState("");

  const onChange = (e) => {
    setemail(e.target.value);
  };

  const submitform = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/viewFacultydetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      console.log("✅ Faculty Details Response:", result);

      if (!result.success) {
        alert(result.message || "Wrong email");
        return;
      }

      setalldetails(result.data);
    } catch (error) {
      console.error("❌ Error in viewFacultydetails:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div className="p-5 m-5">
        <Link className="p-5 m-5 bg-green cursor-pointer hover:text-green-500" href={"/engineer"}>Engineers</Link>
        <Link className="p-5 m-5 bg-green cursor-pointer hover:text-green-500" href={"/doctor"}>Doctors</Link>
        <Link className="p-5 m-5 bg-green cursor-pointer hover:text-green-500" href={"/teacher"}>Teacher</Link>
      </div>

      <form onSubmit={submitform} className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
        <input
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Enter Email"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Search
        </button>
      </form>

      {email && (
        <div className="text-sm text-gray-500 mb-4">
          <strong>Searching for:</strong> {email}
        </div>
      )}

      {alldetails && (
        <div className="mb-8">
          <label className="font-bold text-2xl block mb-4">Your Details:</label>
          <div className="border px-5 py-4 rounded-md bg-gray-50 space-y-2">
            <p><strong>Email:</strong> {alldetails.email}</p>
            <p><strong>Country:</strong> {alldetails.country}</p>
            <p><strong>City:</strong> {alldetails.city}</p>
            <p><strong>Profession:</strong> {alldetails.profession}</p>
            <p><strong>Profession Category:</strong> {alldetails.professionCategory}</p>
            <p><strong>Gender:</strong> {alldetails.gender}</p>
            <p><strong>Experience:</strong> {alldetails.experience}</p>
            <p><strong>Age:</strong> {alldetails.age}</p>
            <p><strong>Working Mode:</strong> {alldetails.workingMode}</p>
            <p><strong>Job Type:</strong> {alldetails.jobType}</p>
            <p><strong>Created At:</strong> {new Date(alldetails.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(alldetails.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
