import { Box, Container } from '@mui/material';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      gap={4}
      bgcolor="#f9f9fb"
    >
      <Header />
      <Container sx={{ flex: 1 }}>{children}</Container>
      <Footer />
    </Box>
  );
};

export default Layout;
