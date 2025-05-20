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
      // Check if running on client side
      if (typeof window === "undefined") {
        setError("This page must be rendered client-side");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        console.log("Attempting to fetch user email...");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_LOCAL_URL;
        
        if (!apiUrl) {
          throw new Error("API URL not configured");
        }

        const response = await fetch(
          `${apiUrl}/api/useremail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(errorData.message || "Failed to fetch user email");
        }

        const res = await response.json();
        console.log("User email response:", res);

        if (res.success) {
          setUseremail(res.email);
          console.log("User Email:", res.email);

          // Fetch user image data
          try {
            const imageResponse = await fetch(
              `${apiUrl}/api/userimage`,
              {
                method: "POST",
                headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ email: res.email }),
              }
            );

            console.log("Image response status:", imageResponse.status);

            if (!imageResponse.ok) {
              const imageError = await imageResponse.json();
              console.error("Image API Error:", imageError);
              throw new Error(imageError.message || "Failed to fetch user image");
            }

            const imageData = await imageResponse.json();
            console.log("Image data:", imageData);

            if (imageData.success) {
              setUserData(imageData.data);
            } else {
              console.warn("Image data not available:", imageData.message);
            }
          } catch (imageError) {
            console.error("Error fetching user image:", imageError);
            // Continue even if image fails - it's not critical
          }
        } else {
          throw new Error(res.message || "Authentication failed");
        }
      } catch (err) {
        console.error("Error in checkuser:", err);
        setError(err.message || "Failed to authenticate user");
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
        console.log("Fetching faculty details for:", useremail);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_LOCAL_URL;
        
        const response = await fetch(
          `${apiUrl}/api/viewFacultydetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: useremail }),
          }
        );

        console.log("Faculty details response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Faculty API Error:", errorData);
          throw new Error(errorData.message || "Failed to fetch faculty details");
        }

        const result = await response.json();
        console.log("Faculty Details Response:", result);
        
        if (result.success) {
          setAlldetails(result.data);
        } else {
          throw new Error(result.message || "No faculty data found");
        }
      } catch (error) {
        console.error("Error in viewFacultydetails:", error);
        setError(error.message || "Failed to load professional details");
      }
    };

    fetchFaculty();
  }, [useremail]);

  return (
    <>
      <LawyerHeader />
      <div className="min-h-screen bg-gray-50 p-6 font-serif">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
            <span className="ml-4 text-gray-600">Loading profile...</span>
          </div>
        ) : error ? (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error Loading Profile</p>
              <p>{error}</p>
              <p className="mt-2 text-sm">
                Please try refreshing the page or contact support if the problem persists.
              </p>
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
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-profile.jpg";
                          }}
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
                          {/* ... rest of your professional details rendering ... */}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-40">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                          <p className="text-gray-600">Loading professional details...</p>
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