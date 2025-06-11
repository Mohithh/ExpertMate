"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [useremail, setuseremail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [alldetails, setalldetails] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({});

  const [selectedCountry, setSelectedCountry] = useState(formData.country || "");
const [selectedProfession, setSelectedProfession] = useState(formData.profession || "");


  useEffect(() => {
    const checkuser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/useremail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const res = await response.json();

        if (res.success) {
          setuseremail(res.email);
          const ress = await fetch("/api/userimage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: res.email }),
          });

          const data = await ress.json();
          if (data.success) {
            setUserData(data.data);
          } else {
            console.log("Error fetching user image:", data.message);
          }
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

  useEffect(() => {
    if (useremail) {
      const fetchFaculty = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/viewFacultydetails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: useremail }),
          });

          const result = await response.json();
          setalldetails(result.data);
          setFormData(result.data);
        } catch (error) {
          console.error("Error in viewFacultydetails:", error);
        }
      };
      fetchFaculty();
    }
  }, [useremail]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/Facultydetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await response.json();
      if (res.success) {
        setShowEdit(false);
        alert("Updated successfully");
      } else {
        alert("Update failed");
      }
    } catch (error) {
      alert("Error updating data");
    }
  };

  return (
    <div className="">
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

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white to-slate-100 border border-gray-200">
  {/* Left Section: Info Rows */}
  <div className="space-y-3">
    <h2 className="text-3xl font-bold text-blue-700 mb-4">User Information</h2>
    <button onClick={() => setShowEdit(true)} className="mb-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg shadow-md transition duration-200">✏️ Edit</button>

    <div className="grid grid-cols-2 gap-3">
      <p className="text-gray-800 text-sm"><strong>Email:</strong> {alldetails.email}</p>
      <p className="text-gray-800 text-sm"><strong>Country:</strong> {alldetails.country}</p>
      <p className="text-gray-800 text-sm"><strong>City:</strong> {alldetails.city}</p>
      <p className="text-gray-800 text-sm"><strong>Profession:</strong> {alldetails.profession}</p>
      <p className="text-gray-800 text-sm"><strong>Category:</strong> {alldetails.professionCategory}</p>
      <p className="text-gray-800 text-sm"><strong>Gender:</strong> {alldetails.gender}</p>
      <p className="text-gray-800 text-sm"><strong>Experience:</strong> {alldetails.experience}</p>
      <p className="text-gray-800 text-sm"><strong>Age:</strong> {alldetails.age}</p>
      <p className="text-gray-800 text-sm"><strong>Mode:</strong> {alldetails.workingMode}</p>
      <p className="text-gray-800 text-sm"><strong>Job Type:</strong> {alldetails.jobType}</p>
      <p className="text-gray-800 text-sm"><strong>Created:</strong> {new Date(alldetails.createdAt).toLocaleString()}</p>
      <p className="text-gray-800 text-sm"><strong>Updated:</strong> {new Date(alldetails.updatedAt).toLocaleString()}</p>
    </div>
  </div>

  {/* Right Section: Image and Download */}
  {userData && (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-52 h-52 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
        <img
          src={`data:${userData.image.contentType};base64,${userData.image.fileBase64}`}
          alt={userData.image.filename}
          className="w-full h-full object-cover"
        />
      </div>
      <a
        href={`data:${userData.file.contentType};base64,${userData.file.fileBase64}`}
        download={userData.file.filename}
        className="mt-5 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-5 rounded-lg shadow-md transition duration-200"
      >
        ⬇️ Download Doc
      </a>
    </div>
  )}
</div>


      

 {showEdit && (
<div className="fixed inset-0 bg-black/60 backdrop-blur-md backdrop-saturate-150 flex items-center justify-center z-50 overflow-auto p-4">
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl animate-fade-in">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center border-b pb-2">
        ✏️ Edit Your Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => {
          if (
            key === "createdAt" ||
            key === "updatedAt" ||
            key === "__v"
          ) {
            return null; // Exclude these fields completely
          }

          const isReadOnly = key === "email" || key === "mobile" || key === "_id";

          return (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-600 capitalize mb-1">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                value={formData[key] || ""}
                onChange={(e) => 
                  !isReadOnly &&
                  setFormData({ ...formData, [key]: e.target.value })
                }
                readOnly={isReadOnly}
                className={`w-full px-4 py-2 border rounded-md shadow-sm transition duration-200 ${
                  isReadOnly
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setShowEdit(false)}
          className="px-6 py-2 rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default page;