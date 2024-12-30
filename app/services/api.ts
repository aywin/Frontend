import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api", // URL de votre backend Spring Boot
});

// Type des données d'un livre
export type Book = {
  id: number;
  title: string;
  author: string;
  categoryId: number;
  userId: number;
  file?: File; // Fichier PDF optionnel
};

// Récupérer tous les livres
export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get("/books");
  return response.data;
};

// Récupérer un livre par ID
export const getBookById = async (id: number): Promise<any> => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// Ajouter un livre
export const addBook = async (book: {
  title: string;
  author: string;
  categoryId: number;
  userId: number;
  file?: File;
}): Promise<any> => {
  const formData = new FormData();
  formData.append("title", book.title);
  formData.append("author", book.author);
  formData.append("categoryId", book.categoryId.toString());
  formData.append("userId", book.userId.toString());
  if (book.file) {
    formData.append("file", book.file);
  }

  const response = await api.post("/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Modifier un livre
export const updateBook = async (
  id: number,
  book: {
    title: string;
    author: string;
    categoryId: number;
    userId: number;
    file?: File;
  }
): Promise<any> => {
  const formData = new FormData();
  formData.append("title", book.title);
  formData.append("author", book.author);

  // Ajouter des objets sérialisés pour category et user
  const category = { id: book.categoryId }; // Objet partiel
  const user = { id: book.userId }; // Objet partiel
  formData.append("category", JSON.stringify(category));
  formData.append("user", JSON.stringify(user));

  if (book.file) {
    formData.append("file", book.file);
  } else {
    formData.append("pdfPath", ""); // Si aucun fichier n'est ajouté, conserver le chemin PDF
  }

  const response = await api.put(`/books/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Supprimer un livre
export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};
