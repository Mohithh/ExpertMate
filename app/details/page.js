"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [useremail, setUseremail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [allDetails, setAllDetails] = useState(null);

  // First API: Get user email from token
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/useremail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const res = await response.json();

        if (res.success) {
          setUseremail(res.email);

          const imageRes = await fetch("/api/userimage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: res.email }),
          });

          const imageData = await imageRes.json();
          if (imageData.success) {
            setUserData(imageData.data);
          } else {
            console.error("Error fetching user image:", imageData.message);
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

    checkUser();
  }, []);

  // Second API: Get full details
  useEffect(() => {
    if (useremail) {
      const fetchDetails = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/viewFacultydetails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: useremail }),
          });

          const result = await response.json();
          if (result.success) {
            setAllDetails(result.data);
          } else {
            console.error("Error fetching faculty details:", result.message);
          }
        } catch (error) {
          console.error("Error in viewFacultydetails:", error);
        }
      };

      fetchDetails();
    }
  }, [useremail]);

  return (
    <div className="p-4">
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

      <div className="flex flex-row gap-8 justify-center items-start flex-wrap">
        {/* Image and Download */}
        {userData && (
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            {userData.image?.fileBase64 && (
              <div className="relative w-56 h-60 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                <img
                  src={`data:${userData.image.contentType};base64,${userData.image.fileBase64}`}
                  alt={userData.image.filename}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Document Download */}
            {userData.file?.fileBase64 && (
              <a
                href={`data:${userData.file.contentType};base64,${userData.file.fileBase64}`}
                download={userData.file.filename}
                className="mt-4 bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
              >
                ⬇ Download Doc
              </a>
            )}
          </div>
        )}

        {/* User Info Section */}
        {allDetails && (
          <div className="m-5 text-left max-w-md">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">User Information</h2>
            <p className="p-1 text-lg text-gray-800"><strong>Email:</strong> {allDetails.email}</p>
            <p className="p-1 text-lg text-gray-800"><strong>Country:</strong> {allDetails.country}</p>
            <p className="p-1 text-lg text-gray-800"><strong>City:</strong> {allDetails.city}</p>
            <p className="p-1 text-lg text-gray-800"><strong>Profession:</strong> {allDetails.profession}</p>
            <p className="p-1 text-lg text-gray-800"><strong>Profession Category:</strong> {allDetails.professionCategory}</p>
            <p className="p-1 text-lg text-gray-800"><strong>Gender:</strong> {allDetails.gender}</p>
            <p className="p-1 text-lg text-gray-800"><strong>Experience:</strong> {allDetails.experience}</p>
            <p className="p-1 text-lg text-gray-800"><strong>Age:</strong> {allDetails.age}</p>
            <p className="p-1 text-lg text-gray-800"><strong>Working Mode:</strong> {allDetails.workingMode}</p>
            <p className="p-1 text-lg text-gray-800"><strong>Job Type:</strong> {allDetails.jobType}</p>
            <p className="p-1 text-lg text-gray-800"><strong>Created At:</strong> {new Date(allDetails.createdAt).toLocaleString()}</p>
            <p className="p-1 text-lg text-gray-800"><strong>Updated At:</strong> {new Date(allDetails.updatedAt).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
