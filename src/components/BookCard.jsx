import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';

export default function BookCard({ book }) {
  const { title, authors, imageLinks } = book.volumeInfo;
  const thumbnail = imageLinks?.thumbnail;
  const authorsText = authors ? authors.join(", ") : "Desconhecido";

  return (
    <motion.div whileHover={{ scale: 1.03 }} style={{ display: 'inline-block' }}>
      <Card sx={{ maxWidth: 200, m: 1 }}>
        {thumbnail && (
          <CardMedia
            component="img"
            height="250"
            image={thumbnail}
            alt={title}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {authorsText}
          </Typography>
          <Button
            size="small"
            component={Link}
            to={`/book/${book.id}`}
            sx={{ mt: 1 }}
          >
            Detalhes
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
