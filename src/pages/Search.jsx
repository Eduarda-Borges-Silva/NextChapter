import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import BookCard from "../components/BookCard";
import { fetchBooks } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";

export default function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 800);

  useEffect(() => {
    if (!debouncedQuery) {
      setBooks([]);
      return;
    }

    async function load() {
      try {
        setLoading(true);
        const data = await fetchBooks(debouncedQuery);
        setBooks(data.items || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [debouncedQuery]);

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Buscar livros
      </Typography>

      <TextField
        label="Título ou autor"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        placeholder="Comece a digitar para buscar..."
      />

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </Container>
  );
}
