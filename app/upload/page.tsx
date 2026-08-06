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
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            id="title"
            placeholder="Enter your title here"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="subject">Subject : </label>
          <input
            type="text"
            id="subject"
            placeholder="Enter your subject here"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="semester">Semester : </label>
          <input
            type="text"
            id="semester"
            placeholder="Enter your semester here"
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="content">Content : </label>
          <textarea
            id="content"
            placeholder="Enter your content here"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <button>Upload</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
