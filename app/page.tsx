// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  return (
    <div>
      <form onSubmit={create} style={{ marginBottom: 20 }}>
        <h2>Create Note</h2>
        <div>
          <input
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: 8, height: 100 }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add
        </button>
      </form>

      <h2>All Notes</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((n) => (
          <li key={n.id} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8 }}>
            <a href={`/note/${n.id}`} style={{ fontWeight: "bold", textDecoration: "none" }}>
              {n.title}
            </a>
            <p>{n.content.slice(0, 100)}{n.content.length > 100 ? "..." : ""}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
