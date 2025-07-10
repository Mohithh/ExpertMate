"use client";

import { useState, useEffect } from "react";
import Link from "next/link";


export default function Page({ params }) {
  const [value, setValue] = useState("");
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState();


  useEffect(() => {
    const getSlugAndFetch = async () => {
      const resolvedParams = await params;
      setValue(resolvedParams.slug);

      try {
        const response = await fetch(`/api/requestPage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: resolvedParams.slug }),
        });

        const data = await response.json();

        if (response.ok) {
          setloading(true);
          setdata(data);
          console.log("Data fetched successfully:", data);
        } else {
          alert("Failed to fetch requests");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching requests");
      }
    };

    getSlugAndFetch();
  }, [params]);

  return (
    <div>


     { !loading &&<div>

      loading ...... Loading ...... Loading ......

      </div>}


      { loading &&<div>

{data && data.data && (
  <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-3xl shadow-lg border border-indigo-100 mt-10">
    <h2 className="text-3xl font-extrabold text-indigo-700 text-center uppercase tracking-wider mb-10">
      Request Information
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* Reusable Info Card */}
      {[
        { label: "User ID", value: data.data._id },
        { label: "Name", value: data.data.name },
        { label: "User Email", value: data.data.userEmail },
        { label: "Faculty Email", value: data.data.facultyEmail },
        { label: "Category", value: data.data.category },
        { label: "Subject", value: data.data.subject },
        { label: "Message", value: data.data.message },
        { label: "Urgency", value: data.data.urgency },
        { label: "Expected Response Date", value: data.data.expectedResponseDate },
        { label: "Main Category", value: data.data.mainCategory },
        { label: "Category Type", value: data.data.categoryType },
        { label: "Created At", value: new Date(data.data.createdAt).toLocaleString() },
        { label: "Updated At", value: new Date(data.data.updatedAt).toLocaleString() },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl shadow-sm border"
        >
          <p className="text-xs font-bold uppercase text-indigo-500 mb-1 tracking-wide">{item.label}</p>
          <p className="text-sm text-gray-800 break-words">{item.value}</p>
        </div>
      ))}

      {/* Status Badge */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl shadow-sm border flex flex-col justify-center items-start gap-2">
        <p className="text-xs font-bold uppercase text-indigo-500 tracking-wide">Status</p>
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold text-white
            ${data.data.status === "Rejected" ? "bg-red-500" : ""}
            ${data.data.status === "Accepted" ? "bg-green-500" : ""}
            ${data.data.status === "Pending" ? "bg-orange-400" : ""}
            ${data.data.status === "Blocked" ? "bg-black" : ""}
            ${data.data.status === "Completed" ? "bg-blue-700" : ""}
            ${!["Accepted", "Rejected", "Pending", "Blocked", "Completed"].includes(data.data.status) ? "bg-yellow-400" : ""}
          `}
        >
          {data.data.status}
        </span>
      </div>

      {/* Chat Button */}
      <div className="col-span-full flex justify-center mt-4">
        <Link href={`/userchat/${data.data.facultyEmail}`}>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-full shadow-md transition duration-200">
            Start Chat
          </button>
        </Link>
      </div>
    </div>
  </div>
)}



      </div>}
    </div>
  );
}