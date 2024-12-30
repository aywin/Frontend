"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Book = {
  id: number;
  title: string;
  author: string;
};

type BookListProps = {
  books: Book[];
  onDelete: (id: number) => void;
};

const BookList: React.FC<BookListProps> = ({ books, onDelete }) => {
  const router = useRouter();

  return (
    <div>
      <h2>Books List</h2>
      <button
        onClick={() => router.push("/add-book")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add New Book
      </button>
      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>Title:</strong> {book.title}
            </p>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <button
              onClick={() => router.push(`/edit-book/${book.id}`)}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
