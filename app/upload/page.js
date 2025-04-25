"use client";

import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [dp, setDp] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const mailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDp(e.target.files[0]);
    }
  };

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    if (dp) formData.append("image", dp);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);

      setEmail("");
      setDp(null);
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Form</h2>
      <form onSubmit={submit} className="flex flex-col space-y-4">
        <input
          required
          onChange={mailUpload}
          value={email}
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          required
          onChange={imgUpload}
          accept="image/*"
          type="file"
          className="border p-2 rounded"
        />
        <input
          required
          onChange={fileUpload}
          type="file"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded font-bold"
        >
          Submit Form
        </button>
      </form>

      <div className="mt-6">
        {dp && (
          <div className="mb-4">
            <p>Image Preview: {dp.name}</p>
            <img
              src={URL.createObjectURL(dp)}
              alt="Image Preview"
              width="200"
              className="mt-2"
            />
          </div>
        )}
        {file && (
          <div>
            <p>File: {file.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
