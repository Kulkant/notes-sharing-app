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
    <div>
      <h1>All Notes</h1>

      <div>
        <span>Filter : </span>
        <input
          type="text"
          id="subjectFilter"
          placeholder="Filter by subject (e.g. DBMS)"
          onChange={(e) => setSubjectFilter(e.target.value)}
        />
      </div>

      <ol>
        {notes.map((note) => (
          <li key={note._id}>
            <h2>{note.title}</h2>
            <p>
              Subject : {note.subject} | Semester : {note.semester}
            </p>
            <p>{note.content}</p>
            <button onClick={() => handlDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}
