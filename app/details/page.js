"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [useremail, setUseremail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [alldetails, setAlldetails] = useState(null);

  // First API: get user email from token
  useEffect(() => {
    const checkuser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token not found");
        setLoading(false);
        return;
      }

      try {
        // Get user email
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

          // Get user image and document
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

  // Second API: get faculty details when email is available
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
    <div className="min-h-screen bg-gray-100 p-6">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="mb-8">
            <label className="font-bold text-2xl">Your Email ID:</label>
            <input
              type="text"
              value={useremail}
              readOnly
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-start mb-8">
            {/* User Data with Image and Info */}
            {userData && (
              <div className="flex flex-col items-center">
                {/* Image Section */}
                <div className="relative flex-shrink-0 w-56 h-60 overflow-hidden rounded-2xl border-4 border-white shadow-lg mb-4">
                  <img
                    src={`data:${userData.image.contentType};base64,${userData.image.fileBase64}`}
                    alt={userData.image.filename}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Document Download Section */}
                <div className="flex flex-col items-center gap-4">
                  <a
                    href={`data:${userData.file.contentType};base64,${userData.file.fileBase64}`}
                    download={userData.file.filename}
                    className="inline-block bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                  >
                    ⬇️ Download Doc
                  </a>
                </div>
              </div>
            )}

            {/* User Info Section */}
            <div className="m-5 text-left max-w-md">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">
                User Information
              </h2>
              {alldetails ? (
                <>
                  <p className="text-lg">
                    <strong>Email:</strong> {alldetails.email}
                  </p>
                  <p className="text-lg">
                    <strong>Country:</strong> {alldetails.country}
                  </p>
                  <p className="text-lg">
                    <strong>City:</strong> {alldetails.city}
                  </p>
                  <p className="text-lg">
                    <strong>Profession:</strong> {alldetails.profession}
                  </p>
                  <p className="text-lg">
                    <strong>Profession Category:</strong>{" "}
                    {alldetails.professionCategory}
                  </p>
                  <p className="text-lg">
                    <strong>Gender:</strong> {alldetails.gender}
                  </p>
                  <p className="text-lg">
                    <strong>Experience:</strong> {alldetails.experience}
                  </p>
                  <p className="text-lg">
                    <strong>Age:</strong> {alldetails.age}
                  </p>
                  <p className="text-lg">
                    <strong>Working Mode:</strong> {alldetails.workingMode}
                  </p>
                  <p className="text-lg">
                    <strong>Job Type:</strong> {alldetails.jobType}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Created At:</strong>{" "}
                    {new Date(alldetails.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Updated At:</strong>{" "}
                    {new Date(alldetails.updatedAt).toLocaleString()}
                  </p>
                </>
              ) : (
                <p>Loading user details...</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;