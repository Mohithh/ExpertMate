"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  const [engineerList, setEngineerList] = useState([]);
  const [userImages, setUserImages] = useState({});

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/engineerList`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const res = await response.json();
        const engineers = res.data;
        setEngineerList(engineers);

        const imagesMap = {};
        for (const eng of engineers) {
          const imageRes = await fetch("/api/userimage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: eng.email }),
          });

          const imageData = await imageRes.json();
          if (imageData.success) {
            imagesMap[eng.email] = imageData.data;
          }
        }

        setUserImages(imagesMap);
        console.log("✅ Engineer images loaded");
      } catch (err) {
        console.error("❌ Error loading engineers:", err);
      }
    };

    fetchEngineers();
  }, []);

  return (
    <div className="p-10 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-12 tracking-wide drop-shadow-md">
        🛠️ Engineer Profiles
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {engineerList.map((value) => {
          const imageData = userImages[value.email];

          return (
            <div
              key={value.email}
              className="bg-white shadow-2xl rounded-2xl p-6 border border-purple-200 hover:shadow-purple-300 hover:scale-[1.03] transition-all duration-300"
            >
              <Link href={`/userprofile/${value.email}`}>
                <div className="text-center mb-5">
                  <h2 className="text-2xl font-bold text-purple-600">
                    {value.professionCategory}{" "}
                    <span className="text-sm text-gray-400">({value.profession})</span>
                  </h2>
                  <p className="text-sm text-gray-500 italic">{value.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-800 leading-relaxed mb-6">
                  <div className="items-center m-1 text-xl font-medium">Name: {value.name}</div>
                  <div>🏙️ <span className="font-medium">City:</span> {value.city}</div>
                  <div>🌏 <span className="font-medium">Country:</span> {value.country}</div>
                  <div>👤 <span className="font-medium">Gender:</span> {value.gender}</div>
                  <div>📈 <span className="font-medium">Experience:</span> {value.experience} yrs</div>
                  <div>🎂 <span className="font-medium">Age:</span> {value.age}</div>
                  <div>💼 <span className="font-medium">Job Type:</span> {value.jobType}</div>
                  <div>🖥️ <span className="font-medium">Working Mode:</span> {value.workingMode}</div>
                </div>

                <div className="text-xs text-gray-400">
                  <p>🕒 Created: {new Date(value.createdAt).toLocaleString()}</p>
                  <p>🔄 Updated: {new Date(value.updatedAt).toLocaleString()}</p>
                </div>
              </Link>

              {imageData && (
                <div className="mt-6 border-t pt-5">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image Card */}
                    <div className="flex-1 bg-purple-50 p-3 rounded-xl shadow-inner border border-purple-100">
                      <h4 className="text-sm font-semibold text-purple-700 mb-2 flex items-center gap-1">
                        📸 Image Preview
                      </h4>
                      <div className="w-full aspect-square overflow-hidden rounded-xl border border-purple-200 bg-white shadow-md">
                        <img
                          src={`data:${imageData.image.contentType};base64,${imageData.image.fileBase64}`}
                          alt={imageData.image.filename}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>

                    {/* File Card */}
                    <div className="flex-1 bg-purple-50 p-3 rounded-xl shadow-inner border border-purple-100">
                      <h4 className="text-sm font-semibold text-purple-700 mb-2 flex items-center gap-1">
                        📁 File Download
                      </h4>
                      <div className="bg-white p-4 rounded-md border border-purple-200 shadow-sm">
                        <p className="text-xs text-gray-600 mb-2">
                          Filename: {imageData.file.filename}
                        </p>
                        <a
                          href={`data:${imageData.file.contentType};base64,${imageData.file.fileBase64}`}
                          download={imageData.file.filename}
                          className="inline-block px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition"
                        >
                          ⬇️ Download File
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
