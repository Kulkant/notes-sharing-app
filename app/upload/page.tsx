"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem(`token`);

    const res = await fetch(`/api/note`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, subject, semester, content }),
    });

    const data = await res.json();

    setMessage(data.message);

    router.push("/notes");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Upload a Note
        </h1>

        <div>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            id="title"
            placeholder="Enter your title here"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-[95%] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="subject">Subject : </label>
          <input
            type="text"
            id="subject"
            placeholder="Enter your subject here"
            onChange={(e) => setSubject(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-[95%] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="semester">Semester : </label>
          <input
            type="text"
            id="semester"
            placeholder="Enter your semester here"
            onChange={(e) => setSemester(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-[95%] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="content">Content : </label>
          <textarea
            id="content"
            placeholder="Enter your content here"
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-[95%] focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button className="bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition-colors">
          Upload
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}
