import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import BookCard from "../components/BookCard";
import { fetchBooks } from "../services/api";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBooks("best sellers");
        setBooks(data.items || []);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Livros em destaque
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </Container>
  );
}
