import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { fetchBookById } from "../services/api";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchBookById(id);
      setBook(data);
    }
    load();
  }, [id]);

  if (!book) return <Typography>Carregando...</Typography>;

  const { volumeInfo } = book;
  const authors = volumeInfo.authors?.join(", ") || "Desconhecido";
  const thumbnail = volumeInfo.imageLinks?.thumbnail;
  const kindleUrl = `https://www.amazon.com/s?k=${encodeURIComponent(
    volumeInfo.title + " kindle"
  )}`;

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        {volumeInfo.title}
      </Typography>
      {thumbnail && (
        <img src={thumbnail} alt={volumeInfo.title} style={{ maxWidth: '200px' }} />
      )}
      <Typography><strong>Autor:</strong> {authors}</Typography>
      <Typography><strong>Descrição:</strong> {volumeInfo.description}</Typography>
      <Typography><strong>Categorias:</strong> {volumeInfo.categories?.join(", ")}</Typography>
      <Typography><strong>Páginas:</strong> {volumeInfo.pageCount}</Typography>
      <Button
        variant="contained"
        color="primary"
        href={kindleUrl}
        target="_blank"
        rel="noreferrer"
        sx={{ mt: 2 }}
      >
        Ler no Kindle
      </Button>
    </Container>
  );
}
