"use client";

import React, { useState, useEffect } from "react";
import { updateBook, getBooks } from "./services/api";

type Book = {
  id: number;
  title: string;
  author: string;
  categoryId: string;
  userId: string;
  pdfPath: string;
};

const EditBookPage = ({ params }: { params: { id: string } }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [userId, setUserId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const bookId = Number(params.id);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const books = await getBooks();
        const bookToEdit = books.find((b: Book) => b.id === bookId);
        setBook(bookToEdit);
        if (bookToEdit) {
          setTitle(bookToEdit.title);
          setAuthor(bookToEdit.author);
          setCategoryId(bookToEdit.categoryId);
          setUserId(bookToEdit.userId);
        }
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("categoryId", categoryId);
    formData.append("userId", userId);
    if (file) formData.append("file", file);

    try {
      await updateBook(bookId, formData);
      alert("Book updated successfully!");
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;
