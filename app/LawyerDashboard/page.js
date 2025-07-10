"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import LawyerHeader from "@/app/LawyerHeader/page";



const page = () => {

  // blocked,urgent,completed,rejected,accepted,pending   

  const router = useRouter();

  const [useremail, setuseremail] = useState("")
  const [loading, setloading] = useState(true)

  const [allrequestbox, setallrequestbox] = useState(false)
  const [pendingrequestbox, setpendingrequestbox] = useState(false)
  const [acceptedrequestbox, setacceptedrequestbox] = useState(false)
  const [rejectedrequestbox, setrejectedrequestbox] = useState(false)
  const [completedrequestbox, setcompletedrequestbox] = useState(false)
  const [urgentrequestbox, seturgentrequestbox] = useState(false)
  const [blockedrequestbox, setblockedrequestbox] = useState(false)

  const [allrequest, setallrequest] = useState()
  const [pendingrequest, setpendingrequest] = useState()
  const [pendingloading, setpendingloading] = useState(true)

  const [acceptedrequest, setacceptedrequest] = useState()
  const [acceptedloading, setacceptedloading] = useState(true)


  const [rejectedrequest, setrejectedrequest] = useState()
  const [rejectedloading, setrejectedloading] = useState(true)

  const [completedrequest, setcompletedrequest] = useState()
  const [completedloading, setcompletedloading] = useState(true)

  const [urgentrequest, seturgentrequest] = useState()
  const [urgentloading, seturgentloading] = useState(true)

  const [blockedrequest, setblockedrequest] = useState()
  const [blockedloading, setblockedloading] = useState(true)





  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // First, fetch user email
        const response = await fetch(`/api/useremail`, {
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

        // Set email and continue
        setuseremail(res.email);
        setloading(false);

        // Then fetch all requests using the fetched email
        const allRes = await fetch(`/api/fetchAllRequest`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ facultyEmail: res.email }),
        });

        const data = await allRes.json();

        if (allRes.ok) {
          setallrequest(data);
        } else {
          alert("Failed to fetch requests");
        }
      } catch (err) {
        console.error("Error during fetch:", err);
        router.push("/login");
      }



    };

    fetchData();
  }, []);




  const allrequestclick = () => {
    setallrequestbox(true)
    setpendingrequestbox(false)
    setacceptedrequestbox(false)
    setrejectedrequestbox(false)
    setcompletedrequestbox(false)
    seturgentrequestbox(false)
    setblockedrequestbox(false)
  }
  const pendingrequestclick = async () => {
    setallrequestbox(false)
    setpendingrequestbox(true)
    setacceptedrequestbox(false)
    setrejectedrequestbox(false)
    setcompletedrequestbox(false)
    seturgentrequestbox(false)
    setblockedrequestbox(false)
    console.log("woking")


    try {
      const response = await fetch(`/api/getStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facultyEmail: useremail, status: "Pending" }),
      });

      console.log("response", response)
      console.log("useremail", useremail)

      const data = await response.json();

      if (response.ok) {
        setpendingloading(false)

        setpendingrequest(data);
      } else {
        alert("Failed to fetch requests");
      }


    } catch (error) {

    }

  }
  const acceptedrequestclick = async () => {
    setallrequestbox(false)
    setpendingrequestbox(false)
    setacceptedrequestbox(true)
    setrejectedrequestbox(false)
    setcompletedrequestbox(false)
    seturgentrequestbox(false)
    setblockedrequestbox(false)


    try {
      const response = await fetch(`/api/getStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facultyEmail: useremail, status: "Accepted" }),
      });

      const data = await response.json();

      if (response.ok) {
        setacceptedloading(false)
        setacceptedrequest(data);
      } else {
        alert("Failed to fetch requests");
      }


    } catch (error) {

    }


  }
  const rejectedrequestclick = async () => {
    setallrequestbox(false)
    setpendingrequestbox(false)
    setacceptedrequestbox(false)
    setrejectedrequestbox(true)
    setcompletedrequestbox(false)
    seturgentrequestbox(false)
    setblockedrequestbox(false)


    try {
      const response = await fetch(`/api/getStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facultyEmail: useremail, status: "Rejected" }),
      });
      const data = await response.json();

      if (response.ok) {
        setrejectedloading(false)

        setrejectedrequest(data);
      } else {
        alert("Failed to fetch requests");
      }


    } catch (error) {

    }


  }
  const completedrequestclick = async () => {
    setallrequestbox(false)
    setpendingrequestbox(false)
    setacceptedrequestbox(false)
    setrejectedrequestbox(false)
    setcompletedrequestbox(true)
    seturgentrequestbox(false)
    setblockedrequestbox(false)



    try {
      const response = await fetch(`/api/getStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facultyEmail: useremail, status: "Completed" }),
      });
      const data = await response.json();

      if (response.ok) {
        setcompletedloading(false)

        setcompletedrequest(data);
      } else {
        alert("Failed to fetch requests");
      }


    } catch (error) {

    }

  }
  const urgentrequestclick = async () => {
    setallrequestbox(false)
    setpendingrequestbox(false)
    setacceptedrequestbox(false)
    setrejectedrequestbox(false)
    setcompletedrequestbox(false)
    seturgentrequestbox(true)
    setblockedrequestbox(false)


    try {
      const response = await fetch(`/api/getStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facultyEmail: useremail, status: "Urgent" }),
      });
      const data = await response.json();

      if (response.ok) {
        seturgentloading(false)

        seturgentrequest(data);
      } else {
        alert("Failed to fetch requests");
      }


    } catch (error) {

    }


  }
  const blockedrequestclick = async () => {
    setallrequestbox(false)
    setpendingrequestbox(false)
    setacceptedrequestbox(false)
    setrejectedrequestbox(false)
    setcompletedrequestbox(false)
    seturgentrequestbox(false)
    setblockedrequestbox(true)
    console.log("working")





    try {
      const response = await fetch(`/api/getStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facultyEmail: useremail, status: "Blocked" }),
      });

      const data = await response.json();

      if (response.ok) {
        setblockedloading(false)

        setblockedrequest(data);
      } else {
        alert("Failed to fetch requests");
      }


    } catch (error) {

    }
  }


  return (
    <div>
     
     <LawyerHeader />
      {loading && <div>

        laoding

      </div>}


      {!loading && <div>


        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
          <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10 tracking-wide drop-shadow-sm">
            🎓Dashboard
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              onClick={allrequestclick}
              className="bg-white/40 backdrop-blur-lg border border-purple-200 shadow-lg rounded-2xl p-6 text-center font-semibold text-purple-900 hover:scale-105 hover:bg-white/60 transition-all duration-300 ease-in-out cursor-pointer"
            >
              📋 All Requests
            </div>
            <div
              onClick={pendingrequestclick}
              className="bg-white/40 backdrop-blur-lg border border-yellow-200 shadow-lg rounded-2xl p-6 text-center font-semibold text-yellow-800 hover:scale-105 hover:bg-white/60 transition-all duration-300 ease-in-out cursor-pointer"
            >
              ⏳ Pending Requests
            </div>
            <div
              onClick={acceptedrequestclick}
              className="bg-white/40 backdrop-blur-lg border border-green-200 shadow-lg rounded-2xl p-6 text-center font-semibold text-green-800 hover:scale-105 hover:bg-white/60 transition-all duration-300 ease-in-out cursor-pointer"
            >
              ✅ Accepted Requests
            </div>
            <div
              onClick={rejectedrequestclick}
              className="bg-white/40 backdrop-blur-lg border border-red-200 shadow-lg rounded-2xl p-6 text-center font-semibold text-red-800 hover:scale-105 hover:bg-white/60 transition-all duration-300 ease-in-out cursor-pointer"
            >
              ❌ Rejected Requests
            </div>
            <div
              onClick={completedrequestclick}
              className="bg-white/40 backdrop-blur-lg border border-blue-200 shadow-lg rounded-2xl p-6 text-center font-semibold text-blue-800 hover:scale-105 hover:bg-white/60 transition-all duration-300 ease-in-out cursor-pointer"
            >
              🎯 Completed Requests
            </div>
            <div
              onClick={urgentrequestclick}
              className="bg-white/40 backdrop-blur-lg border border-pink-300 shadow-lg rounded-2xl p-6 text-center font-semibold text-pink-800 hover:scale-105 hover:bg-white/60 transition-all duration-300 ease-in-out cursor-pointer"
            >
              🚨 Urgent Requests
            </div>
            <div
              onClick={blockedrequestclick}
              className="bg-white/40 backdrop-blur-lg border border-gray-300 shadow-lg rounded-2xl p-6 text-center font-semibold text-gray-700 hover:scale-105 hover:bg-white/60 transition-all duration-300 ease-in-out cursor-pointer"
            >
              🔒 Blocked
            </div>
          </div>







          {allrequestbox && (
            <div>
              <h2 className="text-2xl font-bold text-purple-800 mb-4 mt-6 text-center">
                All Requests Overview
              </h2>

              {allrequest?.data?.length > 0 ? (
                <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                  <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-purple-700 text-white">
                      <tr>
                        <th className="px-4 py-5">Name</th>
                        <th className="px-4 py-5">Category</th>
                        <th className="px-4 py-5">Subject</th>
                        <th className="px-4 py-5">Status</th>
                        <th className="px-4 py-5">Main Category</th>
                        <th className="px-4 py-5">Urgency</th>
                        <th className="px-4 py-5">Created At</th>
                        <th className="px-4 py-5">Details</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {allrequest.data.map((item, index) => {
                        const createdAt = new Date(item.createdAt);
                        const date = createdAt.toLocaleDateString("en-GB");
                        const time = createdAt.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        });
                        const formattedDate = `${date} time ${time}`;
                        const status = item.status.toLowerCase();

                        const statusColor = {
                          pending: "text-yellow-600",
                          accepted: "text-green-600",
                          rejected: "text-red-500",
                          completed: "text-blue-600",
                          blocked: "text-red-700 font-bold",
                          urgent: "text-orange-600",
                        };

                        return (
                          <tr
                            key={item._id}
                            className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-200" : "bg-white hover:bg-gray-200"}
                          >
                            <td className="px-4 py-4">{item.name}</td>
                            <td className="px-4 py-4">{item.category}</td>
                            <td className="px-4 py-5">{item.subject}</td>
                            <td className={`px-4 py-2 capitalize ${statusColor[status] || "text-gray-700"}`}>
                              {status}
                            </td>
                            <td className="px-4 py-2">{item.mainCategory}</td>
                            <td
                              className={`px-4 py-2 font-semibold ${item.urgency === "High"
                                  ? "text-red-600"
                                  : item.urgency === "Medium"
                                    ? "text-orange-500"
                                    : "text-green-600"
                                }`}
                            >
                              {item.urgency}
                            </td>
                            <td className="px-4 py-2 text-blue-600">{formattedDate}</td>
                            <td className="px-4 py-2 break-all text-purple-700 font-medium">
                              <Link
                                href={`faculitydashboarddetails/${item._id}`}
                                className="hover:underline"
                              >
                                Update
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 mt-4">No requests found.</p>
              )}
            </div>
          )}








          {/* const [pendingrequest, setpendingrequest] = useState()
        const [pendingloading, setpendingloading] = useState(true) */}


          {pendingrequestbox && <div>


            {!pendingloading && (
              <div>


                <h2 className="text-center text-2xl font-semibold mt-6 mb-3 text-yellow-700">Pending Request List
                </h2>

                {pendingrequest?.data && pendingrequest.data.length > 0 ? (
                  <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                    <table className="min-w-full text-sm text-left text-gray-700">
                      <thead className="bg-yellow-700 text-white">
                        <tr>
                          <th className="px-4 py-5">Name</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Subject</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Main Category</th>
                          <th className="px-4 py-3">Urgency</th>
                          <th className="px-4 py-3">Created At</th>
                          <th className="px-4 py-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {pendingrequest.data.map((item, index) => {
                          const createdAt = new Date(item.createdAt);
                          const date = createdAt.toLocaleDateString("en-GB");
                          const time = createdAt.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          });
                          const formattedDate = `${date} time ${time}`;

                          // Format status to lowercase
                          const status = item.status?.toLowerCase();

                          return (
                            <tr
                              key={item._id}
                              className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-200" : "bg-white hover:bg-gray-200"}
                            >
                              <td className="px-4 py-5">{item.name}</td>
                              <td className="px-4 py-5">{item.category}</td>
                              <td className="px-4 py-2">{item.subject}</td>
                              <td
                                className={`px-4 py-2 font-medium capitalize ${status === "pending"
                                    ? "text-yellow-600"
                                    : status === "blocked"
                                      ? "text-red-600"
                                      : status === "urgent"
                                        ? "text-orange-600"
                                        : status === "rejected"
                                          ? "text-pink-600"
                                          : status === "accepted"
                                            ? "text-blue-600"
                                            : status === "completed"
                                              ? "text-green-600"
                                              : "text-gray-600"
                                  }`}
                              >
                                {status}
                              </td>
                              <td className="px-4 py-2">{item.mainCategory}</td>
                              <td
                                className={`px-4 py-2 font-semibold ${item.urgency === "High"
                                    ? "text-red-600"
                                    : item.urgency === "Medium"
                                      ? "text-orange-500"
                                      : "text-green-600"
                                  }`}
                              >
                                {item.urgency}
                              </td>
                              <td className="px-4 py-2 text-blue-600">{formattedDate}</td>
                              <td className="px-4 py-2 break-all text-purple-700 font-medium">
                                <Link
                                  href={`LawyerDashboard/${item._id}`}
                                  className="hover:underline"
                                >
                                  Update
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-red-600 mt-4 font-semibold">
                    No pending requests found in the database.
                  </div>
                )}
              </div>
            )}



          </div>}





















          {acceptedrequestbox && <div>

            {acceptedrequestbox && (
              <div>
                <h2 className="text-center text-2xl font-semibold mt-6 text-green-700"> Accepted Requests List
                </h2>

                {acceptedloading ? (
                  <div className="text-yellow-600 font-medium">Loading accepted requests...</div>
                ) : (
                  <div>
                    {acceptedrequest?.data?.length > 0 ? (
                      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 mt-4">
                        <table className="min-w-full text-sm text-left text-gray-700">
                          <thead className="bg-green-700 text-white">
                            <tr>
                              <th className="px-4 py-3">Name</th>
                              <th className="px-4 py-3">Category</th>
                              <th className="px-4 py-3">Subject</th>
                              <th className="px-4 py-3">Status</th>
                              <th className="px-4 py-3">Main Category</th>
                              <th className="px-4 py-3">Urgency</th>
                              <th className="px-4 py-3">Created At</th>
                              <th className="px-4 py-3">Details</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {acceptedrequest.data.map((item, index) => {
                              const createdAt = new Date(item.createdAt);
                              const date = createdAt.toLocaleDateString("en-GB");
                              const time = createdAt.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              });
                              const formattedDate = `${date} time ${time}`;

                              // Lowercase status for color logic
                              const status = item.status.toLowerCase();
                              const statusColor =
                                status === "pending"
                                  ? "text-yellow-600"
                                  : status === "blocked"
                                    ? "text-red-600"
                                    : status === "rejected"
                                      ? "text-gray-500"
                                      : status === "urgent"
                                        ? "text-pink-600"
                                        : status === "accepted"
                                          ? "text-green-600"
                                          : status === "completed"
                                            ? "text-blue-600"
                                            : "text-black";

                              return (
                                <tr key={item._id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-200" : "bg-white hover:bg-gray-200"}>
                                  <td className="px-4 py-2">{item.name}</td>
                                  <td className="px-4 py-2">{item.category}</td>
                                  <td className="px-4 py-2">{item.subject}</td>
                                  <td className={`px-4 py-2 font-medium capitalize ${statusColor}`}>
                                    {status}
                                  </td>
                                  <td className="px-4 py-2">{item.mainCategory}</td>
                                  <td
                                    className={`px-4 py-2 font-semibold ${item.urgency === "High"
                                        ? "text-red-600"
                                        : item.urgency === "Medium"
                                          ? "text-orange-500"
                                          : "text-green-600"
                                      }`}
                                  >
                                    {item.urgency}
                                  </td>
                                  <td className="px-4 py-2 text-blue-600">{formattedDate}</td>
                                  <td className="px-4 py-2 break-all text-purple-700 font-medium">
                                    <Link
                                      href={`LawyerDashboard/${item._id}`}
                                      className="hover:underline"
                                    >
                                      Update
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 mt-4 font-medium">No accepted requests found.</p>
                    )}
                  </div>
                )}
              </div>
            )}




          </div>}

          {rejectedrequestbox && <div>

            {!rejectedloading && (
              <div>
                <h2 className="text-center text-2xl font-semibold mt-6 text-red-700"> Rejected Requests List
                </h2>

                {rejectedrequest?.data && rejectedrequest.data.length > 0 ? (
                  <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 mt-4">
                    <table className="min-w-full text-sm text-left text-gray-700">
                      <thead className="bg-red-500 text-white">
                        <tr>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Subject</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Main Category</th>
                          <th className="px-4 py-3">Urgency</th>
                          <th className="px-4 py-3">Created At</th>
                          <th className="px-4 py-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {rejectedrequest.data.map((item, index) => {
                          const createdAt = new Date(item.createdAt);
                          const date = createdAt.toLocaleDateString("en-GB");
                          const time = createdAt.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          });
                          const formattedDate = `${date} time ${time}`;

                          // Normalize status string to lowercase for comparison
                          const status = item.status.toLowerCase();
                          const statusColor =
                            status === "rejected"
                              ? "text-red-600"
                              : status === "pending"
                                ? "text-yellow-600"
                                : "text-green-600";

                          return (
                            <tr key={item._id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-200" : "bg-white hover:bg-gray-200"}>
                              <td className="px-4 py-2">{item.name}</td>
                              <td className="px-4 py-2">{item.category}</td>
                              <td className="px-4 py-2">{item.subject}</td>
                              <td className={`px-4 py-2 font-medium capitalize ${statusColor}`}>
                                {item.status}
                              </td>
                              <td className="px-4 py-2">{item.mainCategory}</td>
                              <td
                                className={`px-4 py-2 font-semibold ${item.urgency === "High"
                                    ? "text-red-600"
                                    : item.urgency === "Medium"
                                      ? "text-orange-500"
                                      : "text-green-600"
                                  }`}
                              >
                                {item.urgency}
                              </td>
                              <td className="px-4 py-2 text-blue-600">{formattedDate}</td>
                              <td className="px-4 py-2 break-all text-purple-700 font-medium">
                                <Link href={`LawyerDashboard/${item._id}`} className="hover:underline">
                                  Update
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-red-600 mt-4 font-semibold">
                    No rejected requests found in the database.
                  </p>
                )}
              </div>
            )}



          </div>}

          {completedrequestbox && <div>


            {!completedloading && (
              <div>
                <h2 className="text-center text-2xl font-semibold mt-6 text-green-700"> Completed Requests List
                </h2>


                {completedrequest?.data && completedrequest.data.length > 0 ? (
                  <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 mt-4">
                    <table className="min-w-full text-sm text-left text-gray-700">
                      <thead className="bg-green-600 text-white">
                        <tr>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Subject</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Main Category</th>
                          <th className="px-4 py-3">Urgency</th>
                          <th className="px-4 py-3">Created At</th>
                          <th className="px-4 py-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {completedrequest.data.map((item, index) => {
                          const createdAt = new Date(item.createdAt);
                          const date = createdAt.toLocaleDateString("en-GB");
                          const time = createdAt.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          });
                          const formattedDate = `${date} time ${time}`;

                          return (
                            <tr key={item._id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-200" : "bg-white hover:bg-gray-200"}>
                              <td className="px-4 py-2">{item.name}</td>
                              <td className="px-4 py-2">{item.category}</td>
                              <td className="px-4 py-2">{item.subject}</td>
                              <td className="px-4 py-2 font-medium text-green-600 capitalize">{item.status}</td>
                              <td className="px-4 py-2">{item.mainCategory}</td>
                              <td
                                className={`px-4 py-2 font-semibold ${item.urgency === "High"
                                    ? "text-red-600"
                                    : item.urgency === "Medium"
                                      ? "text-orange-500"
                                      : "text-green-600"
                                  }`}
                              >
                                {item.urgency}
                              </td>
                              <td className="px-4 py-2 text-blue-600">{formattedDate}</td>
                              <td className="px-4 py-2 break-all text-purple-700 font-medium">
                                <Link href={`faculity/${item._id}`} className="hover:underline">
                                  Update
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-red-600 mt-4 font-semibold">No completed requests found in the database.</p>
                )}
              </div>
            )}


          </div>}



          {urgentrequestbox && <div>


            {!urgentloading && (
              <div>
                <h2 className="text-center text-2xl font-semibold mt-6 text-red-700">
                  Urgent Requests List
                </h2>

                {urgentrequest?.data && urgentrequest.data.length > 0 ? (
                  <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 mt-4">
                    <table className="min-w-full text-sm text-left text-gray-700">
                      <thead className="bg-red-700 text-white">
                        <tr>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Subject</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Main Category</th>
                          <th className="px-4 py-3">Urgency</th>
                          <th className="px-4 py-3">Created At</th>
                          <th className="px-4 py-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {urgentrequest.data.map((item, index) => {
                          const createdAt = new Date(item.createdAt);
                          const date = createdAt.toLocaleDateString("en-GB");
                          const time = createdAt.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          });
                          const formattedDate = `${date} time ${time}`;

                          // Normalize status for color coding
                          const status = item.status.toLowerCase();
                          const statusColor =
                            status === "pending"
                              ? "text-yellow-600"
                              : status === "blocked"
                                ? "text-red-600"
                                : "text-green-600";

                          return (
                            <tr key={item._id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-200" : "bg-white hover:bg-gray-200"}>
                              <td className="px-4 py-2">{item.name}</td>
                              <td className="px-4 py-2">{item.category}</td>
                              <td className="px-4 py-2">{item.subject}</td>
                              <td className={`px-4 py-2 font-medium capitalize ${statusColor}`}>{item.status}</td>
                              <td className="px-4 py-2">{item.mainCategory}</td>
                              <td className="px-4 py-2 font-semibold text-red-600">{item.urgency}</td>
                              <td className="px-4 py-2 text-blue-600">{formattedDate}</td>
                              <td className="px-4 py-2 break-all text-purple-700 font-medium">
                                <Link href={`faculity/${item._id}`} className="hover:underline">
                                  Update
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-red-600 mt-4 font-semibold">No urgent requests found in the database.</p>
                )}
              </div>
            )}

          </div>}



          {blockedrequestbox && <div>


            {!blockedloading && (
              <div>
                <h2 className="text-center text-2xl font-semibold mt-6">
                  Blocked Requests Overview
                </h2>
                {blockedrequest?.data && blockedrequest.data.length > 0 ? (
                  <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 mt-4">
                    <table className="min-w-full text-sm text-left text-gray-700">
                      <thead className="bg-black text-white ">
                        <tr>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Subject</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Main Category</th>
                          <th className="px-4 py-3">Urgency</th>
                          <th className="px-4 py-3">Created At</th>
                          <th className="px-4 py-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white ">
                        {blockedrequest.data.map((item, index) => {
                          const createdAt = new Date(item.createdAt);
                          const date = createdAt.toLocaleDateString("en-GB");
                          const time = createdAt.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          });
                          const formattedDate = `${date} time ${time}`;

                          return (
                            <tr
                              key={item._id}
                              className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-200" : "bg-white hover:bg-gray-200"}
                            >
                              <td className="px-4 py-2">{item.name}</td>
                              <td className="px-4 py-2">{item.category}</td>
                              <td className="px-4 py-2">{item.subject}</td>
                              <td className="px-4 py-2 font-medium text-red-600">
                                {item.status}
                              </td>
                              <td className="px-4 py-2">{item.mainCategory}</td>
                              <td
                                className={`px-4 py-2 font-semibold ${item.urgency === "High"
                                    ? "text-red-600"
                                    : item.urgency === "Medium"
                                      ? "text-orange-500"
                                      : "text-green-600"
                                  }`}
                              >
                                {item.urgency}
                              </td>
                              <td className="px-4 py-2 text-blue-600">{formattedDate}</td>
                              <td className="px-4 py-2 break-all text-purple-700 font-medium">
                                <Link
                                  href={`LawyerDashboard/${item._id}`}
                                  className="hover:underline"
                                >
                                  Update
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-red-600 mt-4 font-semibold">
                    No blocked requests found in the database.
                  </div>
                )}
              </div>
            )}


          </div>}


        </div>        </div>}


    </div>
  )
}

export default page
