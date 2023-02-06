import { useRouter } from 'next/router';
import { Drawer, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const navs = [
  { name: 'Portfolio', path: '/' },
  { name: 'Blog', path: '/blogs' },
];

const HeaderMenu = ({ isOpen, onClose }) => {
  const { push } = useRouter();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{ width: '100vw' }}
    >
      <Box
        width="100vw"
        bgcolor="white"
        p={2}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={onClose} />
        </Box>
        <Box display="flex" flexDirection="column" gap={5}>
          {navs.map((nav) => (
            <Box
              key={nav.name}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                push(nav.url);
                onClose();
              }}
            >
              <Typography
                fontSize={20}
                fontWeight={400}
                fontFamily="'Plus Jakarta Sans', sans-serif"
                textTransform="uppercase"
              >
                {nav.name}
              </Typography>
            </Box>
          ))}
          <Button
            variant="contained"
            // size="small"
            sx={{
              alignSelf: 'flex-start',
              fontSize: 16,
              textTransform: 'none',
              boxShadow: 'none',
              bgcolor: 'royalblue',
              '&:hover': { boxShadow: 'none' },
            }}
          >
            Send me a message
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default HeaderMenu;
