import { useState } from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useAppContext from '@/hooks/useAppContext';

const ArticleDetail = ({ back }) => {
  const {
    articleState: { articles },
  } = useAppContext();

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton>
          <ArrowBackIcon onClick={back} />
        </IconButton>
        <Typography variant="h5">Article detail</Typography>
      </Box>
    </Box>
  );
};

export default ArticleDetail;
