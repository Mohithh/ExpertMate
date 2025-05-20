"use client";
import React, { useEffect, useState } from "react";
import LawyerHeader from "../Advocates/LawyerHeader/page";

const Page = () => {
  const [useremail, setUseremail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [alldetails, setAlldetails] = useState(null);

  useEffect(() => {
    const checkuser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/useremail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const res = await response.json();

        if (!response.ok) {
          throw new Error(res.message || "Failed to fetch user email");
        }

        if (res.success) {
          setUseremail(res.email);
          console.log("User Email:", res.email);

          const imageResponse = await fetch(
            `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/userimage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: res.email }),
            }
          );

          const imageData = await imageResponse.json();

          if (!imageResponse.ok) {
            console.log("Error fetching user image:", imageData.message);
            return;
          }

          if (imageData.success) {
            setUserData(imageData.data);
          }
        } else {
          setError(res.message || "Something went wrong");
        }
      } catch (err) {
        console.error("Error in checkuser:", err);
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    checkuser();
  }, []);

  useEffect(() => {
    if (!useremail) return;

    const fetchFaculty = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/viewFacultydetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: useremail }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch faculty details");
        }

        console.log("✅ Faculty Details Response:", result);
        setAlldetails(result.data);
      } catch (error) {
        console.error("Error in viewFacultydetails:", error);
        setError(error.message || "Failed to fetch faculty details");
      }
    };

    fetchFaculty();
  }, [useremail]);

  return (
    <>
    <LawyerHeader                                                    />
   
    <div className="min-h-screen bg-gray-50 p-6 font-serif">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        </div>
      ) : error ? (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-blue-900 text-white p-6 rounded-t-lg shadow-md">
            <h1 className="text-3xl font-bold">Lawyer Profile</h1>
            <p className="text-blue-200">Professional Information</p>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow-lg rounded-b-lg overflow-hidden">
            <div className="p-6">
              {/* Email Section */}
              <div className="mb-8 border-b pb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Registered Email ID:
                </label>
                <input
                  type="text"
                  value={useremail}
                  readOnly
                  className="border-0 border-b-2 border-blue-200 px-3 py-2 w-full focus:outline-none focus:border-blue-500 bg-gray-50"
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Profile Image and Document Section */}
                {userData && (
                  <div className="lg:w-1/3 flex flex-col items-center">
                    <div className="relative w-64 h-72 overflow-hidden rounded-lg shadow-xl border-4 border-white mb-6">
                      <img
                        src={`data:${userData.image.contentType};base64,${userData.image.fileBase64}`}
                        alt={userData.image.filename}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-full bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        Legal Documents
                      </h3>
                      <a
                        href={`data:${userData.file.contentType};base64,${userData.file.fileBase64}`}
                        download={userData.file.filename}
                        className="inline-flex items-center justify-center w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded transition duration-200"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download Document
                      </a>
                    </div>
                  </div>
                )}

                {/* Professional Details Section */}
                <div className="lg:w-2/3">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-blue-900 border-b pb-2 mb-4">
                      Professional Details
                    </h2>
                    
                    {alldetails ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                          <h3 className="text-blue-700 font-semibold mb-2">Personal Information</h3>
                          <div className="space-y-2">
                            <p><span className="font-medium text-gray-700">Gender:</span> {alldetails.gender}</p>
                            <p><span className="font-medium text-gray-700">Age:</span> {alldetails.age}</p>
                            <p><span className="font-medium text-gray-700">Location:</span> {alldetails.city}, {alldetails.country}</p>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded shadow-sm">
                          <h3 className="text-blue-700 font-semibold mb-2">Professional Information</h3>
                          <div className="space-y-2">
                            <p><span className="font-medium text-gray-700">Specialization:</span> {alldetails.profession}</p>
                            <p><span className="font-medium text-gray-700">Practice Area:</span> {alldetails.professionCategory}</p>
                            <p><span className="font-medium text-gray-700">Experience:</span> {alldetails.experience} years</p>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded shadow-sm">
                          <h3 className="text-blue-700 font-semibold mb-2">Employment Details</h3>
                          <div className="space-y-2">
                            <p><span className="font-medium text-gray-700">Working Mode:</span> {alldetails.workingMode}</p>
                            <p><span className="font-medium text-gray-700">Job Type:</span> {alldetails.jobType}</p>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded shadow-sm">
                          <h3 className="text-blue-700 font-semibold mb-2">Account Information</h3>
                          <div className="space-y-2">
                            <p><span className="font-medium text-gray-700">Member Since:</span> {new Date(alldetails.createdAt).toLocaleDateString()}</p>
                            <p><span className="font-medium text-gray-700">Last Updated:</span> {new Date(alldetails.updatedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Page;