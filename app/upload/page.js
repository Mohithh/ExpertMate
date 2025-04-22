'use client';
import { useState } from "react";
import Image from 'next/image'; // Add this import

export default function UploadPage() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);

  const handleImageUpload = async () => {
    if (!image) return alert("Select an image!");

    const formData = new FormData();
    formData.append("file", image);

    const res = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
    setImage(null);
  };

  const handleFileUpload = async () => {
    if (!file) return alert("Select a file!");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
    setFile(null);
  };

  const fetchItems = async () => {
    const res = await fetch("/api/uploadImage");
    const data = await res.json();
    setItems(data);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Upload System</h1>

      {/* 1. Upload Image */}
      <div className="space-y-2 border rounded p-4 shadow">
        <h2 className="text-xl font-semibold">1️⃣ Upload Image</h2>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleImageUpload} className="bg-blue-500 text-white px-4 py-1 rounded">
          Upload Image
        </button>
      </div>

      {/* 2. Upload File */}
      <div className="space-y-2 border rounded p-4 shadow">
        <h2 className="text-xl font-semibold">2️⃣ Upload File</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleFileUpload} className="bg-purple-600 text-white px-4 py-1 rounded">
          Upload File
        </button>
      </div>

      {/* 3. View All */}
      <div className="space-y-2 border rounded p-4 shadow">
        <h2 className="text-xl font-semibold">3️⃣ View All</h2>
        <button onClick={fetchItems} className="bg-green-600 text-white px-4 py-1 rounded">
          Refresh Files
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {items.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow">
              {item.isImage ? (
                <div className="relative w-full h-64">
                  <Image
                    src={`data:${item.contentType};base64,${item.fileBase64}`}
                    alt={item.filename}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ) : item.contentType === "application/pdf" ? (
                <iframe
                  src={`data:${item.contentType};base64,${item.fileBase64}`}
                  className="w-full h-64"
                  title={item.filename}
                />
              ) : item.contentType.startsWith("text/") ? (
                <div className="overflow-auto h-64 bg-gray-100 p-2 text-sm whitespace-pre-wrap">
                  {atob(item.fileBase64)}
                </div>
              ) : (
                <a
                  href={`data:${item.contentType};base64,${item.fileBase64}`}
                  download={item.filename}
                  className="text-blue-600 underline"
                >
                  📄 Download {item.filename}
                </a>
              )}
              <p className="text-sm mt-2">{item.filename}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}