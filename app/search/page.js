"use client";

import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [email, setemail] = useState("");
  const [alldetails, setalldetails] = useState(null);
  const [userData, setUserData] = useState(null);

  const onChange = (e) => setemail(e.target.value);

  const submitform = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/viewFacultydetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!result.success) {
        alert(result.message || "Wrong email");
        return;
      }

      const res = await fetch("/api/userimage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setUserData(data.data);
      }

      setalldetails(result.data);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 p-6 flex flex-col items-center font-sans animate-fade-in">
      <div className="flex flex-wrap gap-5 mb-10">
        <Link className="px-5 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white text-lg rounded-xl shadow-md hover:scale-105 transition-transform" href="/engineer">👷 Engineers</Link>
        <Link className="px-5 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-lg rounded-xl shadow-md hover:scale-105 transition-transform" href="/doctor">🩺 Doctors</Link>
        <Link className="px-5 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-lg rounded-xl shadow-md hover:scale-105 transition-transform" href="/teacher">📚 Teachers</Link>
      </div>

      <form onSubmit={submitform} className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8 mb-8 border border-gray-200">
        <label className="block text-xl font-semibold text-gray-800 mb-3">Enter Email</label>
        <input
          onChange={onChange}
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-300 text-gray-800 text-base"
          type="email"
          value={email}
          name="email"
          required
          placeholder="example@mail.com"
        />
        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white py-3 text-lg rounded-xl hover:bg-green-700 transition duration-300 font-semibold shadow-sm hover:shadow-md"
        >
          🔍 Search
        </button>
      </form>

      {alldetails && (
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-10 flex flex-col md:flex-row items-start gap-10 border-t-4 border-green-400">
          <div className="flex-1 text-gray-700 text-sm grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-[1rem]">
            <p className="text-3xl font-bold m-2">Name: {alldetails.name}</p>
            <p><span className="font-semibold">📧 Email:</span> {alldetails.email}</p>
            <p><span className="font-semibold">🌍 Country:</span> {alldetails.country}</p>
            <p><span className="font-semibold">🏙️ City:</span> {alldetails.city}</p>
            <p><span className="font-semibold">💼 Profession:</span> {alldetails.profession}</p>
            <p><span className="font-semibold">🔧 Profession Category:</span> {alldetails.professionCategory}</p>
            <p><span className="font-semibold">🧑 Gender:</span> {alldetails.gender}</p>
            <p><span className="font-semibold">📊 Experience:</span> {alldetails.experience}</p>
            <p><span className="font-semibold">🎂 Age:</span> {alldetails.age}</p>
            <p><span className="font-semibold">🖥️ Working Mode:</span> {alldetails.workingMode}</p>
            <p><span className="font-semibold">📝 Job Type:</span> {alldetails.jobType}</p>
            <p><span className="font-semibold">🕒 Created At:</span> {new Date(alldetails.createdAt).toLocaleString()}</p>
            <p><span className="font-semibold">🔄 Updated At:</span> {new Date(alldetails.updatedAt).toLocaleString()}</p>
          </div>

          {userData?.image && (
            <div className="flex-shrink-0">
              <img
                src={`data:${userData.image.contentType};base64,${userData.image.fileBase64}`}
                alt={userData.image.filename}
                className="w-56 h-60 object-cover rounded-full border shadow-md"
              />
            </div>
          )}
        </div>
      )}

      {userData?.file && (
        <div className="w-full max-w-3xl mt-12 bg-gradient-to-br from-white to-blue-100 shadow-2xl p-10 rounded-3xl text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 flex justify-center items-center gap-2 text-blue-700">
            📁 <span className="tracking-wide">Uploaded File</span>
          </h2>
          <a
            href={`data:${userData.file.contentType};base64,${userData.file.fileBase64}`}
            download={userData.file.filename}
            className="inline-block mt-4 px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-full transition duration-300 hover:bg-blue-700 active:scale-95 shadow-lg"
          >
            ⬇️ Download <span className="font-mono">{userData.file.filename}</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Page;
