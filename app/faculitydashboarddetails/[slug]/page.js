"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  const [femail, setfemail] = useState("");

  const [value, setValue] = useState("");
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState();

  // Your example response structure:
  // {
  //   "userEmail": "mohit@example.com",
  //   "facultyEmail": "faculty@example.edu",
  //   "_id": "682d6b0f7dad8db51c6b8e69",
  //   "status": "Completed"
  // }

  const [ruseremail, setruseremail] = useState();
  const [rfacultyEmail, setrfacultyEmail] = useState();
  const [ruserid, setruserid] = useState();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
    }

    const checkuser = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/useremail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const res = await response.json();

        if (!res.success) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        setfemail(res.email);
        console.log("User email:", res.email);

        const responsed = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/FacultyMailCheck`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: res.email }),
        });

        const result = await responsed.json();

        if (result.success) {
          console.log("Email verified successfully");
        } else {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (err) {
        alert("Failed to fetch user data");
      }
    };

    checkuser();
  }, []);

  useEffect(() => {
    const getSlugAndFetch = async () => {
      const resolvedParams = await params;
      setValue(resolvedParams.slug);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/requestPage`, {
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

  // *** Fix: Set state only in useEffect, NOT in render ***
  useEffect(() => {
    if (loading && data && data.data) {
      setruseremail(data.data.userEmail);
      setrfacultyEmail(data.data.facultyEmail);
      setruserid(data.data._id);
    }
  }, [loading, data]);

  
 const pendingrequest = async () => {
  const responsed = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/updateStatus`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail: ruseremail, facultyEmail: rfacultyEmail, _id: ruserid, status: "Pending" }),
  });

  const result = await responsed.json();

  if (responsed.ok) {  // Check HTTP status
    alert("Status updated to Pending successfully");
  } else {
    alert("Failed to update status");
    console.log(result);
  }
};




 const acceptedrequest = async () => {
  const responsed = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/updateStatus`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail: ruseremail, facultyEmail: rfacultyEmail, _id: ruserid, status: "Accepted" }),
  });

  const result = await responsed.json();

  if (responsed.ok) {  // Check HTTP status
    alert("Status updated to Accepted successfully");
  } else {
    alert("Failed to update status");
    console.log(result);
  }
};





const rectedrequest = async () => {
  const responsed = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/updateStatus`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail: ruseremail, facultyEmail: rfacultyEmail, _id: ruserid, status: "Rejected" }),
  });

  const result = await responsed.json();

  if (responsed.ok) {  // Check HTTP status
    alert("Status updated to Rejected successfully");
  } else {
    alert("Failed to update status");
    console.log(result);
  }
};





const blockedrequest = async () => {
  const responsed = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/updateStatus`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail: ruseremail, facultyEmail: rfacultyEmail, _id: ruserid, status: "Blocked" }),
  });

  const result = await responsed.json();

  if (responsed.ok) {  // Check HTTP status
    alert("Status updated to Blocked successfully");
  } else {
    alert("Failed to update status");
    console.log(result);
  }
};






