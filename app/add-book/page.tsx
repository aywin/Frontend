"use client";

import React, { useState } from "react";
import { addBook } from "../services/api";
import { useRouter } from "next/navigation";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId || !userId) {
      setError("Category ID and User ID are required.");
      return;
    }
    try {
      await addBook({
        title,
        author,
        categoryId,
        userId,
        file: file || undefined, // Assurez-vous que `file` est soit défini, soit `undefined`
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to add book:", error);
      setError("Failed to add book. Please try again.");
    }
  };

  return (
    <div>
      <h1>Add a New Book</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category ID:</label>
          <input
            type="number"
            value={categoryId || ""}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="number"
            value={userId || ""}
            onChange={(e) => setUserId(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label>File:</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
