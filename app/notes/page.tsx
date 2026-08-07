"use client";

import { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<string>("");

  useEffect(() => {
    async function fetchNotes() {
      const url = subjectFilter
        ? `/api/note?subject=${subjectFilter}`
        : `/api/note`;

      const res = await fetch(url);
      const data = await res.json();
      setNotes(data);
    }

    fetchNotes();
  }, [subjectFilter]);

  const handlDelete = async (id: string) => {
    const token = localStorage.getItem(`token`);
    const res = await fetch(`/api/note/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setNotes(notes.filter((note) => note._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">All Notes</h1>

        <div>
          <span>Filter : </span>
          <input
            type="text"
            id="subjectFilter"
            placeholder="Filter by subject (e.g. DBMS)"
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <ol>
          {notes.map((note) => (
            <li
              key={note._id}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800">
                  {note.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  Subject : {note.subject} | Semester : {note.semester}
                </p>
                <p className="text-gray-700">{note.content}</p>
                <button
                  onClick={() => handlDelete(note._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
