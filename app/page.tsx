"use client";

import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "./services/api";
import BookList from "./components/booksList";

type Book = {
  id: number;
  title: string;
  author: string;
};

const Page = () => {
  const [books, setBooks] = useState<Book[]>([]);

  // Charger les livres depuis l'API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Gérer la suppression d'un livre
  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  return (
    <div>
      <h1>Books Management</h1>
      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
};

export default Page;
