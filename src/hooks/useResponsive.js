import { useMediaQuery } from '@mui/material';

const useResponsive = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const isTablet = useMediaQuery('(max-width: 1200px)');

  return { isMobile, isTablet };
};

export default useResponsive;
