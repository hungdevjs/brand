import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, CircularProgress, alpha } from '@mui/material';

const Loading = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  if (!isLoading) return null;

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      width="100vw"
      height="100vh"
      bgcolor={alpha('#000', 0.6)}
      color="primary.main"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      zIndex={99}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Loading;
