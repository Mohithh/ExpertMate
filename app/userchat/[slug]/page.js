"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const slug = decodeURIComponent(params.slug);
    const decodedSlug = decodeURIComponent(slug);

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState("");
    const [useremail, setuseremail] = useState("");

    const scrollRef = useRef(null);

    const onChange = (e) => {
        setmessage(e.target.value);
    };

    // 👇 Fetch user email once on mount
    useEffect(() => {
        const fetchUserEmail = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

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
                    setuseremail(res.email);
                } else {
                    console.error("Failed to fetch user email:", res.message);
                }
            } catch (err) {
                console.error("Error fetching user email:", err);
            }
        };

        fetchUserEmail();
    }, []);

    // 👇 Fetch chats only after useremail is available
    useEffect(() => {
        if (!useremail) return;

        const fetchChats = async () => {
            const response = await fetch("http://localhost:3000/api/readchat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    senderEmail: useremail,
                    receiverEmail: decodedSlug,
                }),
            });

            const result = await response.json();

            if (result.chats && result.chats.length > 0) {
                setdata(result.chats);
            } else {
                setdata([]);
            }

            setloading(true);
        };

        fetchChats();
    }, [useremail]);

    // 👇 Submit new chat message
    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/api/addchat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                senderEmail: useremail,
                receiverEmail: decodedSlug,
                text: message,
            }),
        });

        const result = await response.json();
        if (result.message) {
            setmessage("");
            // Refresh chat after sending
            const response = await fetch("http://localhost:3000/api/readchat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    senderEmail: useremail,
                    receiverEmail: decodedSlug,
                }),
            });

            const result = await response.json();
            if (result.chats && result.chats.length > 0) {
                setdata(result.chats);
            } else {
                setdata([]);
            }
        }
    };

    // 👇 Auto scroll to bottom when new messages come
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [data]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        {/* Loading Indicator */}
        {!loading && <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>}
      
        {loading && (
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
            
            {/* Chat Header */}
            <div className="bg-teal-600 text-white text-center py-4">
              <h2 className="text-xl font-bold">Chat with {decodedSlug}</h2>
            </div>
      
            {/* Messages Area */}
            <div className="h-[450px] overflow-y-auto bg-gray-50 p-6 space-y-4">
              {data.length === 0 ? (
                <p className="text-center text-gray-400">No messages yet. Start a conversation!</p>
              ) : (
                data.map((item) => (
                  <div
                    key={item._id}
                    className={`max-w-[80%] p-4 rounded-lg text-sm break-words ${
                      item.senderEmail === useremail
                        ? "bg-teal-500 text-white ml-auto rounded-br-none"
                        : "bg-gray-300 text-black mr-auto rounded-bl-none"
                    }`}
                  >
                    <p>{item.text}</p>
                    <div className="text-xs text-black mt-2 text-right">
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                ))
              )}
              <div ref={scrollRef}></div>
            </div>
      
            {/* Input Form */}
            <form onSubmit={submit} className="flex items-center p-4 bg-gray-200 border-t border-t-gray-300">
              <input
                required
                onChange={onChange}
                value={message}
                name="message"
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
              <button
                type="submit"
                className="ml-3 bg-teal-500 text-white px-5 py-3 rounded-lg hover:bg-teal-600 transition"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
      
    );
}
