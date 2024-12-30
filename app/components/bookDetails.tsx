"use client";

import React, { useEffect, useState } from "react";
import { fetchBookDetails, Book } from "../services/bookService";

type BookDetailsProps = {
  id: number;
  onBack: () => void;
};

const BookDetails: React.FC<BookDetailsProps> = ({ id, onBack }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBookDetails() {
      try {
        const data = await fetchBookDetails(id);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to load book details.");
      }
    }

    loadBookDetails();
  }, [id]);

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Category: {book.category.name}</p>
      <p>User: {book.user.name}</p>
      <p>Published on: {book.publicationDate}</p>
      {book.pdfPath && (
        <p>
          PDF:{" "}
          <a href={`http://localhost:8081/${book.pdfPath}`} target="_blank">
            View PDF
          </a>
        </p>
      )}
    </div>
  );
};

export default BookDetails;
