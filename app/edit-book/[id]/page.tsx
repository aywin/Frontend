"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBookById, updateBook } from "../../services/api";

const EditBookPage = ({ params }: { params: { id: string } }) => {
  const [bookId, setBookId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Gérer l'accès à `params.id`
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setBookId(parseInt(resolvedParams.id, 10));
    };

    resolveParams();
  }, [params]);

  // Charger les détails du livre une fois `bookId` défini
  useEffect(() => {
    if (bookId !== null) {
      const fetchBook = async () => {
        try {
          const book = await getBookById(bookId);
          console.log("Book fetched:", book); // Log pour vérifier la structure
          setTitle(book.title || "");
          setAuthor(book.author || "");
          setCategoryId(book.category?.id || null);
          setUserId(book.user?.id || null);
        } catch (error) {
          console.error("Failed to fetch book:", error);
          setError("Failed to load book details.");
        }
      };

      fetchBook();
    }
  }, [bookId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId || !userId) {
      setError("Category ID and User ID are required.");
      return;
    }
    try {
      await updateBook(bookId!, {
        title,
        author,
        categoryId,
        userId,
        file: file || undefined,
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to update book:", error);
      setError("Failed to update book. Please try again.");
    }
  };

  return (
    <div>
      <h1>Edit Book</h1>
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
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;
