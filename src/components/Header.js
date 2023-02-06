import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';

import useResponsive from '@/hooks/useResponsive';
import HeaderMenu from './HeaderMenu';

const navs = [
  { name: 'Portfolio', path: '/' },
  { name: 'Blog', path: '/blogs' },
];

const Header = () => {
  const { pathname, push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isTablet } = useResponsive();

  return (
    <Box height="80px" display="flex" alignItems="center">
      <HeaderMenu
        isOpen={isTablet && isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Container>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            fontFamily="'Bebas Neue', cursive"
            fontSize={24}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={() => push('/')}
          >
            hungdevjs
          </Typography>
          {isTablet && (
            <MenuIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsOpen(true)}
            />
          )}
          {!isTablet && (
            <Box display="flex" alignItems="center" gap={3}>
              {navs.map((nav) => (
                <Typography
                  key={nav.path}
                  fontSize={14}
                  fontWeight={pathname === nav.path ? 600 : 400}
                  color={pathname === nav.path ? 'black' : grey[800]}
                  sx={{
                    cursor: 'pointer',
                    textUnderlineOffset: '5px',
                    textDecoration:
                      pathname === nav.path ? 'underline' : 'none',
                  }}
                  onClick={() => push(nav.path)}
                >
                  {nav.name}
                </Typography>
              ))}
              <Button
                variant="contained"
                size="small"
                color="primary"
                sx={{
                  ml: 2,
                  fontSize: 12,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': { boxShadow: 'none' },
                }}
              >
                Send me a message
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
