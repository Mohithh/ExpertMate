// "use client";

// import React, { useState, ChangeEvent, FormEvent } from "react";

// const Page = () => {
//   const [email, setEmail] = useState<string>("");
//   const [dp, setDp] = useState<File | null>(null);
//   const [file, setFile] = useState<File | null>(null);

//   const mailUpload = (e) => {
//     setEmail(e.target.value);
//   };

//   const imgUpload = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setDp(e.target.files[0]);
//     }
//   };

//   const fileUpload = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!email || !dp || !file) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("email", email);
//     if (dp) formData.append("image", dp);
//     if (file) formData.append("file", file);

//     try {
//       const res = await fetch("/api/uploadImage", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       alert(data.message);

//       setEmail("");
//       setDp(null);
//       setFile(null);
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Upload Form</h2>
//       <form onSubmit={submit} className="flex flex-col space-y-4">
//         <input
//           required
//           onChange={mailUpload}
//           value={email}
//           type="email"
//           placeholder="Email"
//           className="border p-2 rounded"
//         />
//         <div>
//           <label className="block mb-1 text-sm font-medium">Profile Image (required)</label>
//           <input
//             required
//             onChange={imgUpload}
//             accept="image/*"
//             type="file"
//             className="border p-2 rounded w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 text-sm font-medium">File (required)</label>
//           <input
//             required
//             onChange={fileUpload}
//             type="file"
//             className="border p-2 rounded w-full"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-bold transition-colors"
//         >
//           Submit Form
//         </button>
//       </form>

//       <div className="mt-6">
//         {dp && (
//           <div className="mb-4">
//             <p className="font-medium">Image Preview: {dp.name}</p>
//             <img
//               src={URL.createObjectURL(dp)}
//               alt="Image Preview"
//               width="200"
//               className="mt-2 border rounded"
//             />
//           </div>
//         )}
//         {file && (
//           <div>
//             <p className="font-medium">File: {file.name}</p>
//             <p className="text-sm text-gray-500">Size: {(file.size / 1024).toFixed(2)} KB</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page