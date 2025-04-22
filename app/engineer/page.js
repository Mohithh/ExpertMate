"use client";

import React, { useEffect, useState } from 'react';

const Page = () => {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    const checkuser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/engineerList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await response.json();
        console.log(res);
        setDoctorList(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    checkuser();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Engineer List</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctorList.map((value) => (
          <div
            key={value.email}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              {value.professionCategory} ({value.profession})
            </h2>
            <p className="text-sm text-gray-500 mb-4">{value.email}</p>

            <div className="space-y-1 text-gray-700">
              <p><span className="font-medium">City:</span> {value.city}</p>
              <p><span className="font-medium">Country:</span> {value.country}</p>
              <p><span className="font-medium">Gender:</span> {value.gender}</p>
              <p><span className="font-medium">Experience:</span> {value.experience} years</p>
              <p><span className="font-medium">Age:</span> {value.age}</p>
              <p><span className="font-medium">Working Mode:</span> {value.workingMode}</p>
              <p><span className="font-medium">Job Type:</span> {value.jobType}</p>
            </div>

            <div className="mt-4 text-xs text-gray-400">
              <p>Created: {new Date(value.createdAt).toLocaleString()}</p>
              <p>Updated: {new Date(value.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
