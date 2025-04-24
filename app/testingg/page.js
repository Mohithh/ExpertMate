"use client";

import React, { useEffect, useState } from "react";
// import Link from "next/link";

const page = () => {
  const [doctorList, setDoctorList] = useState([]);           // List of all doctors
  const [userImages, setUserImages] = useState({});           // Stores images/files for each email

  useEffect(() => {
    const checkuser = async () => {
      try {
        // ✅ First API - Get list of all doctors
        const response = await fetch("http://localhost:3000/api/doctorList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await response.json();
        const doctors = res.data;
        setDoctorList(doctors);

        // ✅ Fetch image+file for each doctor's email
        const imagesMap = {};  // Temporary object to store results

        for (const doctor of doctors) {
          const imageRes = await fetch("/api/userimage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: doctor.email })
          });

          const imageData = await imageRes.json();

          if (imageData.success) {
            imagesMap[doctor.email] = imageData.data;
          }
        }

        // ✅ Save all image data
        setUserImages(imagesMap);
        console.log("All images loaded ✅");

      } catch (err) {
        console.error("Error fetching data ❌", err);
      }
    };

    checkuser();

  }, []); // Only run once

  return (
    <div  className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">Doctor Profiles</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctorList.map((value) => {
          const imageData = userImages[value.email];  // Get image+file for this user

          return (
            <div
              key={value.email}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-semibold text-indigo-600">{value.professionCategory} ({value.profession})</h2>
                <p className="text-sm text-gray-500 mb-2">{value.email}</p>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
                <div className="flex items-center">
                  <span className="text-xl mr-2">🌆</span>
                  <p className="font-medium">City: {value.city}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-2">🌍</span>
                  <p className="font-medium">Country: {value.country}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-2">♂️</span>
                  <p className="font-medium">Gender: {value.gender}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-2">📅</span>
                  <p className="font-medium">Experience: {value.experience} years</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-2">🎂</span>
                  <p className="font-medium">Age: {value.age}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-2">💼</span>
                  <p className="font-medium">Job Type: {value.jobType}</p>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-400">
                <p>Created: {new Date(value.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(value.updatedAt).toLocaleString()}</p>
              </div>

              {/* ✅ Image and file section (if exists for this user) */}
              {imageData && (
                <div className="mt-4 border-t pt-4 flex justify-between items-center">
                  <div className="w-1/2">
                    <h2 className="text-md font-semibold mb-2">Uploaded Image:</h2>
                    <img
                      src={`data:${imageData.image.contentType};base64,${imageData.image.fileBase64}`}
                      alt={imageData.image.filename}
                      className="w-full rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="w-1/2 pl-4">
                    <h2 className="text-md font-semibold mb-2">Uploaded File:</h2>
                    <a
                      href={`data:${imageData.file.contentType};base64,${imageData.file.fileBase64}`}
                      download={imageData.file.filename}
                      className="text-blue-600 underline"
                    >
                      Download {imageData.file.filename}
                    </a>
                  </div>
                </div>
              )}

            

              {/* <img src="/doctorbg.webp" alt="" /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
