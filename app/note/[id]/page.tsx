// app/note/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id!;
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNote = async () => {
    const res = await fetch(`/note/${id}`);
    if (res.ok) {
      const data = await res.json();
      setNote(data);
      setTitle(data.title);
      setContent(data.content);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/note/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    router.refresh();
  };

  const remove = async () => {
    if (!confirm("Delete note?")) return;
    await fetch(`/note/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => router.push("/")} style={{ marginBottom: 12 }}>
        ← Back
      </button>
      <h2>Edit Note</h2>
      <form onSubmit={update}>
        <div>
          <input
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />
        </div>
        <div>
          <textarea
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: 8, height: 120 }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px", marginRight: 8 }}>
          Save
        </button>
        <button type="button" onClick={remove} style={{ padding: "8px 16px" }}>
          Delete
        </button>
      </form>
    </div>
  );
}
