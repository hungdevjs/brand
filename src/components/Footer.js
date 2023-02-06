import { Box, Container, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import useResponsive from '@/hooks/useResponsive';

const Footer = () => {
  const { isMobile } = useResponsive();

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={2}
          sx={{ borderTop: `1px solid ${grey[200]}` }}
        >
          <Typography align="center" fontWeight={300} fontSize={13}>
            Copyright © 2022 hungdevjs. {isMobile && <br />} All Rights Reserved
            by hungdevjs
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
