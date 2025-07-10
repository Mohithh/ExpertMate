"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

import Link from 'next/link';


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
        body: JSON.stringify({ userEmail: res.email }),
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

    


     const allrequestclick = ()=>{
            setallrequestbox(true)
            setpendingrequestbox(false)
            setacceptedrequestbox(false)
            setrejectedrequestbox(false)
            setcompletedrequestbox(false)
            seturgentrequestbox(false)
            setblockedrequestbox(false)
        }
        const pendingrequestclick = async()=>{
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
                body: JSON.stringify({ userEmail: useremail ,status: "Pending" }),
            });

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
        const acceptedrequestclick = async()=>{
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
                body: JSON.stringify({ userEmail: useremail ,status: "Accepted" }),
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
        const rejectedrequestclick =async()=>{
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
                body: JSON.stringify({ userEmail: useremail ,status: "Rejected" }),
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
        const completedrequestclick = async()=>{
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
                body: JSON.stringify({ userEmail: useremail ,status: "Completed" }),
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
        const urgentrequestclick = async()=>{
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
                body: JSON.stringify({ userEmail: useremail ,status: "Urgent" }),
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
        const blockedrequestclick = async()=>{
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
                body: JSON.stringify({ userEmail: useremail ,status: "Blocked" }),
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


       {loading &&  <div>

        laoding

        </div>}


{!loading &&  <div>


<div className="min-h-screen bg-[#f9f7f6] p-8">
  <h1 className="text-4xl font-extrabold text-left text-gray-800 mb-10">
    🧑‍💻 Welcome, User!
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    <div
      onClick={allrequestclick}
      className="relative bg-gradient-to-br from-[#ffffff] to-[#f0f0f0] border-l-4 border-purple-500 rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
    >
      <h2 className="text-xl font-bold text-purple-700 mb-2">All Requests</h2>
      <p className="text-sm text-gray-500">View everything in one place</p>
    </div>

    <div
      onClick={pendingrequestclick}
      className="relative bg-gradient-to-br from-[#ffffff] to-[#f8f6e7] border-l-4 border-yellow-500 rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
    >
      <h2 className="text-xl font-bold text-yellow-600 mb-2">Pending Requests</h2>
      <p className="text-sm text-gray-500">Awaiting confirmation</p>
    </div>

    <div
      onClick={acceptedrequestclick}
      className="relative bg-gradient-to-br from-[#ffffff] to-[#e6f9f0] border-l-4 border-green-500 rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
    >
      <h2 className="text-xl font-bold text-green-600 mb-2">Accepted Requests</h2>
      <p className="text-sm text-gray-500">Requests that got approved</p>
    </div>

    <div
      onClick={rejectedrequestclick}
      className="relative bg-gradient-to-br from-[#ffffff] to-[#fbeaea] border-l-4 border-red-400 rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
    >
      <h2 className="text-xl font-bold text-red-500 mb-2">Rejected Requests</h2>
      <p className="text-sm text-gray-500">Requests that were declined</p>
    </div>

    <div
      onClick={completedrequestclick}
      className="relative bg-gradient-to-br from-[#ffffff] to-[#e7f1fe] border-l-4 border-blue-400 rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
    >
      <h2 className="text-xl font-bold text-blue-600 mb-2">Completed Requests</h2>
      <p className="text-sm text-gray-500">Everything successfully done</p>
    </div>

    <div
      onClick={urgentrequestclick}
      className="relative bg-gradient-to-br from-[#ffffff] to-[#fde8f2] border-l-4 border-pink-400 rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
    >
      <h2 className="text-xl font-bold text-pink-600 mb-2">Urgent Requests</h2>
      <p className="text-sm text-gray-500">Handle with high priority</p>
    </div>

    <div
      onClick={blockedrequestclick}
      className="relative bg-gradient-to-br from-[#ffffff] to-[#eaeaea] border-l-4 border-gray-400 rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
    >
      <h2 className="text-xl font-bold text-gray-600 mb-2">Blocked</h2>
      <p className="text-sm text-gray-500">Restricted access requests</p>
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
                    className={`px-4 py-2 font-semibold ${
                      item.urgency === "High"
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
                      href={`dashboarddetails/${item._id}`}
                      className="hover:underline"
                    >
                      Update_client
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


{pendingrequestbox &&<div>


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
                    className={`px-4 py-2 font-medium capitalize ${
                      status === "pending"
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
                    className={`px-4 py-2 font-semibold ${
                      item.urgency === "High"
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
                      href={`dashboarddetails/${item._id}`}
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





















{acceptedrequestbox &&<div>

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
                        className={`px-4 py-2 font-semibold ${
                          item.urgency === "High"
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
                          href={`dashboarddetails/${item._id}`}
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

{rejectedrequestbox &&<div>

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
                    className={`px-4 py-2 font-semibold ${
                      item.urgency === "High"
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
                    <Link href={`dashboarddetails/${item._id}`} className="hover:underline">
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

{completedrequestbox &&<div>


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
                    className={`px-4 py-2 font-semibold ${
                      item.urgency === "High"
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
                    <Link href={`dashboarddetails/${item._id}`} className="hover:underline">
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
                    <Link href={`dashboarddetails/${item._id}`} className="hover:underline">
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



{blockedrequestbox &&<div>


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
                    className={`px-4 py-2 font-semibold ${
                      item.urgency === "High"
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
                      href={`dashboarddetails/${item._id}`}
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


</div>


        </div>}


    </div>
  )
}

export default page