const completedrequest = async () => {
  const responsed = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/updateStatus`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail: ruseremail, facultyEmail: rfacultyEmail, _id: ruserid, status: "Completed" }),
  });

  const result = await responsed.json();

  if (responsed.ok) {  // Check HTTP status
    alert("Status updated to Completed successfully");
  } else {
    alert("Failed to update status");
    console.log(result);
  }
};





  // Now comes your return statement below this line...


   return (
     <div>
 
 
      { !loading &&<div>
 
       loading ...... Loading ...... Loading ......
 
       </div>}
 
 
       { loading &&<div>
{data && data.data && (
  <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 flex flex-col md:flex-row gap-8 bg-gray-50 rounded-3xl shadow-xl mt-12">

    {/* SIDEBAR */}
    <aside className="w-full md:w-1/3 bg-gradient-to-tr from-indigo-50 to-purple-100 rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col gap-8
      sticky md:sticky top-0 md:top-20
      md:h-fit
      md:max-h-[calc(100vh-5rem)] 
      md:overflow-auto
      md:shrink-0
      mb-6 md:mb-0
    ">

      <h3 className="text-xl sm:text-2xl font-extrabold text-indigo-900 uppercase tracking-widest border-b-4 border-indigo-700 pb-3 sm:pb-4 mb-4 sm:mb-6">
        Request Summary
      </h3>

      <ul className="flex flex-col gap-5 text-indigo-900 font-medium text-sm sm:text-base">
        {[
          { label: "User ID", value: data.data._id },
          { label: "Name", value: data.data.name },
          { label: "User Email", value: data.data.userEmail },
          { label: "Faculty Email", value: data.data.facultyEmail },
          { label: "Category", value: data.data.category },
          { label: "Main Category", value: data.data.mainCategory },
          { label: "Category Type", value: data.data.categoryType },
        ].map((item, i) => (
          <li
            key={i}
            className="relative pl-6 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:rounded-full before:bg-indigo-700"
          >
            <span className="block text-xs sm:text-sm uppercase tracking-widest mb-1 opacity-80">
              {item.label}
            </span>
            <span className="break-words text-base sm:text-lg">{item.value}</span>
          </li>
        ))}
      </ul>

      <div>
        <h4 className="text-xs sm:text-sm font-bold text-indigo-700 uppercase tracking-widest mb-2 sm:mb-3">
          Status
        </h4>
        <span
          className={`inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-white font-semibold select-none
          ${
            {
              Rejected: "bg-red-600",
              Accepted: "bg-green-600",
              Pending: "bg-yellow-500 text-gray-900",
              Blocked: "bg-gray-900",
              Completed: "bg-indigo-700",
            }[data.data.status] || "bg-gray-400 text-gray-900"
          }
          `}
          style={{ letterSpacing: '0.12em' }}
        >
          {data.data.status}
        </span>
      </div>
    </aside>

    {/* MAIN CONTENT */}
    <main className="w-full md:flex-1 bg-white rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col gap-10">

      {/* DETAILS SECTION */}
      <section>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-800 tracking-wide mb-6 sm:mb-8 border-b-2 border-indigo-300 pb-2 sm:pb-3">
          Request Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-gray-900 text-base sm:text-lg font-semibold">
          <div>
            <p className="text-indigo-700 uppercase tracking-wide mb-1 sm:mb-2">Subject</p>
            <p>{data.data.subject}</p>
          </div>
          <div>
            <p className="text-indigo-700 uppercase tracking-wide mb-1 sm:mb-2">Urgency</p>
            <p>{data.data.urgency}</p>
          </div>
          <div>
            <p className="text-indigo-700 uppercase tracking-wide mb-1 sm:mb-2">Expected Response Date</p>
            <p>{data.data.expectedResponseDate}</p>
          </div>
          <div>
            <p className="text-indigo-700 uppercase tracking-wide mb-1 sm:mb-2">Created At</p>
            <p>{new Date(data.data.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-indigo-700 uppercase tracking-wide mb-1 sm:mb-2">Updated At</p>
            <p>{new Date(data.data.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* MESSAGE SECTION */}
      <section>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-800 tracking-wide mb-4 sm:mb-6 border-b-2 border-indigo-300 pb-2 sm:pb-3">
          Message
        </h3>
        <p className="text-gray-800 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
          {data.data.message}
        </p>
      </section>

      {/* ACTION BUTTONS */}
      <section className="flex flex-wrap gap-4 justify-center md:justify-start">

        <Link href={`/userchat/${data.data.userEmail}`}>
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700
              text-white font-extrabold px-6 sm:px-8 py-3 rounded-full shadow-lg
              transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Start Chat
          </button>
        </Link>

        <button
          onClick={pendingrequest}
          className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 sm:px-7 py-3 rounded-full shadow-md
            transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          Set Pending
        </button>

        <button
          onClick={acceptedrequest}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-7 py-3 rounded-full shadow-md
            transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
        >
          Set Accepted
        </button>

        <button
          onClick={rectedrequest}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-6 sm:px-7 py-3 rounded-full shadow-md
            transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
        >
          Set Rejected
        </button>

        <button
          onClick={blockedrequest}
          className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-semibold px-6 sm:px-7 py-3 rounded-full shadow-md
            transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-700"
        >
          Blocked User
        </button>

        <button
          onClick={completedrequest}
          className="w-full sm:w-auto bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 sm:px-7 py-3 rounded-full shadow-md
            transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
        >
          Set Completed
        </button>

      </section>
    </main>
  </div>
)}







       </div>}
     </div>
   );
 }
 