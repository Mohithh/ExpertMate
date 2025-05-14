"use client"

import { useEffect, useState } from "react";

const YourComponent = () => {
  const [eemail, seteemail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log("✅ API Response:", res);

        if (res.success) {
          seteemail(res.email);
        } else {
          setError(res.message || "Something went wrong");
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false); // ✅ set loading to false after everything
      }
    };

    checkuser();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading email...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <h1>User Email: {eemail}</h1>
      )}
    </div>
  );
};

export default YourComponent;
