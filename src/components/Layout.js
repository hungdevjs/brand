import { Box, Container } from '@mui/material';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" gap={4} bgcolor="#f9f9fb">
      <Header />
      <Container>{children}</Container>
      <Footer />
    </Box>
  );
};

export default Layout;
