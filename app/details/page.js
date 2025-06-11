"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/app/assets/hello_logo.png";

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
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 relative">
              <Image 
                src={Logo} 
                alt="Law Firm Logo" 
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">LawConnect Profile</h1>
          </div>
          <div className="text-sm text-gray-500">
            {useremail && `Logged in as: ${useremail}`}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email ID:</label>
            <input
              type="text"
              value={useremail}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-md bg-gray-100 text-gray-600"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-100 pb-2">Attorney Profile</h2>
                <button 
                  onClick={() => setShowEdit(true)} 
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <ProfileField label="Email" value={alldetails.email} />
                  <ProfileField label="Country" value={alldetails.country} />
                  <ProfileField label="City" value={alldetails.city} />
                  <ProfileField label="Profession" value={alldetails.profession} />
                  <ProfileField label="Category" value={alldetails.professionCategory} />
                </div>
                <div className="space-y-4">
                  <ProfileField label="Gender" value={alldetails.gender} />
                  <ProfileField label="Experience" value={alldetails.experience} />
                  <ProfileField label="Age" value={alldetails.age} />
                  <ProfileField label="Mode" value={alldetails.workingMode} />
                  <ProfileField label="Job Type" value={alldetails.jobType} />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <ProfileField label="Profile Created" value={alldetails.createdAt ? new Date(alldetails.createdAt).toLocaleString() : ''} />
                <ProfileField label="Last Updated" value={alldetails.updatedAt ? new Date(alldetails.updatedAt).toLocaleString() : ''} />
              </div>
            </div>
          </div>

          {/* Document Card */}
          {userData && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-fit">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-50 mb-4">
                    <img
                      src={`data:${userData.image.contentType};base64,${userData.image.fileBase64}`}
                      alt={userData.image.filename}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <a
                    href={`data:${userData.file.contentType};base64,${userData.file.fileBase64}`}
                    download={userData.file.filename}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Document
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Profile Information</h3>
                <button 
                  onClick={() => setShowEdit(false)} 
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(formData).map((key) => {
                  if (
                    key === "createdAt" ||
                    key === "updatedAt" ||
                    key === "__v"
                  ) {
                    return null;
                  }

                  const isReadOnly = key === "email" || key === "mobile" || key === "_id";

                  return (
                    <div key={key} className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
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
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isReadOnly
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEdit(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for profile fields
const ProfileField = ({ label, value }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 font-medium">
      {value || <span className="text-gray-400">Not specified</span>}
    </dd>
  </div>
);

export default page;