import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/components/Link';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Welcom to the Studio Managmed App
        </Typography>
        <Link href="/regester" color="primary">
          Create an account
        </Link>
        <Link href="/login" color="secondary">
          Login
        </Link>
      </Box>
    </Container>
  );
}