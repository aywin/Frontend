export interface Book {
  id: number;
  title: string;
  author: string;
  category?: {
    id: number;
    name: string;
  };
  publicationDate: string;
  pdfPath?: string;
}

const BASE_URL = "http://localhost:8080/api/books"; // Remplacez par l'URL de votre backend

export async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}
